"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import type { SiteLocale } from "../types/locale";

interface BackToTopButtonProps {
  locale?: SiteLocale;
}

export default function BackToTopButton({ locale = "en" }: Readonly<BackToTopButtonProps>) {
  const isArabic = locale === "ar";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setVisible(viewportBottom >= pageHeight - 280);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={isArabic ? "العودة للأعلى" : "Back to top"}
      title={isArabic ? "العودة للأعلى" : "Back to top"}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-[1100] inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(59,130,246,0.45)] bg-[#3B82F6] text-white shadow-[0_10px_30px_rgba(59,130,246,0.38)] transition-all hover:-translate-y-0.5 hover:bg-[#2563EB]"
    >
      <ArrowUp size={18} />
    </button>
  );
}
