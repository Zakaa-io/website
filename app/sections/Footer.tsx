"use client";

import BrandLogo from "../components/BrandLogo";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

const footerLinks = {
  Services: [
    { label: "Cloud Infrastructure", href: "#services" },
    { label: "DevOps & CI/CD", href: "#services" },
    { label: "Security", href: "#services" },
    { label: "Networking", href: "#services" },
    { label: "Managed Hosting", href: "#services" },
  ],
  Platform: [
    { label: "AI Agents", href: "#ai" },
    { label: "Client Portal", href: "/portal" },
    { label: "API Documentation", href: "/docs" },
    { label: "Status Page", href: "/status" },
    { label: "Changelog", href: "/resources" },
  ],
  Company: [
    { label: "Company Details", href: "/company/details" },
    { label: "About Us", href: "/company/details" },
    { label: "Careers", href: "/company/details" },
    { label: "Blog", href: "/resources" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Legal Details", href: "/legal/details" },
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
    { label: "SLA", href: "/legal/sla" },
    { label: "Security", href: "/legal/security" },
    { label: "Compliance", href: "/legal/compliance" },
  ],
};

export default function Footer() {
  const scrollTo = useSmoothScroll();
  const handleNav = (href: string) => {
    if (href.startsWith("#")) {
      scrollTo(href);
    }
  };

  return (
    <footer className="bg-[#06060a] border-t border-[rgba(148,163,184,0.06)] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <a
               href="#"
               className="flex items-center gap-3 font-extrabold text-lg tracking-tight text-[#e4e4e7] no-underline"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <BrandLogo size="sm" />
              <span>Zakaa</span>
            </a>
            <p className="text-[#94A3B8] text-sm mt-4 leading-relaxed max-w-sm">
              Enterprise IT infrastructure management powered by autonomous AI agents. We build, secure, and operate the systems that power your business.
            </p>
            <div className="mt-4 text-sm text-[#94A3B8] space-y-1">
              <p>📧 hello@zakaa.io</p>
              <p>📞 +20 1000 292 919</p>
              <p>📞 +20 1234 522 055</p>
              <p>📍 5th Settlement — Cairo — Egypt</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {[
                { icon: "𝕏", platform: "X" },
                { icon: "in", platform: "LinkedIn" },
                { icon: "gh", platform: "GitHub" },
                { icon: "dc", platform: "Discord" },
              ].map((item) => (
                <a
                  key={item.platform}
                  href="#"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#12121a] border border-[rgba(148,163,184,0.06)] px-3 py-2 text-[#94A3B8] text-sm no-underline transition-all hover:bg-[#1a1a24] hover:text-[#6366f1] hover:border-[rgba(99,102,241,0.2)]"
                  aria-label={`${item.platform} zakaa-ai`}
                >
                  <span className="font-semibold">{item.icon}</span>
                  <span className="text-xs">zakaa-ai</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold mb-5 text-[#e4e4e7]">{title}</h4>
              <ul className="list-none">
                {links.map((link) => (
                  <li key={link.label} className="mb-2.5">
                    {link.href.startsWith("#") ? (
                      <button
                        type="button"
                        onClick={() => handleNav(link.href)}
                        className="text-[#94A3B8] text-sm transition-colors hover:text-[#6366f1] bg-transparent border-none cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[#94A3B8] text-sm transition-colors hover:text-[#6366f1]"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgba(148,163,184,0.08)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#94A3B8] text-xs">
            © 2026 Zakaa. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Privacy", href: "/legal/privacy-policy" },
              { label: "Terms", href: "/legal/terms-of-service" },
              { label: "Cookies", href: "/legal/cookies" },
              { label: "Sitemap", href: "/sitemap" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#94A3B8] text-xs hover:text-[#94A3B8] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
