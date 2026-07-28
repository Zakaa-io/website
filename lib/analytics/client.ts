"use client";

import type { AnalyticsEventName } from "@/lib/analytics/events";

interface AnalyticsClientPayload {
  name: AnalyticsEventName;
  details?: Record<string, unknown>;
}

export async function emitAnalyticsEvent(payload: AnalyticsClientPayload) {
  try {
    const analyticsToken = process.env.NEXT_PUBLIC_ANALYTICS_INGEST_TOKEN;
    const response = await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(analyticsToken ? { "x-zakaa-analytics-token": analyticsToken } : {}),
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (!response.ok) {
      console.warn("Analytics event rejected", payload.name);
    }
  } catch (error) {
    console.warn("Analytics event failed", payload.name, error);
  }
}
