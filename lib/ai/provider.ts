import { buildConversationSummary, buildSystemPrompt } from "@/lib/ai/prompts";
import type { AssistantLanguage, ChatMessage } from "@/types/ai";

interface GenerateReplyInput {
  messages: ChatMessage[];
  contextBlocks: string[];
  language: AssistantLanguage;
}

interface GenerateReplyOutput {
  text: string;
  provider: "openai" | "heuristic";
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

export async function generateAssistantReply({
  messages,
  contextBlocks,
  language,
}: GenerateReplyInput): Promise<GenerateReplyOutput> {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const question = latestUserMessage?.content ?? "";
  const openAiApiKey = process.env.OPENAI_API_KEY;

  if (!openAiApiKey) {
    return {
      text: buildFallbackReply(question, contextBlocks, language),
      provider: "heuristic",
    };
  }

  const systemPrompt = buildSystemPrompt(language);
  const contextText = contextBlocks.map((block, index) => `Context ${index + 1}: ${block}`).join("\n");
  const conversation = buildConversationSummary(messages);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: `${systemPrompt}\n\nKnowledge context:\n${contextText}`,
        },
        {
          role: "user",
          content: `Conversation:\n${conversation}\n\nAnswer the latest user request.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
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

  return {
    text: data.output_text.trim(),
    provider: "openai",
  };
}
