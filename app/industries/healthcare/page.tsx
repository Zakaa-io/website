import SolutionPage from "../../components/SolutionPage";

export default function HealthcareIndustryPage() {
  return (
    <SolutionPage
      label="Industry Solution"
      title="Healthcare"
      subtitle="Reliable and secure infrastructure for clinical systems, patient platforms, and digital care operations."
      problem="Healthcare providers must protect sensitive data while maintaining high availability for critical care workflows."
      approach={[
        "Secure architecture with strict access controls and segmentation.",
        "Operational monitoring for healthcare applications and dependent integrations.",
        "Continuity and recovery planning for mission-critical patient services.",
      ]}
      outcomes={[
        "Higher reliability for care delivery platforms",
        "Improved data protection posture",
        "Faster incident response across clinical operations",
      ]}
    />
  );
}
