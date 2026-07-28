import type { AnalyticsEventName } from "@/lib/analytics/events";
import { recordMetricsEvent } from "@/lib/analytics/metrics";
import { persistAuditEvent } from "@/lib/persistence/store";

interface AnalyticsServerInput {
  name: AnalyticsEventName;
  route: string;
  details?: Record<string, unknown>;
}

export function trackServerEvent({ name, route, details }: AnalyticsServerInput) {
  const entry = {
    name,
    route,
    details: details ?? {},
    timestamp: new Date().toISOString(),
  };
  recordMetricsEvent(name, route);
  console.info("[analytics]", JSON.stringify(entry));
  void persistAuditEvent(entry).catch((error) => {
    const message = error instanceof Error ? error.message : "Unknown audit persistence error";
    console.error(`[analytics] audit persistence failed: ${message}`);
  });
}
