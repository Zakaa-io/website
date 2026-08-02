"use client";

import { FormEvent, useMemo, useState } from "react";
import { emitAnalyticsEvent } from "@/lib/analytics/client";
import type { AssessmentResponse, AssistantLanguage, CloudProvider, DeliveryTimeline, EmployeeRange } from "@/types/ai";

const priorityOptions = [
  { id: "security", label: "Security hardening" },
  { id: "compliance", label: "Compliance readiness" },
  { id: "delivery-speed", label: "Faster release delivery" },
  { id: "incident-response", label: "Incident response improvement" },
  { id: "cost-optimization", label: "Cost optimization" },
  { id: "observability", label: "Observability and monitoring" },
  { id: "resilience", label: "High availability and resilience" },
];

interface AssessmentWizardProps {
  language: AssistantLanguage;
}

interface AssessmentState {
  companyName: string;
  employeeRange: EmployeeRange;
  primaryCloud: CloudProvider;
  monthlyBudget: string;
  priorities: string[];
  timeline: DeliveryTimeline;
}

const initialState: AssessmentState = {
  companyName: "",
  employeeRange: "21-100",
  primaryCloud: "aws",
  monthlyBudget: "",
  priorities: ["security"],
  timeline: "30-days",
};

export default function AssessmentWizard({ language }: AssessmentWizardProps) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<AssessmentState>(initialState);
  const [result, setResult] = useState<AssessmentResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labels = useMemo(
    () => ({
      title: "AI Assessment Assistant",
      subtitle: "Answer a few questions to get an instant recommendation.",
      previous: "Previous",
      next: "Next",
      submit: "Generate Assessment",
      submitting: "Analyzing...",
    }),
    []
  );

  const togglePriority = (priority: string) => {
    setState((prev) => {
      if (prev.priorities.includes(priority)) {
        const filtered = prev.priorities.filter((item) => item !== priority);
        return {
          ...prev,
          priorities: filtered.length > 0 ? filtered : prev.priorities,
        };
      }
      return { ...prev, priorities: [...prev.priorities, priority] };
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 2) {
      setStep((prev) => Math.min(prev + 1, 2));
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setResult(null);

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("zakaa_csrf="))
      ?.split("=")[1];

    const response = await fetch("/api/assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(csrfToken ? { "x-zakaa-csrf": csrfToken } : {}),
      },
      body: JSON.stringify({
        ...state,
        language,
      }),
    });

    const payload = (await response.json()) as AssessmentResponse | { error: string };
    if (!response.ok) {
      setError("error" in payload ? payload.error : "Assessment failed. Please try again.");
      void emitAnalyticsEvent({ name: "assessment_failed", details: { language } });
      setIsSubmitting(false);
      return;
    }

    setResult(payload as AssessmentResponse);
    void emitAnalyticsEvent({
      name: "assessment_generated",
      details: { language, riskLevel: (payload as AssessmentResponse).riskLevel },
    });
    setIsSubmitting(false);
  };

  return (
    <div
      className="rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6 text-left"
    >
      <h3 className="text-xl font-bold">{labels.title}</h3>
      <p className="mt-2 text-sm text-[#94A3B8]">{labels.subtitle}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        {step === 0 && (
          <>
            <input
              type="text"
              placeholder="Company name"
              value={state.companyName}
              onChange={(event) => setState((prev) => ({ ...prev, companyName: event.target.value }))}
              className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={state.employeeRange}
                onChange={(event) =>
                  setState((prev) => ({ ...prev, employeeRange: event.target.value as EmployeeRange }))
                }
                className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
              >
                <option value="1-20">1-20 employees</option>
                <option value="21-100">21-100 employees</option>
                <option value="101-500">101-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>

              <select
                value={state.primaryCloud}
                onChange={(event) =>
                  setState((prev) => ({ ...prev, primaryCloud: event.target.value as CloudProvider }))
                }
                className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
              >
                <option value="aws">AWS</option>
                <option value="azure">Azure</option>
                <option value="gcp">GCP</option>
                <option value="multi-cloud">Multi-cloud</option>
                <option value="on-prem">On-prem</option>
              </select>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Approx. monthly budget (optional)"
              value={state.monthlyBudget}
              onChange={(event) => setState((prev) => ({ ...prev, monthlyBudget: event.target.value }))}
              className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
            />

            <select
              value={state.timeline}
              onChange={(event) => setState((prev) => ({ ...prev, timeline: event.target.value as DeliveryTimeline }))}
              className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
            >
              <option value="immediate">Immediate (1-2 weeks)</option>
              <option value="30-days">Within 30 days</option>
              <option value="90-days">Within 90 days</option>
              <option value="strategic">Strategic roadmap</option>
            </select>
          </>
        )}

        {step === 2 && (
          <div>
            <p className="mb-3 text-sm text-[#94A3B8]">
              Select your top priorities:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {priorityOptions.map((option) => {
                const selected = state.priorities.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => togglePriority(option.id)}
                    className={`rounded-lg border px-3 py-2 text-sm text-left transition-all ${
                      selected
                        ? "border-[#3B82F6] bg-[rgba(59,130,246,0.12)] text-[#DBEAFE]"
                        : "border-[rgba(148,163,184,0.14)] bg-[#0F172A] text-[#94A3B8]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s <= step ? "w-6 bg-[#3B82F6]" : "w-2 bg-[rgba(148,163,184,0.2)]"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-xs text-[#94A3B8]" aria-live="polite">
            Step {step + 1} of 3
          </p>
        </div>

        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              className="rounded-[10px] border border-[rgba(148,163,184,0.2)] px-4 py-2 text-sm text-[#94A3B8] transition-all hover:bg-[#1E293B] hover:text-[#F8FAFC]"
            >
              {labels.previous}
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[10px] bg-[#3B82F6] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? labels.submitting : step === 2 ? labels.submit : labels.next}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-sm text-[#EF4444]">{error}</p>}

      {result && (
        <div className="mt-6 rounded-xl border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.08)] p-4">
          <p className="text-sm font-semibold">{result.summary}</p>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Readiness score: <span className="text-[#F8FAFC] font-semibold">{result.readinessScore}/100</span> | Risk: <span className="text-[#F8FAFC] font-semibold uppercase">{result.riskLevel}</span>
          </p>

          <div className="mt-4 space-y-3">
            {result.recommendations.map((item) => (
              <div key={item.title} className="rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] p-3">
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="mt-1 text-xs text-[#94A3B8]">{item.rationale}</p>
                <p className="mt-2 text-xs text-[#94A3B8]">
                  Services: {item.mappedServices.join(" • ")}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-4 list-disc pl-5 text-xs text-[#94A3B8] space-y-1">
            {result.nextActions.map((action, index) => (
              <li key={`${action}-${index}`}>{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
