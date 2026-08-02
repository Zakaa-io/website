import { buildConversationSummary, buildSystemPrompt } from "@/lib/ai/prompts";
import type { AssistantLanguage, ChatMessage, ChatResponse } from "@/types/ai";

interface GenerateReplyInput {
  messages: ChatMessage[];
  contextBlocks: string[];
  language: AssistantLanguage;
}

function buildFallbackReply(question: string, contextBlocks: string[], language: AssistantLanguage): string {
  const compactContext = contextBlocks.slice(0, 2).join(" ");
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("price") || lowerQuestion.includes("cost") || lowerQuestion.includes("pricing")) {
    return language === "ar"
      ? "يتم تحديد التسعير حسب نطاق البنية التحتية ومستوى التوافر والدعم المطلوب. شارك تفاصيل بيئتك الحالية لنعد لك تقديرا مناسبا بسرعة."
      : "Pricing is tailored to your infrastructure scope, availability targets, and support level. Share your current setup and we can prepare a scoped estimate quickly.";
  }

  if (lowerQuestion.includes("contact") || lowerQuestion.includes("call") || lowerQuestion.includes("email")) {
    return language === "ar"
      ? "يمكنك التواصل مع Zakaa عبر hello@zakaa.io أو +20 1000 292 919. وإذا رغبت، أستطيع مساعدتك في إرسال التفاصيل ليتواصل معك مهندس."
      : "You can reach Zakaa at hello@zakaa.io or +20 1000 292 919. If you prefer, I can also help you submit details so an engineer can follow up.";
  }

  return language === "ar"
    ? `${compactContext} إذا شاركت بيئتك الحالية والتحدي الأساسي، يمكنني ترشيح مسار الخدمة الأنسب من Zakaa.`
    : `${compactContext} If you share your stack and current challenge, I can suggest the most relevant Zakaa service path next.`;
}

function resolveProvider(): "openai" | "openrouter" | "heuristic" {
  const provider = process.env.AI_PROVIDER?.trim().toLowerCase();
  if (provider === "openrouter") return "openrouter";
  if (provider === "heuristic") return "heuristic";
  return "openai";
}

async function callOpenAI(messages: { role: string; content: string }[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: messages,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed with status ${response.status}: ${body}`);
  }

  const data: unknown = await response.json();
  if (
    !data ||
    typeof data !== "object" ||
    !("output_text" in data) ||
    typeof data.output_text !== "string" ||
    data.output_text.trim().length === 0
  ) {
    throw new Error("OpenAI response did not include output_text");
  }

  return data.output_text.trim();
}

async function callOpenRouter(messages: { role: string; content: string }[], model: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured.");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://zakaa.io",
      "X-Title": "Zakaa AI Assistant",
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenRouter request failed with status ${response.status}: ${body}`);
  }

  const data: unknown = await response.json();
  if (
    !data ||
    typeof data !== "object" ||
    !("choices" in data) ||
    !Array.isArray((data as { choices: unknown[] }).choices) ||
    (data as { choices: { message?: { content?: string } }[] }).choices.length === 0
  ) {
    throw new Error("OpenRouter response did not include choices");
  }

  const content = (data as { choices: { message?: { content?: string } }[] }).choices[0]?.message?.content;
  if (!content || typeof content !== "string" || content.trim().length === 0) {
    throw new Error("OpenRouter response did not include message content");
  }

  return content.trim();
}

export async function generateAssistantReply({
  messages,
  contextBlocks,
  language,
}: GenerateReplyInput): Promise<ChatResponse> {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const question = latestUserMessage?.content ?? "";
  const provider = resolveProvider();

  if (provider === "heuristic") {
    return {
      reply: buildFallbackReply(question, contextBlocks, language),
      provider: "heuristic",
      language,
    };
  }

  const systemPrompt = buildSystemPrompt(language);
  const contextText = contextBlocks.map((block, index) => `Context ${index + 1}: ${block}`).join("\n");
  const conversation = buildConversationSummary(messages);

  const chatMessages = [
    { role: "system" as const, content: `${systemPrompt}\n\nKnowledge context:\n${contextText}` },
    { role: "user" as const, content: `Conversation:\n${conversation}\n\nAnswer the latest user request.` },
  ];

  try {
    if (provider === "openrouter") {
      const model = process.env.OPENROUTER_MODEL?.trim();
      if (!model) {
        return {
          reply: buildFallbackReply(question, contextBlocks, language),
          provider: "heuristic",
          language,
        };
      }

      const text = await callOpenRouter(chatMessages, model);
      return { reply: text, provider: "openrouter", language };
    }

    const text = await callOpenAI(chatMessages);
    return { reply: text, provider: "openai", language };
  } catch (error) {
    console.error("[ai] provider error", error);
    return {
      reply: buildFallbackReply(question, contextBlocks, language),
      provider: "heuristic",
      language,
    };
  }
}
