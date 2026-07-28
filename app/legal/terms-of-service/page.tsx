export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-sm text-[#CBD5E1]">
          Zakaa services are provided under agreed commercial terms, project scope, and support
          coverage. Service use constitutes acceptance of applicable contracts and operating
          policies.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
          <li>Services are delivered according to approved scope and technical assumptions.</li>
          <li>Clients are responsible for timely access, approvals, and required information.</li>
          <li>Security incidents must be reported through official support channels.</li>
          <li>Any custom legal terms are handled through signed agreements.</li>
        </ul>
      </div>
    </main>
  );
}
