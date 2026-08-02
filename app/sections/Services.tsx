"use client";

import Link from "next/link";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";
import type { SiteLocale } from "../types/locale";

const servicesList = [
  {
    icon: "☁️",
    title: "Cloud Migration & Modernization",
    description:
      "Move critical workloads from legacy environments to resilient, governed cloud architectures.",
    tags: ["AWS", "Azure", "GCP", "Terraform"],
    href: "/services/cloud-migration",
  },
  {
    icon: "🔄",
    title: "Managed DevOps & CI/CD",
    description:
      "Scale secure software delivery with automation, release governance, and continuous quality controls.",
    tags: ["Kubernetes", "GitOps", "ArgoCD", "Docker"],
    href: "/services/managed-devops",
  },
  {
    icon: "🔒",
    title: "Managed Security Operations (SOC)",
    description:
      "24/7 threat monitoring, triage, and response operations with expert and AI-assisted workflows.",
    tags: ["Zero Trust", "SIEM", "SOC 2", "Pentesting"],
    href: "/services/managed-security-soc",
  },
  {
    icon: "💰",
    title: "FinOps & Cost Optimization",
    description:
      "Establish cloud cost visibility, accountability, and continuous optimization at engineering speed.",
    tags: ["Cloud Cost", "Rightsizing", "Budgets", "Governance"],
    href: "/services/finops-cost-optimization",
  },
  {
    icon: "🛡️",
    title: "Disaster Recovery & Business Continuity",
    description:
      "Design resilient recovery architecture that protects mission-critical services and business outcomes.",
    tags: ["RTO/RPO", "Failover", "Backup", "Continuity"],
    href: "/services/dr-bcp",
  },
];

interface ServicesProps {
  locale?: SiteLocale;
}

export default function Services({ locale = "en" }: Readonly<ServicesProps>) {
  const isArabic = locale === "ar";
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label={isArabic ? "ماذا نقدم" : "What We Do"}
          title={
            <>
              {isArabic ? "خدمات تقنية معلومات متكاملة لـ" : "Full-Stack IT Services for"}
              <br />
              <span className="accent-text">{isArabic ? "المؤسسات الحديثة" : "Modern Enterprises"}</span>
            </>
          }
          subtitle={
            isArabic
              ? "من الخوادم التقليدية إلى السحابة الحديثة، نقوم بالتصميم والنشر والتشغيل لبنية تحتية تتوسع مع نمو أعمالك."
              : "From bare metal to cloud-native, we architect, deploy, and operate infrastructure that scales with your business."
          }
          layout="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesList.map((service, i) => (
            <FadeIn key={service.title} delay={i * 100}>
              <Link
                href={service.href}
                className="group block bg-[#12121a] border border-[rgba(148,163,184,0.06)] rounded-2xl p-8 transition-all duration-300 hover:border-[rgba(99,102,241,0.2)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(99,102,241,0.06)] relative overflow-hidden h-full"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366f1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 bg-[#1a1a24] border border-[rgba(148,163,184,0.06)]">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2.5">{service.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
<span
	                       key={tag}
	                       className="px-3 py-1 rounded-md bg-[#1a1a24] text-xs text-[#a1a1aa] border border-[rgba(148,163,184,0.06)]"
	                     >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
