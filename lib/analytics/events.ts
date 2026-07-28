export const analyticsEventNames = [
  "chat_opened",
  "chat_message_sent",
  "chat_response_received",
  "chat_response_failed",
  "lead_submitted",
  "lead_submit_failed",
  "assessment_generated",
  "assessment_failed",
  "simulator_run",
  "simulator_failed",
  "portal_triage_run",
  "portal_triage_failed",
  "incident_notification_sent",
  "incident_notification_failed",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
