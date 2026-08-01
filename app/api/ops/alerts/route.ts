import { NextResponse } from "next/server";
import { evaluateAlerts, getMetricsSnapshot } from "@/lib/analytics/metrics";
import { trackServerEvent } from "@/lib/analytics/server";
import { dispatchIncidentNotifications } from "@/lib/incidents/integrations";
import { enforceSessionRole } from "@/lib/server/session-auth";
import { readJsonRecord, validationErrorResponse } from "@/lib/server/validation";

export async function POST(request: Request) {
  try {
    const auth = await enforceSessionRole(request, {
      routeLabel: "Ops alerts API",
      allowedRoles: ["admin", "operator"],
    });
    if (auth instanceof NextResponse) return auth;

    const payload = await readJsonRecord(request);
    const windowMinutesRaw = Number(payload.windowMinutes ?? "15");
    const windowMinutes = Number.isFinite(windowMinutesRaw)
      ? Math.max(1, Math.min(Math.floor(windowMinutesRaw), 60))
      : 15;

    const snapshot = getMetricsSnapshot(windowMinutes);
    const alerts = evaluateAlerts(snapshot);
    const hasCriticalAlert = alerts.some((alert) => alert.level === "critical");
    let incidentDispatch: Awaited<ReturnType<typeof dispatchIncidentNotifications>> | null = null;
    if (hasCriticalAlert) {
      incidentDispatch = await dispatchIncidentNotifications({
        dedupeKey: `ops-alert-critical-${windowMinutes}`,
        title: "Critical ops alert triggered",
        summary: `Failure rate ${Math.round(snapshot.failureRate * 100)}% over ${windowMinutes}m window.`,
        severity: "critical",
        source: "ops-alerts",
        details: {
          alerts,
          totals: snapshot.totals,
          conversion: snapshot.conversion,
        },
      });
      trackServerEvent({
        name: incidentDispatch.dispatched.some((item) => item.status === "failed")
          ? "incident_notification_failed"
          : "incident_notification_sent",
        route: "/api/ops/alerts",
        details: {
          dispatched: incidentDispatch.dispatched,
          cooldownSkipped: incidentDispatch.skippedByCooldown,
        },
      });
    }

    return NextResponse.json(
      {
        viewerRole: auth.role,
        generatedAt: snapshot.generatedAt,
        windowMinutes,
        alerts,
        summary: {
          totalEvents: snapshot.totals.events,
          failureRate: snapshot.failureRate,
          chatToLeadRate: snapshot.conversion.chatToLeadRate,
        },
        incidentDispatch,
      },
      { status: 200 }
    );
  } catch (error) {
    return validationErrorResponse(error);
  }
}
