"use client";

import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";
import type { SiteLocale } from "../types/locale";

const reviews = [
  {
    text: "Zakaa reduced our infrastructure costs by 42% in the first quarter. Their AI agents caught a memory leak we'd been chasing for weeks — at 3 AM, without waking anyone.",
    name: "Sarah Kim",
    role: "CTO, FinTechScale",
    initials: "SK",
  },
  {
    text: "We migrated 200+ VMs to Kubernetes in 6 weeks with zero downtime. The DevOps automation they built saves our team 30 hours per week on deployments.",
    name: "Marcus Rivera",
    role: "VP Engineering, HealthCloud",
    initials: "MR",
  },
  {
    text: "The security audit revealed 14 critical vulnerabilities our previous provider missed. Within 48 hours, everything was patched and documented for our SOC 2 audit.",
    name: "James Liu",
    role: "CISO, DataVault Inc",
    initials: "JL",
  },
];

interface TestimonialsProps {
  locale?: SiteLocale;
}

export default function Testimonials({ locale = "en" }: Readonly<TestimonialsProps>) {
  const isArabic = locale === "ar";
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label={isArabic ? "موثوق من" : "Trusted By"}
          title={
            <>
              {isArabic ? "ماذا يقول " : "What Our "}<span className="accent-text">{isArabic ? "عملاؤنا" : "Clients Say"}</span>
            </>
          }
          subtitle={
            isArabic
              ? "فرق مؤسسية طورت بنيتها التحتية مع ذكاء."
              : "Enterprise teams that transformed their infrastructure with Zakaa."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <FadeIn key={review.name} delay={i * 150}>
              <div className="bg-[#111827] border border-[rgba(148,163,184,0.08)] rounded-2xl p-8 transition-all duration-300 hover:border-[rgba(148,163,184,0.12)] hover:-translate-y-0.5 h-full flex flex-col">
                <div className="text-[#F59E0B] text-base mb-4">★★★★★</div>
                <p className="text-[#94A3B8] text-[0.95rem] leading-relaxed mb-6 italic flex-1">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#3B82F6] flex items-center justify-center font-bold text-white text-sm">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{review.name}</h4>
                    <p className="text-xs text-[#64748B]">{review.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
