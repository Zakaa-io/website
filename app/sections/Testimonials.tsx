"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";

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
  {
    text: "Their incident response cut our MTTR from hours to minutes. We had a regional outage last quarter and Zakaa had diagnostics and a fix within 8 minutes.",
    name: "Aisha Patel",
    role: "Head of Platform, Nextera",
    initials: "AP",
  },
  {
    text: "The FinOps dashboard alone paid for their engagement in the first month. Visibility into cloud spend across teams changed how we budget.",
    name: "David Chen",
    role: "CFO, Orbit Logistics",
    initials: "DC",
  },
];

export default function Testimonials() {
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
    return card.offsetWidth + 20;
  };

  const moveTo = (targetIndex: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setIndex(targetIndex);
    prevTranslate.current = -targetIndex * slideWidth();
    currentTranslate.current = prevTranslate.current;
  };

  const next = () => {
    const maxIndex = reviews.length - 1;
    moveTo(index >= maxIndex ? 0 : index + 1);
  };

  const prev = () => {
    const maxIndex = reviews.length - 1;
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
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label="Trusted By"
          title={
            <>
              What Our <span className="accent-text">Clients Say</span>
            </>
          }
          subtitle="Enterprise teams that transformed their infrastructure with Zakaa."
          layout="left"
        />

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-5 cursor-grab active:cursor-grabbing"
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
              {reviews.map((review) => (
                <div
                  key={review.name}
                  data-card
                  className="w-[calc(100vw-4rem)] md:w-[360px] flex-shrink-0 bg-[#111827] border border-[rgba(148,163,184,0.08)] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-[rgba(148,163,184,0.12)] hover:-translate-y-0.5 h-full flex flex-col"
                >
                  <div className="text-[#F59E0B] text-base mb-4" aria-hidden="true">★★★★★</div>
                  <p className="text-[#94A3B8] text-[0.95rem] leading-relaxed mb-6 italic flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#3B82F6] flex items-center justify-center font-bold text-white text-sm">
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{review.name}</h4>
                      <p className="text-xs text-[#94A3B8]">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 items-center justify-center rounded-full bg-[#111827] border border-[rgba(148,163,184,0.12)] text-[#e4e4e7] hover:bg-[#1a1a24] transition-all"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 items-center justify-center rounded-full bg-[#111827] border border-[rgba(148,163,184,0.12)] text-[#e4e4e7] hover:bg-[#1a1a24] transition-all"
            aria-label="Next testimonial"
          >
            →
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {reviews.map((review, i) => (
              <button
                key={review.name}
                type="button"
                onClick={() => moveTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#6366f1]" : "w-2 bg-[rgba(148,163,184,0.2)] hover:bg-[rgba(148,163,184,0.35)]"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-pressed={i === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
