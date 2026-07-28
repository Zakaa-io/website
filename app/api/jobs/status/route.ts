import { NextResponse } from "next/server";
import { getJob } from "@/lib/jobs/queue";
import { readJsonRecord, requireString, validationErrorResponse } from "@/lib/server/validation";

export async function POST(request: Request) {
  try {
    const payload = await readJsonRecord(request);
    const jobId = requireString(payload.jobId, "jobId", { minLength: 8, maxLength: 80 });
    const job = getJob(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }
    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return validationErrorResponse(error);
  }
}
