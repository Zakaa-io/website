import { NextResponse } from "next/server";
import { getMetricsSnapshot } from "@/lib/analytics/metrics";
import { enforceSessionRole } from "@/lib/server/session-auth";
import { readJsonRecord, validationErrorResponse } from "@/lib/server/validation";

export async function POST(request: Request) {
  try {
    const auth = await enforceSessionRole(request, {
      routeLabel: "Ops metrics API",
      allowedRoles: ["admin", "operator", "viewer"],
    });
    if (auth instanceof NextResponse) return auth;

    const payload = await readJsonRecord(request);
    const windowMinutesRaw = Number(payload.windowMinutes ?? "15");
    const windowMinutes = Number.isFinite(windowMinutesRaw)
      ? Math.max(1, Math.min(Math.floor(windowMinutesRaw), 60))
      : 15;

    return NextResponse.json(
      {
        viewerRole: auth.role,
        data: getMetricsSnapshot(windowMinutes),
      },
      { status: 200 }
    );
  } catch (error) {
    return validationErrorResponse(error);
  }
}
