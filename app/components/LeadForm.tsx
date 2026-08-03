"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { emitAnalyticsEvent } from "@/lib/analytics/client";
import type { LeadResponse } from "@/types/ai";

interface LeadFormProps {
  source?: "cta" | "chat" | "assessment" | "unknown";
  compact?: boolean;
}

const initialState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function LeadForm({ source = "cta", compact = false }: LeadFormProps) {
  const [formValues, setFormValues] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LeadResponse | null>(null);

  useEffect(() => {
    void fetch("/api/csrf", { method: "GET", credentials: "include" });
  }, []);

  const title = useMemo(
    () => (compact ? "Share your requirements" : "Request your free infrastructure assessment"),
    [compact]
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setResult(null);

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("zakaa_csrf="))
      ?.split("=")[1];

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(csrfToken ? { "x-zakaa-csrf": csrfToken } : {}),
      },
      body: JSON.stringify({
        ...formValues,
        source,
      }),
    });

    const payload = (await response.json()) as LeadResponse | { error: string };
    if (!response.ok) {
      setError("error" in payload ? payload.error : "Could not submit your request.");
      void emitAnalyticsEvent({ name: "lead_submit_failed", details: { source } });
      setIsSubmitting(false);
      return;
    }

    setResult(payload as LeadResponse);
    void emitAnalyticsEvent({
      name: "lead_submitted",
      details: { source, tier: (payload as LeadResponse).tier, score: (payload as LeadResponse).score },
    });
    setFormValues(initialState);
    setIsSubmitting(false);
  };

  return (
    <div className="rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6 text-left">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-[#94A3B8] mt-2 mb-6">
        We will review your current setup and send a practical action plan.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-name" className="block text-sm font-medium text-[#94A3B8] mb-1.5">Full name</label>
            <input
              id="lead-name"
              type="text"
              value={formValues.name}
              onChange={(event) => setFormValues((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
              required
            />
          </div>
          <div>
            <label htmlFor="lead-email" className="block text-sm font-medium text-[#94A3B8] mb-1.5">Work email</label>
            <input
              id="lead-email"
              type="email"
              value={formValues.email}
              onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="lead-company" className="block text-sm font-medium text-[#94A3B8] mb-1.5">Company name (optional)</label>
          <input
            id="lead-company"
            type="text"
            value={formValues.company}
            onChange={(event) => setFormValues((prev) => ({ ...prev, company: event.target.value }))}
            className="w-full rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div>
          <label htmlFor="lead-message" className="block text-sm font-medium text-[#94A3B8] mb-1.5">Tell us about your infrastructure goals or pain points</label>
          <textarea
            id="lead-message"
            value={formValues.message}
            onChange={(event) => setFormValues((prev) => ({ ...prev, message: event.target.value }))}
            className="w-full min-h-28 rounded-lg border border-[rgba(148,163,184,0.14)] bg-[#0F172A] px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-[10px] bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Assessment Request"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-[#EF4444]">{error}</p>}

      {result && (
        <div className="mt-4 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.08)] p-4 text-sm">
          <p className="font-semibold">
            Submitted successfully — lead score {result.score}/100 ({result.tier.toUpperCase()}).
          </p>
          <p className="text-[#94A3B8] mt-1">{result.nextStep}</p>
          <p className="text-[#94A3B8] mt-1">We will send a summary to your email shortly.</p>
          <p className="text-[#94A3B8] mt-2">Reference: {result.referenceId}</p>
        </div>
      )}
    </div>
  );
}
