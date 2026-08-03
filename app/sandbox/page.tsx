import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import LeadForm from "../components/LeadForm";
import MarketingPageShell from "../components/MarketingPageShell";


export const metadata: Metadata = generateMetadata({ label: "Sandbox", title: "Request a Guided Sandbox", description: "Fast-track your proof-of-value with a scoped demo environment and implementation guidance." });
const sandboxSteps = [
  "Tell us your target use case (operations, security, migration, or AI automation).",
  "Select preferred environment (cloud, hybrid, or on-prem).",
  "Receive a guided demo plan and recommended integration path.",
];

export default function SandboxPage() {
  return (
    <MarketingPageShell
      label="Sandbox"
      title="Request a Guided Sandbox"
      subtitle="Fast-track your proof-of-value with a scoped demo environment and implementation guidance."
    >
      <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[#94A3B8]">
          {sandboxSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="max-w-3xl">
        <LeadForm source="unknown" compact />
      </section>
    </MarketingPageShell>
  );
}
