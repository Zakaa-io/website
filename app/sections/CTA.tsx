"use client";

import { useState } from "react";
import AssessmentWizard from "../components/AssessmentWizard";
import FadeIn from "../components/FadeIn";
import LeadForm from "../components/LeadForm";
import SectionLabel from "../components/SectionLabel";
import type { AssistantLanguage } from "@/types/ai";
import type { SiteLocale } from "../types/locale";

interface CTAProps {
  locale?: SiteLocale;
}

export default function CTA({ locale = "en" }: Readonly<CTAProps>) {
  const isArabic = locale === "ar";
  const [assessmentLanguage, setAssessmentLanguage] = useState<AssistantLanguage>(isArabic ? "ar" : "en");

  const openChat = () => {
    window.dispatchEvent(new Event("zakaa:open-ai-chat"));
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden border-y border-[rgba(148,163,184,0.08)] bg-[#0c0c12]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        <FadeIn>
          <SectionLabel text={isArabic ? "جاهز للتحول؟" : "Ready to Transform?"} />
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight mb-5">
            {isArabic ? "احصل على تقييم مجاني لـ" : "Get a Free Infrastructure"}
            <br />
            <span className="accent-text">{isArabic ? "بنيتك التحتية" : "Assessment"}</span>
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-[#94A3B8] text-lg mb-10">
            {isArabic
              ? "سيقوم مهندسونا بتدقيق بيئتك الحالية وتقديم خارطة طريق مفصلة — بدون التزام وبدون ضغط بيعي."
              : "Our engineers will audit your current setup and deliver a detailed roadmap — no commitment, no sales pressure."}
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
href="#assessment-form"
	               className="inline-flex items-center gap-2 px-9 py-4 rounded-[10px] text-base font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all no-underline"
            >
              <span>{isArabic ? "احجز تقييمك" : "Book Your Assessment"}</span>
              <span>→</span>
            </a>
<button
	                type="button"
	                onClick={openChat}
	                className="inline-flex items-center gap-2 px-9 py-4 rounded-[10px] text-base font-semibold text-[#a1a1aa] bg-transparent border border-[rgba(148,163,184,0.1)] hover:bg-[#1a1a24] hover:text-[#e4e4e7] transition-all no-underline"
            >
              {isArabic ? "تحدث مع مهندس" : "Talk to an Engineer"}
            </button>
          </div>
        </FadeIn>
        <FadeIn delay={350}>
          <div id="assessment-form" className="mt-10 space-y-4">
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setAssessmentLanguage("en")}
className={`rounded-md px-3 py-1.5 text-xs ${
	                   assessmentLanguage === "en"
	                     ? "bg-[#6366f1] text-white"
	                     : "bg-[#12121a] text-[#a1a1aa] border border-[rgba(148,163,184,0.14)]"
	                   }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setAssessmentLanguage("ar")}
className={`rounded-md px-3 py-1.5 text-xs ${
	                   assessmentLanguage === "ar"
	                     ? "bg-[#6366f1] text-white"
	                     : "bg-[#12121a] text-[#a1a1aa] border border-[rgba(148,163,184,0.14)]"
	                   }`}
              >
                AR
              </button>
            </div>
            <AssessmentWizard language={assessmentLanguage} />
            <LeadForm source="cta" />
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="mt-8 text-sm text-[#64748B] space-y-1">
            <p>📧 hello@zakaa.io</p>
            <p>📞 +20 1000 292 919 &nbsp;|&nbsp; +20 1234 522 055</p>
            <p>📍 5th Settlement — Cairo — Egypt</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
