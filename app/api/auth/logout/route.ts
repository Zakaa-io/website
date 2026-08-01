import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/server/session-auth";
import { validateCsrfToken } from "@/lib/server/csrf";

export async function POST(request: Request) {
  const csrfResult = validateCsrfToken(request);
  if (!csrfResult.success) {
    return NextResponse.json({ error: csrfResult.error }, { status: 403 });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  clearSessionCookie(response);
  return response;
}
