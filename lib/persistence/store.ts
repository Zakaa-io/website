import type { AssessmentRequest, AssessmentResponse, LeadRequest, LeadResponse } from "@/types/ai";
import { isDatabaseConfigured, query } from "@/lib/db/postgres";

export type PersistenceResult = "stored" | "skipped_no_database";

function nowIso(): string {
  return new Date().toISOString();
}

export async function persistLeadSubmission(
  request: LeadRequest,
  response: LeadResponse
): Promise<PersistenceResult> {
  if (!isDatabaseConfigured()) return "skipped_no_database";

  await query(
    `INSERT INTO leads
      (reference_id, name, email, company, message, source, tier, score, submitted_at)
     VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      response.referenceId,
      request.name,
      request.email,
      request.company ?? null,
      request.message,
      request.source ?? "unknown",
      response.tier,
      response.score,
      nowIso(),
    ]
  );

  return "stored";
}

export async function persistAssessment(
  request: AssessmentRequest,
  response: AssessmentResponse
): Promise<PersistenceResult> {
  if (!isDatabaseConfigured()) return "skipped_no_database";

  await query(
    `INSERT INTO assessments
      (company_name, employee_range, primary_cloud, monthly_budget, priorities, timeline, language, readiness_score, risk_level, summary, created_at)
     VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      request.companyName,
      request.employeeRange,
      request.primaryCloud,
      request.monthlyBudget,
      JSON.stringify(request.priorities),
      request.timeline,
      request.language ?? "en",
      response.readinessScore,
      response.riskLevel,
      response.summary,
      nowIso(),
    ]
  );

  return "stored";
}

export async function persistChatExchange(input: {
  language: string;
  provider: string;
  userMessage: string;
  assistantReply: string;
  suggestedNextStep?: string;
}): Promise<PersistenceResult> {
  if (!isDatabaseConfigured()) return "skipped_no_database";

  await query(
    `INSERT INTO chat_exchanges
      (language, provider, user_message, assistant_reply, suggested_next_step, created_at)
     VALUES
      ($1, $2, $3, $4, $5, $6)`,
    [
      input.language,
      input.provider,
      input.userMessage,
      input.assistantReply,
      input.suggestedNextStep ?? null,
      nowIso(),
    ]
  );

  return "stored";
}

export async function persistAuditEvent(input: {
  name: string;
  route: string;
  details: Record<string, unknown>;
  timestamp: string;
}): Promise<PersistenceResult> {
  if (!isDatabaseConfigured()) return "skipped_no_database";

  await query(
    `INSERT INTO audit_events
      (name, route, details, created_at)
     VALUES
      ($1, $2, $3, $4)`,
    [input.name, input.route, JSON.stringify(input.details), input.timestamp]
  );

  return "stored";
}
