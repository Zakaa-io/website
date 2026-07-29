"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
import type { SiteLocale } from "../types/locale";

interface NavbarProps {
  locale?: SiteLocale;
}

export default function Navbar({ locale = "en" }: Readonly<NavbarProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const portalAccessUrl = process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL?.trim() || "https://portal.zakaa.io/login";
  const isArabic = locale === "ar";
  const navLinks = [
    { label: isArabic ? "الخدمات" : "Services", href: "#services" },
    { label: isArabic ? "وكلاء الذكاء الاصطناعي" : "AI Agents", href: "#ai" },
    { label: isArabic ? "آلية العمل" : "Process", href: "#process" },
    { label: isArabic ? "العملاء" : "Clients", href: "#testimonials" },
    { label: isArabic ? "الأسعار" : "Pricing", href: "#pricing" },
    { label: isArabic ? "المنتجات" : "Products", href: "#phase3" },
  ];
  const langSwitchHref = isArabic ? "/" : "/ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePortalAccess = () => {
    setMobileOpen(false);
    window.location.href = portalAccessUrl;
  };

  return (
    <>
      <nav
        className={`zakaa-navbar fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-300 ${
          scrolled
            ? "bg-[#06060a]/95 border-[rgba(99,102,241,0.1)]"
            : "bg-[#06060a]/80 border-[rgba(148,163,184,0.06)]"
        } backdrop-blur-xl`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
          <a
            href="#"
            className="flex items-center gap-3 font-extrabold text-xl tracking-tight text-[#F8FAFC] no-underline"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <BrandLogo size="md" />
            <span>{isArabic ? "ذكاء" : "Zakaa"}</span>
          </a>

          <ul className="hidden md:flex items-center gap-2 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="zakaa-navbar-control text-sm font-medium text-[#a1a1aa] px-4 py-2 rounded-lg transition-all hover:text-[#e4e4e7] hover:bg-[#1a1a24] bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle locale={locale} />
<a
                href={langSwitchHref}
                className="zakaa-navbar-control inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm font-semibold text-[#a1a1aa] bg-transparent border border-[rgba(148,163,184,0.1)] hover:bg-[#1a1a24] hover:text-[#e4e4e7] transition-all no-underline"
            >
              {isArabic ? "English" : "العربية"}
            </a>
            <button
              onClick={handlePortalAccess}
              className="zakaa-navbar-control inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-[#a1a1aa] bg-transparent border border-[rgba(148,163,184,0.1)] hover:bg-[#1a1a24] hover:text-[#e4e4e7] transition-all cursor-pointer"
            >
              {isArabic ? "دخول البوابة" : "Portal Access"}
            </button>
            <button
              onClick={() => handleNav("#contact")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {isArabic ? "ابدأ الآن" : "Get Started"}
            </button>
          </div>

          <button
            className="zakaa-navbar-menu-toggle md:hidden bg-transparent border-none text-[#e4e4e7] text-2xl cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={isArabic ? "تبديل القائمة" : "Toggle menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-[#0c0c12] border-b border-[rgba(148,163,184,0.06)] px-6 py-4 z-[999] md:hidden">
          {navLinks.map((link) => (
<button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="zakaa-navbar-control block w-full text-left py-3 text-base font-medium text-[#a1a1aa] border-b border-[rgba(148,163,184,0.06)] last:border-none bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
<button
              onClick={handlePortalAccess}
              className="zakaa-navbar-control block w-full text-left py-3 text-base font-medium text-[#a1a1aa] border-b border-[rgba(148,163,184,0.06)] bg-transparent border-none cursor-pointer"
          >
            {isArabic ? "دخول البوابة" : "Portal Access"}
          </button>
          <a
            href={langSwitchHref}
            className="zakaa-navbar-control block w-full py-3 text-base font-medium text-[#a1a1aa] border-b border-[rgba(148,163,184,0.06)] no-underline"
          >
            {isArabic ? "English" : "العربية"}
          </a>
          <div className="py-3 border-b border-[rgba(148,163,184,0.08)]">
            <ThemeToggle locale={locale} />
          </div>
          <button
            onClick={() => handleNav("#contact")}
            className="block w-full text-left py-3 text-base font-medium text-[#a1a1aa] bg-transparent border-none cursor-pointer"
          >
            {isArabic ? "ابدأ الآن" : "Get Started"}
          </button>
        </div>
      )}
    </>
  );
}
