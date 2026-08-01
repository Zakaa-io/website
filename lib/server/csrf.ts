import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

const CSRF_COOKIE_NAME = "zakaa_csrf";
const CSRF_HEADER_NAME = "x-zakaa-csrf";

export function generateCsrfToken(): string {
  return randomUUID();
}

export function setCsrfCookie(response: NextResponse, token: string) {
  const secure = process.env.NODE_ENV === "production";
  response.headers.append(
    "Set-Cookie",
    `${CSRF_COOKIE_NAME}=${token}; Path=/; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}${secure ? "; Secure" : ""}`
  );
}

export function readCsrfToken(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const parts = cookieHeader.split(";").map((item) => item.trim());
  for (const part of parts) {
    const index = part.indexOf("=");
    if (index <= 0) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key === CSRF_COOKIE_NAME) return value;
  }
  return null;
}

export function validateCsrfToken(request: Request): { success: boolean; error?: string } {
  const cookieToken = readCsrfToken(request);
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  if (!cookieToken) {
    return { success: false, error: "Missing CSRF cookie." };
  }

  if (!headerToken) {
    return { success: false, error: "Missing CSRF header." };
  }

  if (cookieToken !== headerToken) {
    return { success: false, error: "Invalid CSRF token." };
  }

  return { success: true };
}

export function requireCsrfToken(request: Request): NextResponse | null {
  const result = validateCsrfToken(request);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }
  return null;
}
