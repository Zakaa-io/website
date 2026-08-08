"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";

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
  {
    number: "05",
    title: "Optimization",
    description:
      "Continuous cost, performance, and security tuning driven by real-time telemetry.",
  },
  {
    number: "06",
    title: "Scale",
    description:
      "Expand across regions and clouds with policy-driven automation and governance.",
  },
];

export default function Process() {
  const [index, setIndex] = useState(0);
  const isTransitioning = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationID = useRef(0);
  const autoPlayRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const slideWidth = () => {
    if (!trackRef.current) return 0;
    const card = trackRef.current.querySelector("[data-card]") as HTMLElement | null;
    if (!card) return 0;
    return card.offsetWidth + 24;
  };

  const moveTo = (targetIndex: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setIndex(targetIndex);
    prevTranslate.current = -targetIndex * slideWidth();
    currentTranslate.current = prevTranslate.current;
  };

  const next = () => {
    const maxIndex = steps.length - 1;
    moveTo(index >= maxIndex ? 0 : index + 1);
  };

  const prev = () => {
    const maxIndex = steps.length - 1;
    moveTo(index <= 0 ? maxIndex : index - 1);
  };

  const touchStart = (clientX: number) => {
    startX.current = clientX;
    isTransitioning.current = false;
    isPausedRef.current = true;
  };

  const touchMove = (clientX: number) => {
    if (!trackRef.current) return;
    const currentDiff = clientX - startX.current;
    const currentPos = -index * slideWidth() + currentDiff;
    currentTranslate.current = currentPos;
    trackRef.current.style.transform = `translateX(${currentPos}px)`;
  };

  const touchEnd = (clientX: number) => {
    const movedBy = clientX - startX.current;
    isPausedRef.current = false;
    if (movedBy < -75) {
      next();
    } else if (movedBy > 75) {
      prev();
    } else {
      moveTo(index);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart(e.changedTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchMove(e.changedTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    touchEnd(e.changedTouches[0].clientX);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    touchStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      touchMove(e.clientX);
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    touchEnd(e.clientX);
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      window.clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = window.setInterval(() => {
      if (!isPausedRef.current && !isTransitioning.current) {
        next();
      }
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      window.clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [index]);

  useEffect(() => {
    if (!trackRef.current) return;
    cancelAnimationFrame(animationID.current);
    animationID.current = requestAnimationFrame(() => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
      }
    });
    const timeout = setTimeout(() => { isTransitioning.current = false; }, 350);
    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    if (!trackRef.current) return;
    prevTranslate.current = -index * slideWidth();
    currentTranslate.current = prevTranslate.current;
    trackRef.current.style.transition = "transform 350ms ease";
    trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    const timeout = setTimeout(() => { isTransitioning.current = false; }, 350);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label="How We Work"
          title={
            <>
              From Assessment to{" "}
              <span className="accent-text">Autonomous Ops</span>
            </>
          }
          subtitle="A proven methodology that gets you from current state to AI-powered infrastructure in 90 days."
          layout="split"
        />

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 cursor-grab active:cursor-grabbing"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseEnter={() => {
                isPausedRef.current = true;
              }}
              onMouseLeave={(e) => {
                if (e.buttons === 1) onMouseUp(e);
                isPausedRef.current = false;
              }}
            >
              {steps.map((step) => (
                <div
                  key={step.number}
                  data-card
                  className="w-[calc(100vw-4rem)] md:w-[300px] flex-shrink-0 bg-[#111827] border border-[rgba(148,163,184,0.08)] rounded-2xl p-8 transition-all duration-300 hover:border-[rgba(59,130,246,0.15)] hover:-translate-y-1 h-full flex flex-col text-center"
                >
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-5 font-extrabold text-lg text-white bg-[#3B82F6]">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 items-center justify-center rounded-full bg-[#111827] border border-[rgba(148,163,184,0.12)] text-[#e4e4e7] hover:bg-[#1a1a24] transition-all"
            aria-label="Previous step"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 items-center justify-center rounded-full bg-[#111827] border border-[rgba(148,163,184,0.12)] text-[#e4e4e7] hover:bg-[#1a1a24] transition-all"
            aria-label="Next step"
          >
            →
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {steps.map((step, i) => (
              <button
                key={step.number}
                type="button"
                onClick={() => moveTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#6366f1]" : "w-2 bg-[rgba(148,163,184,0.2)] hover:bg-[rgba(148,163,184,0.35)]"
                }`}
                aria-label={`Go to step ${step.number}`}
                aria-pressed={i === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
