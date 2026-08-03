const siteRoutes = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "AI Agents", href: "/#ai" },
  { label: "Process", href: "/#process" },
  { label: "Clients", href: "/#testimonials" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Products", href: "/#phase3" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Trust Center", href: "/trust" },
  { label: "Partners", href: "/partners" },
  { label: "Resources", href: "/resources" },
  { label: "Documentation", href: "/docs" },
  { label: "Service Status", href: "/status" },
  { label: "Request Sandbox", href: "/sandbox" },
  { label: "AI Ops Copilot", href: "/products/ai-ops-copilot" },
  { label: "Cloud Migration", href: "/services/cloud-migration" },
  { label: "Managed DevOps", href: "/services/managed-devops" },
  { label: "Managed Security (SOC)", href: "/services/managed-security-soc" },
  { label: "FinOps & Cost Optimization", href: "/services/finops-cost-optimization" },
  { label: "Disaster Recovery", href: "/services/dr-bcp" },
  { label: "Financial Services", href: "/industries/finance" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Public Sector", href: "/industries/public-sector" },
  { label: "Retail & Logistics", href: "/industries/retail-logistics" },
  { label: "Company Details", href: "/company/details" },
  { label: "Legal Details", href: "/legal/details" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "SLA", href: "/legal/sla" },
  { label: "Security", href: "/legal/security" },
  { label: "Compliance", href: "/legal/compliance" },
  { label: "Cookies", href: "/legal/cookies" },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Sitemap</h1>
        <p className="text-sm text-[#CBD5E1]">Quick links to key public pages and policy pages.</p>
        <ul className="space-y-2">
          {siteRoutes.map((route) => (
            <li key={route.href}>
              <a className="text-sm text-[#60A5FA] hover:underline" href={route.href}>
                {route.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
