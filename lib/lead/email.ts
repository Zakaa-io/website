import type { LeadRequest, LeadResponse } from "@/types/ai";

export interface LeadEmailPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
  tier: string;
  score: number;
  referenceId: string;
}

export async function sendLeadNotificationEmail(
  payload: LeadEmailPayload
): Promise<void> {
  const endpoint = process.env.LEAD_EMAIL_WEBHOOK_URL;
  if (!endpoint) return;

  const to = process.env.LEAD_EMAIL_TO ?? "hello@zakaa.io";
  const from = process.env.LEAD_EMAIL_FROM ?? "onboarding@resend.dev";
  const subject =
    payload.company && payload.company.trim().length > 0
      ? payload.company.trim()
      : payload.name.trim();

  const text = [
    "New infrastructure assessment request",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : undefined,
    `Source: ${payload.source ?? "unknown"}`,
    `Tier: ${payload.tier}`,
    `Score: ${payload.score}`,
    `Reference ID: ${payload.referenceId}`,
    "",
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEAD_EMAIL_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.LEAD_EMAIL_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({ to, from, subject, text, lead: payload }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Lead email webhook failed: ${response.status} ${body}`);
  }
}
