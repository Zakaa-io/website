export type ChatRole = "user" | "assistant";
export type AssistantLanguage = "en" | "ar";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  language?: AssistantLanguage;
}

export interface ChatResponse {
  reply: string;
  provider: "openai" | "openrouter" | "heuristic";
  language: AssistantLanguage;
  suggestedNextStep?: string;
}

export type LeadTier = "hot" | "warm" | "cold";

export interface LeadRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: "cta" | "chat" | "assessment" | "unknown";
}

export interface LeadResponse {
  success: boolean;
  tier: LeadTier;
  score: number;
  nextStep: string;
  referenceId: string;
}

export type EmployeeRange = "1-20" | "21-100" | "101-500" | "500+";
export type CloudProvider = "aws" | "azure" | "gcp" | "multi-cloud" | "on-prem";
export type DeliveryTimeline = "immediate" | "30-days" | "90-days" | "strategic";

export interface AssessmentRequest {
  companyName: string;
  employeeRange: EmployeeRange;
  primaryCloud: CloudProvider;
  monthlyBudget: string;
  priorities: string[];
  timeline: DeliveryTimeline;
  language?: AssistantLanguage;
}

export interface SolutionRecommendation {
  title: string;
  rationale: string;
  mappedServices: string[];
}

export interface AssessmentResponse {
  summary: string;
  readinessScore: number;
  riskLevel: "low" | "medium" | "high";
  recommendations: SolutionRecommendation[];
  nextActions: string[];
  language: AssistantLanguage;
}

export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export interface DemoSimulationRequest {
  scenario: "cpu-spike" | "db-latency" | "disk-pressure";
  environment: "production" | "staging";
  async?: boolean;
}

export interface DemoTimelineStep {
  at: string;
  action: string;
}

export interface DemoSimulationResponse {
  scenario: string;
  summary: string;
  rootCause: string;
  resolvedInMinutes: number;
  timeline: DemoTimelineStep[];
  preventedBy: string[];
}

export interface PortalAgentRequest {
  ticketTitle: string;
  ticketDescription: string;
  affectedService: string;
  async?: boolean;
}

export interface PortalAgentResponse {
  severity: IncidentSeverity;
  triageSummary: string;
  immediateActions: string[];
  escalationPath: string;
}

export type AsyncJobType = "demo-simulator" | "portal-triage";

export interface AsyncJobAcceptedResponse {
  jobId: string;
  type: AsyncJobType;
  status: "queued";
  statusUrl: string;
}
