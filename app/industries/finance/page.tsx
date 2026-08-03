import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import SolutionPage from "../../components/SolutionPage";


export const metadata: Metadata = generateMetadata({ label: "Industry Solution", title: "Financial Services", description: "Secure, low-latency, compliant infrastructure for digital banking, fintech platforms, and payment systems." });
export default function FinanceIndustryPage() {
  return (
    <SolutionPage
      label="Industry Solution"
      title="Financial Services"
      subtitle="Secure, low-latency, compliant infrastructure for digital banking, fintech platforms, and payment systems."
      problem="Financial organizations require strict governance and uptime while handling fast-changing transaction volumes."
      approach={[
        "Compliance-aware cloud architecture and secure workload segmentation.",
        "High-availability patterns for core APIs, payment services, and reporting layers.",
        "Security operations and fraud-signal integrations for continuous risk monitoring.",
      ]}
      outcomes={[
        "Stronger service resilience and audit readiness",
        "Improved release confidence for regulated workloads",
        "Operational efficiency under strict compliance controls",
      ]}
    />
  );
}
