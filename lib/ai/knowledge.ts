interface KnowledgeEntry {
  id: string;
  title: string;
  body: string;
  tags: string[];
}

const entries: KnowledgeEntry[] = [
  {
    id: "services-cloud",
    title: "Cloud and Infrastructure Services",
    body: "Zakaa designs and manages multi-cloud architecture across AWS, Azure, and GCP. We deliver Terraform-managed infrastructure, autoscaling, resilience, and cost optimization.",
    tags: ["cloud", "aws", "azure", "gcp", "terraform", "infrastructure"],
  },
  {
    id: "services-devops",
    title: "DevOps and CI/CD",
    body: "Zakaa builds GitOps and CI/CD pipelines with Kubernetes, ArgoCD, and Docker. Teams get faster and safer deployments with observability and rollback workflows.",
    tags: ["devops", "cicd", "kubernetes", "argocd", "docker", "gitops"],
  },
  {
    id: "services-security",
    title: "Security and Compliance",
    body: "Zakaa supports zero-trust architecture, vulnerability management, SIEM integration, and readiness for SOC 2 and ISO 27001.",
    tags: ["security", "compliance", "siem", "soc2", "iso27001", "zero trust"],
  },
  {
    id: "services-managed-hosting",
    title: "Managed Hosting",
    body: "Zakaa offers dedicated servers, colocation, VPS clusters, and managed database operations with 24/7 monitoring and SLA-backed support.",
    tags: ["hosting", "servers", "dbaas", "colocation", "noc", "sla"],
  },
  {
    id: "services-aiops",
    title: "AI Operations Agents",
    body: "Zakaa AI agents monitor, diagnose, and remediate incidents. The workflow includes continuous monitoring, intelligent diagnosis, auto-remediation, and a complete audit trail.",
    tags: ["ai", "agents", "monitoring", "remediation", "rag", "automation"],
  },
  {
    id: "contact-details",
    title: "Contact and Location",
    body: "Contact Zakaa at hello@zakaa.io or +20 1000 292 919 and +20 1234 522 055. Office location: 5th Settlement, Cairo, Egypt.",
    tags: ["contact", "email", "phone", "cairo", "egypt"],
  },
  {
    id: "engagement-model",
    title: "Getting Started",
    body: "Prospects can request a free infrastructure assessment. Zakaa engineers review the current setup and deliver a practical roadmap without sales pressure.",
    tags: ["assessment", "onboarding", "roadmap", "consultation"],
  },
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

export function retrieveKnowledge(query: string, limit = 3): KnowledgeEntry[] {
  const queryTokens = new Set(tokenize(query));

  const scored = entries
    .map((entry) => {
      const entryTokens = [...tokenize(entry.title), ...tokenize(entry.body), ...entry.tags];
      let score = 0;
      for (const token of entryTokens) {
        if (queryTokens.has(token.toLowerCase())) score += 1;
      }
      return { entry, score };
    })
    .sort((a, b) => b.score - a.score);

  const best = scored.filter((item) => item.score > 0).slice(0, limit).map((item) => item.entry);
  if (best.length > 0) return best;

  return entries.slice(0, limit);
}
