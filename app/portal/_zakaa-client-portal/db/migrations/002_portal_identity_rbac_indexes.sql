CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants (status);
CREATE INDEX IF NOT EXISTS idx_tenants_created_at ON tenants (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_users_status ON users (status);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_tenant_users_tenant_role ON tenant_users (tenant_id, role_id);
CREATE INDEX IF NOT EXISTS idx_tenant_users_user_id ON tenant_users (user_id);
CREATE INDEX IF NOT EXISTS idx_tenant_users_status ON tenant_users (membership_status);

CREATE INDEX IF NOT EXISTS idx_sessions_user_tenant ON sessions (user_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_sessions_tenant_role ON sessions (tenant_id, role_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_revoked_at ON sessions (revoked_at);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_session_id ON refresh_tokens (session_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_tenant ON refresh_tokens (user_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens (expires_at);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_revoked_at ON refresh_tokens (revoked_at);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_consumed_at ON refresh_tokens (consumed_at);

CREATE UNIQUE INDEX IF NOT EXISTS uq_roles_code ON roles (code);
CREATE UNIQUE INDEX IF NOT EXISTS uq_permissions_code ON permissions (code);
