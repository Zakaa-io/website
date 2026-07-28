export default function CompanyDetailsPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-8">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-[#3B82F6]">Company</p>
          <h1 className="mt-2 text-3xl font-bold">Company Details</h1>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Official information about Zakaa for clients, procurement teams, and compliance checks.
          </p>
        </header>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">Registered Information</h2>
          <div className="mt-4 space-y-2 text-sm text-[#CBD5E1]">
            <p>
              <span className="text-[#94A3B8]">Legal Name:</span> Zakaa Technology Solutions
            </p>
            <p>
              <span className="text-[#94A3B8]">Headquarters:</span> 5th Settlement, Cairo, Egypt
            </p>
            <p>
              <span className="text-[#94A3B8]">Primary Contact:</span> hello@zakaa.io
            </p>
            <p>
              <span className="text-[#94A3B8]">Phone:</span> +20 1000 292 919 / +20 1234 522 055
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">What We Do</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
            <li>Cloud infrastructure architecture, deployment, and operations</li>
            <li>DevOps automation and CI/CD modernization</li>
            <li>Managed hosting and operational support</li>
            <li>Security hardening and observability implementation</li>
            <li>AI-assisted operational workflows and support tooling</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
