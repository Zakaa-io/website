import MarketingPageShell from "../components/MarketingPageShell";

const services = [
  { name: "API Platform", status: "Operational", uptime: "99.99%" },
  { name: "Portal Services", status: "Operational", uptime: "99.95%" },
  { name: "AI Assistance Endpoints", status: "Operational", uptime: "99.93%" },
  { name: "Monitoring & Alerting", status: "Operational", uptime: "99.99%" },
];

const incidents = [
  { date: "2026-07-10", detail: "Short-lived latency increase on analytics endpoints. Resolved in 14 minutes." },
  { date: "2026-06-22", detail: "Planned maintenance completed with no service interruption." },
];

export default function StatusPage() {
  return (
    <MarketingPageShell
      label="Operations"
      title="Service Status & SLA"
      subtitle="Transparent visibility into service health, uptime targets, and incident communication."
    >
      <section className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.name}
            className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base font-semibold">{service.name}</h2>
              <span className="rounded-full bg-[rgba(16,185,129,0.15)] px-3 py-1 text-xs font-semibold text-[#10B981]">
                {service.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-[#94A3B8]">30-day uptime target: {service.uptime}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
        <h2 className="text-xl font-semibold">Recent Incident Log</h2>
        <ul className="mt-4 space-y-3 text-sm text-[#94A3B8]">
          {incidents.map((incident) => (
            <li key={incident.date} className="rounded-lg bg-[#0F172A] p-3">
              <p className="font-semibold text-[#CBD5E1]">{incident.date}</p>
              <p className="mt-1">{incident.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </MarketingPageShell>
  );
}
