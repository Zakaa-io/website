import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSessionFromCookieHeader } from "@/lib/server/session-auth";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/projects",
  "/billing",
  "/support",
  "/notifications",
  "/settings",
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const cookieHeader = request.headers.get("cookie");
  const session = readSessionFromCookieHeader(cookieHeader);

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedPath(pathname) && !session) {
    const encodedNextPath = encodeURIComponent(`${pathname}${search}`);
    return NextResponse.redirect(new URL(`/login?next=${encodedNextPath}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/billing/:path*",
    "/support/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/login",
  ],
};
