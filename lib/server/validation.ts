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

const MAX_JSON_BODY_BYTES = 1024 * 1024; // 1MB

export class ContentTypeError extends ValidationError {
  constructor(message: string) {
    super(message, 415);
  }
}

export class PayloadTooLargeError extends ValidationError {
  constructor(message: string) {
    super(message, 413);
  }
}

export async function readJsonRecord(request: Request): Promise<JsonRecord> {
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.startsWith("application/json")) {
    throw new ContentTypeError("Content-Type must be application/json.");
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_JSON_BODY_BYTES) {
    throw new PayloadTooLargeError("Request body exceeds 1MB limit.");
  }

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
  options?: { minLength?: number; maxLength?: number }
): string {
  if (typeof value !== "string") {
    throw new ValidationError(`${fieldName} must be a string.`);
  }

  const normalized = value.trim();
  if (!normalized) {
    throw new ValidationError(`${fieldName} is required.`);
  }

  if (options?.minLength && normalized.length < options.minLength) {
    throw new ValidationError(`${fieldName} must be at least ${options.minLength} characters.`);
  }

  if (options?.maxLength && normalized.length > options.maxLength) {
    throw new ValidationError(`${fieldName} must be at most ${options.maxLength} characters.`);
  }

  return normalized;
}

export function optionalString(value: unknown, fieldName: string, maxLength: number): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  return requireString(value, fieldName, { maxLength });
}

export function requireEnum<T extends string>(value: unknown, fieldName: string, allowed: readonly T[]): T {
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw new ValidationError(`${fieldName} must be one of: ${allowed.join(", ")}.`);
  }
  return value as T;
}

export function requireStringArray(
  value: unknown,
  fieldName: string,
  options?: { minLength?: number; maxItems?: number; maxItemLength?: number }
): string[] {
  if (!Array.isArray(value)) {
    throw new ValidationError(`${fieldName} must be an array.`);
  }

  const normalized = value.map((item) => requireString(item, `${fieldName} item`, { maxLength: options?.maxItemLength ?? 120 }));
  const unique = Array.from(new Set(normalized));

  if (options?.minLength && unique.length < options.minLength) {
    throw new ValidationError(`${fieldName} must contain at least ${options.minLength} item(s).`);
  }

  if (options?.maxItems && unique.length > options.maxItems) {
    throw new ValidationError(`${fieldName} must contain at most ${options.maxItems} item(s).`);
  }

  return unique;
}

export function validateEmail(value: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(value);
}

export function validationErrorResponse(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  return NextResponse.json({ error: "Unexpected validation error." }, { status: 500 });
}

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char]);
}
