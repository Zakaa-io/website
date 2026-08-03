import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import MarketingPageShell from "../components/MarketingPageShell";


export const metadata: Metadata = generateMetadata({ label: "Trust Center", title: "Security, Compliance, and Operational Transparency", description: "Built into every Zakaa delivery model from architecture and deployment to ongoing operations." });
const trustBlocks = [
  {
    title: "Security by Design",
    items: [
      "Zero-trust access patterns and least-privilege permissions",
      "Continuous vulnerability monitoring and hardening baselines",
      "Encrypted transport and secure secret management controls",
    ],
  },
  {
    title: "Compliance Alignment",
    items: [
      "Control mapping for SOC/ISO-style governance requirements",
      "Audit-friendly evidence collection and reporting workflows",
      "Policy-aligned delivery for regulated sectors",
    ],
  },
  {
    title: "Data Handling & Isolation",
    items: [
      "Tenant-scoped access for portal and API data flows",
      "Retention and deletion handling aligned with contract obligations",
      "Explicit access boundaries for billing, documents, and operations data",
    ],
  },
  {
    title: "Incident Readiness",
    items: [
      "Operational runbooks and severity-based escalation paths",
      "Root-cause and post-incident reporting standards",
      "Recovery objectives tracked with uptime and response SLAs",
    ],
  },
];

export default function TrustPage() {
  return (
    <MarketingPageShell
      label="Trust Center"
      title="Security, Compliance, and Operational Transparency"
      subtitle="Built into every Zakaa delivery model from architecture and deployment to ongoing operations."
    >
      <section className="grid gap-5 md:grid-cols-2">
        {trustBlocks.map((block) => (
          <article
            key={block.title}
            className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6"
          >
            <h2 className="text-xl font-semibold">{block.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#94A3B8]">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </MarketingPageShell>
  );
}
