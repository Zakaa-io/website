import { NextResponse } from "next/server";
import {
  authenticateCredentials,
  createSessionToken,
  setSessionCookie,
} from "@/lib/server/session-auth";
import { readJsonRecord, requireString, validationErrorResponse } from "@/lib/server/validation";
import { validateCsrfToken } from "@/lib/server/csrf";

export async function POST(request: Request) {
  try {
    const csrfResult = validateCsrfToken(request);
    if (!csrfResult.success) {
      return NextResponse.json({ error: csrfResult.error }, { status: 403 });
    }

    const payload = await readJsonRecord(request);
    const email = requireString(payload.email, "email", { minLength: 3, maxLength: 200 }).toLowerCase();
    const password = requireString(payload.password, "password", { minLength: 4, maxLength: 200 });

    const auth = authenticateCredentials(email, password);
    if (!auth) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = await createSessionToken({ email: auth.email, role: auth.role });
    const response = NextResponse.json(
      { success: true, user: { email: auth.email, role: auth.role } },
      { status: 200 }
    );
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    const validation = validationErrorResponse(error);
    if (validation.status !== 500) return validation;
    const message = error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
