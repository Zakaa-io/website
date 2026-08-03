import MarketingPageShell from "../components/MarketingPageShell";

const docsSections = [
  {
    title: "AI Assistant",
    endpoint: "POST /api/chat",
    description: "Pre-sales AI assistant for answering questions about services, pricing, and infrastructure assessment.",
    parameters: [
      { name: "messages", type: "array", required: true, description: 'Chat message history (role + content)' },
      { name: "language", type: "string", required: false, description: 'Language code (en or ar). Defaults to en.' },
    ],
    example: { messages: [{ role: "user", content: "What services do you offer?" }], language: "en" },
    response: "{ reply: string, provider: string, suggestedNextStep?: string }",
  },
  {
    title: "Readiness Assessment",
    endpoint: "POST /api/assessment",
    description: "Multi-step assessment returning readiness score, risk level, and mapped service recommendations.",
    parameters: [
      { name: "companyName", type: "string", required: true, description: "Company name" },
      { name: "employeeRange", type: "string", required: true, description: "1-20, 21-100, 101-500, 500+" },
      { name: "primaryCloud", type: "string", required: true, description: "aws, azure, gcp, multi-cloud, on-prem" },
      { name: "monthlyBudget", type: "string", required: false, description: "Approximate monthly budget" },
      { name: "priorities", type: "string[]", required: true, description: "Selected priority areas" },
      { name: "timeline", type: "string", required: true, description: "immediate, 30-days, 90-days, strategic" },
      { name: "language", type: "string", required: true, description: "en or ar" },
    ],
    example: { companyName: "Acme Corp", employeeRange: "101-500", primaryCloud: "aws", priorities: ["security"], timeline: "30-days", language: "en" },
    response: "{ readinessScore: number, riskLevel: string, recommendations: [...], nextActions: string[] }",
  },
  {
    title: "Lead Capture",
    endpoint: "POST /api/lead",
    description: "Capture and qualify leads from contact forms, chat, or assessment flows.",
    parameters: [
      { name: "name", type: "string", required: true, description: "Full name" },
      { name: "email", type: "string", required: true, description: "Work email" },
      { name: "company", type: "string", required: false, description: "Company name" },
      { name: "message", type: "string", required: true, description: "Infrastructure goals or pain points" },
      { name: "source", type: "string", required: true, description: "cta, chat, assessment, or unknown" },
    ],
    example: { name: "Jane Doe", email: "jane@company.com", company: "Company Inc", message: "Need cloud migration help", source: "cta" },
    response: "{ score: number, tier: string, nextStep: string, referenceId: string }",
  },
];

const authSection = {
  title: "Authentication",
  intro: "Authentication varies by endpoint:",
  items: [
    "Public endpoints: /api/chat, /api/lead, /api/assessment, /api/csrf — no auth required.",
    "Optional bearer auth: /api/demo-simulator, /api/portal-agent, /api/analytics — requires bearer token when configured.",
    "Session auth: /api/ops/metrics, /api/ops/alerts — requires authenticated session cookie with appropriate role.",
    "Roles: viewer (metrics only), operator (metrics + alerts), admin (full access).",
  ],
};

const opsSection = {
  title: "Operational APIs",
  items: [
    { endpoint: "POST /api/ops/metrics", params: '{ "windowMinutes": 15 }', role: "viewer", desc: "Returns aggregated event counts, failure rate, and chat-to-lead conversion." },
    { endpoint: "POST /api/ops/alerts", params: '{ "windowMinutes": 15 }', role: "operator", desc: "Evaluates alert thresholds and returns active warnings and critical signals." },
    { endpoint: "POST /api/analytics", params: '{ "name": "event_name", "details": {...} }', role: "optional", desc: "Ingests analytics events for observability tracking." },
  ],
};

export default function DocsPage() {
  return (
    <MarketingPageShell
      label="Documentation"
      title="Technical Docs (v1)"
      subtitle="Quick-start reference for Zakaa APIs, auth behavior, and operational integration patterns."
    >
      <section className="grid gap-5 md:grid-cols-1 lg:grid-cols-3">
        {docsSections.map((section) => (
          <article
            key={section.title}
            className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[#3B82F6]">{section.endpoint}</p>
            <h2 className="mt-3 text-lg font-semibold">{section.title}</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">{section.description}</p>
            <h3 className="mt-3 text-xs font-semibold text-[#a1a1aa]">Parameters</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-[#94A3B8]">
              {section.parameters.map((param) => (
                <li key={param.name}>
                  <code className="text-[#DBEAFE]">{param.name}</code> ({param.type}) — {param.required ? "required" : "optional"}: {param.description}
                </li>
              ))}
            </ul>
            {section.example && (
              <>
                <h3 className="mt-3 text-xs font-semibold text-[#a1a1aa]">Example Request</h3>
                <pre className="mt-1 overflow-x-auto rounded-lg bg-[#0F172A] p-3 text-xs text-[#DBEAFE]">
                  {JSON.stringify(section.example, null, 2)}
                </pre>
              </>
            )}
            <h3 className="mt-3 text-xs font-semibold text-[#a1a1aa]">Response</h3>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-[#0F172A] p-3 text-xs text-[#94A3B8]">
              {section.response}
            </pre>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
        <h2 className="text-xl font-semibold">{authSection.title}</h2>
        <p className="mt-3 text-sm text-[#94A3B8]">{authSection.intro}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
          {authSection.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">{opsSection.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {opsSection.items.map((item) => (
            <article
              key={item.endpoint}
              className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-5"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[#3B82F6]">{item.endpoint}</p>
              <p className="mt-2 text-sm text-[#94A3B8]">{item.desc}</p>
              <p className="mt-2 text-xs text-[#60A5FA]">Role: {item.role}</p>
              <pre className="mt-1 rounded bg-[#0F172A] p-2 text-xs text-[#94A3B8]">
                {item.params}
              </pre>
            </article>
          ))}
        </div>
      </section>
    </MarketingPageShell>
  );
}
