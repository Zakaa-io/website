import { NextResponse } from "next/server";
import { readSession } from "@/lib/server/session-auth";

export async function POST(request: Request) {
  const session = readSession(request);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: { email: session.email, role: session.role },
    },
    { status: 200 },
  );
}
