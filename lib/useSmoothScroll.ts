"use client";

import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollTo = useCallback((href: string): boolean => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    // Fallback: scroll to top if the target is missing
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  }, []);

  return scrollTo;
}