"use client";

// ─────────────────────────────────────────────────────────────────
// AboutSection.tsx — Profile, bio, and real tech stack
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

// Real tech stack — Frontend first, then Backend, then DB & CMS
// Design tools intentionally excluded
const TECH_STACK = [
  // Frontend
  "React", "Next.js", "Angular", "HTML", "CSS",
  // Backend
  "JavaScript", "TypeScript", "Node.js", "Express", "PHP",
  // Database & CMS
  "MySQL", "MongoDB", "WordPress",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12 flex justify-start"
        >
          <h2
            id="about-heading"
            className="section-title text-[var(--text-strong)] tracking-tight"
          >
            {t("about_title")}
          </h2>
        </motion.div>

        {/* Premium Minimalist Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="relative w-full max-w-5xl mx-auto rounded-[2rem] p-8 md:p-16 border shadow-2xl"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-main)",
          }}
        >
          {/* Subtle Ambient Glow */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 opacity-20 pointer-events-none blur-[100px]"
            style={{ background: "var(--color-primary-red)" }}
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-10">
            
            {/* Avatar & Location */}
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-6">
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center text-4xl font-bold select-none shadow-2xl relative"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary-red), var(--color-secondary-red))",
                  color: "#fff",
                }}
                aria-label="Avatar — initials DK"
                role="img"
              >
                DK
                {/* Glow ring */}
                <div className="absolute inset-[-10px] rounded-full opacity-30 blur-md pointer-events-none" style={{ border: "2px solid var(--color-primary-red)" }}></div>
              </div>
              <p
                className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border backdrop-blur-sm"
                style={{ color: "var(--text-strong)", borderColor: "var(--border-main)", background: "var(--bg-hover)" }}
              >
                <MapPin size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--color-primary-red)" }} />
                {t("contact_location")}
              </p>
            </motion.div>

            {/* Bio Text */}
            <motion.div variants={fadeUp} className="max-w-3xl flex flex-col gap-6">
              <h3
                className="text-4xl md:text-5xl font-bold font-[var(--font-display)] tracking-tight leading-tight"
                style={{ color: "var(--text-strong)" }}
              >
                Bringing ideas <span className="gradient-text">to Life</span>
              </h3>
              <p
                className="text-lg md:text-xl leading-relaxed font-light"
                style={{ color: "var(--text-main)" }}
              >
                {t("about_bio")}
              </p>
            </motion.div>

            {/* Tech Stack Separator */}
            <motion.div variants={fadeUp} className="w-24 h-1 rounded-full mt-4" style={{ background: "var(--border-main)" }} />

            {/* Tech Stack */}
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-6 mt-4">
              <h3
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--text-muted)" }}
              >
                {t("about_stack_title")}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      background: "var(--bg-main)",
                      borderColor: "var(--border-main)",
                      color: "var(--text-strong)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-red)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-primary-red)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-main)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-strong)";
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
