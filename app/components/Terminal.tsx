"use client";

import { useState, useEffect } from "react";

const commands = [
  "zakaa agent --deploy security-scanner",
  "zakaa backup --all --verify",
  "zakaa cost --report --last-30d",
  "zakaa patch --critical --auto-approve",
  "zakaa scale --service api --replicas 8",
];

export default function Terminal() {
  const [displayed, setDisplayed] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(commands[cmdIndex]);
      return;
    }

    const current = commands[cmdIndex];
    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayed === current) {
      speed = 2000;
      setIsDeleting(true);
      return;
    }
    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setCmdIndex((prev) => (prev + 1) % commands.length);
      speed = 500;
      return;
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayed(current.substring(0, displayed.length - 1));
      } else {
        setDisplayed(current.substring(0, displayed.length + 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, cmdIndex, isDeleting, reducedMotion]);

  return (
    <div className="relative bg-[#0F172A] border border-[rgba(148,163,184,0.08)] rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] mt-12">
      <div className="flex items-center gap-2 px-5 py-3.5 bg-[#111827] border-b border-[rgba(148,163,184,0.08)]">
        <div className="w-3 h-3 rounded-full bg-[#475569]" />
        <div className="w-3 h-3 rounded-full bg-[#475569]" />
        <div className="w-3 h-3 rounded-full bg-[#475569]" />
        <span className="ml-3 text-xs text-[#94A3B8] font-mono">
          zakaa-agent — zsh — 80×24
        </span>
      </div>
      <div className="px-7 py-6 font-mono text-sm leading-[1.8] text-[#94A3B8] min-h-[280px]">
        <div>
          <span className="text-[#3B82F6]">$</span>{" "}
          <span>zakaa status --all</span>
        </div>
        <div className="text-[#10B981]" aria-hidden="true">✓ All systems operational</div>
        <div>
          {"  ├─ AWS us-east-1: "}
          <span className="text-[#10B981]">HEALTHY</span> (12 instances)
        </div>
        <div>
          {"  ├─ Azure West Europe: "}
          <span className="text-[#10B981]">HEALTHY</span> (8 instances)
        </div>
        <div>
          {"  ├─ GCP us-central1: "}
          <span className="text-[#10B981]">HEALTHY</span> (6 instances)
        </div>
        <div>
          {"  ├─ On-prem DC: "}
          <span className="text-[#10B981]">HEALTHY</span> (4 bare metal)
        </div>
        <div>
          {"  └─ K8s clusters: "}
          <span className="text-[#10B981]">3/3 RUNNING</span>
        </div>
        <div className="mt-2" aria-hidden="true">
          <span className="text-[#3B82F6]">$</span>{" "}
          <span>zakaa agent --list</span>
        </div>
        <div>
          {"  ├─ infra-monitor "}
          <span className="text-[#94A3B8]"># watching 47 metrics</span>
        </div>
        <div>
          {"  ├─ security-scanner "}
          <span className="text-[#94A3B8]"># last scan: 2m ago</span>
        </div>
        <div>
          {"  ├─ cost-optimizer "}
          <span className="text-[#94A3B8]"># saved $12.4K this month</span>
        </div>
        <div>
          {"  ├─ patch-manager "}
          <span className="text-[#94A3B8]"># 0 critical patches pending</span>
        </div>
        <div>
          {"  └─ incident-responder "}
          <span className="text-[#94A3B8]"># 3 auto-resolved today</span>
        </div>
        <div className="mt-2" aria-hidden="true">
          <span className="text-[#3B82F6]">$</span>{" "}
          <span>{displayed}</span>
          {!reducedMotion && (
            <span className="inline-block w-2 h-[18px] bg-[#3B82F6] animate-blink align-middle ml-0.5" />
          )}
        </div>
      </div>
    </div>
  );
}
