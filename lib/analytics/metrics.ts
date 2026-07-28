import type { AnalyticsEventName } from "@/lib/analytics/events";

interface MetricsEntry {
  name: AnalyticsEventName;
  route: string;
  timestampMs: number;
}

interface MetricsSnapshot {
  generatedAt: string;
  windowMinutes: number;
  totals: {
    events: number;
    failures: number;
    leadSubmissions: number;
    assessments: number;
    chatResponses: number;
  };
  failureRate: number;
  conversion: {
    chatToLeadRate: number;
  };
  routeCounts: Record<string, number>;
}

interface AlertItem {
  level: "warning" | "critical";
  code: string;
  message: string;
}

const eventWindow: MetricsEntry[] = [];
const retentionMs = 60 * 60 * 1000;

function isFailureEvent(name: AnalyticsEventName): boolean {
  return name.endsWith("_failed");
}

function trimWindow(nowMs: number) {
  const minTime = nowMs - retentionMs;
  while (eventWindow.length > 0 && eventWindow[0].timestampMs < minTime) {
    eventWindow.shift();
  }
}

export function recordMetricsEvent(name: AnalyticsEventName, route: string) {
  const nowMs = Date.now();
  trimWindow(nowMs);
  eventWindow.push({ name, route, timestampMs: nowMs });
}

export function getMetricsSnapshot(windowMinutes = 15): MetricsSnapshot {
  const nowMs = Date.now();
  trimWindow(nowMs);
  const minTime = nowMs - windowMinutes * 60 * 1000;
  const windowEvents = eventWindow.filter((item) => item.timestampMs >= minTime);

  const routeCounts: Record<string, number> = {};
  let failures = 0;
  let leadSubmissions = 0;
  let assessments = 0;
  let chatResponses = 0;
  let chatOpens = 0;

  for (const entry of windowEvents) {
    routeCounts[entry.route] = (routeCounts[entry.route] ?? 0) + 1;

    if (isFailureEvent(entry.name)) failures += 1;
    if (entry.name === "lead_submitted") leadSubmissions += 1;
    if (entry.name === "assessment_generated") assessments += 1;
    if (entry.name === "chat_response_received") chatResponses += 1;
    if (entry.name === "chat_opened") chatOpens += 1;
  }

  const totalEvents = windowEvents.length;
  const failureRate = totalEvents === 0 ? 0 : failures / totalEvents;
  const chatToLeadRate = chatOpens === 0 ? 0 : leadSubmissions / chatOpens;

  return {
    generatedAt: new Date(nowMs).toISOString(),
    windowMinutes,
    totals: {
      events: totalEvents,
      failures,
      leadSubmissions,
      assessments,
      chatResponses,
    },
    failureRate,
    conversion: {
      chatToLeadRate,
    },
    routeCounts,
  };
}

export function evaluateAlerts(snapshot: MetricsSnapshot): AlertItem[] {
  const alerts: AlertItem[] = [];

  const warningFailureRate = Number(process.env.ALERT_WARNING_FAILURE_RATE ?? "0.12");
  const criticalFailureRate = Number(process.env.ALERT_CRITICAL_FAILURE_RATE ?? "0.25");
  const minEventsForAlert = Number(process.env.ALERT_MIN_EVENTS ?? "25");

  if (snapshot.totals.events >= minEventsForAlert && snapshot.failureRate >= criticalFailureRate) {
    alerts.push({
      level: "critical",
      code: "failure-rate-critical",
      message: `Failure rate ${Math.round(snapshot.failureRate * 100)}% exceeded critical threshold.`,
    });
  } else if (snapshot.totals.events >= minEventsForAlert && snapshot.failureRate >= warningFailureRate) {
    alerts.push({
      level: "warning",
      code: "failure-rate-warning",
      message: `Failure rate ${Math.round(snapshot.failureRate * 100)}% exceeded warning threshold.`,
    });
  }

  const minLeadRate = Number(process.env.ALERT_MIN_CHAT_TO_LEAD_RATE ?? "0.02");
  if (snapshot.totals.chatResponses >= 20 && snapshot.conversion.chatToLeadRate < minLeadRate) {
    alerts.push({
      level: "warning",
      code: "conversion-drop",
      message: `Chat-to-lead conversion is ${Math.round(snapshot.conversion.chatToLeadRate * 100)}%, below target.`,
    });
  }

  return alerts;
}
