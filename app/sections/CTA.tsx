"use client";

import { useState } from "react";
import AssessmentWizard from "../components/AssessmentWizard";
import FadeIn from "../components/FadeIn";
import LeadForm from "../components/LeadForm";
import SectionLabel from "../components/SectionLabel";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

export default function CTA() {
  const scrollTo = useSmoothScroll();

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
          <SectionLabel text="Ready to Transform?" />
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight mb-5">
            Get a Free Infrastructure
            <br />
            <span className="accent-text">Assessment</span>
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-[#94A3B8] text-lg mb-10">
            Our engineers will audit your current setup and deliver a detailed roadmap — no commitment, no sales pressure.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#assessment-form"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-[10px] text-base font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all no-underline"
            >
              <span>Book Your Assessment</span>
              <span>→</span>
            </a>
            <button
              type="button"
              onClick={openChat}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-[10px] text-base font-semibold text-[#94A3B8] bg-transparent border border-[rgba(148,163,184,0.1)] hover:bg-[#1a1a24] hover:text-[#e4e4e7] transition-all no-underline"
            >
              Talk to an Engineer
            </button>
          </div>
        </FadeIn>
        <FadeIn delay={350}>
          <div id="assessment-form" className="mt-10 space-y-4">
            <AssessmentWizard language="en" />
            <LeadForm source="cta" />
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="mt-8 text-sm text-[#94A3B8] space-y-1">
            <p>📧 hello@zakaa.io</p>
            <p>📞 +20 1000 292 919 &nbsp;|&nbsp; +20 1234 522 055</p>
            <p>📍 5th Settlement — Cairo — Egypt</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
