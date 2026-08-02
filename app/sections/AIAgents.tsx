"use client";

import React from "react";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

type MessageToken =
  | { type: "text"; content: string }
  | { type: "br" }
  | { type: "code"; content: string }
  | { type: "bold"; content: string }
  | { type: "green"; content: string };

function tokenizeMessage(text: string): MessageToken[] {
  const tokens: MessageToken[] = [];
  const pattern = /(<br\s*\/?>|<code>.*?<\/code>|<b>.*?<\/b>|<span class="text-\[#10B981\]">.*?<\/span>)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (/^<br\s*\/?>$/i.test(raw)) {
      tokens.push({ type: "br" });
    } else if (/^<code>(.*?)<\/code>$/.test(raw)) {
      tokens.push({ type: "code", content: raw.replace(/^<code>|<\/code>$/g, "") });
    } else if (/^<b>(.*?)<\/b>$/.test(raw)) {
      tokens.push({ type: "bold", content: raw.replace(/^<b>|<\/b>$/g, "") });
    } else if (/^<span class="text-\[#10B981\]">(.*?)<\/span>$/.test(raw)) {
      tokens.push({ type: "green", content: raw.replace(/^<span class="text-\[#10B981\]">|<\/span>$/g, "") });
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: "text", content: text.slice(lastIndex) });
  }

  return tokens;
}

function ChatMessageContent({ text }: { text: string }) {
  return (
    <div className="whitespace-pre-line">
      {tokenizeMessage(text).map((token, i) => {
        switch (token.type) {
          case "br":
            return <br key={i} />;
          case "code":
            return (
              <code key={i} className="font-mono text-[#DBEAFE] bg-[rgba(59,130,246,0.15)] px-1 rounded">
                {token.content}
              </code>
            );
          case "bold":
            return (
              <strong key={i} className="font-semibold text-[#F8FAFC]">
                {token.content}
              </strong>
            );
          case "green":
            return (
              <span key={i} style={{ color: "#10B981" }}>
                {token.content}
              </span>
            );
          default:
            return <span key={i}>{token.content}</span>;
        }
      })}
    </div>
  );
}

const chatMessages = [
  {
    type: "user" as const,
    avatar: "👤",
    text: "Server <code>web-prod-03</code> is showing high CPU. Can you investigate?",
  },
  {
    type: "ai" as const,
    avatar: "🤖",
    text: `Investigating <code>web-prod-03</code>...<br/><br/>
🔍 <b>Findings:</b><br/>
• CPU spike started at 14:23 UTC<br/>
• Process: <code>python worker.py</code> consuming 94% CPU<br/>
• Memory: normal (42% usage)<br/>
• Disk I/O: elevated on <code>/var/log</code><br/><br/>
💡 <b>Root cause:</b> Log rotation job stuck in loop.<br/>
✅ <b>Action taken:</b> Killed stuck process, restarted logrotate. CPU back to 23%.`,
  },
  {
    type: "user" as const,
    avatar: "👤",
    text: "Great. Any other instances affected?",
  },
  {
    type: "ai" as const,
    avatar: "🤖",
    text: 'Scanned all 26 web instances. <span class="text-[#10B981]">All clear.</span> Ive added a guardrail to prevent this logrotate pattern from recurring.',
  },
];

const aiFeatures = [
  {
    icon: "👁️",
    title: "Continuous Monitoring",
    desc: "47+ metrics per instance, 15-second granularity",
  },
  {
    icon: "🧠",
    title: "Intelligent Diagnosis",
    desc: "LLM-powered root cause analysis with RAG",
  },
  {
    icon: "⚡",
    title: "Auto-Remediation",
    desc: "80% of incidents resolved without human touch",
  },
  {
    icon: "📋",
    title: "Full Audit Trail",
    desc: "Every action logged, every decision explained",
  },
];

export default function AIAgents() {
  const openChat = () => {
    window.dispatchEvent(new Event("zakaa:open-ai-chat"));
  };

  return (
    <section
      id="ai"
      className="py-24 relative border-y border-[rgba(148,163,184,0.08)]"
      style={{
        background:
          "linear-gradient(180deg, rgba(59,130,246,0.03) 0%, transparent 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label="AI-Powered Operations"
          title={
            <>
              Meet Your{" "}
              <span className="accent-text">Autonomous IT Team</span>
            </>
          }
          subtitle="Our AI agents don't just alert — they investigate, diagnose, and fix. Integrated with your entire stack."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Chat Visual */}
          <FadeIn>
            <div className="bg-[#0F172A] border border-[rgba(148,163,184,0.08)] rounded-[20px] p-8 min-h-[400px]">
              <div className="flex flex-col gap-4">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start animate-slide-in"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  >
                    <div
                      className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-sm flex-shrink-0 ${
                        msg.type === "ai"
                          ? "bg-[#3B82F6] text-white"
                          : "bg-[#1E293B]"
                      }`}
                    >
                      {msg.avatar}
                    </div>
                    <div
                       className={`rounded-[14px] px-5 py-3.5 text-sm leading-relaxed max-w-[380px] border ${
                         msg.type === "ai"
                           ? "bg-[rgba(59,130,246,0.06)] border-[rgba(59,130,246,0.12)]"
                           : "bg-[#1E293B] border-[rgba(148,163,184,0.08)]"
                       }`}
                     >
                       <ChatMessageContent text={msg.text} />
                     </div>
                   </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Features */}
          <FadeIn delay={200}>
            <h3 className="text-2xl font-bold mb-4">
              How Our AI Agents Work
            </h3>
            <p className="text-[#94A3B8] mb-8 leading-relaxed">
              Each agent is a specialized AI worker with access to your infrastructure tools. They observe, reason, and act — with full audit trails and human oversight.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {aiFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#111827] border border-[rgba(148,163,184,0.08)]"
                >
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center bg-[#1E293B] text-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{feature.title}</h4>
                    <p className="text-xs text-[#94A3B8]">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={openChat}
              className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#2563EB]"
            >
              Try AI Assistant
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
