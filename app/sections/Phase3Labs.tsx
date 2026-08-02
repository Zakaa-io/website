"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { emitAnalyticsEvent } from "@/lib/analytics/client";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";
import type { DemoSimulationResponse, PortalAgentResponse } from "@/types/ai";
import type { SiteLocale } from "../types/locale";

interface VoiceRecognitionResult {
  transcript: string;
}

interface VoiceRecognitionEvent {
  results: ArrayLike<ArrayLike<VoiceRecognitionResult>>;
}

interface VoiceRecognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: VoiceRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  start: () => void;
}

type VoiceRecognitionCtor = new () => VoiceRecognition;

const productsList = [
  {
    name: "AI Ops Copilot",
    href: "/products/ai-ops-copilot",
    description:
      "A production-ready operations layer that combines AI triage with engineered workflows for resilient service delivery.",
  },
];

declare global {
  interface Window {
    webkitSpeechRecognition?: VoiceRecognitionCtor;
    SpeechRecognition?: VoiceRecognitionCtor;
  }
}

interface Phase3LabsProps {
  locale?: SiteLocale;
}

export default function Phase3Labs({ locale = "en" }: Readonly<Phase3LabsProps>) {
  const isArabic = locale === "ar";
  const [portalAccessToken, setPortalAccessToken] = useState("");
  const [simulatorAccessToken, setSimulatorAccessToken] = useState("");
  const [scenario, setScenario] = useState<"cpu-spike" | "db-latency" | "disk-pressure">("cpu-spike");
  const [environment, setEnvironment] = useState<"production" | "staging">("production");
  const [simulation, setSimulation] = useState<DemoSimulationResponse | null>(null);
  const [simError, setSimError] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const [ticketTitle, setTicketTitle] = useState("API error rate is increasing");
  const [ticketDescription, setTicketDescription] = useState(
    "Error spikes started 20 minutes ago. Customers report intermittent failures on checkout."
  );
  const [affectedService, setAffectedService] = useState("checkout-api");
  const [portalResult, setPortalResult] = useState<PortalAgentResponse | null>(null);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [isTriageRunning, setIsTriageRunning] = useState(false);

  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    setSpeechSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
  }, []);

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimError(null);
    setSimulation(null);

    const response = await fetch("/api/demo-simulator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(simulatorAccessToken.trim()
          ? { Authorization: `Bearer ${simulatorAccessToken.trim()}` }
          : {}),
      },
      body: JSON.stringify({ scenario, environment }),
    });

    const payload = (await response.json()) as DemoSimulationResponse | { error: string };
    if (!response.ok) {
      setSimError("error" in payload ? payload.error : "Simulation failed.");
      void emitAnalyticsEvent({ name: "simulator_failed", details: { scenario, environment } });
      setIsSimulating(false);
      return;
    }

    setSimulation(payload as DemoSimulationResponse);
    void emitAnalyticsEvent({ name: "simulator_run", details: { scenario, environment } });
    setIsSimulating(false);
  };

  const runPortalAgent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsTriageRunning(true);
    setPortalError(null);
    setPortalResult(null);

    const response = await fetch("/api/portal-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(portalAccessToken.trim() ? { Authorization: `Bearer ${portalAccessToken.trim()}` } : {}),
      },
      body: JSON.stringify({
        ticketTitle,
        ticketDescription,
        affectedService,
      }),
    });

    const payload = (await response.json()) as PortalAgentResponse | { error: string };
    if (!response.ok) {
      setPortalError("error" in payload ? payload.error : "Triage failed.");
      void emitAnalyticsEvent({ name: "portal_triage_failed", details: { service: affectedService } });
      setIsTriageRunning(false);
      return;
    }

    setPortalResult(payload as PortalAgentResponse);
    void emitAnalyticsEvent({
      name: "portal_triage_run",
      details: { service: affectedService, severity: (payload as PortalAgentResponse).severity },
    });
    setIsTriageRunning(false);
  };

  const captureVoiceBrief = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setPortalError("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0]?.transcript?.trim();
      if (!transcript) return;
      setTicketDescription((prev) => `${prev}\n${transcript}`.trim());
    };
    recognition.onerror = () => {
      setPortalError("Voice capture failed. Please try again.");
    };
    recognition.start();
  };

  return (
    <section id="phase3" className="py-24 relative border-y border-[rgba(148,163,184,0.08)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label={isArabic ? "المرحلة 3" : "Phase 3"}
          title={
            <>
              {isArabic ? "عمليات ذكاء اصطناعي منتجة" : "Productized AI Ops"}
              <br />
              <span className="accent-text">{isArabic ? "عرض حي + وكيل البوابة" : "Live Demo + Portal Agent"}</span>
            </>
          }
          subtitle={
            isArabic
              ? "محاكاة حوادث تفاعلية، وفرز تذاكر البوابة، وإدخال صوتي اختياري لتسليم تشغيلي أسرع."
              : "Interactive incident simulation, portal triage, and optional voice intake for faster operational handoffs."
          }
        />

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {productsList.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="block rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6 transition-all hover:border-[rgba(59,130,246,0.3)] hover:-translate-y-0.5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#3B82F6]">Product</p>
              <h3 className="mt-2 text-xl font-bold text-[#F8FAFC]">{product.name}</h3>
              <p className="mt-2 text-sm text-[#94A3B8]">{product.description}</p>
              <p className="mt-3 text-sm font-medium text-[#60A5FA]">{isArabic ? "← استكشف المنتج" : "Explore product →"}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <FadeIn>
            <div className="rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
              <h3 className="text-xl font-bold">{isArabic ? "محاكي العرض الحي" : "Live Demo Simulator"}</h3>
              <p className="mt-2 text-sm text-[#94A3B8]">
                {isArabic
                  ? "أعد إنتاج سيناريوهات الحوادث التي تُظهر تشخيص الذكاء الاصطناعي والمعالجة والوقاية."
                  : "Reproduce incident narratives that show AI diagnosis, remediation, and prevention guardrails."}
              </p>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  aria-label={isArabic ? "رمز الوصول الاختياري للمحاكي" : "Optional simulator bearer token"}
                  value={simulatorAccessToken}
                  onChange={(event) => setSimulatorAccessToken(event.target.value)}
                  className="md:col-span-2 rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
                  placeholder={isArabic ? "رمز وصول اختياري (إذا كان مصادقة المحاكي مفعّلة)" : "Optional bearer token (if simulator auth is enabled)"}
                />
                <select
                  aria-label={isArabic ? "السيناريو" : "Scenario"}
                  value={scenario}
                  onChange={(event) => setScenario(event.target.value as "cpu-spike" | "db-latency" | "disk-pressure")}
                  className="rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
                >
                  <option value="cpu-spike">{isArabic ? "ارتفاع المعالج" : "CPU spike"}</option>
                  <option value="db-latency">{isArabic ? "تأخر قاعدة البيانات" : "Database latency"}</option>
                  <option value="disk-pressure">{isArabic ? "ضغط القرص" : "Disk pressure"}</option>
                </select>
                <select
                  aria-label={isArabic ? "البيئة" : "Environment"}
                  value={environment}
                  onChange={(event) => setEnvironment(event.target.value as "production" | "staging")}
                  className="rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
                >
                  <option value="production">{isArabic ? "إنتاج" : "Production"}</option>
                  <option value="staging">{isArabic ? "تجريبي" : "Staging"}</option>
                </select>
              </div>

              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimulating}
                className="mt-4 rounded-[10px] bg-[#3B82F6] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSimulating ? (isArabic ? "جارٍ تشغيل المحاكاة..." : "Running simulation...") : isArabic ? "تشغيل المحاكاة" : "Run Simulation"}
              </button>

              {simError && <p className="mt-3 text-sm text-[#EF4444]">{simError}</p>}

              {simulation && (
                <div className="mt-4 rounded-xl border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.08)] p-4">
                  <p className="font-semibold">{simulation.scenario}</p>
                  <p className="mt-1 text-sm text-[#94A3B8]">{simulation.summary}</p>
                  <p className="mt-3 text-sm">
                    Root cause: <span className="text-[#94A3B8]">{simulation.rootCause}</span>
                  </p>
                  <p className="mt-1 text-sm">
                    Resolved in: <span className="text-[#94A3B8]">{simulation.resolvedInMinutes} minutes</span>
                  </p>

                  <div className="mt-3 space-y-2">
                    {simulation.timeline.map((item) => (
                      <div key={`${item.at}-${item.action}`} className="rounded-lg bg-[#0F172A] px-3 py-2 text-xs">
                        <span className="font-semibold text-[#DBEAFE]">{item.at}</span>{" "}
                        <span className="text-[#94A3B8]">{item.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
              <h3 className="text-xl font-bold">{isArabic ? "وكيل بوابة العملاء الذكي" : "Client Portal AI Agent"}</h3>
              <p className="mt-2 text-sm text-[#94A3B8]">
                {isArabic
                  ? "أرسل تذكرة بأسلوب الحوادث واحصل على إرشادات فرز فورية ومسار تصعيد."
                  : "Submit an incident-style ticket and get immediate triage guidance and escalation path."}
              </p>

              <form onSubmit={runPortalAgent} className="mt-5 space-y-3">
<input
                type="text"
                aria-label={isArabic ? "رمز الوصول الاختياري للبوابة" : "Optional portal bearer token"}
                value={portalAccessToken}
                onChange={(event) => setPortalAccessToken(event.target.value)}
                className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
                placeholder={isArabic ? "رمز وصول اختياري (إذا كان مصادقة البوابة مفعّلة)" : "Optional bearer token (if portal auth is enabled)"}
              />
              <input
                type="text"
                aria-label={isArabic ? "عنوان التذكرة" : "Ticket title"}
                value={ticketTitle}
                onChange={(event) => setTicketTitle(event.target.value)}
                className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
                placeholder={isArabic ? "عنوان التذكرة" : "Ticket title"}
                required
              />
              <input
                type="text"
                aria-label={isArabic ? "الخدمة المتأثرة" : "Affected service"}
                value={affectedService}
                onChange={(event) => setAffectedService(event.target.value)}
                className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
                placeholder={isArabic ? "الخدمة المتأثرة" : "Affected service"}
                required
              />
                <textarea
                  aria-label={isArabic ? "تفاصيل التذكرة" : "Ticket details"}
                  value={ticketDescription}
                  onChange={(event) => setTicketDescription(event.target.value)}
                  className="min-h-28 w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
                  placeholder={isArabic ? "تفاصيل التذكرة" : "Ticket details"}
                  required
                />
                {speechSupported && (
                  <button
                    type="button"
                    onClick={captureVoiceBrief}
                    className="rounded-[10px] border border-[rgba(148,163,184,0.2)] px-4 py-2 text-sm text-[#94A3B8] transition-all hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                  >
                    {isArabic ? "إضافة ملخص صوتي" : "Add Voice Brief"}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isTriageRunning}
                  className="ml-2 rounded-[10px] bg-[#3B82F6] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isTriageRunning ? (isArabic ? "جارٍ التحليل..." : "Analyzing...") : isArabic ? "تشغيل الفرز" : "Run Triage"}
                </button>
              </form>

              {portalError && <p className="mt-3 text-sm text-[#EF4444]">{portalError}</p>}

              {portalResult && (
                <div className="mt-4 rounded-xl border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.08)] p-4">
                  <p className="text-sm">
                    Severity:{" "}
                    <span className="font-semibold uppercase text-[#F8FAFC]">{portalResult.severity}</span>
                  </p>
                  <p className="mt-2 text-sm text-[#94A3B8]">{portalResult.triageSummary}</p>
                  <ul className="mt-3 list-disc pl-5 text-sm text-[#94A3B8] space-y-1">
                    {portalResult.immediateActions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-[#94A3B8]">{portalResult.escalationPath}</p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
