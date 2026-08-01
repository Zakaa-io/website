import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/server";
import { retrieveKnowledge } from "@/lib/ai/knowledge";
import { generateAssistantReply } from "@/lib/ai/provider";
import { persistChatExchange } from "@/lib/persistence/store";
import type { AssistantLanguage, ChatRequest, ChatResponse } from "@/types/ai";
import { checkRateLimit, resolveRateLimitKey } from "@/lib/server/rate-limit";
import {
  readJsonRecord,
  requireEnum,
  requireString,
  validationErrorResponse,
} from "@/lib/server/validation";

const roleValues = ["user", "assistant"] as const;

function hasLeadIntent(content: string): boolean {
  const text = content.toLowerCase();
  return ["quote", "pricing", "price", "book", "assessment", "contact", "call"].some((term) =>
    text.includes(term)
  );
}

export async function POST(request: Request) {
  try {
    const rateLimit = checkRateLimit({
      key: resolveRateLimitKey(request, "chat"),
      limit: 30,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait before sending more messages." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const record = await readJsonRecord(request);
    const language = requireEnum(
      record.language ?? "en",
      "language",
      ["en", "ar"] as const
    ) as AssistantLanguage;

    if (!Array.isArray(record.messages) || record.messages.length === 0) {
      return NextResponse.json({ error: "messages must be a non-empty array." }, { status: 400 });
    }

    if (record.messages.length > 20) {
      return NextResponse.json({ error: "messages cannot exceed 20 items." }, { status: 400 });
    }

    const messages = record.messages.map((item, index) => {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        throw new Error(`messages[${index}] must be an object.`);
      }

      const role = requireEnum(
        (item as Record<string, unknown>).role,
        `messages[${index}].role`,
        roleValues
      );
      const content = requireString((item as Record<string, unknown>).content, `messages[${index}].content`, {
        minLength: 1,
        maxLength: 2000,
      });
      return { role, content };
    });

    const payload: ChatRequest = { messages, language };
    const latestUserMessage = [...payload.messages].reverse().find((message) => message.role === "user");
    if (!latestUserMessage) {
      return NextResponse.json({ error: "at least one user message is required." }, { status: 400 });
    }

    const knowledge = retrieveKnowledge(latestUserMessage.content, 3);
    const contextBlocks = knowledge.map((item) => `${item.title}: ${item.body}`);

    const generation = await generateAssistantReply({
      messages: payload.messages,
      contextBlocks,
      language,
    });

    const response: ChatResponse = {
      reply: generation.text,
      provider: generation.provider,
      language,
      suggestedNextStep: hasLeadIntent(latestUserMessage.content)
        ? language === "ar"
          ? "إذا رغبت، شارك متطلباتك في نموذج التقييم وسيتواصل معك مهندسونا."
          : "If you want, share your requirements in the assessment form and our engineers will follow up."
        : undefined,
    };

    const persistence = await persistChatExchange({
      language,
      provider: response.provider,
      userMessage: latestUserMessage.content,
      assistantReply: response.reply,
      suggestedNextStep: response.suggestedNextStep,
    });

    trackServerEvent({
      name: "chat_response_received",
      route: "/api/chat",
      details: {
        language,
        provider: response.provider,
        messageCount: payload.messages.length,
        persistence,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("messages[")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof Error && error.message.includes("request failed with status")) {
      trackServerEvent({
        name: "chat_response_failed",
        route: "/api/chat",
        details: { reason: error.message },
      });
      return NextResponse.json({ error: "AI service temporarily unavailable." }, { status: 502 });
    }

    const validationResponse = validationErrorResponse(error);
    if (validationResponse.status !== 500) return validationResponse;

    const message = error instanceof Error ? error.message : "Unknown AI processing error";
    trackServerEvent({
      name: "chat_response_failed",
      route: "/api/chat",
      details: { reason: message },
    });
    return NextResponse.json({ error: "An unexpected error occurred. Please try again later." }, { status: 500 });
  }
}
