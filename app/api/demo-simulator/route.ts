import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/server";
import { runDemoSimulation } from "@/lib/ai/demo-simulator";
import { enqueueJob } from "@/lib/jobs/queue";
import type { AsyncJobAcceptedResponse, DemoSimulationRequest } from "@/types/ai";
import { enforceOptionalBearerAuth } from "@/lib/server/auth";
import { checkRateLimit, resolveRateLimitKey } from "@/lib/server/rate-limit";
import { readJsonRecord, requireEnum, validationErrorResponse } from "@/lib/server/validation";

export async function POST(request: Request) {
  try {
    const authResponse = enforceOptionalBearerAuth(request, {
      envVarName: "SIMULATOR_BEARER_TOKEN",
      routeLabel: "Demo simulator API",
    });
    if (authResponse) return authResponse;

    const rateLimit = checkRateLimit({
      key: resolveRateLimitKey(request, "demo-simulator"),
      limit: 20,
      windowMs: 10 * 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please retry later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const record = await readJsonRecord(request);
    const payload: DemoSimulationRequest = {
      scenario: requireEnum(
        record.scenario,
        "scenario",
        ["cpu-spike", "db-latency", "disk-pressure"] as const
      ),
      environment: requireEnum(record.environment, "environment", ["production", "staging"] as const),
      async: record.async === undefined ? false : Boolean(record.async),
    };
    if (record.async !== undefined && typeof record.async !== "boolean") {
      return NextResponse.json({ error: "async must be a boolean." }, { status: 400 });
    }

    if (payload.async) {
      const job = enqueueJob({
        type: "demo-simulator",
        execute: async () => {
          const response = runDemoSimulation(payload);
          trackServerEvent({
            name: "simulator_run",
            route: "/api/demo-simulator",
            details: { scenario: payload.scenario, environment: payload.environment, mode: "async" },
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

    const response = runDemoSimulation(payload);

    trackServerEvent({
      name: "simulator_run",
      route: "/api/demo-simulator",
      details: { scenario: payload.scenario, environment: payload.environment, mode: "sync" },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response = validationErrorResponse(error);
    if (response.status !== 500) {
      trackServerEvent({
        name: "simulator_failed",
        route: "/api/demo-simulator",
        details: { reason: "validation_error" },
      });
      return response;
    }

    const message = error instanceof Error ? error.message : "Unknown simulator error.";
    trackServerEvent({
      name: "simulator_failed",
      route: "/api/demo-simulator",
      details: { reason: message },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
