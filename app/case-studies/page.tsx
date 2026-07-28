import MarketingPageShell from "../components/MarketingPageShell";

const caseStudies = [
  {
    industry: "FinTech",
    challenge: "Rising cloud spend and unstable release cycles.",
    solution: "Implemented FinOps controls, CI/CD hardening, and proactive observability.",
    outcomes: ["42% infrastructure cost reduction", "99.99% uptime SLA", "58% fewer deployment incidents"],
  },
  {
    industry: "Healthcare",
    challenge: "Legacy VM workloads and audit preparation pressure.",
    solution: "Kubernetes migration with zero-downtime strategy and compliance-aligned logging.",
    outcomes: ["200+ workloads modernized", "0 downtime cutover", "SOC audit evidence automated"],
  },
  {
    industry: "Public Sector",
    challenge: "High-volume citizen workload spikes with manual incident response.",
    solution: "AI-assisted operations workflows with automated triage and runbook execution.",
    outcomes: ["80% lower MTTR", "24/7 operational coverage", "Faster citizen service recovery"],
  },
];

export default function CaseStudiesPage() {
  return (
    <MarketingPageShell
      label="Proof of Impact"
      title="Case Studies"
      subtitle="Real outcomes from cloud modernization, managed security, and AI-enabled operations."
    >
      <section className="grid gap-5 md:grid-cols-3">
        {caseStudies.map((item) => (
          <article
            key={item.industry}
            className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[#3B82F6]">{item.industry}</p>
            <h2 className="mt-3 text-lg font-semibold">Challenge</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">{item.challenge}</p>
            <h3 className="mt-4 text-sm font-semibold">Zakaa Solution</h3>
            <p className="mt-1 text-sm text-[#94A3B8]">{item.solution}</p>
            <h3 className="mt-4 text-sm font-semibold">Measured Outcomes</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#94A3B8]">
              {item.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </MarketingPageShell>
  );
}
