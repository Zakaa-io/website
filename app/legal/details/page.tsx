export default function LegalDetailsPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-8">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-[#3B82F6]">Legal</p>
          <h1 className="mt-2 text-3xl font-bold">Legal Details</h1>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Baseline legal references governing Zakaa services and client engagements.
          </p>
        </header>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">Contract & Policy Structure</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
            <li>Master Service Agreement (MSA)</li>
            <li>Statement of Work (SoW) per project/service package</li>
            <li>Service Level Agreement (SLA) per support tier</li>
            <li>Data handling and privacy obligations</li>
            <li>Security and incident response commitments</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">Legal Contact</h2>
          <p className="mt-4 text-sm text-[#CBD5E1]">
            For legal requests, privacy inquiries, or contract clarifications, contact{" "}
            <a className="text-[#60A5FA] hover:underline" href="mailto:hello@zakaa.io">
              hello@zakaa.io
            </a>{" "}
            and include your company name and contract reference.
          </p>
        </section>
      </div>
    </main>
  );
}
