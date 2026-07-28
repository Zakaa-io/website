export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-[#CBD5E1]">
          Zakaa processes client and visitor data strictly for service delivery, support, security,
          and contractual obligations. We collect only the minimum information required to operate
          our services and support channels.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
          <li>Data is used for account management, communication, and security monitoring.</li>
          <li>Access to client data is role-based and restricted to authorized personnel.</li>
          <li>Data retention is aligned with contractual and legal obligations.</li>
          <li>Clients can request data clarification through hello@zakaa.io.</li>
        </ul>
      </div>
    </main>
  );
}
