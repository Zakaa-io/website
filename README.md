# Zakaa Website

Enterprise IT services website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## AI Features (Phase 1)

The project now includes:

- `POST /api/chat` — pre-sales AI assistant endpoint (OpenAI when `OPENAI_API_KEY` is set, otherwise grounded heuristic mode)
- `POST /api/lead` — lead capture + automatic qualification score
- On-page AI chat widget
- CTA assessment form with structured lead submission

## AI Features (Phase 2)

The project now also includes:

- `POST /api/assessment` — assessment assistant endpoint returning:
  - readiness score
  - risk level
  - solution recommendations with rationale
  - next actions
- Multi-step assessment wizard in the CTA area
- Built-in solution recommender mapped to Zakaa service lines
- Multilingual assistant support (EN/AR) in:
  - AI chat widget
  - assessment assistant

## AI Features (Phase 3)

The project now also includes:

- `POST /api/demo-simulator` — incident demo simulation endpoint with timeline, root cause, and prevention guardrails
- `POST /api/portal-agent` — portal-style ticket triage endpoint with severity, immediate actions, and escalation path
- New **AI Lab** section on the homepage:
  - Live demo simulator UI
  - Client portal AI triage assistant UI
  - Optional voice brief capture (browser SpeechRecognition support)

## Post-Phase Hardening

Hardening pass added across Phases 1-3:

- Shared server-side validation utilities for strict request parsing and field constraints
- Standardized malformed JSON and validation error responses (`400`)
- Central analytics pipeline:
  - `POST /api/analytics` ingestion route
  - server event logging for API outcomes
  - client event emission for chat, leads, assessment, simulator, and portal triage

## Phase 4 (Started): Auth + Endpoint Protection

Initial productionization slice added:

- Optional bearer auth for protected APIs:
  - `POST /api/demo-simulator` via `SIMULATOR_BEARER_TOKEN`
  - `POST /api/portal-agent` via `PORTAL_AGENT_BEARER_TOKEN`
- Optional analytics ingestion secret:
  - `POST /api/analytics` via `ANALYTICS_INGEST_TOKEN` (`x-zakaa-analytics-token`)
- In-memory per-IP rate limiting added to:
  - `/api/chat`
  - `/api/lead`
  - `/api/assessment`
  - `/api/demo-simulator`
  - `/api/portal-agent`
  - `/api/analytics`

## Phase 4 (Continued): Persistence + Observability + Readiness

### Persistent data layer (Postgres-ready)

- Added migrations:
  - `db/migrations/001_phase4_persistence.sql`
  - `db/migrations/002_phase4_indexes.sql`
- Added Postgres client and persistence helpers:
  - `lib/db/postgres.ts`
  - `lib/persistence/store.ts`
- Persisted records:
  - leads (`/api/lead`)
  - assessments (`/api/assessment`)
  - chat exchanges (`/api/chat`)
  - audit/analytics events (through `trackServerEvent`)

> If `DATABASE_URL` is not configured, persistence is explicitly skipped and APIs continue to function.

### Observability and alerting endpoints

- `POST /api/ops/metrics` with `{ "windowMinutes": 15 }`
- `POST /api/ops/alerts` with `{ "windowMinutes": 15 }`
- Session auth + RBAC:
  - metrics: `viewer`, `operator`, `admin`
  - alerts: `operator`, `admin`
- Alert evaluation supports env-configurable thresholds (failure rate and conversion floor)

### B1 Auth + RBAC (session-based)

- Auth endpoints:
  - `POST /api/auth/login` with `{ "email": "...", "password": "..." }`
  - `POST /api/auth/logout`
  - `POST /api/auth/me`
- Portal entry route:
  - `GET /portal` for admin/client login and role-based portal landing
- Session cookie:
  - HTTP-only `zakaa_session`
  - signed using `SESSION_SECRET`
- Credentials are read from env:
  - `AUTH_ADMIN_EMAIL` / `AUTH_ADMIN_PASSWORD`
  - `AUTH_OPERATOR_EMAIL` / `AUTH_OPERATOR_PASSWORD`
  - `AUTH_VIEWER_EMAIL` / `AUTH_VIEWER_PASSWORD`
  - `AUTH_CLIENT_EMAIL` / `AUTH_CLIENT_PASSWORD`

### B2 Internal analytics dashboard UI

- Added internal dashboard route:
  - `GET /internal/analytics`
- Dashboard capabilities:
  - session login/logout using `/api/auth/login`, `/api/auth/logout`, and `/api/auth/me`
  - metrics cards and route activity using `/api/ops/metrics`
  - alerts feed using `/api/ops/alerts` (role-aware; viewer role can view metrics but not alerts)
  - adjustable analytics window (5/15/30/60 minutes) with manual refresh

### B3 CI migrations + rollout gate

- Added migration runner script:
  - `npm run migrate` → apply pending SQL files in `db/migrations`
  - `npm run migrate:verify` → fail if any migration is still pending
- Added GitHub Actions workflow:
  - `.github/workflows/ci-migrations-gate.yml`
  - `build` job runs production build
  - `migrate` job boots Postgres service, applies migrations, and verifies no pending migrations
  - `rollout-gate` job runs on `main` pushes and passes only when both build and migration jobs succeed

### Deployment readiness

- Added smoke script: `npm run smoke`
- Smoke test file: `scripts/smoke-test.mjs`
- Verifies core routes:
  - `/`
  - `/api/lead`
  - `/api/assessment`
  - `/api/chat`
  - `/api/ops/metrics`
  - `/api/ops/alerts`

### Release/rollback runbook (quick)

1. Set required env vars in target environment.
2. Run DB migrations in order:
   - Use: `npm run migrate`
3. Deploy application build.
4. Run smoke test against deployment:
   - `SMOKE_BASE_URL=https://your-domain.com npm run smoke`
5. Rollback strategy:
   - Revert to previous deployment artifact
   - Keep DB schema (backward-compatible for this release)
   - Investigate logs and `/api/ops/alerts` before re-promoting

### Environment

Copy `.env.example` to `.env.local` and fill values:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini

# Optional (only enforced when provided)
PORTAL_AGENT_BEARER_TOKEN=your_portal_token
SIMULATOR_BEARER_TOKEN=your_simulator_token
ANALYTICS_INGEST_TOKEN=your_server_analytics_secret
NEXT_PUBLIC_ANALYTICS_INGEST_TOKEN=your_client_analytics_token

# Persistence
DATABASE_URL=postgres://user:password@host:5432/db
DATABASE_SSL_MODE=require
DATABASE_SSL_REJECT_UNAUTHORIZED=false

# Session auth + RBAC
SESSION_SECRET=replace-with-strong-secret
SESSION_MAX_AGE_SECONDS=28800
AUTH_ADMIN_EMAIL=admin@example.com
AUTH_ADMIN_PASSWORD=change-me
AUTH_OPERATOR_EMAIL=operator@example.com
AUTH_OPERATOR_PASSWORD=change-me
AUTH_VIEWER_EMAIL=viewer@example.com
AUTH_VIEWER_PASSWORD=change-me
AUTH_CLIENT_EMAIL=client@example.com
AUTH_CLIENT_PASSWORD=change-me

# Alert thresholds
ALERT_WARNING_FAILURE_RATE=0.12
ALERT_CRITICAL_FAILURE_RATE=0.25
ALERT_MIN_EVENTS=25
ALERT_MIN_CHAT_TO_LEAD_RATE=0.02
```

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option 2: Git + Vercel Dashboard
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Framework preset: Next.js
4. Deploy

## Project Structure

```
zakaa-website/
├── app/
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── ParticleCanvas.tsx
│   │   ├── Terminal.tsx
│   │   ├── FadeIn.tsx
│   │   ├── SectionLabel.tsx
│   │   └── SectionHeader.tsx
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── AIAgents.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Design System

- **Background**: Deep Navy `#0B1120`
- **Surface**: Slate 900 `#111827`
- **Primary Accent**: Blue 500 `#3B82F6`
- **Success**: Emerald 500 `#10B981`
- **Warning**: Amber 500 `#F59E0B`
- **Text Primary**: Slate 50 `#F8FAFC`
- **Text Secondary**: Slate 400 `#94A3B8`

## Contact

- **Email**: hello@zakaa.io
- **Phone**: +20 1000 292 919, +20 1234 522 055
- **Location**: 5th Settlement — Cairo — Egypt
