import type { IncidentSeverity, PortalAgentRequest, PortalAgentResponse } from "@/types/ai";

function resolveSeverity(input: string): IncidentSeverity {
  const text = input.toLowerCase();
  if (["outage", "down", "critical", "breach"].some((token) => text.includes(token))) return "critical";
  if (["latency", "error rate", "failed", "degraded"].some((token) => text.includes(token))) return "high";
  if (["slow", "warning", "retry"].some((token) => text.includes(token))) return "medium";
  return "low";
}

function buildActions(severity: IncidentSeverity, service: string): string[] {
  if (severity === "critical") {
    return [
      `Isolate impacted ${service} nodes and enable failover immediately.`,
      "Activate incident bridge and assign incident commander.",
      "Capture timeline checkpoints every 10 minutes for stakeholder updates.",
    ];
  }

  if (severity === "high") {
    return [
      `Run diagnostics bundle for ${service} and validate dependencies.`,
      "Apply rollback or mitigation if error budget burn exceeds threshold.",
      "Open a focused post-incident action list with owners and deadlines.",
    ];
  }

  if (severity === "medium") {
    return [
      `Inspect telemetry anomalies for ${service} during the affected window.`,
      "Tune alerts to reduce noise and improve signal quality.",
      "Schedule hardening tasks in the upcoming sprint.",
    ];
  }

  return [
    `Track the ${service} issue in backlog with expected impact.`,
    "Validate that no customer-facing SLA is currently at risk.",
    "Review incident pattern weekly for proactive prevention opportunities.",
  ];
}

export function runPortalTriage(payload: PortalAgentRequest): PortalAgentResponse {
  const severity = resolveSeverity(`${payload.ticketTitle} ${payload.ticketDescription}`);
  return {
    severity,
    triageSummary: `Ticket classified as ${severity.toUpperCase()} for ${payload.affectedService}. Initial diagnostics indicate targeted mitigation can begin immediately while deeper root-cause analysis proceeds.`,
    immediateActions: buildActions(severity, payload.affectedService),
    escalationPath:
      severity === "critical"
        ? "Escalate to 24/7 NOC + Security lead + Customer success manager."
        : "Escalate to assigned platform squad with security review if risk expands.",
  };
}
