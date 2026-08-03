import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";


export const metadata: Metadata = generateMetadata({ label: "Legal", title: "Cookies", description: "Cookie usage policy for Zakaa website and services." });
export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-24 text-[#F8FAFC]">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Cookies</h1>
        <p className="text-sm text-[#94A3B8]">Last updated: August 3, 2026</p>
        <p className="text-sm text-[#CBD5E1]">
          Zakaa uses essential cookies for session continuity, security, and basic site experience.
          Optional analytics cookies may be used to improve performance and usability.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#CBD5E1]">
          <li>Essential cookies support login/session and secure operations.</li>
          <li>Analytics cookies help understand usage trends at an aggregated level.</li>
          <li>Cookie behavior may vary by client environment and consent settings.</li>
        </ul>
      </div>
    </main>
  );
}
