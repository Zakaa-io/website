import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

import SolutionPage from "../../components/SolutionPage";


export const metadata: Metadata = generateMetadata({ label: "Industry Solution", title: "Retail & Logistics", description: "Elastic, observable infrastructure for digital commerce, omnichannel operations, and supply-chain reliability." });
export default function RetailLogisticsIndustryPage() {
  return (
    <SolutionPage
      label="Industry Solution"
      title="Retail & Logistics"
      subtitle="Elastic, observable infrastructure for digital commerce, omnichannel operations, and supply-chain reliability."
      problem="Retail and logistics operations face volatile demand, distributed systems complexity, and uptime-sensitive customer journeys."
      approach={[
        "Scalable cloud architecture for peak events and distributed fulfillment systems.",
        "Real-time observability and incident automation across order-to-delivery workflows.",
        "Cost governance strategies aligned with seasonal and campaign demand.",
      ]}
      outcomes={[
        "Improved platform performance during demand spikes",
        "Faster recovery from operational incidents",
        "Better cost control across variable workloads",
      ]}
    />
  );
}
