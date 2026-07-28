import { NextResponse } from "next/server";
import { analyticsEventNames, type AnalyticsEventName } from "@/lib/analytics/events";
import { trackServerEvent } from "@/lib/analytics/server";
import { enforceOptionalHeaderSecret } from "@/lib/server/auth";
import { checkRateLimit, resolveRateLimitKey } from "@/lib/server/rate-limit";
import { readJsonRecord, requireEnum, validationErrorResponse } from "@/lib/server/validation";

export async function POST(request: Request) {
  try {
    const authResponse = enforceOptionalHeaderSecret(request, {
      envVarName: "ANALYTICS_INGEST_TOKEN",
      headerName: "x-zakaa-analytics-token",
      routeLabel: "Analytics ingestion API",
    });
    if (authResponse) return authResponse;

    const rateLimit = checkRateLimit({
      key: resolveRateLimitKey(request, "analytics"),
      limit: 120,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded for analytics ingestion." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const payload = await readJsonRecord(request);
    const name = requireEnum(payload.name, "name", analyticsEventNames);
    const details = typeof payload.details === "object" && payload.details !== null ? payload.details : undefined;

    trackServerEvent({
      name: name as AnalyticsEventName,
      route: "/api/analytics",
      details: details as Record<string, unknown> | undefined,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return validationErrorResponse(error);
  }
}
