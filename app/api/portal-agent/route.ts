import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/server";
import { runPortalTriage } from "@/lib/ai/portal-triage";
import { dispatchIncidentNotifications } from "@/lib/incidents/integrations";
import { enqueueJob } from "@/lib/jobs/queue";
import type { AsyncJobAcceptedResponse, IncidentSeverity, PortalAgentRequest } from "@/types/ai";
import { enforceOptionalBearerAuth } from "@/lib/server/auth";
import { checkRateLimit, resolveRateLimitKey } from "@/lib/server/rate-limit";
import { readJsonRecord, requireString, validationErrorResponse } from "@/lib/server/validation";

export async function POST(request: Request) {
  try {
    const authResponse = enforceOptionalBearerAuth(request, {
      envVarName: "PORTAL_AGENT_BEARER_TOKEN",
      routeLabel: "Portal agent API",
    });
    if (authResponse) return authResponse;

    const rateLimit = checkRateLimit({
      key: resolveRateLimitKey(request, "portal-agent"),
      limit: 15,
      windowMs: 10 * 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please retry later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const record = await readJsonRecord(request);
    const payload: PortalAgentRequest = {
      ticketTitle: requireString(record.ticketTitle, "ticketTitle", { minLength: 4, maxLength: 180 }),
      ticketDescription: requireString(record.ticketDescription, "ticketDescription", {
        minLength: 10,
        maxLength: 3000,
      }),
      affectedService: requireString(record.affectedService, "affectedService", { minLength: 2, maxLength: 120 }),
      async: record.async === undefined ? false : Boolean(record.async),
    };
    if (record.async !== undefined && typeof record.async !== "boolean") {
      return NextResponse.json({ error: "async must be a boolean." }, { status: 400 });
    }

    const notifyCriticalIncident = async (severity: IncidentSeverity) => {
      if (severity !== "critical") return;
      const dispatch = await dispatchIncidentNotifications({
        dedupeKey: `portal-critical-${payload.affectedService.toLowerCase()}`,
        title: `Critical portal incident: ${payload.ticketTitle}`,
        summary: payload.ticketDescription,
        severity: "critical",
        source: "portal-agent",
        details: { service: payload.affectedService },
      });
      trackServerEvent({
        name: dispatch.dispatched.some((item) => item.status === "failed")
          ? "incident_notification_failed"
          : "incident_notification_sent",
        route: "/api/portal-agent",
        details: {
          severity,
          service: payload.affectedService,
          incidentDispatch: dispatch.dispatched,
          cooldownSkipped: dispatch.skippedByCooldown,
        },
      });
    };

    if (payload.async) {
      const job = enqueueJob({
        type: "portal-triage",
        execute: async () => {
          const response = runPortalTriage(payload);
          await notifyCriticalIncident(response.severity);
          trackServerEvent({
            name: "portal_triage_run",
            route: "/api/portal-agent",
            details: { severity: response.severity, service: payload.affectedService, mode: "async" },
          });
          return response;
        },
      });

      const accepted: AsyncJobAcceptedResponse = {
        jobId: job.id,
        type: job.type,
        status: "queued",
        statusUrl: "/api/jobs/status",
      };
      return NextResponse.json(accepted, { status: 202 });
    }

    const response = runPortalTriage(payload);
    await notifyCriticalIncident(response.severity);

    trackServerEvent({
      name: "portal_triage_run",
      route: "/api/portal-agent",
      details: { severity: response.severity, service: payload.affectedService, mode: "sync" },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response = validationErrorResponse(error);
    if (response.status !== 500) {
      trackServerEvent({
        name: "portal_triage_failed",
        route: "/api/portal-agent",
        details: { reason: "validation_error" },
      });
      return response;
    }

    const message = error instanceof Error ? error.message : "Unknown portal triage error.";
    trackServerEvent({
      name: "portal_triage_failed",
      route: "/api/portal-agent",
      details: { reason: message },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
