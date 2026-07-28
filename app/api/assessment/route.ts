import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics/server";
import { persistAssessment } from "@/lib/persistence/store";
import type {
  AssessmentRequest,
  AssessmentResponse,
  AssistantLanguage,
  CloudProvider,
  DeliveryTimeline,
  EmployeeRange,
  SolutionRecommendation,
} from "@/types/ai";
import { checkRateLimit, resolveRateLimitKey } from "@/lib/server/rate-limit";
import {
  optionalString,
  readJsonRecord,
  requireEnum,
  requireString,
  requireStringArray,
  validationErrorResponse,
} from "@/lib/server/validation";

function recommendationCatalog(payload: AssessmentRequest): SolutionRecommendation[] {
  const recommendations: SolutionRecommendation[] = [];

  if (payload.primaryCloud === "multi-cloud" || payload.priorities.includes("resilience")) {
    recommendations.push({
      title: "Multi-cloud resilience blueprint",
      rationale:
        "Your profile indicates high availability and continuity needs. A resilient multi-cloud baseline reduces outage blast radius.",
      mappedServices: ["Cloud & Infrastructure", "Networking & Connectivity", "DevOps & CI/CD"],
    });
  }

  if (payload.priorities.includes("security") || payload.priorities.includes("compliance")) {
    recommendations.push({
      title: "Security and compliance acceleration",
      rationale:
        "Security/compliance is a top priority, so identity hardening, SIEM visibility, and policy controls should start in parallel with delivery.",
      mappedServices: ["Security & Compliance", "Managed Hosting"],
    });
  }

  if (payload.priorities.includes("delivery-speed") || payload.timeline === "immediate") {
    recommendations.push({
      title: "DevOps delivery fast-track",
      rationale:
        "Fast execution requires standardized CI/CD, infrastructure-as-code, and release safety controls to avoid deployment risk.",
      mappedServices: ["DevOps & CI/CD", "Cloud & Infrastructure"],
    });
  }

  if (payload.priorities.includes("incident-response") || payload.employeeRange === "500+") {
    recommendations.push({
      title: "AI operations rollout",
      rationale:
        "Large estates and incident-heavy teams benefit from AI-assisted triage, diagnosis, and remediation workflows.",
      mappedServices: ["AI Operations Agents", "Managed Hosting", "Security & Compliance"],
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: "Core infrastructure optimization",
      rationale:
        "A baseline architecture and operations audit is the safest path before larger transformation initiatives.",
      mappedServices: ["Cloud & Infrastructure", "Managed Hosting"],
    });
  }

  return recommendations.slice(0, 3);
}

function resolveReadinessScore(payload: AssessmentRequest): number {
  let score = 50;

  if (payload.primaryCloud === "multi-cloud") score += 10;
  if (payload.primaryCloud === "on-prem") score -= 8;
  if (payload.priorities.includes("observability")) score += 8;
  if (payload.priorities.includes("security")) score += 6;
  if (payload.priorities.includes("cost-optimization")) score += 4;
  if (payload.timeline === "immediate") score -= 6;
  if (payload.employeeRange === "1-20") score -= 4;
  if (payload.employeeRange === "500+") score += 6;

  return Math.max(20, Math.min(score, 95));
}

function resolveRiskLevel(score: number): "low" | "medium" | "high" {
  if (score >= 75) return "low";
  if (score >= 50) return "medium";
  return "high";
}

function buildSummary(payload: AssessmentRequest, language: AssistantLanguage): string {
  if (language === "ar") {
    return `تحليل مبدئي لشركة ${payload.companyName}: بالنظر إلى بيئة ${payload.primaryCloud} والأولويات المحددة، نقترح البدء بخارطة طريق تنفيذية على مراحل توازن بين السرعة والاستقرار التشغيلي.`;
  }

  return `Initial assessment for ${payload.companyName}: based on your ${payload.primaryCloud} landscape and selected priorities, we recommend a phased implementation roadmap that balances delivery speed with operational stability.`;
}

function buildNextActions(language: AssistantLanguage): string[] {
  if (language === "ar") {
    return [
      "تحديد نطاق تقني واضح للمرحلة الأولى خلال اجتماع اكتشاف مدته 45 دقيقة.",
      "مشاركة مخطط البنية الحالية للوصول إلى خطة تنفيذ دقيقة.",
      "مواءمة مؤشرات النجاح التشغيلية (SLA, MTTR, تكلفة البنية) قبل بدء التنفيذ.",
    ];
  }

  return [
    "Finalize a clear technical scope for phase one in a 45-minute discovery call.",
    "Share your current architecture diagram to produce an implementation-ready roadmap.",
    "Align on target operational KPIs (SLA, MTTR, infra cost) before execution starts.",
  ];
}

export async function POST(request: Request) {
  try {
    const rateLimit = checkRateLimit({
      key: resolveRateLimitKey(request, "assessment"),
      limit: 12,
      windowMs: 10 * 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please retry after a few minutes." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const record = await readJsonRecord(request);
    const language = requireEnum(
      record.language ?? "en",
      "language",
      ["en", "ar"] as const
    ) as AssistantLanguage;

    const payload: AssessmentRequest = {
      companyName: requireString(record.companyName, "companyName", { minLength: 2, maxLength: 140 }),
      employeeRange: requireEnum(
        record.employeeRange,
        "employeeRange",
        ["1-20", "21-100", "101-500", "500+"] as const
      ) as EmployeeRange,
      primaryCloud: requireEnum(
        record.primaryCloud,
        "primaryCloud",
        ["aws", "azure", "gcp", "multi-cloud", "on-prem"] as const
      ) as CloudProvider,
      monthlyBudget: optionalString(record.monthlyBudget, "monthlyBudget", 120) ?? "",
      priorities: requireStringArray(record.priorities, "priorities", {
        minLength: 1,
        maxItems: 5,
        maxItemLength: 50,
      }),
      timeline: requireEnum(
        record.timeline,
        "timeline",
        ["immediate", "30-days", "90-days", "strategic"] as const
      ) as DeliveryTimeline,
      language,
    };

    const readinessScore = resolveReadinessScore(payload);
    const response: AssessmentResponse = {
      summary: buildSummary(payload, language),
      readinessScore,
      riskLevel: resolveRiskLevel(readinessScore),
      recommendations: recommendationCatalog(payload),
      nextActions: buildNextActions(language),
      language,
    };

    const persistence = await persistAssessment(payload, response);

    trackServerEvent({
      name: "assessment_generated",
      route: "/api/assessment",
      details: {
        language,
        riskLevel: response.riskLevel,
        recommendationCount: response.recommendations.length,
        persistence,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response = validationErrorResponse(error);
    if (response.status !== 500) {
      trackServerEvent({
        name: "assessment_failed",
        route: "/api/assessment",
        details: { reason: "validation_error" },
      });
      return response;
    }

    const message = error instanceof Error ? error.message : "Unknown assessment processing error.";
    trackServerEvent({
      name: "assessment_failed",
      route: "/api/assessment",
      details: { reason: message },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
