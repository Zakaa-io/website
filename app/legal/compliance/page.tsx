import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";


export const metadata: Metadata = generateMetadata({ label: "Legal", title: "Compliance", description: "Compliance practices for Zakaa service delivery and regulated sectors." });
export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Compliance</h1>
        <p className="text-sm text-[#94A3B8]">Last updated: August 3, 2026</p>
        <p className="text-sm text-[#CBD5E1]">
          Zakaa aligns service delivery with client-specific compliance requirements and regulatory
          expectations applicable to each engagement.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
          <li>Documented operating procedures for managed services.</li>
          <li>Controlled access and auditability for sensitive operations.</li>
          <li>Retention and handling policies aligned with contract terms.</li>
          <li>Compliance evidence support during client audits.</li>
        </ul>
      </div>
    </main>
  );
}
