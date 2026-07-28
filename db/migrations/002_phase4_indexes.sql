CREATE INDEX IF NOT EXISTS idx_leads_submitted_at ON leads (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_tier ON leads (tier);

CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessments_risk_level ON assessments (risk_level);

CREATE INDEX IF NOT EXISTS idx_chat_exchanges_created_at ON chat_exchanges (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_exchanges_language ON chat_exchanges (language);

CREATE INDEX IF NOT EXISTS idx_audit_events_created_at ON audit_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_events_name ON audit_events (name);
