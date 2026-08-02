import { SignJWT, jwtVerify } from "jose";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export type UserRole = "admin" | "operator" | "viewer" | "client";

interface SessionPayload {
  sub: string;
  role: UserRole;
  exp: number;
  jti: string;
}

interface AuthUser {
  email: string;
  password: string;
  role: UserRole;
}

const SESSION_COOKIE_NAME = "zakaa_session";

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.trim().length < 16) {
    throw new Error("SESSION_SECRET must be configured with at least 16 characters.");
  }
  return secret;
}

function getOldSessionSecret(): string | null {
  return process.env.SESSION_SECRET_OLD?.trim() ?? null;
}

const revokedTokens = new Set<string>();

function parseCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const parts = cookieHeader.split(";").map((item) => item.trim());
  for (const part of parts) {
    const index = part.indexOf("=");
    if (index <= 0) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key === name) return value;
  }
  return null;
}

function parseRole(value: string): UserRole | null {
  if (value === "admin" || value === "operator" || value === "viewer" || value === "client") return value;
  return null;
}

function loadUsersFromEnv(): AuthUser[] {
  const mappings: Array<{ emailVar: string; passwordVar: string; role: UserRole }> = [
    { emailVar: "AUTH_ADMIN_EMAIL", passwordVar: "AUTH_ADMIN_PASSWORD", role: "admin" },
    { emailVar: "AUTH_OPERATOR_EMAIL", passwordVar: "AUTH_OPERATOR_PASSWORD", role: "operator" },
    { emailVar: "AUTH_VIEWER_EMAIL", passwordVar: "AUTH_VIEWER_PASSWORD", role: "viewer" },
    { emailVar: "AUTH_CLIENT_EMAIL", passwordVar: "AUTH_CLIENT_PASSWORD", role: "client" },
  ];

  return mappings
    .map((mapping) => ({
      email: process.env[mapping.emailVar]?.trim().toLowerCase() ?? "",
      password: process.env[mapping.passwordVar]?.trim() ?? "",
      role: mapping.role,
    }))
    .filter((user) => user.email.length > 0 && user.password.length > 0);
}

function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function authenticateCredentials(email: string, password: string): { email: string; role: UserRole } | null {
  const users = loadUsersFromEnv();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((item) => item.email === normalizedEmail && constantTimeEquals(item.password, password));
  if (!user) return null;
  return { email: user.email, role: user.role };
}

export async function createSessionToken(input: { email: string; role: UserRole }): Promise<string> {
  const secret = getSessionSecret();
  const maxAgeSeconds = Number(process.env.SESSION_MAX_AGE_SECONDS ?? "28800");
  const jti = randomBytes(16).toString("hex");

  const jwt = await new SignJWT({ sub: input.email, role: input.role, jti })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(Math.floor(Date.now() / 1000) + maxAgeSeconds)
    .sign(secret);

  return jwt;
}

export async function readSession(request: Request): Promise<{ email: string; role: UserRole } | null> {
  const token = parseCookie(request, SESSION_COOKIE_NAME);
  if (!token) return null;

  const secret = getSessionSecret();
  const oldSecret = getOldSessionSecret();

  try {
    const { payload } = await jwtVerify<SessionPayload>(token, secret, { algorithms: ["HS256"] });
    if (revokedTokens.has(payload.jti)) return null;
    return { email: payload.sub, role: payload.role };
  } catch {
    if (!oldSecret) return null;
    try {
      const { payload } = await jwtVerify<SessionPayload>(token, oldSecret, { algorithms: ["HS256"] });
      if (revokedTokens.has(payload.jti)) return null;
      return { email: payload.sub, role: payload.role };
    } catch {
      return null;
    }
  }
}

export function revokeToken(jti: string) {
  revokedTokens.add(jti);
}

export function setSessionCookie(response: NextResponse, token: string) {
  const secure = process.env.NODE_ENV === "production";
  const maxAgeSeconds = Number(process.env.SESSION_MAX_AGE_SECONDS ?? "28800");
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure ? "; Secure" : ""}`
  );
}

export function clearSessionCookie(response: NextResponse) {
  const secure = process.env.NODE_ENV === "production";
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`
  );
}

export function enforceSessionRole(
  request: Request,
  options: { routeLabel: string; allowedRoles: UserRole[] }
): Promise<{ email: string; role: UserRole } | NextResponse> {
  return readSession(request).then((session) => {
    if (!session) {
      return NextResponse.json({ error: `${options.routeLabel} requires an authenticated session.` }, { status: 401 });
    }

    if (!options.allowedRoles.includes(session.role)) {
      return NextResponse.json({ error: "Insufficient role for this resource." }, { status: 403 });
    }

    return session;
  });
}
