# Zakaa Site Route Roadmap

## How to access `be`

### Local development
1. Open terminal in:
   - `D:\GitHub\Zakaa-io\be`
2. Install dependencies:
   - `npm install`
3. Create local env file:
   - copy `.env.example` to `.env.local`
4. Set required auth values in `.env.local`:
   - `SESSION_SECRET`
   - `AUTH_CLIENT_ADMIN_EMAIL`
   - `AUTH_CLIENT_ADMIN_PASSWORD`
   - `AUTH_CLIENT_USER_EMAIL`
   - `AUTH_CLIENT_USER_PASSWORD`
5. Run:
   - `npm run dev`
6. Open:
   - `http://localhost:3000/login`

### Planned production access
- `https://be.zakaa.io` (as defined in `CLIENT_PORTAL_PLAN.md`)

---

## Main Website (current app) routes/pages

### UI pages
- `/` (homepage)
- `/ar` (Arabic homepage, RTL)
- `/portal`
- `/internal/analytics`
- `/case-studies`
- `/trust`
- `/partners`
- `/resources`
- `/status`
- `/docs`
- `/sandbox`
- `/products/ai-ops-copilot`
- `/services/cloud-migration`
- `/services/managed-devops`
- `/services/managed-security-soc`
- `/services/finops-cost-optimization`
- `/services/dr-bcp`
- `/industries/finance`
- `/industries/healthcare`
- `/industries/public-sector`
- `/industries/retail-logistics`
- `/company/details`
- `/legal/details`
- `/legal/privacy-policy`
- `/legal/terms-of-service`
- `/legal/sla`
- `/legal/security`
- `/legal/compliance`
- `/legal/cookies`
- `/sitemap`
- `/_not-found` (framework not-found page)

### API routes
- `/api/analytics`
- `/api/assessment`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/auth/me`
- `/api/chat`
- `/api/demo-simulator`
- `/api/jobs/status`
- `/api/lead`
- `/api/ops/alerts`
- `/api/ops/metrics`
- `/api/portal-agent`

### Footer link destinations
- Company:
  - Company Details, About Us, Careers → `/company/details`
  - Blog → `/resources`
  - Case Studies → `/case-studies`
  - Contact → `#contact`
- Platform:
  - Client Portal → `/portal`
  - API Documentation → `/docs`
  - Status Page → `/status`
  - Changelog → `/resources`
- Legal:
  - Legal Details → `/legal/details`
  - Privacy Policy → `/legal/privacy-policy`
  - Terms of Service → `/legal/terms-of-service`
  - SLA → `/legal/sla`
  - Security → `/legal/security`
  - Compliance → `/legal/compliance`
- Bottom footer:
  - Privacy → `/legal/privacy-policy`
  - Terms → `/legal/terms-of-service`
  - Cookies → `/legal/cookies`
  - Sitemap → `/sitemap`

---

## `be` routes/pages

### UI pages
- `/` (redirects to `/dashboard`)
- `/login`
- `/dashboard`
- `/projects`
- `/billing`
- `/support`
- `/notifications`
- `/settings`
- `/_not-found`

### API routes
- `/api/auth/login`
- `/api/auth/logout`
- `/api/auth/me`

### Route protection
- Protected by `proxy.ts`:
  - `/dashboard`
  - `/projects`
  - `/billing`
  - `/support`
  - `/notifications`
  - `/settings`
- Unauthenticated users are redirected to:
  - `/login?next=<requested-path>`

---

## Localization

- The marketing site now supports:
  - English (`/`)
  - Arabic (`/ar`, RTL layout)
- Header includes language switch:
  - `العربية` from English homepage
  - `English` from Arabic homepage

---

## Competitor-Gap Execution Backlog (MENA)

Goal: implement high-value features commonly present across major MENA competitors (Core42, e& enterprise, Cloud4C, Help AG, Moro Hub) that are not fully represented on the current Zakaa site.

### Phase 1 (Sprint 1): Trust + Conversion Foundations

1) Case studies library
- Route: `/case-studies`
- Includes:
  - searchable/filterable cards by industry
  - measurable outcomes per case
  - CTA to contact/demo
- Status: planned

2) Trust center
- Route: `/trust`
- Includes:
  - security posture summary
  - certifications/compliance mapping (current + target)
  - incident response and data handling overview
- Status: planned

3) Partner ecosystem page
- Route: `/partners`
- Includes:
  - cloud/security/tooling partners
  - partner-level badges
  - integration/value statements
- Status: planned

4) Resources hub (v1)
- Route: `/resources`
- Includes:
  - whitepapers/guides
  - product one-pagers
  - gated download form (email + company)
- Status: planned

### Phase 2 (Sprint 2): Product & Industry Depth

5) Service detail pages
- Routes:
  - `/services/cloud-migration`
  - `/services/managed-devops`
  - `/services/managed-security-soc`
  - `/services/finops-cost-optimization`
  - `/services/dr-bcp`
- Includes:
  - problem → approach → scope → outcomes
  - delivery model and SLA snippets
  - pricing model (from/to or custom)
- Status: planned

6) Industry solution pages
- Routes:
  - `/industries/finance`
  - `/industries/healthcare`
  - `/industries/public-sector`
  - `/industries/retail-logistics`
- Includes:
  - compliance context
  - common architecture patterns
  - success KPIs and use cases
- Status: planned

7) Status & SLA transparency
- Route: `/status`
- Includes:
  - service status tiles
  - uptime objectives
  - incident history and reporting policy
- Status: planned

### Phase 3 (Sprint 3): AI Productization

8) AI Ops product page
- Route: `/products/ai-ops-copilot`
- Includes:
  - architecture block diagram
  - feature matrix
  - operating model (human-in-the-loop)
- Status: planned

9) Docs portal (v1)
- Route: `/docs`
- Includes:
  - API overview
  - auth basics
  - quick start examples
  - FAQ
- Status: planned

10) Sandbox/demo request flow
- Route: `/sandbox`
- Includes:
  - guided request form
  - qualification fields
  - automated follow-up workflow
- Status: planned

---

## Ready-to-Use Copy Blocks (Website Content)

### 1) `/trust` page copy

Hero:
- Title: `Trust Center`
- Subtitle: `Security, compliance, and operational transparency built into every Zakaa engagement.`

Sections:
- `Security by Design`: Zero-trust access, least-privilege controls, hardening baselines, and continuous monitoring.
- `Compliance Alignment`: Mapping against client and regulatory requirements with auditable controls and evidence support.
- `Data Handling`: Tenant isolation, encryption in transit/at rest, retention policies, and controlled access.
- `Incident Readiness`: Defined response workflows, escalation matrix, and post-incident reporting.

CTA:
- `Request Security & Compliance Brief`

### 2) `/case-studies` page copy

Hero:
- Title: `Case Studies`
- Subtitle: `Real outcomes from cloud modernization, security operations, and AI-enabled infrastructure.`

Card template:
- `Client industry`
- `Challenge`
- `Zakaa solution`
- `Measured outcomes` (e.g., `-42% infra cost`, `99.99% uptime`, `80% lower MTTR`)

CTA:
- `Discuss a Similar Project`

### 3) `/resources` page copy

Hero:
- Title: `Resources`
- Subtitle: `Guides, playbooks, and technical briefs for enterprise cloud, security, and AI operations.`

Categories:
- `Whitepapers`
- `Implementation Guides`
- `Security Playbooks`
- `AI Ops Briefs`

Gated form labels:
- `Work Email`
- `Company Name`
- `Job Role`
- `Primary Interest`

### 4) `/partners` page copy

Hero:
- Title: `Technology & Delivery Partners`
- Subtitle: `We work with leading cloud and security platforms to deliver reliable enterprise outcomes.`

Sections:
- `Cloud Platforms` (AWS, Azure, GCP)
- `Security Ecosystem` (SIEM, endpoint, IAM partners)
- `Data & AI Tooling`

CTA:
- `Explore Partner-Led Solutions`

### 5) `/services/managed-security-soc` page copy

Hero:
- Title: `Managed Security Operations (SOC)`
- Subtitle: `24/7 threat monitoring, detection, triage, and response with expert-led and AI-assisted workflows.`

Capabilities:
- `Threat Monitoring & Alert Triage`
- `Incident Response & Containment`
- `Vulnerability & Exposure Management`
- `Executive Security Reporting`

Outcome block:
- `Reduce detection and response times while strengthening resilience and audit readiness.`

### 6) `/status` page copy

Hero:
- Title: `Service Status`
- Subtitle: `Real-time visibility into platform health, uptime targets, and incident communication.`

Sections:
- `Current Service Health`
- `Scheduled Maintenance`
- `Past Incidents`
- `SLA Targets`

---

## Technical Delivery Notes

- Keep all new pages bilingual-ready (EN/AR) from day one.
- Reuse existing section components/patterns for consistency.
- Add each new route to `roadmap.md` route inventory as pages are shipped.
- For gated resources and demo flows, route submissions to existing analytics + lead APIs first, then expand schema as needed.
