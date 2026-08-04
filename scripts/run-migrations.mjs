import { readdir, readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!(key in process.env)) {
          process.env[key] = value;
        }
      }
    }
  } catch {
    // ignore missing env file
  }
}

loadEnv(path.resolve(__dirname, "..", ".env.local"));
loadEnv(path.resolve(__dirname, "..", ".env"));

const MIGRATIONS_DIR = path.resolve(__dirname, "..", "db", "migrations");

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to run migrations.");
  }

  const ssl =
    process.env.DATABASE_SSL_MODE === "disable"
      ? false
      : {
          rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "true",
        };

  return new Pool({ connectionString, ssl });
}

async function listMigrationFiles() {
  const entries = await readdir(MIGRATIONS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function ensureMigrationsTable(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function getAppliedVersions(pool) {
  const result = await pool.query("SELECT version FROM schema_migrations");
  return new Set(result.rows.map((row) => row.version));
}

async function applyMigration(pool, version) {
  const migrationPath = path.join(MIGRATIONS_DIR, version);
  const sql = await readFile(migrationPath, "utf8");

  await pool.query("BEGIN");
  try {
    await pool.query(sql);
    await pool.query("INSERT INTO schema_migrations (version) VALUES ($1)", [version]);
    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
}

async function run() {
  const verifyOnly = process.argv.includes("--verify-only");
  const pool = getPool();

  try {
    await ensureMigrationsTable(pool);
    const files = await listMigrationFiles();
    const appliedVersions = await getAppliedVersions(pool);
    const pending = files.filter((file) => !appliedVersions.has(file));

    if (pending.length === 0) {
      console.log("No pending migrations.");
      return;
    }

    if (verifyOnly) {
      throw new Error(`Pending migrations detected: ${pending.join(", ")}`);
    }

    for (const version of pending) {
      console.log(`Applying migration: ${version}`);
      await applyMigration(pool, version);
    }

    console.log(`Applied ${pending.length} migration(s).`);
  } finally {
    await pool.end();
  }
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`MIGRATION FAILED: ${message}`);
  process.exit(1);
});
