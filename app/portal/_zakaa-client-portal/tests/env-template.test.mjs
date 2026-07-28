import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

test("env example includes required auth variables", async () => {
  const envPath = resolve(process.cwd(), ".env.example");
  const content = await readFile(envPath, "utf8");
  const requiredKeys = [
    "SESSION_SECRET",
    "SESSION_MAX_AGE_SECONDS",
    "AUTH_CLIENT_ADMIN_EMAIL",
    "AUTH_CLIENT_ADMIN_PASSWORD",
    "AUTH_CLIENT_USER_EMAIL",
    "AUTH_CLIENT_USER_PASSWORD",
  ];

  for (const key of requiredKeys) {
    assert.ok(content.includes(`${key}=`), `Missing ${key} in .env.example`);
  }
});
