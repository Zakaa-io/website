import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export type ClientPortalRole = "client_admin" | "client_user";

interface SessionPayload {
  sub: string;
  role: ClientPortalRole;
  exp: number;
}

interface AuthUser {
  email: string;
  password: string;
  role: ClientPortalRole;
}

const SESSION_COOKIE_NAME = "zakaa_portal_session";

function base64UrlEncode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.trim().length < 16) {
    throw new Error("SESSION_SECRET must be configured with at least 16 characters.");
  }
  return secret;
}

function sign(payloadEncoded: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadEncoded).digest("base64url");
}

function parseCookieFromString(cookieHeader: string, name: string): string | null {
  const parts = cookieHeader.split(";").map((item) => item.trim());
  for (const part of parts) {
    const index = part.indexOf("=");
    if (index <= 0) {
      continue;
    }
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key === name) {
      return value;
    }
  }
  return null;
}

function parseRole(value: string): ClientPortalRole | null {
  if (value === "client_admin" || value === "client_user") {
    return value;
  }
  return null;
}

function loadUsersFromEnv(): AuthUser[] {
  const mappings: Array<{ emailVar: string; passwordVar: string; role: ClientPortalRole }> = [
    {
      emailVar: "AUTH_CLIENT_ADMIN_EMAIL",
      passwordVar: "AUTH_CLIENT_ADMIN_PASSWORD",
      role: "client_admin",
    },
    {
      emailVar: "AUTH_CLIENT_USER_EMAIL",
      passwordVar: "AUTH_CLIENT_USER_PASSWORD",
      role: "client_user",
    },
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

export function authenticateCredentials(
  email: string,
  password: string,
): { email: string; role: ClientPortalRole } | null {
  const users = loadUsersFromEnv();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(
    (item) => item.email === normalizedEmail && constantTimeEquals(item.password, password),
  );

  if (!user) {
    return null;
  }
  return { email: user.email, role: user.role };
}

export function createSessionToken(input: {
  email: string;
  role: ClientPortalRole;
}): string {
  const secret = getSessionSecret();
  const maxAgeSeconds = Number(process.env.SESSION_MAX_AGE_SECONDS ?? "28800");
  const payload: SessionPayload = {
    sub: input.email,
    role: input.role,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  };
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(payloadEncoded, secret);
  return `${payloadEncoded}.${signature}`;
}

export function readSessionFromCookieHeader(
  cookieHeader: string | null | undefined,
): { email: string; role: ClientPortalRole } | null {
  if (!cookieHeader) {
    return null;
  }

  const token = parseCookieFromString(cookieHeader, SESSION_COOKIE_NAME);
  if (!token) {
    return null;
  }

  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) {
    return null;
  }

  let secret: string;
  try {
    secret = getSessionSecret();
  } catch {
    return null;
  }

  const expected = sign(payloadEncoded, secret);
  const givenBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (givenBuffer.length !== expectedBuffer.length) {
    return null;
  }
  if (!timingSafeEqual(givenBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadEncoded)) as SessionPayload;
    if (!payload?.sub || !payload?.role || !payload?.exp) {
      return null;
    }
    const role = parseRole(payload.role);
    if (!role) {
      return null;
    }
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return { email: payload.sub, role };
  } catch {
    return null;
  }
}

export function readSession(request: Request): { email: string; role: ClientPortalRole } | null {
  return readSessionFromCookieHeader(request.headers.get("cookie"));
}

export function setSessionCookie(response: NextResponse, token: string) {
  const secure = process.env.NODE_ENV === "production";
  const maxAgeSeconds = Number(process.env.SESSION_MAX_AGE_SECONDS ?? "28800");
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure ? "; Secure" : ""}`,
  );
}

export function clearSessionCookie(response: NextResponse) {
  const secure = process.env.NODE_ENV === "production";
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`,
  );
}
