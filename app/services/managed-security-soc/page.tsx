import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import SolutionPage from "../../components/SolutionPage";


export const metadata: Metadata = generateMetadata({ label: "Service", title: "Managed Security Operations (SOC)", description: "24/7 threat monitoring, triage, and response operations with expert and AI-assisted workflows." });
export default function ManagedSecuritySocPage() {
  return (
    <SolutionPage
      label="Service"
      title="Managed Security Operations (SOC)"
      subtitle="24/7 threat monitoring, triage, and response operations with expert and AI-assisted workflows."
      problem="Security teams face alert fatigue, fragmented tooling, and slow response times for high-impact threats."
      approach={[
        "Centralized telemetry ingestion with use-case tuning and continuous detection engineering.",
        "Tiered triage and incident response workflows mapped to business-critical assets.",
        "Executive and operational reporting for compliance and risk visibility.",
      ]}
      outcomes={[
        "Reduced MTTD and MTTR across critical incidents",
        "Improved audit readiness and security governance",
        "Sustained 24/7 protection without overloading internal teams",
      ]}
    />
  );
}
