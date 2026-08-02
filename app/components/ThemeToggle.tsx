"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { SiteLocale } from "../types/locale";

type ThemeMode = "dark" | "light";

interface ThemeToggleProps {
  locale?: SiteLocale;
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("zakaa-theme", theme);
}

export default function ThemeToggle({ locale = "en" }: Readonly<ThemeToggleProps>) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const isArabic = locale === "ar";

  useEffect(() => {
    const active = document.documentElement.getAttribute("data-theme");
    if (active === "light" || active === "dark") {
      setTheme(active);
      return;
    }

    const stored = localStorage.getItem("zakaa-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultTheme: ThemeMode = preferredDark ? "dark" : "light";
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
  }, []);

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isArabic ? "تبديل الوضع الداكن والفاتح" : "Toggle dark and light mode"}
      className="zakaa-navbar-control inline-flex items-center gap-2 rounded-[10px] border border-[rgba(148,163,184,0.1)] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#94A3B8] transition-all hover:bg-[#1a1a24] hover:text-[#e4e4e7]"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span>{isArabic ? (theme === "dark" ? "فاتح" : "داكن") : theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
