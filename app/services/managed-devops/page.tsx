import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import SolutionPage from "../../components/SolutionPage";


export const metadata: Metadata = generateMetadata({ label: "Service", title: "Managed DevOps & CI/CD", description: "Scale secure software delivery with automation, release governance, and continuous quality controls." });
export default function ManagedDevOpsPage() {
  return (
    <SolutionPage
      label="Service"
      title="Managed DevOps & CI/CD"
      subtitle="Scale secure software delivery with automation, release governance, and continuous quality controls."
      problem="Teams struggle with inconsistent release quality, manual deployment tasks, and limited operational visibility."
      approach={[
        "CI/CD pipeline engineering with policy gates, environment controls, and release automation.",
        "Infrastructure-as-Code lifecycle management with reusable templates and review flows.",
        "Observability-driven release operations with incident feedback into delivery pipelines.",
      ]}
      outcomes={[
        "Faster and safer releases",
        "Lower deployment failure rates",
        "Higher engineering throughput with stronger governance",
      ]}
    />
  );
}
