import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";


export const metadata: Metadata = generateMetadata({ label: "Legal", title: "Service Level Agreement", description: "SLA targets, response objectives, and uptime commitments." });
export default function SlaPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Service Level Agreement (SLA)</h1>
        <p className="text-sm text-[#94A3B8]">Last updated: August 3, 2026</p>
        <p className="text-sm text-[#CBD5E1]">
          SLA targets are defined by support tier and contract scope. Standard engagements include
          uptime and incident-response commitments with transparent reporting.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
          <li>Target uptime commitments are specified in each signed contract.</li>
          <li>Priority-based response and resolution objectives apply to support tickets.</li>
          <li>Maintenance windows are communicated in advance.</li>
          <li>Performance and incident summaries are available upon request.</li>
        </ul>
      </div>
    </main>
  );
}
