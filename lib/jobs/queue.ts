import { randomUUID } from "node:crypto";
import type { AsyncJobType } from "@/types/ai";

type QueueStatus = "queued" | "running" | "completed" | "failed";

interface QueueEntry {
  id: string;
  type: AsyncJobType;
  status: QueueStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  result?: unknown;
  error?: string;
}

interface QueueTask {
  id: string;
  execute: () => Promise<unknown>;
}

const entries = new Map<string, QueueEntry>();
const pendingTaskIds: string[] = [];
const queuedTasks = new Map<string, QueueTask>();
const maxEntries = 500;
const retentionMs = 6 * 60 * 60 * 1000;
let workerActive = false;

function nowIso(): string {
  return new Date().toISOString();
}

function pruneEntries(nowMs: number) {
  const candidates = [...entries.values()]
    .filter((entry) => entry.status === "completed" || entry.status === "failed")
    .sort((a, b) => new Date(a.completedAt ?? a.createdAt).getTime() - new Date(b.completedAt ?? b.createdAt).getTime());

  for (const entry of candidates) {
    if (entries.size <= maxEntries) break;
    entries.delete(entry.id);
  }

  for (const entry of [...entries.values()]) {
    const completedAtMs = entry.completedAt ? new Date(entry.completedAt).getTime() : null;
    if (completedAtMs && nowMs - completedAtMs > retentionMs) {
      entries.delete(entry.id);
    }
  }
}

async function runWorkerLoop() {
  if (workerActive) return;
  workerActive = true;
  try {
    while (pendingTaskIds.length > 0) {
      const nextId = pendingTaskIds.shift();
      if (!nextId) continue;

      const task = queuedTasks.get(nextId);
      const entry = entries.get(nextId);
      if (!task || !entry) continue;

      entry.status = "running";
      entry.startedAt = nowIso();

      try {
        const result = await task.execute();
        entry.status = "completed";
        entry.completedAt = nowIso();
        entry.result = result;
      } catch (error) {
        entry.status = "failed";
        entry.completedAt = nowIso();
        entry.error = error instanceof Error ? error.message : String(error);
      } finally {
        queuedTasks.delete(nextId);
      }
    }
  } finally {
    workerActive = false;
    pruneEntries(Date.now());
  }
}

export function enqueueJob(input: { type: AsyncJobType; execute: () => Promise<unknown> }): QueueEntry {
  const id = randomUUID();
  const entry: QueueEntry = {
    id,
    type: input.type,
    status: "queued",
    createdAt: nowIso(),
  };
  entries.set(id, entry);
  queuedTasks.set(id, { id, execute: input.execute });
  pendingTaskIds.push(id);
  pruneEntries(Date.now());
  void runWorkerLoop();
  return entry;
}

export function getJob(jobId: string): QueueEntry | null {
  return entries.get(jobId) ?? null;
}
