const siteRoutes = [
  "/",
  "/portal",
  "/internal/analytics",
  "/case-studies",
  "/trust",
  "/partners",
  "/resources",
  "/status",
  "/docs",
  "/sandbox",
  "/products/ai-ops-copilot",
  "/services/cloud-migration",
  "/services/managed-devops",
  "/services/managed-security-soc",
  "/services/finops-cost-optimization",
  "/services/dr-bcp",
  "/industries/finance",
  "/industries/healthcare",
  "/industries/public-sector",
  "/industries/retail-logistics",
  "/company/details",
  "/legal/details",
  "/legal/privacy-policy",
  "/legal/terms-of-service",
  "/legal/sla",
  "/legal/security",
  "/legal/compliance",
  "/legal/cookies",
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Sitemap</h1>
        <p className="text-sm text-[#CBD5E1]">Quick links to key public pages and policy pages.</p>
        <ul className="space-y-2">
          {siteRoutes.map((route) => (
            <li key={route}>
              <a className="text-sm text-[#60A5FA] hover:underline" href={route}>
                {route}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
