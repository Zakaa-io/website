import MarketingPageShell from "../components/MarketingPageShell";

const docsSections = [
  {
    title: "API Overview",
    bullets: [
      "POST /api/chat for AI assistant interactions",
      "POST /api/assessment for readiness scoring and recommendations",
      "POST /api/lead for consultation and solution requests",
    ],
  },
  {
    title: "Authentication",
    bullets: [
      "Session-based auth for protected operational endpoints",
      "Optional bearer token support for selected AI routes",
      "Role-aware access patterns for viewer/operator/admin/client roles",
    ],
  },
  {
    title: "Operational APIs",
    bullets: [
      "POST /api/ops/metrics for platform metrics windows",
      "POST /api/ops/alerts for threshold-based alert evaluation",
      "POST /api/analytics for event ingestion and observability",
    ],
  },
];

export default function DocsPage() {
  return (
    <MarketingPageShell
      label="Documentation"
      title="Technical Docs (v1)"
      subtitle="Quick-start reference for Zakaa APIs, auth behavior, and operational integration patterns."
    >
      <section className="grid gap-5 md:grid-cols-3">
        {docsSections.map((section) => (
          <article
            key={section.title}
            className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6"
          >
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#94A3B8]">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </MarketingPageShell>
  );
}
