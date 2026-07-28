"use client";

import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";
import type { SiteLocale } from "../types/locale";

const plans = [
  {
    name: "Starter",
    price: "$2,499",
    period: "/mo",
    description: "For small teams getting serious about infrastructure",
    features: [
      "Up to 20 cloud instances",
      "Basic monitoring & alerting",
      "1 AI agent (monitoring)",
      "Business hours support",
      "Monthly security reports",
      "Email & Slack integration",
    ],
    popular: false,
    cta: "Get Started",
    ctaStyle: "ghost" as const,
  },
  {
    name: "Professional",
    price: "$5,999",
    period: "/mo",
    description: "For growing companies with complex infrastructure",
    features: [
      "Up to 100 cloud instances",
      "Advanced monitoring & SIEM",
      "4 AI agents (full suite)",
      "24/7 priority support",
      "Weekly security reports",
      "DevOps CI/CD pipeline",
      "Disaster recovery planning",
      "Dedicated account manager",
    ],
    popular: true,
    cta: "Get Started",
    ctaStyle: "primary" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations requiring custom architecture",
    features: [
      "Unlimited instances",
      "Custom AI agent development",
      "On-premise + multi-cloud",
      "24/7 dedicated NOC team",
      "Real-time security dashboards",
      "Compliance (SOC 2, ISO, HIPAA)",
      "Custom SLAs & penalties",
      "Quarterly business reviews",
    ],
    popular: false,
    cta: "Contact Sales",
    ctaStyle: "ghost" as const,
  },
];

interface PricingProps {
  locale?: SiteLocale;
}

export default function Pricing({ locale = "en" }: Readonly<PricingProps>) {
  const isArabic = locale === "ar";
  const handleNav = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label={isArabic ? "الأسعار" : "Pricing"}
          title={
            <>
              {isArabic ? "أسعار واضحة،" : "Transparent Pricing,"}
              <br />
              <span className="accent-text">{isArabic ? "نتائج مؤسسية" : "Enterprise Results"}</span>
            </>
          }
          subtitle={
            isArabic
              ? "اختر الباقة المناسبة لحجم بنيتك التحتية. جميع الباقات تشمل دعم 24/7 ومراقبة وكلاء الذكاء الاصطناعي."
              : "Choose the plan that fits your infrastructure scale. All plans include 24/7 support and AI agent monitoring."
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-[1100px] mx-auto">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 150}>
              <div
                className={`relative bg-[#111827] border rounded-[20px] p-10 transition-all duration-300 hover:border-[rgba(59,130,246,0.15)] ${
                  plan.popular
                    ? "border-[#3B82F6] shadow-[0_0_40px_rgba(59,130,246,0.08)] md:scale-[1.03]"
                    : "border-[rgba(148,163,184,0.08)]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#3B82F6] text-white text-xs font-bold">
                    {isArabic ? "الأكثر طلباً" : "Most Popular"}
                  </div>
                )}

                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <p className="text-[#94A3B8] text-sm mb-4">{plan.description}</p>

                <div className="text-5xl font-extrabold my-4 text-[#3B82F6]">
                  {plan.price}
                  {plan.period && (
                    <span className="text-base font-normal text-[#64748B]">
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="list-none mb-8 space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 py-1 text-sm text-[#94A3B8]"
                    >
                      <span className="text-[#10B981] font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleNav}
                  className={`w-full justify-center inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold transition-all cursor-pointer ${
                    plan.ctaStyle === "primary"
                      ? "text-white bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_4px_20px_rgba(59,130,246,0.2)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
                      : "text-[#94A3B8] bg-transparent border border-[rgba(148,163,184,0.12)] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
