"use client";

import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";
import type { SiteLocale } from "../types/locale";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Deep-dive audit of your current infrastructure, security posture, and operational pain points.",
  },
  {
    number: "02",
    title: "Architecture",
    description:
      "Design cloud-native, secure, and scalable architecture tailored to your workloads.",
  },
  {
    number: "03",
    title: "Deployment",
    description:
      "Infrastructure-as-Code deployment with zero-downtime migration and full observability.",
  },
  {
    number: "04",
    title: "AI Operations",
    description:
      "Deploy AI agents for monitoring, remediation, and optimization with 24/7 human backup.",
  },
];

interface ProcessProps {
  locale?: SiteLocale;
}

export default function Process({ locale = "en" }: Readonly<ProcessProps>) {
  const isArabic = locale === "ar";
  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label={isArabic ? "كيف نعمل" : "How We Work"}
          title={
            <>
              {isArabic ? "من التقييم إلى" : "From Assessment to"}{" "}
              <span className="accent-text">{isArabic ? "عمليات ذاتية" : "Autonomous Ops"}</span>
            </>
          }
          subtitle={
            isArabic
              ? "منهجية مجربة تنقلك من الوضع الحالي إلى بنية تحتية مدعومة بالذكاء الاصطناعي خلال 90 يوماً."
              : "A proven methodology that gets you from current state to AI-powered infrastructure in 90 days."
          }
          layout="split"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 150}>
              <div className="relative text-center p-8 bg-[#111827] border border-[rgba(148,163,184,0.08)] rounded-2xl transition-all duration-300 hover:border-[rgba(59,130,246,0.15)] hover:-translate-y-1 group">
                {i < steps.length - 1 && (
                  <span className="hidden lg:block absolute -right-9 top-1/2 -translate-y-1/2 text-[#64748B] text-2xl font-mono">
                    →
                  </span>
                )}

                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-5 font-extrabold text-lg text-white bg-[#3B82F6]">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
