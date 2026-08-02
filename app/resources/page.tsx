import LeadForm from "../components/LeadForm";
import MarketingPageShell from "../components/MarketingPageShell";

const resources = [
  {
    type: "Whitepaper",
    title: "Cloud Modernization Blueprint for Regulated Industries",
    format: "PDF",
  },
  {
    type: "Guide",
    title: "Managed SOC Rollout Checklist (90-Day Plan)",
    format: "PDF",
  },
  {
    type: "Brief",
    title: "AI Ops Copilot for Incident Reduction",
    format: "PDF",
  },
];

export default function ResourcesPage() {
  return (
    <MarketingPageShell
      label="Knowledge Hub"
      title="Resources"
      subtitle="Guides, whitepapers, and technical briefs for cloud, cybersecurity, and AI operations leaders."
    >
      <section className="grid gap-5 md:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={resource.title}
            className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[#3B82F6]">{resource.type}</p>
            <h2 className="mt-3 text-lg font-semibold">{resource.title}</h2>
            <p className="mt-2 text-sm text-[#94A3B8]">Format: {resource.format}</p>
            <button
              type="button"
              className="mt-4 rounded-[10px] bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2563EB]"
            >
              Request Download
            </button>
          </article>
        ))}
      </section>
      <section className="max-w-3xl">
        <LeadForm source="unknown" compact />
      </section>
    </MarketingPageShell>
  );
}
