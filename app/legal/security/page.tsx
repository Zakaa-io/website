export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Security</h1>
        <p className="text-sm text-[#CBD5E1]">
          Security is embedded across infrastructure, deployment, and operational support.
          Zakaa applies least-privilege access, secure configuration baselines, and proactive
          monitoring.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
          <li>Role-based access control for systems and support tooling.</li>
          <li>Security patching and baseline hardening for managed environments.</li>
          <li>Logging, monitoring, and alerting for suspicious events.</li>
          <li>Incident-response workflow with escalation paths.</li>
        </ul>
      </div>
    </main>
  );
}
