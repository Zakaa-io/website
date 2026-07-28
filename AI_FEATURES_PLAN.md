# Zakaa Website — AI Features Implementation Plan

This is a living plan document and should be updated as work progresses.

## Project Context

- Stack: Next.js 15, React 19, TypeScript, Tailwind CSS
- Current state: marketing website with an `AIAgents` section, no AI backend yet

## Goals

1. Add real AI product value (chat, qualification, assessment)
2. Capture and qualify leads automatically
3. Build a scalable AI backend with RAG and analytics

---

## Phase 1 — Fast Wins (1–2 weeks)

### 1) AI Pre-sales Chat Widget
- Add floating chat widget on landing page
- Connect to `/api/chat` endpoint
- Answer service and pricing questions
- Trigger lead capture when intent is detected

### 2) Smart Contact/Lead Flow
- Replace mailto-only CTA with structured lead form
- Submit to `/api/lead`
- AI lead scoring (hot/warm/cold)
- Persist lead with source metadata

### 3) FAQ Copilot
- Ground answers in Zakaa-specific knowledge
- Provide safe fallbacks when answer is unknown

---

## Phase 2 — Differentiation (2–4 weeks)

### 4) Infrastructure Assessment Assistant
- Multi-step questionnaire UI
- API route to generate mini assessment report
- Option to email summary to prospect

### 5) AI Solution Recommender
- Recommend service package by company size, cloud, and pain points
- Explain rationale clearly

### 6) Multilingual Assistant (EN/AR)
- Arabic + English replies
- Language selection or auto-detect

---

## Phase 3 — Advanced (4–8 weeks)

### 7) Live Demo Simulator
- Interactive incident diagnosis simulation for prospects

### 8) Client Portal AI Agent
- Ticket triage and operational guidance for signed clients

### 9) Optional Voice Intake
- Voice-to-brief for discovery calls

---

## Phase 4 — Productionization (2–4 weeks)

### 10) Authentication and Access Control
- Protect client-facing AI endpoints with authenticated sessions
- Add role-based access for internal/admin features
- Rate-limit public endpoints to reduce abuse

### 11) Persistent Data Layer
- Persist leads, assessments, and AI interactions to Postgres
- Add audit/event tables for traceability
- Add migration scripts and environment-safe DB configs

### 12) Observability and Reliability
- Add structured logs for API + AI flows
- Add metrics dashboards (latency, failures, conversion funnel)
- Add alerting for high error rates and degraded response times

### 13) Deployment Readiness
- Production env templates and secret management checklist
- Smoke tests for core user journeys
- Rollback and incident response runbook

---

## File-by-File Technical Blueprint

### API Routes
- `app/api/chat/route.ts` — Chat endpoint with RAG + lead hooks
- `app/api/lead/route.ts` — Lead capture + qualification
- `app/api/assessment/route.ts` — Assessment summary generation

### AI / Backend Libraries
- `lib/ai/provider.ts` — LLM provider abstraction
- `lib/ai/prompts.ts` — System prompts and brand voice
- `lib/ai/rag.ts` — Retrieval for grounded responses
- `lib/ai/guardrails.ts` — Safety and injection checks
- `lib/db.ts` — Database connection helper
- `lib/validation.ts` — Request validation schemas
- `lib/analytics.ts` — Event tracking helpers
- `types/ai.ts` — Shared AI types

### Frontend Components
- `app/components/AIChatWidget.tsx`
- `app/components/LeadForm.tsx`
- `app/components/AssessmentWizard.tsx`

### Existing Files to Update
- `app/page.tsx` — Mount chat widget
- `app/sections/CTA.tsx` — Replace mailto-only flow with lead flow
- `app/sections/AIAgents.tsx` — Add “Try AI Assistant” entry point
- `README.md` — Add AI setup and run steps
- `.env.example` — Add AI and database env vars

### Data + Knowledge Base
- `db/migrations/001_init.sql`
- `db/migrations/002_indexes.sql`
- `scripts/ingest-kb.ts`
- `knowledge/services.md`
- `knowledge/pricing.md`
- `knowledge/process.md`
- `knowledge/case-studies.md`
- `knowledge/faq.md`

---

## Recommended Delivery Order

1. Backend scaffolding (`lib/ai`, `lib/db`, API routes)
2. Lead form + CTA integration
3. Chat widget + `/api/chat`
4. RAG ingestion + retrieval wiring
5. Assessment wizard
6. Analytics + safety + polish
7. Authentication + endpoint protection
8. Postgres persistence + migrations
9. Observability dashboards + alerts
10. Production release checklist + runbooks

---

## KPIs to Track

- Chat-to-contact conversion rate
- Qualified leads per week
- Response latency
- AI cost per qualified lead
- Demo booking uplift

---

## Post-Phase Backlog (Next Iteration)

1. Real authentication system (user accounts, sessions, RBAC) replacing token-only protection.
2. Persistent analytics dashboard UI for internal/admin visibility.
3. Automated database migration execution in CI/CD pipelines.
4. Background job queue for heavy AI/report generation tasks.
5. Incident integrations (Slack, email, PagerDuty, webhooks).
6. End-to-end automated tests for key API and workflow paths.

### Backlog Execution Tracker

- [x] B1: Replace token auth with session auth + RBAC
- [x] B2: Build internal analytics dashboard UI
- [x] B3: Add CI migration job and rollout gate
- [ ] B4: Add queue worker for async AI/report jobs
- [ ] B5: Add incident integrations (Slack/Email/Webhook/PagerDuty)
- [ ] B6: Add end-to-end regression suite

### Next Sprint (Recommended Start Order)

1. **B1 — Auth + RBAC**
   - Add user model and session-based auth
   - Add roles (`admin`, `operator`, `viewer`)
   - Protect `/api/ops/*` and internal controls by role
2. **B2 — Analytics Dashboard**
   - Build internal dashboard page with metrics/alerts
   - Show conversion funnel and failure rates
   - Route: `/internal/analytics`
3. **B3 — CI Migrations**
   - Add migration execution step in CI/CD
   - Block deployment if migration step fails

---

## Progress Tracker

- [x] Phase 1 started
- [x] Phase 1 completed
- [x] Phase 2 started
- [x] Phase 2 completed
- [x] Phase 3 started
- [x] Phase 3 completed
- [x] Phase 4 started
- [x] Phase 4 completed

## Change Log

- 2026-07-25: Initial AI implementation plan documented.
- 2026-07-25: Phase 1 implementation started. Added chat API, lead API, AI chat widget, CTA lead form, and setup docs/env file.
- 2026-07-25: Phase 1 completed with grounded FAQ behavior and lead-intent next-step prompt in chat.
- 2026-07-25: Phase 2 completed. Added assessment API, multi-step assessment wizard, deterministic solution recommender, and EN/AR support for chat and assessment flows.
- 2026-07-25: Phase 3 completed. Added live demo simulator API/UI, client portal agent API/UI, and optional voice brief capture in the AI Lab section.
- 2026-07-25: Post-phase hardening completed. Added shared request validation helpers, stricter API constraints/error handling, and analytics event tracking across chat, leads, assessment, simulator, and portal triage.
- 2026-07-25: Phase 4 roadmap defined for productionization (auth, persistence, observability, deployment readiness).
- 2026-07-25: Phase 4 started. Implemented initial auth foundation (optional bearer/header secrets) and per-IP rate limiting across AI APIs.
- 2026-07-26: Phase 4 completed. Added Postgres-ready migrations/persistence, ops metrics+alerts endpoints, configurable alert thresholds, and deployment smoke/runbook guidance.
- 2026-07-26: Added post-phase backlog for next iteration (auth RBAC, analytics UI, CI migrations, queues, integrations, e2e testing).
- 2026-07-26: Expanded backlog into executable tracker (B1-B6) with recommended next sprint order.
- 2026-07-26: B1 completed. Added session-based auth (`/api/auth/login`, `/api/auth/logout`, `/api/auth/me`) and RBAC enforcement on ops endpoints.
- 2026-07-26: B2 completed. Added internal analytics dashboard UI at `/internal/analytics` with session login, metrics view, conversion/failure tracking, and role-aware alerts visibility.
- 2026-07-26: B3 completed. Added CI migration workflow (`.github/workflows/ci-migrations-gate.yml`) with Postgres-backed migration job and rollout gate dependent on build + migration success.
