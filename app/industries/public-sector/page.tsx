import SolutionPage from "../../components/SolutionPage";

export default function PublicSectorIndustryPage() {
  return (
    <SolutionPage
      label="Industry Solution"
      title="Public Sector"
      subtitle="Sovereign-ready digital infrastructure for citizen services, high-scale operations, and secure modernization."
      problem="Public institutions need resilient platforms that meet data governance and service continuity requirements at national scale."
      approach={[
        "Sovereignty-conscious architecture and tenant isolation controls.",
        "Automation-first service operations for citizen-facing systems.",
        "Transparent monitoring, audit trails, and incident communication processes.",
      ]}
      outcomes={[
        "Improved service continuity for public platforms",
        "Better governance and operational transparency",
        "Scalable modernization with controlled risk",
      ]}
    />
  );
}
