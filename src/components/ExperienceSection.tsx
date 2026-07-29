"use client";

import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Briefcase, Code2, PenTool } from "lucide-react";
import GsapReveal from "@/components/GsapReveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/useGsap";

const EXPERIENCES = [
  {
    id: "exp1",
    roleKey: "exp1_role",
    companyKey: "exp1_company",
    descKey: "exp1_desc",
    icon: Code2,
    date: "2021 - Present",
  },
  {
    id: "exp2",
    roleKey: "exp2_role",
    companyKey: "exp2_company",
    descKey: "exp2_desc",
    icon: Briefcase,
    date: "2018 - 2021",
  },
  {
    id: "exp3",
    roleKey: "exp3_role",
    companyKey: "exp3_company",
    descKey: "exp3_desc",
    icon: PenTool,
    date: "2016 - 2018",
  },
];

export default function ExperienceSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;

    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="w-full px-6 py-28 border-t relative overflow-hidden"
      style={{
        background: "var(--bg-main)",
        borderColor: "var(--border-main)",
      }}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]" aria-hidden="true">
        <div className="w-[800px] h-[800px] rounded-full blur-[120px]" style={{ background: "var(--color-primary-red)" }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <GsapReveal type="fade-up" className="text-center mb-20">
          <p className="section-label mx-auto">{t("exp_subtitle")}</p>
          <h2 className="section-title mt-4">{t("exp_title")}</h2>
        </GsapReveal>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] opacity-20" style={{ background: "var(--color-primary-red)" }} />
          <div
            ref={lineRef}
            className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: "var(--color-primary-red)" }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col gap-12 md:gap-0">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={exp.id} className="relative flex items-center justify-between md:justify-normal w-full min-h-[120px]">
                  
                  {/* Timeline Dot (Mobile & Desktop) */}
                  <GsapReveal 
                    type="scale" 
                    delay={0.2}
                    className="absolute left-[28px] md:left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center border-[4px] shadow-lg"
                      style={{
                        background: "var(--bg-card)",
                        borderColor: "var(--bg-main)",
                      }}
                    >
                      <exp.icon size={20} style={{ color: "var(--color-primary-red)" }} />
                    </div>
                  </GsapReveal>

                  {/* Desktop Layout - Alternating sides */}
                  <div className={`hidden md:flex w-full ${isEven ? "justify-start" : "justify-end"}`}>
                    <GsapReveal 
                      type="fade-up" 
                      delay={0.3} 
                      className={`w-[45%] ${isEven ? "pr-12 text-right" : "pl-12 text-left"}`}
                    >
                      <div
                        className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                        style={{
                          background: "var(--bg-card)",
                          borderColor: "var(--border-main)",
                        }}
                      >
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 border"
                          style={{
                            color: "var(--color-primary-red)",
                            borderColor: "var(--border-main)",
                            background: "var(--bg-main)",
                          }}
                        >
                          {exp.date}
                        </span>
                        <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-strong)", fontFamily: "var(--font-display)" }}>
                          {t(exp.roleKey)}
                        </h3>
                        <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                          {t(exp.companyKey)}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {t(exp.descKey)}
                        </p>
                      </div>
                    </GsapReveal>
                  </div>

                  {/* Mobile Layout - Right side only */}
                  <div className="flex md:hidden w-full pl-24 pr-4">
                    <GsapReveal type="fade-up" delay={0.3} className="w-full">
                      <div
                        className="p-6 rounded-3xl border transition-all duration-300 active:scale-[0.98]"
                        style={{
                          background: "var(--bg-card)",
                          borderColor: "var(--border-main)",
                        }}
                      >
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border"
                          style={{
                            color: "var(--color-primary-red)",
                            borderColor: "var(--border-main)",
                            background: "var(--bg-main)",
                          }}
                        >
                          {exp.date}
                        </span>
                        <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-strong)", fontFamily: "var(--font-display)" }}>
                          {t(exp.roleKey)}
                        </h3>
                        <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                          {t(exp.companyKey)}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {t(exp.descKey)}
                        </p>
                      </div>
                    </GsapReveal>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
