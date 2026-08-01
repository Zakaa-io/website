# Client Portal Implementation Plan (Separate App + Separate Subdomain)

## 1) Goal

Build a dedicated **backend** as a **separate application** from the current website, hosted on a **separate subdomain** (recommended: `be.zakaa.io`), with secure client authentication, account-specific data access, and operational readiness for production.

---

## 2) Product Scope (MVP)

### In Scope (MVP)
- Secure login/logout for clients.
- Client dashboard (high-level account summary).
- Profile & company details management.
- View project/order/service status.
- View invoices/payments and downloadable files.
- Ticket/request submission + status tracking.
- Notifications center (in-app + optional email events).
- Basic support page and contact flow.

### Out of Scope (Post-MVP)
- Native mobile apps.
- Advanced analytics and BI dashboards.
- Multi-language localization.
- Client-to-client collaboration features.
- Full white-label tenant branding.

---

## 3) Technical Direction

## Separation Strategy
- **Application:** New standalone app (`zakaa-client-portal`).
- **Domain:** Host at `portal.zakaa.io`.
- **Backend access:** Via existing backend APIs (or dedicated gateway service if needed).
- **Auth boundary:** Portal auth handled independently but can share identity provider with main app.

## Recommended Stack (align with current codebase)
- Frontend: Next.js + TypeScript + Tailwind.
- Auth: NextAuth/Auth.js or existing auth provider (OIDC/JWT).
- Data layer: Existing DB/services through secure API.
- Hosting: Vercel/Cloud Run (same cloud provider as existing infra).
- CI/CD: GitHub Actions with environment separation (`dev`, `staging`, `prod`).

---

## 4) Subdomain & Infrastructure Plan

1. **DNS**
   - Create `portal.zakaa.io` DNS record (CNAME/A depending on host).
2. **TLS/SSL**
   - Provision certificate for `portal.zakaa.io`.
3. **Environment setup**
   - Separate env vars for portal app (no sharing secrets directly from website app).
4. **WAF/Security**
   - Enable rate limiting, bot mitigation, and request throttling.
5. **Deployment topology**
   - Independent build and deployment pipeline from main website.
6. **Observability**
   - Centralized logs, traces, uptime checks, error alerts.

---

## 5) Security & Compliance Requirements

- Enforce HTTPS-only traffic and secure headers.
- Session security (short-lived access token + refresh strategy).
- RBAC at minimum (`client_user`, `client_admin`).
- Tenant/account data isolation in every query/API.
- Audit logging for sensitive actions (profile edits, downloads, billing views).
- Brute-force protection, login throttling, and optional MFA readiness.
- File access via signed URLs with expiry.
- Privacy and retention policies for client data and attachments.

---

## 6) Detailed Task Breakdown

## Phase 0 — Discovery & Alignment
- [ ] Finalize MVP feature list with stakeholders.
- [ ] Define portal user personas and role matrix.
- [ ] Confirm data entities required in portal (projects, invoices, tickets, files).
- [ ] Approve success metrics (adoption, support-ticket deflection, response time).
- [ ] Confirm legal/security requirements (privacy policy, data retention).

## Phase 1 — Solution Design
- [ ] Create architecture diagram (portal app, auth, APIs, DB dependencies).
- [ ] Define API contract list (existing endpoints to reuse vs new endpoints).
- [ ] Define tenancy model and authorization rules per endpoint.
- [ ] Create UX wireframes for MVP screens.
- [ ] Write portal route map and access matrix.

## Phase 2 — Repository & App Bootstrap
- [x] Create new repository or new top-level app workspace: `zakaa-client-portal`.
- [x] Initialize Next.js + TypeScript + ESLint + Tailwind.
- [x] Add environment templates (`.env.example`) for portal.
- [ ] Configure shared UI tokens/branding package (if needed).
- [ ] Set coding standards, branch policy, and PR templates.

## Phase 3 — Authentication & Authorization
- [x] Implement login/logout and protected route middleware.
- [ ] Implement token/session lifecycle and renewal.
- [ ] Add role checks (`client_user`, `client_admin`) at route + API level.
- [ ] Add password reset flow and email templates.
- [ ] Add security controls: lockout/rate limit/CAPTCHA thresholds.

## Phase 4 — Core Portal Modules (MVP)
- [ ] Dashboard page with account summary cards.
- [ ] Project/Service status list + details view.
- [ ] Billing module (invoices, payment status, downloadable PDF links).
- [ ] Support module (new request + history + status).
- [ ] Profile/account settings page.
- [ ] Notifications center with read/unread handling.

## Phase 5 — Backend/API Work
- [ ] Build/extend endpoints required by portal modules.
- [ ] Add strict server-side tenant scoping for all portal APIs.
- [ ] Add pagination/filtering/sorting for large datasets.
- [ ] Add request validation + typed response schemas.
- [ ] Add audit events for sensitive operations.

## Phase 6 — File & Document Access
- [ ] Implement secure document listing endpoint.
- [ ] Implement signed URL generation with expiry.
- [ ] Restrict file access by tenant and role.
- [ ] Add download action telemetry and audit records.

## Phase 7 — Subdomain, Hosting & Delivery
- [ ] Provision `portal.zakaa.io` DNS.
- [ ] Configure SSL certificate and auto-renewal.
- [ ] Configure production hosting for portal app.
- [ ] Configure separate CI/CD pipeline.
- [ ] Add smoke-test deployment gate before production promotion.

## Phase 8 — Quality, Testing & Performance
- [ ] Unit tests for auth guards, utilities, and critical business logic.
- [ ] Integration tests for key flows (login, dashboard load, ticket creation).
- [ ] E2E tests for core user journeys.
- [ ] Security testing (OWASP checks, auth bypass checks, rate-limit checks).
- [ ] Performance testing for dashboard and list endpoints.
- [ ] Accessibility checks (keyboard navigation, contrast, ARIA basics).

## Phase 9 — Monitoring, Operations & Support
- [ ] Add error tracking and alert rules.
- [ ] Add uptime probes for `portal.zakaa.io`.
- [ ] Add dashboard for auth failures, API latency, and 5xx rates.
- [ ] Create runbooks for incident response and rollback.
- [ ] Define support ownership and escalation paths.

## Phase 10 — Launch & Post-Launch
- [ ] Soft launch to internal users and selected clients.
- [ ] Collect feedback and prioritize fixes.
- [ ] Roll out to all clients in waves.
- [ ] Track KPIs weekly for first 8 weeks.
- [ ] Plan post-MVP roadmap (MFA, advanced reports, localization, mobile).

---

## 7) Suggested Milestones

- **M1 (Week 1-2):** Discovery, architecture, wireframes approved.
- **M2 (Week 3-4):** App scaffold, auth, and base routing complete.
- **M3 (Week 5-7):** MVP modules implemented and API-complete.
- **M4 (Week 8):** Testing, hardening, and staging sign-off.
- **M5 (Week 9):** Production deployment on `portal.zakaa.io` + soft launch.

---

## 8) Team Roles (Recommended)

- Product Owner: scope, priorities, acceptance.
- Tech Lead: architecture, code quality, integration.
- Frontend Engineer(s): portal UI and client flows.
- Backend Engineer(s): API readiness, authZ, data boundaries.
- QA Engineer: automated/manual validation.
- DevOps/SRE: subdomain, infra, CI/CD, observability.
- Security Reviewer: auth, data protection, hardening.

---

## 9) Risks & Mitigations

- **Risk:** Data leakage across clients  
  **Mitigation:** Mandatory tenant scoping in all APIs + tests for cross-tenant access denial.

- **Risk:** Auth complexity delays launch  
  **Mitigation:** Reuse existing identity provider and standard auth libraries.

- **Risk:** Incomplete API coverage for portal screens  
  **Mitigation:** Contract-first API inventory in Phase 1 before UI build.

- **Risk:** Production incidents after launch  
  **Mitigation:** Soft launch, monitoring, rollback plan, feature flags.

---

## 10) Definition of Done (MVP)

- Portal runs as a separate app on `portal.zakaa.io`.
- Authenticated clients can access only their own tenant data.
- Core flows (dashboard, status, billing, support, profile) are production-ready.
- Monitoring, alerts, runbooks, and rollback process are in place.
- Stakeholder acceptance and pilot-client sign-off completed.

---

## 11) Sprint-by-Sprint Execution Plan (Detailed)

Assumption: **2-week sprints**, start from Sprint 0, with MVP production-ready by end of Sprint 5.

### Sprint 0 (Preparation & Discovery)

**Objective:** Lock scope, architecture, and delivery readiness.

**Tasks**
- [ ] Confirm MVP scope and non-goals with Product Owner.
- [ ] Define personas, role matrix, and tenant model.
- [ ] Produce architecture + sequence diagrams (auth, data access, file downloads).
- [ ] Complete API inventory (reuse vs build).
- [ ] Create high-fidelity wireframes for MVP routes.
- [ ] Finalize delivery plan, environments, and release policy.

**Owners**
- Product Owner (primary), Tech Lead, UX Designer, Backend Lead.

**Estimation**
- 24-32 team points (or ~8-10 team-days spread across roles).

**Exit Criteria**
- Signed-off scope document.
- Approved architecture and wireframes.
- Prioritized backlog for Sprint 1-2.

---

### Sprint 1 (Portal Foundation)

**Objective:** Stand up the separate app and core platform foundations.

**Tasks**
- [x] Create repository/app workspace `zakaa-client-portal`.
- [x] Bootstrap Next.js + TypeScript + Tailwind + ESLint + test runner.
- [x] Configure environments (`dev/staging/prod`) and `.env.example`.
- [x] Establish CI pipeline (lint, typecheck, tests, build).
- [x] Set up auth provider integration skeleton and protected routes.
- [x] Create base layout, navigation shell, and error states.
- [ ] Provision `portal.zakaa.io` in non-prod with SSL.

**Owners**
- Frontend Engineer (primary), DevOps/SRE, Tech Lead.

**Estimation**
- 32-40 team points (or ~10-12 team-days).

**Exit Criteria**
- Separate app deployed to staging subdomain.
- CI checks passing on PRs.
- Protected route framework working end-to-end.

---

### Sprint 2 (Auth + Authorization + Core Data Contracts)

**Objective:** Deliver production-grade auth and secure API boundaries.

**Tasks**
- [ ] Complete login/logout/session refresh implementation.
- [ ] Add password reset flow and email templates.
- [ ] Implement RBAC (`client_user`, `client_admin`) in frontend and backend.
- [ ] Enforce tenant isolation middleware/policies for all portal endpoints.
- [ ] Add input validation and typed response contracts.
- [ ] Add brute-force/rate-limiting controls for auth endpoints.
- [ ] Add audit logging hooks for sensitive actions.

**Owners**
- Backend Engineer (primary), Frontend Engineer, Security Reviewer.

**Estimation**
- 36-44 team points (or ~12-14 team-days).

**Exit Criteria**
- Auth flows pass integration tests.
- Cross-tenant access denied in automated tests.
- Security review sign-off for auth and authZ controls.

---

### Sprint 3 (MVP Feature Build I)

**Objective:** Implement first half of client-facing modules.

**Tasks**
- [ ] Dashboard (summary cards + recent activity feed).
- [ ] Project/Service status list + details views.
- [ ] Profile and company settings page.
- [ ] Notification center (read/unread).
- [ ] API pagination/filter/sort for list views.
- [ ] Unit and integration test coverage for implemented modules.

**Owners**
- Frontend Engineer (primary), Backend Engineer, QA.

**Estimation**
- 34-42 team points (or ~11-13 team-days).

**Exit Criteria**
- Dashboard and status modules available in staging.
- Functional tests passing for all delivered screens.

---

### Sprint 4 (MVP Feature Build II + Files/Billing/Support)

**Objective:** Complete remaining MVP modules and document delivery.

**Tasks**
- [ ] Billing module (invoice list, payment status, PDF links).
- [ ] Support module (create ticket, list, detail, status timeline).
- [ ] Secure file/document center with signed URL downloads.
- [ ] Download audit and telemetry events.
- [ ] UX polish for empty/loading/error states across all modules.
- [ ] Full regression pass in staging.

**Owners**
- Frontend Engineer (primary), Backend Engineer, QA, Security Reviewer.

**Estimation**
- 38-46 team points (or ~12-15 team-days).

**Exit Criteria**
- All MVP modules functionally complete in staging.
- Signed URL and file access controls verified.
- Regression test pass rate meets release threshold.

---

### Sprint 5 (Hardening, Launch, and Hypercare)

**Objective:** Production launch on subdomain and safe rollout.

**Tasks**
- [ ] Complete E2E suite for critical journeys.
- [ ] Run performance tests on dashboard and key endpoints.
- [ ] Run security checks (OWASP baseline, auth bypass attempts).
- [ ] Configure production monitors, alerts, and uptime probes.
- [ ] Finalize runbooks and rollback drills.
- [ ] Launch to pilot clients, then phased rollout to all clients.
- [ ] Open hypercare window and triage feedback/issues.

**Owners**
- QA (primary), DevOps/SRE, Tech Lead, Product Owner.

**Estimation**
- 30-38 team points (or ~10-12 team-days).

**Exit Criteria**
- Portal live on `portal.zakaa.io`.
- KPIs and monitoring dashboards active.
- Pilot sign-off and go-live approval completed.

---

## 12) Task Ownership Matrix (By Workstream)

- **Product & Scope:** Product Owner
- **Architecture & Technical Decisions:** Tech Lead
- **Portal UI Implementation:** Frontend Engineer(s)
- **API + Data Isolation + Audit:** Backend Engineer(s)
- **Infrastructure + DNS + CI/CD + Observability:** DevOps/SRE
- **Test Strategy + Automation + Regression:** QA Engineer
- **Threat Modeling + Security Validation:** Security Reviewer

---

## 13) Estimation Baseline (MVP)

- Total estimated effort: **194-242 team points**
- Approximate timeline: **6 sprints (12 weeks)** including hardening and launch
- Recommended team for timeline confidence:
  - 1 Product Owner
  - 1 Tech Lead
  - 2 Frontend Engineers
  - 1-2 Backend Engineers
  - 1 QA Engineer
  - 1 DevOps/SRE (shared)
  - 1 Security Reviewer (part-time)

---

## 14) Ready-to-Start Backlog for Sprint 1

- [ ] Create portal repository and baseline branch protections.
- [x] Initialize app skeleton and project standards.
- [x] Configure CI with lint/typecheck/test/build gates.
- [ ] Prepare staging environment variables and secrets.
- [x] Implement auth skeleton + protected route middleware.
- [x] Build app shell (layout, nav, auth-required pages).
- [ ] Configure staging subdomain and SSL.
- [ ] Define Sprint 2 auth/authZ acceptance tests.
