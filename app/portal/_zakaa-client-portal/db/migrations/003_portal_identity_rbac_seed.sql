INSERT INTO roles (code, name, description)
VALUES
  ('client_user', 'Client User', 'Standard client portal access'),
  ('client_admin', 'Client Admin', 'Client administrator with user and role management'),
  ('internal_admin', 'Internal Admin', 'Internal operations/admin role for full portal control')
ON CONFLICT (code) DO NOTHING;

INSERT INTO permissions (code, description)
VALUES
  ('dashboard.read', 'Read dashboard overview and summaries'),
  ('projects.read', 'Read projects and service status'),
  ('billing.read', 'Read invoices and payment status'),
  ('billing.download', 'Download billing documents'),
  ('tickets.read', 'Read support tickets'),
  ('tickets.write', 'Create and update support tickets'),
  ('documents.read', 'Read and list tenant documents'),
  ('profile.read', 'Read profile and account settings'),
  ('profile.write', 'Update profile and account settings'),
  ('users.manage', 'Manage tenant users'),
  ('roles.manage', 'Manage role assignments in tenant'),
  ('audit.read', 'Read audit history'),
  ('tenants.manage', 'Manage tenant lifecycle settings')
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
  'dashboard.read',
  'projects.read',
  'billing.read',
  'tickets.read',
  'tickets.write',
  'documents.read',
  'profile.read',
  'profile.write'
)
WHERE r.code = 'client_user'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
  'dashboard.read',
  'projects.read',
  'billing.read',
  'billing.download',
  'tickets.read',
  'tickets.write',
  'documents.read',
  'profile.read',
  'profile.write',
  'users.manage',
  'roles.manage'
)
WHERE r.code = 'client_admin'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
  'dashboard.read',
  'projects.read',
  'billing.read',
  'billing.download',
  'tickets.read',
  'tickets.write',
  'documents.read',
  'profile.read',
  'profile.write',
  'users.manage',
  'roles.manage',
  'audit.read',
  'tenants.manage'
)
WHERE r.code = 'internal_admin'
ON CONFLICT DO NOTHING;
