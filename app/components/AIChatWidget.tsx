"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { emitAnalyticsEvent } from "@/lib/analytics/client";
import type { ChatMessage, ChatResponse } from "@/types/ai";

function getStarterMessage(): ChatMessage {
  return {
    role: "assistant",
    content:
      "Hi, I am Zakaa's AI assistant. Ask me about cloud, DevOps, security, managed hosting, or our free infrastructure assessment.",
  };
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([getStarterMessage()]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>("heuristic");

  useEffect(() => {
    const openHandler = () => {
      setOpen(true);
      void emitAnalyticsEvent({ name: "chat_opened", details: { source: "cta_or_section" } });
    };
    window.addEventListener("zakaa:open-ai-chat", openHandler);
    return () => window.removeEventListener("zakaa:open-ai-chat", openHandler);
  }, []);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  useEffect(() => {
    setError(null);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = input.trim();
    if (!userInput || isSending) return;

    const userMessage: ChatMessage = { role: "user", content: userInput };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);
    void emitAnalyticsEvent({ name: "chat_message_sent", details: { length: userInput.length } });

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: nextMessages, language: "en" }),
    });

    const payload = (await response.json()) as ChatResponse | { error: string };
    if (!response.ok) {
      setError("error" in payload ? payload.error : "Could not get a response. Please try again or email hello@zakaa.io.");
      void emitAnalyticsEvent({ name: "chat_response_failed", details: {} });
      setIsSending(false);
      return;
    }

    const chatPayload = payload as ChatResponse;
    setProvider(chatPayload.provider);
    const assistantMessages: ChatMessage[] = [{ role: "assistant", content: chatPayload.reply }];
    if (chatPayload.suggestedNextStep) {
      assistantMessages.push({ role: "assistant", content: chatPayload.suggestedNextStep });
    }
    setMessages((prev) => [...prev, ...assistantMessages]);
    void emitAnalyticsEvent({
      name: "chat_response_received",
      details: { provider: chatPayload.provider },
    });
    setIsSending(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1100]">
      {!open && !minimized && (
        <button
          onClick={() => {
            setOpen(true);
            void emitAnalyticsEvent({ name: "chat_opened", details: { source: "floating_button" } });
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#2563EB]"
        >
          <span>Ask AI Assistant</span>
        </button>
      )}

      {minimized && (
        <button
          onClick={() => setMinimized(false)}
          className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#2563EB]"
          aria-label="Resume chat"
        >
          <span>Resume Chat</span>
        </button>
      )}

      {open && !minimized && (
        <div
          className="w-[min(92vw,380px)] max-h-[70vh] overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#0F172A] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between border-b border-[rgba(148,163,184,0.1)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Zakaa AI Assistant</p>
              <p className="text-xs text-[#94A3B8]">Provider: {provider}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMinimized(true)}
                className="rounded-md px-2 py-1 text-xs text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                aria-label="Minimize chat"
              >
                Minimize
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setMinimized(false);
                }}
                className="rounded-md px-2 py-1 text-xs text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          <div
            aria-live="polite"
            className="max-h-[350px] space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "bg-[rgba(59,130,246,0.12)] text-[#DBEAFE]"
                    : "bg-[#1E293B] text-[#F8FAFC]"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isSending && (
              <div className="rounded-xl bg-[rgba(59,130,246,0.12)] px-3 py-2 text-sm text-[#DBEAFE]">
                Thinking...
              </div>
            )}
            {error && <p className="text-sm text-[#EF4444]">{error}</p>}
          </div>

          <form onSubmit={onSubmit} className="border-t border-[rgba(148,163,184,0.1)] p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about services, pricing, or assessment..."
                className="flex-1 rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#111827] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
