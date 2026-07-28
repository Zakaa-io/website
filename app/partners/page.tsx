import MarketingPageShell from "../components/MarketingPageShell";

const partnerGroups = [
  {
    group: "Cloud Platforms",
    partners: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform (GCP)"],
  },
  {
    group: "Security Ecosystem",
    partners: ["SIEM & Threat Monitoring", "Identity & Access Management", "Endpoint Protection"],
  },
  {
    group: "Data & AI Tooling",
    partners: ["Data Platforms", "AIOps and Automation", "Model Operations and Governance"],
  },
];

export default function PartnersPage() {
  return (
    <MarketingPageShell
      label="Ecosystem"
      title="Technology & Delivery Partners"
      subtitle="Zakaa combines engineering expertise with leading cloud, security, and data platforms to deliver reliable outcomes."
    >
      <section className="grid gap-5 md:grid-cols-3">
        {partnerGroups.map((group) => (
          <article
            key={group.group}
            className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6"
          >
            <h2 className="text-lg font-semibold">{group.group}</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#94A3B8]">
              {group.partners.map((partner) => (
                <li key={partner} className="rounded-md bg-[#0F172A] px-3 py-2">
                  {partner}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </MarketingPageShell>
  );
}
