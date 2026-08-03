import MarketingPageShell from "../components/MarketingPageShell";

const caseStudies = [
  {
    industry: "FinTech",
    client: "FinTechScale",
    challenge: "Rising cloud spend and unstable release cycles — monthly cloud costs were growing 15% quarter-over-quarter with frequent deployment failures disrupting customer transactions.",
    solution: "Implemented FinOps cost controls, CI/CD pipeline hardening with policy gates, and proactive observability with anomaly detection.",
    metrics: [
      "42% infrastructure cost reduction within 3 months",
      "99.99% uptime SLA achieved and maintained for 6+ months",
      "58% fewer deployment incidents after CI/CD hardening",
      "Mean time to recovery reduced from 2.5 hours to 18 minutes",
    ],
    quote: "Zakaa's AI agents cut our cloud spend immediately and caught incidents we never would have detected ourselves. The CI/CD improvements let us release confidently.",
    role: "CTO, FinTechScale",
  },
  {
    industry: "Healthcare",
    client: "HealthCloud Inc",
    challenge: "Legacy VM workloads and audit preparation pressure — 200+ virtual machines running outdated infrastructure with an upcoming SOC 2 audit.",
    solution: "Migrated 200+ VMs to Kubernetes with zero-downtime blue-green deployment strategy, compliance-aligned logging, and audit evidence automation.",
    metrics: [
      "200+ workloads modernized to Kubernetes",
      "Zero downtime during full migration cutover",
      "SOC 2 audit passed on first attempt with automated evidence",
      "95% reduction in manual patching overhead",
    ],
    quote: "The zero-downtime migration was flawless. Zakaa's team automated our SOC 2 compliance evidence — what used to take weeks now takes minutes.",
    role: "VP Engineering, HealthCloud Inc",
  },
  {
    industry: "Public Sector",
    client: "GovServe Authority",
    challenge: "High-volume citizen service portals with manual incident response — citizen-facing applications experienced degraded performance during peak usage periods with 4-hour average resolution times.",
    solution: "Deployed AI-assisted operations workflows with automated triage, intelligent runbook execution, and 24/7 monitoring coverage.",
    metrics: [
      "80% lower MTTR (from 4 hours to 48 minutes)",
      "24/7 operational coverage with zero missed incidents",
      "99.95% uptime during peak filing season",
      "60% reduction in after-hours pager alerts for ops team",
    ],
    quote: "The AI triage system identifies issues before our team does. Citizen service reliability has improved dramatically, and our staff can focus on strategic work instead of firefighting.",
    role: "Director of IT, GovServe Authority",
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
            <h2 className="mt-3 text-lg font-semibold">{item.industry} — {item.client}</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">Challenge</p>
            <p className="mt-1 text-sm text-[#CBD5E1]">{item.challenge}</p>
            <h3 className="mt-4 text-sm font-semibold">Zakaa Solution</h3>
            <p className="mt-1 text-sm text-[#94A3B8]">{item.solution}</p>
            <h3 className="mt-4 text-sm font-semibold">Measured Outcomes</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#94A3B8]">
              {item.metrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
            {item.quote && (
              <blockquote className="mt-4 border-l-2 border-[#3B82F6] pl-3 text-sm italic text-[#94A3B8]">
                "{item.quote}"
                <br />
                <span className="text-xs text-[#6366f1] not-italic">— {item.role}</span>
              </blockquote>
            )}
          </article>
        ))}
      </section>
    </MarketingPageShell>
  );
}
