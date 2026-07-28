import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/server/session-auth";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  clearSessionCookie(response);
  return response;
}
