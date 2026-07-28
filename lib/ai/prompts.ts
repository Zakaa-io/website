import type { ChatMessage } from "@/types/ai";
import type { AssistantLanguage } from "@/types/ai";

export function buildSystemPrompt(language: AssistantLanguage): string {
  const languageInstruction =
    language === "ar"
      ? "Respond in Arabic with clear professional wording."
      : "Respond in English with clear professional wording.";

  return [
    "You are Zakaa's pre-sales AI assistant.",
    "Stay concise, useful, and factual.",
    "Only use Zakaa-relevant service details from the provided context.",
    "If information is unavailable, say so and suggest contacting an engineer.",
    "Always keep a professional enterprise tone.",
    languageInstruction,
  ].join(" ");
}

export function buildConversationSummary(messages: ChatMessage[]): string {
  return messages
    .slice(-6)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");
}
