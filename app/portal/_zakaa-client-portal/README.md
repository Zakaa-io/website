# Zakaa Client Portal

Standalone client/admin portal app for `portal.zakaa.io`, separated from the main website app.

## Getting Started

1) Install dependencies:

```bash
npm install
```

2) Configure environment:

```bash
cp .env.example .env.local
```

3) Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in at `/login`.

## Auth Skeleton (Sprint 1)

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/me`
- Protected middleware for dashboard, projects, billing, support, notifications, settings
- Session cookie: `zakaa_portal_session`
- Roles: `client_admin`, `client_user`

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Environment Variables

See `.env.example` for baseline configuration across dev/staging/prod.

## CI

GitHub Actions workflow:

- `.github/workflows/client-portal-ci.yml`
- Gates: lint, typecheck, test, build

## Database Migrations (Phase B: Identity + RBAC)

Migration files added under:

- `db/migrations/001_portal_identity_rbac.sql`
- `db/migrations/002_portal_identity_rbac_indexes.sql`
- `db/migrations/003_portal_identity_rbac_seed.sql`

These cover:

- tenant and user identity model
- role/permission RBAC model
- tenant membership mapping
- session + refresh token persistence
- baseline seed roles (`client_user`, `client_admin`, `internal_admin`) and permissions
