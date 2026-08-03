import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import SolutionPage from "../../components/SolutionPage";


export const metadata: Metadata = generateMetadata({ label: "Service", title: "Cloud Migration & Modernization", description: "Move critical workloads from legacy environments to resilient, governed cloud architectures." });
export default function CloudMigrationPage() {
  return (
    <SolutionPage
      label="Service"
      title="Cloud Migration & Modernization"
      subtitle="Move critical workloads from legacy environments to resilient, governed cloud architectures."
      problem="Legacy systems increase delivery risk, cost, and operational overhead while slowing digital transformation."
      approach={[
        "Discovery-led migration planning with dependency mapping and wave-based cutover strategy.",
        "Landing-zone architecture for identity, networking, observability, and policy governance.",
        "Application and data migration with rollback-ready deployment controls.",
      ]}
      outcomes={[
        "Reduced migration risk and controlled cutover windows",
        "Improved reliability and cloud readiness for growth",
        "Lower operational complexity post-migration",
      ]}
    />
  );
}
