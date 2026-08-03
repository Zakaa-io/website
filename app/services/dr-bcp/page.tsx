import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import SolutionPage from "../../components/SolutionPage";


export const metadata: Metadata = generateMetadata({ label: "Service", title: "Disaster Recovery & Business Continuity", description: "Design resilient recovery architecture that protects mission-critical services and business outcomes." });
export default function DrBcpPage() {
  return (
    <SolutionPage
      label="Service"
      title="Disaster Recovery & Business Continuity"
      subtitle="Design resilient recovery architecture that protects mission-critical services and business outcomes."
      problem="Unplanned outages expose revenue, customer trust, and compliance obligations when recovery plans are not production-ready."
      approach={[
        "Business impact and dependency mapping to define realistic RTO/RPO targets.",
        "Multi-region backup and recovery architecture with automated failover playbooks.",
        "Recovery drills, validation, and executive continuity reporting.",
      ]}
      outcomes={[
        "Reduced downtime impact during disruptions",
        "Tested and repeatable continuity operations",
        "Stronger confidence for customers, regulators, and leadership",
      ]}
    />
  );
}
