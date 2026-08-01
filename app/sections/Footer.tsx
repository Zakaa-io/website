"use client";

import BrandLogo from "../components/BrandLogo";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import type { SiteLocale } from "../types/locale";

interface FooterProps {
  locale?: SiteLocale;
}

export default function Footer({ locale = "en" }: Readonly<FooterProps>) {
  const isArabic = locale === "ar";
  const footerLinks = {
    [isArabic ? "الخدمات" : "Services"]: [
      { label: isArabic ? "البنية التحتية السحابية" : "Cloud Infrastructure", href: "#services" },
      { label: "DevOps & CI/CD", href: "#services" },
      { label: isArabic ? "الأمن" : "Security", href: "#services" },
      { label: isArabic ? "الشبكات" : "Networking", href: "#services" },
      { label: isArabic ? "الاستضافة المُدارة" : "Managed Hosting", href: "#services" },
    ],
    [isArabic ? "المنصة" : "Platform"]: [
      { label: isArabic ? "وكلاء الذكاء الاصطناعي" : "AI Agents", href: "#ai" },
      { label: isArabic ? "بوابة العملاء" : "Client Portal", href: "/portal" },
      { label: isArabic ? "توثيق API" : "API Documentation", href: "/docs" },
      { label: isArabic ? "حالة الخدمة" : "Status Page", href: "/status" },
      { label: isArabic ? "سجل التحديثات" : "Changelog", href: "/resources" },
    ],
    [isArabic ? "الشركة" : "Company"]: [
      { label: isArabic ? "تفاصيل الشركة" : "Company Details", href: "/company/details" },
      { label: isArabic ? "من نحن" : "About Us", href: "/company/details" },
      { label: isArabic ? "الوظائف" : "Careers", href: "/company/details" },
      { label: isArabic ? "المدونة" : "Blog", href: "/resources" },
      { label: isArabic ? "دراسات الحالة" : "Case Studies", href: "/case-studies" },
      { label: isArabic ? "تواصل" : "Contact", href: "#contact" },
    ],
    [isArabic ? "قانوني" : "Legal"]: [
      { label: isArabic ? "التفاصيل القانونية" : "Legal Details", href: "/legal/details" },
      { label: isArabic ? "سياسة الخصوصية" : "Privacy Policy", href: "/legal/privacy-policy" },
      { label: isArabic ? "شروط الخدمة" : "Terms of Service", href: "/legal/terms-of-service" },
      { label: "SLA", href: "/legal/sla" },
      { label: isArabic ? "الأمن" : "Security", href: "/legal/security" },
      { label: isArabic ? "الامتثال" : "Compliance", href: "/legal/compliance" },
    ],
  };
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
              <span>{isArabic ? "ذكاء" : "Zakaa"}</span>
            </a>
            <p className="text-[#64748B] text-sm mt-4 leading-relaxed max-w-sm">
              {isArabic
                ? "إدارة بنية تحتية مؤسسية مدعومة بوكلاء ذكاء اصطناعي مستقلين. نبني ونؤمّن ونشغّل الأنظمة التي تدعم أعمالك."
                : "Enterprise IT infrastructure management powered by autonomous AI agents. We build, secure, and operate the systems that power your business."}
            </p>
            <div className="mt-4 text-sm text-[#64748B] space-y-1">
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
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#12121a] border border-[rgba(148,163,184,0.06)] px-3 py-2 text-[#a1a1aa] text-sm no-underline transition-all hover:bg-[#1a1a24] hover:text-[#6366f1] hover:border-[rgba(99,102,241,0.2)]"
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
	                        onClick={() => handleNav(link.href)}
	                        className="text-[#a1a1aa] text-sm no-underline transition-colors hover:text-[#6366f1] bg-transparent border-none cursor-pointer"
	                      >
                        {link.label}
                      </button>
                    ) : (
<a
	                        href={link.href}
	                        className="text-[#a1a1aa] text-sm underline underline-offset-4 transition-colors hover:text-[#6366f1]"
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
          <p className="text-[#64748B] text-xs">
            {isArabic ? "© 2026 ذكاء. جميع الحقوق محفوظة." : "© 2026 Zakaa. All rights reserved."}
          </p>
          <div className="flex gap-6">
            {[
              { label: isArabic ? "الخصوصية" : "Privacy", href: "/legal/privacy-policy" },
              { label: isArabic ? "الشروط" : "Terms", href: "/legal/terms-of-service" },
              { label: isArabic ? "الكوكيز" : "Cookies", href: "/legal/cookies" },
              { label: isArabic ? "خريطة الموقع" : "Sitemap", href: "/sitemap" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#64748B] text-xs underline underline-offset-4 hover:text-[#94A3B8] transition-colors"
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
