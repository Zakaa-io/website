CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  reference_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL,
  tier TEXT NOT NULL,
  score INTEGER NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS assessments (
  id BIGSERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  employee_range TEXT NOT NULL,
  primary_cloud TEXT NOT NULL,
  monthly_budget TEXT NOT NULL,
  priorities JSONB NOT NULL,
  timeline TEXT NOT NULL,
  language TEXT NOT NULL,
  readiness_score INTEGER NOT NULL,
  risk_level TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS chat_exchanges (
  id BIGSERIAL PRIMARY KEY,
  language TEXT NOT NULL,
  provider TEXT NOT NULL,
  user_message TEXT NOT NULL,
  assistant_reply TEXT NOT NULL,
  suggested_next_step TEXT,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_events (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  route TEXT NOT NULL,
  details JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);
