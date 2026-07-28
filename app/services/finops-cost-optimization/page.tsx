import SolutionPage from "../../components/SolutionPage";

export default function FinopsPage() {
  return (
    <SolutionPage
      label="Service"
      title="FinOps & Cost Optimization"
      subtitle="Establish cloud cost visibility, accountability, and continuous optimization at engineering speed."
      problem="Cloud spend grows without governance, leading to overprovisioning and unpredictable cost outcomes."
      approach={[
        "Baseline cost observability across teams, services, and environments.",
        "Rightsizing, commitment strategies, and waste reduction playbooks.",
        "Cost governance integrated into engineering and release processes.",
      ]}
      outcomes={[
        "Lower monthly cloud costs with measurable savings",
        "Improved budget predictability",
        "Operational accountability between finance and engineering teams",
      ]}
    />
  );
}
