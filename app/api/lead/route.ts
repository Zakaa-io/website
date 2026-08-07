import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/server";
import { persistLeadSubmission } from "@/lib/persistence/store";
import { sendLeadNotificationEmail } from "@/lib/lead/email";
import type { LeadRequest, LeadResponse, LeadTier } from "@/types/ai";
import { checkRateLimit, resolveRateLimitKey } from "@/lib/server/rate-limit";
import {
  optionalString,
  readJsonRecord,
  requireEnum,
  requireString,
  validateEmail,
  validationErrorResponse,
} from "@/lib/server/validation";
import { requireCsrfToken } from "@/lib/server/csrf";

interface LeadKeywordRule {
  term: string;
  points: number;
}

const scoringRules: LeadKeywordRule[] = [
  { term: "urgent", points: 20 },
  { term: "outage", points: 25 },
  { term: "security", points: 18 },
  { term: "migration", points: 12 },
  { term: "kubernetes", points: 10 },
  { term: "cloud", points: 8 },
  { term: "24/7", points: 12 },
  { term: "soc 2", points: 15 },
  { term: "iso 27001", points: 15 },
  { term: "assessment", points: 10 },
];

function resolveTier(score: number): LeadTier {
  if (score >= 75) return "hot";
  if (score >= 45) return "warm";
  return "cold";
}

function resolveNextStep(tier: LeadTier): string {
  if (tier === "hot") return "Priority follow-up in under 4 business hours.";
  if (tier === "warm") return "Engineer follow-up scheduled in under 1 business day.";
  return "Share more infrastructure details to receive a tailored roadmap.";
}

function scoreLead(payload: LeadRequest): number {
  const combined = `${payload.message} ${payload.company ?? ""}`.toLowerCase();
  let score = 25;

  for (const rule of scoringRules) {
    if (combined.includes(rule.term)) score += rule.points;
  }

  if (payload.message.length > 240) score += 10;
  if (payload.company && payload.company.trim().length > 1) score += 5;
  if (payload.source === "chat") score += 5;

  return Math.min(score, 100);
}

export async function POST(request: Request) {
  try {
    const csrfResponse = requireCsrfToken(request);
    if (csrfResponse) return csrfResponse;

    const rateLimit = checkRateLimit({
      key: resolveRateLimitKey(request, "lead"),
      limit: 8,
      windowMs: 10 * 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please retry after a few minutes." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const record = await readJsonRecord(request);
    const payload: LeadRequest = {
      name: requireString(record.name, "name", { minLength: 2, maxLength: 120 }),
      email: requireString(record.email, "email", { minLength: 5, maxLength: 200 }),
      company: optionalString(record.company, "company", 120),
      message: requireString(record.message, "message", { minLength: 10, maxLength: 2000 }),
      source: requireEnum(
        record.source ?? "unknown",
        "source",
        ["cta", "chat", "assessment", "unknown"] as const
      ),
    };

    if (!validateEmail(payload.email)) {
      return NextResponse.json({ error: "email must be a valid email address." }, { status: 400 });
    }

    const score = scoreLead(payload);
    const tier = resolveTier(score);
    const referenceId = `LEAD-${Date.now().toString(36).toUpperCase()}`;

    const response: LeadResponse = {
      success: true,
      tier,
      score,
      nextStep: resolveNextStep(tier),
      referenceId,
    };

    const persistence = await persistLeadSubmission(payload, response);

    trackServerEvent({
      name: "lead_submitted",
      route: "/api/lead",
      details: { score, tier, source: payload.source ?? "unknown", persistence },
    });

    void sendLeadNotificationEmail({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      message: payload.message,
      source: payload.source,
      tier,
      score,
      referenceId: response.referenceId,
    }).catch((emailError) => {
      console.error("Failed to send lead notification email", emailError);
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response = validationErrorResponse(error);
    if (response.status !== 500) {
      trackServerEvent({
        name: "lead_submit_failed",
        route: "/api/lead",
        details: { reason: "validation_error" },
      });
      return response;
    }

    const message = error instanceof Error ? error.message : "Unknown lead processing error.";
    trackServerEvent({
      name: "lead_submit_failed",
      route: "/api/lead",
      details: { reason: message, stack: error instanceof Error ? error.stack : undefined },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
