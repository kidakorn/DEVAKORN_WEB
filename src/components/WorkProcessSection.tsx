"use client";

// ─────────────────────────────────────────────────────────────────
// WorkProcessSection.tsx — Visual timeline of how I work
// ─────────────────────────────────────────────────────────────────

import { MessageSquare, LayoutTemplate, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import GsapReveal from "@/components/GsapReveal";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/useGsap";

const STEPS = [
  { id: "step1", icon: MessageSquare, title: "process_step1_title", desc: "process_step1_desc" },
  { id: "step2", icon: LayoutTemplate, title: "process_step2_title", desc: "process_step2_desc" },
  { id: "step3", icon: Code2, title: "process_step3_title", desc: "process_step3_desc" },
  { id: "step4", icon: Rocket, title: "process_step4_title", desc: "process_step4_desc" },
];

export default function WorkProcessSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;
    
    gsap.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        once: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="process"
      aria-labelledby="process-heading"
      className="w-full px-6 py-28 border-t"
      style={{
        background: "var(--bg-main)",
        borderColor: "var(--border-main)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <GsapReveal type="fade-up" className="text-center mb-20">
          <p className="section-label mx-auto">{t("process_title")}</p>
          <h2 id="process-heading" className="section-title mt-4">
            From Idea to Reality
          </h2>
        </GsapReveal>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Connector Line for Desktop */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[3.25rem] left-[10%] w-[80%] h-[2px] opacity-30 -z-10"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-primary-red), transparent)" }}
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <GsapReveal
              key={step.id}
              type="fade-up"
              delay={0.2 + index * 0.15}
              className="relative group"
              innerClassName="flex flex-col items-center text-center w-full"
            >
              {/* Icon Circle */}
              <div
                className="w-24 h-24 mb-6 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(200,16,46,0.15)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                  color: "var(--text-muted)",
                }}
              >
                {/* Number Badge */}
                <div
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-md z-10"
                  style={{ background: "var(--color-primary-red)" }}
                >
                  {index + 1}
                </div>
                
                <step.icon
                  size={32}
                  strokeWidth={1.5}
                  className="transition-colors duration-500 group-hover:text-[var(--color-primary-red)]"
                />
              </div>

              {/* Text Content */}
              <h3
                className="text-xl font-bold mb-3 transition-colors duration-300"
                style={{ color: "var(--text-strong)", fontFamily: "var(--font-display)" }}
              >
                {t(step.title)}
              </h3>
              <p
                className="text-base font-light leading-relaxed max-w-[250px]"
                style={{ color: "var(--text-muted)" }}
              >
                {t(step.desc)}
              </p>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
