# Client Portal Database Plan (Execution + TODOs)

## 1) Architecture Recommendation

Use this flow:

- `zakaa client portal` with a subdmian called `be.zakaa.io` (Next.js UI)
- -> Portal API/BFF layer (server-side authZ + tenant checks)
- -> Postgres (single source of truth for portal domain data)

Do **not** query DB directly from browser clients.

---

## 2) Core Design Principles

- Tenant-first schema (`tenant_id` on all portal business tables)
- RBAC enforced in API and query layer
- Short-lived access session + refresh strategy
- Audit logs for sensitive actions
- Billing synced from provider webhooks (e.g., Stripe) into Postgres
- Signed URL model for file/document access

---

## 3) Proposed Schema (MVP baseline)

## Identity & Access
- `tenants`
- `users`
- `tenant_users` (user<->tenant membership + role)
- `roles`
- `permissions`
- `role_permissions`
- `sessions` (if DB-backed sessions)
- `refresh_tokens`

## Portal Domain
- `projects`
- `services`
- `support_tickets`
- `support_ticket_events`
- `documents` (metadata only)

## Billing
- `billing_customers`
- `subscriptions`
- `invoices`
- `payments`
- `billing_webhook_events` (idempotency + replay protection)

## Security & Operations
- `audit_logs`
- `api_keys` (optional for service integrations)
- `outbox_events` (optional, if event-driven workflows)

---

## 4) Migration & Delivery Strategy

1. Create schema migrations in small batches (identity -> domain -> billing -> audit).
2. Add constraints + indexes immediately with each table.
3. Seed baseline roles/permissions in dedicated seed migration.
4. Add migration verify gate in CI.
5. Roll out in staging first with masked test data.

---

## 5) Execution TODOs

## Phase A — Foundation
- [ ] Finalize DB naming conventions (snake_case, singular/plural policy).
- [ ] Confirm Postgres version and extension policy.
- [ ] Define environment-specific DBs (`dev`, `staging`, `prod`).
- [ ] Add connection pooling strategy (pgBouncer or managed pool).

## Phase B — Identity + RBAC
- [x] Create `tenants` table with lifecycle/status fields.
- [x] Create `users` table (email unique, status, last_login_at).
- [x] Create `roles`, `permissions`, `role_permissions`.
- [x] Create `tenant_users` for membership and role assignment.
- [x] Add seed data: `client_user`, `client_admin`, `internal_admin`.
- [x] Create `sessions` / `refresh_tokens` tables (if DB session model is used).
- [x] Add unique + foreign key constraints across identity tables.

## Phase C — Tenant Isolation
- [ ] Ensure all business tables include `tenant_id`.
- [ ] Add composite indexes on `(tenant_id, created_at)`.
- [ ] Add indexes on `(tenant_id, status)` for list views.
- [ ] Implement mandatory tenant scoping in repository/query helpers.
- [ ] Add cross-tenant access tests (must fail).
- [ ] Evaluate enabling Postgres RLS for defense-in-depth.

## Phase D — Portal Business Tables
- [ ] Create `projects` and `services` tables.
- [ ] Create `support_tickets` and `support_ticket_events`.
- [ ] Create `documents` metadata table.
- [ ] Add pagination-friendly indexes (created_at, updated_at, status).
- [ ] Add soft-delete/archive strategy where applicable.

## Phase E — Billing
- [ ] Create `billing_customers`, `subscriptions`, `invoices`, `payments`.
- [ ] Create `billing_webhook_events` with unique provider event id.
- [ ] Implement webhook idempotency handling.
- [ ] Build sync jobs for reconciliation.
- [ ] Add billing read endpoints scoped by `tenant_id`.

## Phase F — Security & Compliance
- [ ] Create `audit_logs` table with actor, action, target, metadata, ip.
- [ ] Log sensitive actions: profile edits, billing views, downloads, role changes.
- [ ] Add retention policy for audit and ticket attachments metadata.
- [ ] Add brute-force/login throttle data model (or Redis integration).

## Phase G — API Contracts & Validation
- [ ] Define request/response schemas for each module.
- [ ] Add strict validation for all write endpoints.
- [ ] Add standardized error format and correlation id.
- [ ] Add service-layer guards for role + tenant enforcement.

## Phase H — CI/CD + Ops
- [ ] Add `migrate` and `migrate:verify` to portal CI.
- [ ] Add smoke checks for auth, dashboard, billing, support endpoints.
- [ ] Add DB backup/restore runbook.
- [ ] Add migration rollback playbook.
- [ ] Add dashboard for DB latency, lock waits, error rates.

---

## 6) Suggested Build Order (first 3 sprints)

### Sprint 1
- Identity schema + RBAC seed
- Session/refresh token flow
- Tenant scoping helpers

### Sprint 2
- Projects/services + support tables
- API contracts + integration tests
- Audit log writes for key actions

### Sprint 3
- Billing schema + webhook sync
- Document metadata + signed URL integration
- CI migration gate + staging sign-off

---

## 7) Definition of Done (DB Track)

- [ ] All portal tables and constraints migrated in staging/prod.
- [ ] Tenant isolation proven by automated tests.
- [ ] RBAC enforced across all protected endpoints.
- [ ] Billing data synced and queryable by tenant.
- [ ] Audit logs available for sensitive operations.
- [ ] CI migration gate and rollback runbook in place.
