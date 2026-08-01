"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import type { SiteLocale } from "../types/locale";

interface NavbarProps {
  locale?: SiteLocale;
}

export default function Navbar({ locale = "en" }: Readonly<NavbarProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const portalAccessUrl = process.env.NEXT_PUBLIC_BE_URL?.trim() || "https://be.zakaa.io/login";
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

  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => link.href);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((href) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Focus management for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuToggleRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusable = menuToggleRef.current?.parentElement?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      menuToggleRef.current?.focus();
    }
  }, [mobileOpen]);

  const scrollTo = useSmoothScroll();
  const handleNav = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  const handlePortalAccess = () => {
    setMobileOpen(false);
    window.location.href = portalAccessUrl;
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
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

          <ul
            className="hidden md:flex items-center gap-2 list-none"
            onKeyDown={(event) => {
              const currentIndex = navLinks.findIndex((l) => l.href === `#${activeSection}`);
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                const next = navLinks[(currentIndex + 1) % navLinks.length];
                const el = document.querySelector(next.href);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                const prev = navLinks[(currentIndex - 1 + navLinks.length) % navLinks.length];
                const el = document.querySelector(prev.href);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  aria-current={activeSection === link.href.substring(1) ? "location" : undefined}
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
                className="zakaa-navbar-control inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm font-semibold text-[#a1a1aa] bg-transparent border border-[rgba(148,163,184,0.1)] hover:bg-[#1a1a24] hover:text-[#e4e4e7] transition-all underline underline-offset-4"
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
            className="zakaa-navbar-control block w-full py-3 text-base font-medium text-[#a1a1aa] border-b border-[rgba(148,163,184,0.06)] underline underline-offset-4"
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
