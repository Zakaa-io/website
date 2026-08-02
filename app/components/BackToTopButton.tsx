"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const headerHeight = 72;

      setVisible(scrollTop > headerHeight);

      const scrollable = pageHeight - viewportHeight;
      const p = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Back to home"
      title="Back to home"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-[1100] inline-flex items-center justify-center rounded-full border border-[rgba(239,68,68,0.5)] bg-[#06060a] shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all hover:scale-110 hover:border-[rgba(239,68,68,0.7)]"
      style={{ width: 48, height: 48, padding: 0 }}
    >
      <svg className="absolute inset-0" width="48" height="48" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="rgba(239,68,68,0.15)"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeDasharray={2 * Math.PI * 22}
          strokeDashoffset={2 * Math.PI * 22 * (1 - progress)}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <ArrowUp size={20} className="relative z-10 text-[#e4e4e7]" />
    </button>
  );
}
