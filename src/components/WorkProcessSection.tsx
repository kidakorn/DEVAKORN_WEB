"use client";

// ─────────────────────────────────────────────────────────────────
// WorkProcessSection.tsx — Visual timeline of how I work
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { MessageSquare, LayoutTemplate, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const STEPS = [
  { id: "step1", icon: MessageSquare, title: "process_step1_title", desc: "process_step1_desc" },
  { id: "step2", icon: LayoutTemplate, title: "process_step2_title", desc: "process_step2_desc" },
  { id: "step3", icon: Code2, title: "process_step3_title", desc: "process_step3_desc" },
  { id: "step4", icon: Rocket, title: "process_step4_title", desc: "process_step4_desc" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function WorkProcessSection() {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="w-full px-6 py-28 border-t"
      style={{
        background: "var(--bg-main)",
        borderColor: "var(--border-main)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <p className="section-label mx-auto">{t("process_title")}</p>
          <h2 id="process-heading" className="section-title mt-4">
            From Idea to Reality
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Connector Line for Desktop */}
          <div
            className="hidden md:block absolute top-[3.25rem] left-[10%] w-[80%] h-[2px] opacity-30 -z-10"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-primary-red), transparent)" }}
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center group"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
