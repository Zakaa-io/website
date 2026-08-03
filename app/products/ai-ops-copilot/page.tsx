import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import MarketingPageShell from "../../components/MarketingPageShell";


export const metadata: Metadata = generateMetadata({ label: "Product", title: "AI Ops Copilot", description: "A production-ready operations layer that combines AI triage with engineered workflows for resilient service delivery." });
const featureMatrix = [
  { feature: "Incident Detection", capability: "Real-time signal correlation with alert deduplication" },
  { feature: "AI Triage", capability: "Priority classification, root-cause hints, and action recommendations" },
  { feature: "Runbook Automation", capability: "Guided execution with human approval checkpoints" },
  { feature: "Auditability", capability: "Complete action timeline with operator and system events" },
];

export default function AiOpsCopilotPage() {
  return (
    <MarketingPageShell
      label="Product"
      title="AI Ops Copilot"
      subtitle="A production-ready operations layer that combines AI triage with engineered workflows for resilient service delivery."
    >
      <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
        <h2 className="text-xl font-semibold">Architecture Overview</h2>
        <p className="mt-3 text-sm text-[#94A3B8]">
          Signals from infrastructure, application telemetry, and ticketing systems are normalized into a triage
          engine. AI-generated guidance is combined with policy-checked runbooks and escalated through
          role-based response workflows.
        </p>
      </section>

      <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
        <h2 className="text-xl font-semibold">Feature Matrix</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(148,163,184,0.12)] text-[#CBD5E1]">
                <th className="px-2 py-2 font-semibold">Capability</th>
                <th className="px-2 py-2 font-semibold">What You Get</th>
              </tr>
            </thead>
            <tbody className="text-[#94A3B8]">
              {featureMatrix.map((item) => (
                <tr key={item.feature} className="border-b border-[rgba(148,163,184,0.08)]">
                  <td className="px-2 py-3 font-medium text-[#E2E8F0]">{item.feature}</td>
                  <td className="px-2 py-3">{item.capability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MarketingPageShell>
  );
}
