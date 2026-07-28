import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

interface BearerAuthOptions {
  envVarName: string;
  routeLabel: string;
}

function readBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (!scheme || !token) return null;
  if (scheme.toLowerCase() !== "bearer") return null;
  return token.trim();
}

export function enforceOptionalBearerAuth(
  request: Request,
  options: BearerAuthOptions
): NextResponse | null {
  const expectedToken = process.env[options.envVarName];
  if (!expectedToken) return null;

  const token = readBearerToken(request);
  if (!token) {
    return NextResponse.json(
      { error: `${options.routeLabel} requires bearer authentication.` },
      { status: 401 }
    );
  }

  if (!constantTimeEquals(token, expectedToken)) {
    return NextResponse.json({ error: "Invalid bearer token." }, { status: 403 });
  }

  return null;
}

export function enforceOptionalHeaderSecret(
  request: Request,
  options: { envVarName: string; headerName: string; routeLabel: string }
): NextResponse | null {
  const expectedSecret = process.env[options.envVarName];
  if (!expectedSecret) return null;

  const provided = request.headers.get(options.headerName);
  if (!provided) {
    return NextResponse.json(
      { error: `${options.routeLabel} requires header ${options.headerName}.` },
      { status: 401 }
    );
  }

  if (!constantTimeEquals(provided, expectedSecret)) {
    return NextResponse.json({ error: `Invalid ${options.headerName} header.` }, { status: 403 });
  }

  return null;
}
