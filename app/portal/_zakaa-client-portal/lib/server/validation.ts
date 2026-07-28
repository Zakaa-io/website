import { NextResponse } from "next/server";

class ValidationError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

type JsonRecord = Record<string, unknown>;

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function readJsonRecord(request: Request): Promise<JsonRecord> {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    throw new ValidationError("Invalid JSON body.");
  }

  if (!isJsonRecord(data)) {
    throw new ValidationError("JSON body must be an object.");
  }

  return data;
}

export function requireString(
  value: unknown,
  fieldName: string,
  options?: { minLength?: number; maxLength?: number },
): string {
  if (typeof value !== "string") {
    throw new ValidationError(`${fieldName} must be a string.`);
  }

  const normalized = value.trim();
  if (!normalized) {
    throw new ValidationError(`${fieldName} is required.`);
  }

  if (options?.minLength && normalized.length < options.minLength) {
    throw new ValidationError(
      `${fieldName} must be at least ${options.minLength} characters.`,
    );
  }

  if (options?.maxLength && normalized.length > options.maxLength) {
    throw new ValidationError(
      `${fieldName} must be at most ${options.maxLength} characters.`,
    );
  }

  return normalized;
}

export function validationErrorResponse(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  return NextResponse.json({ error: "Unexpected validation error." }, { status: 500 });
}
