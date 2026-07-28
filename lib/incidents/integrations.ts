export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export interface IncidentNotificationInput {
  dedupeKey: string;
  title: string;
  summary: string;
  severity: IncidentSeverity;
  source: string;
  details?: Record<string, unknown>;
}

interface NotificationDispatchResult {
  status: "sent" | "failed";
  integration: "slack" | "webhook" | "pagerduty" | "email";
  message?: string;
}

const lastIncidentDispatch = new Map<string, number>();

function buildHeaders(token?: string): HeadersInit {
  if (!token) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function sendSlack(input: IncidentNotificationInput): Promise<void> {
  const webhookUrl = process.env.INCIDENT_SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `[${input.severity.toUpperCase()}] ${input.title}\n${input.summary}\nSource: ${input.source}`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Slack webhook failed: ${response.status} ${body}`);
  }
}

async function sendWebhook(input: IncidentNotificationInput): Promise<void> {
  const webhookUrl = process.env.INCIDENT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: buildHeaders(process.env.INCIDENT_WEBHOOK_TOKEN),
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Generic webhook failed: ${response.status} ${body}`);
  }
}

async function sendPagerDuty(input: IncidentNotificationInput): Promise<void> {
  const routingKey = process.env.PAGERDUTY_ROUTING_KEY;
  if (!routingKey) return;

  const eventUrl = process.env.PAGERDUTY_EVENT_URL ?? "https://events.pagerduty.com/v2/enqueue";
  const severityMap: Record<IncidentSeverity, "info" | "warning" | "error" | "critical"> = {
    low: "info",
    medium: "warning",
    high: "error",
    critical: "critical",
  };

  const response = await fetch(eventUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      routing_key: routingKey,
      event_action: "trigger",
      payload: {
        summary: `${input.title}: ${input.summary}`,
        source: input.source,
        severity: severityMap[input.severity],
        custom_details: input.details ?? {},
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`PagerDuty enqueue failed: ${response.status} ${body}`);
  }
}

async function sendEmailWebhook(input: IncidentNotificationInput): Promise<void> {
  const endpoint = process.env.INCIDENT_EMAIL_WEBHOOK_URL;
  if (!endpoint) return;

  const to = process.env.INCIDENT_EMAIL_TO;
  if (!to) {
    throw new Error("INCIDENT_EMAIL_WEBHOOK_URL is set but INCIDENT_EMAIL_TO is missing.");
  }

  const from = process.env.INCIDENT_EMAIL_FROM ?? "zakaa-alerts@local";
  const subject = `[${input.severity.toUpperCase()}] ${input.title}`;
  const text = `${input.summary}\n\nSource: ${input.source}\nDetails: ${JSON.stringify(input.details ?? {}, null, 2)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders(process.env.INCIDENT_EMAIL_WEBHOOK_TOKEN),
    body: JSON.stringify({ to, from, subject, text, incident: input }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Email webhook failed: ${response.status} ${body}`);
  }
}

export async function dispatchIncidentNotifications(
  input: IncidentNotificationInput
): Promise<{ dispatched: NotificationDispatchResult[]; skippedByCooldown: boolean }> {
  const cooldownMs = Number(process.env.INCIDENT_NOTIFICATION_COOLDOWN_MS ?? "600000");
  const nowMs = Date.now();
  const lastSent = lastIncidentDispatch.get(input.dedupeKey);
  if (lastSent && nowMs - lastSent < cooldownMs) {
    return { dispatched: [], skippedByCooldown: true };
  }

  const attempts: Array<{
    name: NotificationDispatchResult["integration"];
    enabled: boolean;
    run: () => Promise<void>;
  }> = [
    { name: "slack", enabled: Boolean(process.env.INCIDENT_SLACK_WEBHOOK_URL), run: () => sendSlack(input) },
    { name: "webhook", enabled: Boolean(process.env.INCIDENT_WEBHOOK_URL), run: () => sendWebhook(input) },
    { name: "pagerduty", enabled: Boolean(process.env.PAGERDUTY_ROUTING_KEY), run: () => sendPagerDuty(input) },
    {
      name: "email",
      enabled: Boolean(process.env.INCIDENT_EMAIL_WEBHOOK_URL),
      run: () => sendEmailWebhook(input),
    },
  ];

  const dispatched: NotificationDispatchResult[] = [];
  for (const attempt of attempts) {
    if (!attempt.enabled) continue;
    try {
      await attempt.run();
      dispatched.push({ status: "sent", integration: attempt.name });
    } catch (error) {
      dispatched.push({
        status: "failed",
        integration: attempt.name,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  if (dispatched.some((item) => item.status === "sent")) {
    lastIncidentDispatch.set(input.dedupeKey, nowMs);
  }

  return { dispatched, skippedByCooldown: false };
}
