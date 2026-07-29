"use client";

import Terminal from "../components/Terminal";
import type { SiteLocale } from "../types/locale";

interface HeroProps {
  locale?: SiteLocale;
}

export default function Hero({ locale = "en" }: Readonly<HeroProps>) {
  const isArabic = locale === "ar";
  const stats = [
    { value: "99.99%", label: isArabic ? "اتفاقية الجاهزية" : "Uptime SLA" },
    { value: "500+", label: isArabic ? "خوادم مُدارة" : "Servers Managed" },
    { value: "<2min", label: isArabic ? "متوسط زمن الاستجابة" : "Avg Response Time" },
    { value: "40%", label: isArabic ? "خفض في التكلفة" : "Cost Reduction" },
  ];
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-[120px] pb-20 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.06), transparent)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12121a] border border-[rgba(148,163,184,0.06)] text-sm font-medium text-[#6366f1] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse-dot" />
          <span className="font-mono text-xs">
            {isArabic ? "مراقبة البنية التحتية تعمل 24/7" : "24/7 Infrastructure Monitoring Active"}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight mb-6 text-[#e4e4e7]">
          {isArabic ? "بنية تحتية مؤسسية لتقنية المعلومات،" : "Enterprise IT Infrastructure,"}
          <br />
          <span className="accent-text">{isArabic ? "مدعومة بوكلاء الذكاء الاصطناعي" : "Powered by AI Agents"}</span>
        </h1>

        <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#a1a1aa] max-w-[600px] mb-10 leading-relaxed">
          {isArabic
            ? "نقوم بتصميم ونشر وإدارة بنية تحتية سحابية حديثة باستخدام وكلاء ذكاء اصطناعي مستقلين يتولون المهام التشغيلية المتكررة، حتى يركز فريقك على ما يهم فعلاً."
            : "We design, deploy, and manage cloud-native infrastructure with autonomous AI agents that handle repetitive operations — so your team focuses on what matters."}
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap mb-16">
          <button
            onClick={() => handleNav("#contact")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>{isArabic ? "ابدأ تقييمك الآن" : "Start Your Assessment"}</span>
            <span>→</span>
          </button>
          <button
            onClick={() => handleNav("#services")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold text-[#a1a1aa] bg-transparent border border-[rgba(148,163,184,0.1)] hover:bg-[#1a1a24] hover:text-[#e4e4e7] transition-all cursor-pointer"
          >
            {isArabic ? "استكشف الخدمات" : "Explore Services"}
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 flex-wrap">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h3 className="text-3xl font-extrabold text-[#6366f1] font-mono">
                {stat.value}
              </h3>
              <p className="text-sm text-[#71717a] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Terminal */}
        <Terminal />
      </div>
    </section>
  );
}
