import type { DemoSimulationRequest, DemoSimulationResponse } from "@/types/ai";

const scenarioLibrary: Record<DemoSimulationRequest["scenario"], DemoSimulationResponse> = {
  "cpu-spike": {
    scenario: "CPU Spike in web cluster",
    summary: "AI detected abnormal CPU increase and isolated a runaway background worker.",
    rootCause: "A stale cron task triggered repeated compute-heavy jobs without backoff.",
    resolvedInMinutes: 11,
    timeline: [
      { at: "00:00", action: "Alert raised from anomaly detection." },
      { at: "00:02", action: "AI correlated host metrics and process list." },
      { at: "00:05", action: "Runaway process quarantined and restarted safely." },
      { at: "00:11", action: "Traffic and latency normalized across all nodes." },
    ],
    preventedBy: [
      "Cron guardrail to block overlapping executions",
      "Process-level auto-throttle policy",
      "SLO-aware alert tuning for early detection",
    ],
  },
  "db-latency": {
    scenario: "Database latency regression",
    summary: "AI identified slow query patterns and stabilized application latency.",
    rootCause: "Missing index after schema update caused full table scans on hot path queries.",
    resolvedInMinutes: 18,
    timeline: [
      { at: "00:00", action: "P95 latency breach detected in API layer." },
      { at: "00:04", action: "Trace correlation linked latency to SQL query family." },
      { at: "00:09", action: "Index recommendation validated in staging shadow run." },
      { at: "00:18", action: "Index applied and cache warmed; latency restored." },
    ],
    preventedBy: [
      "Migration checklist with index assertions",
      "Canary query performance gate in CI",
      "Automated query-plan drift monitoring",
    ],
  },
  "disk-pressure": {
    scenario: "Disk pressure on logging volume",
    summary: "AI prevented service disruption by remediating aggressive log growth.",
    rootCause: "Log shipping retries accumulated local files during upstream endpoint throttling.",
    resolvedInMinutes: 14,
    timeline: [
      { at: "00:00", action: "Disk usage crossed critical threshold alarm." },
      { at: "00:03", action: "AI validated logger and shipper health checks." },
      { at: "00:07", action: "Temporary rotation + compression policy enforced." },
      { at: "00:14", action: "Backlog flushed and normal retention restored." },
    ],
    preventedBy: [
      "Log shipper retry budget and dead-letter queue",
      "Volume safety threshold auto-remediation",
      "Storage pressure dashboards with weekly audits",
    ],
  },
};

export function runDemoSimulation(payload: DemoSimulationRequest): DemoSimulationResponse {
  const scenario = scenarioLibrary[payload.scenario];
  const environmentNote =
    payload.environment === "production"
      ? "Simulation mirrors production guardrails and approval constraints."
      : "Simulation uses staging-safe assumptions for faster experimentation.";

  return {
    ...scenario,
    summary: `${scenario.summary} ${environmentNote}`,
  };
}
