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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
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
          className="relative w-full max-w-5xl mx-auto rounded-[2rem] p-8 md:p-16 border shadow-2xl overflow-hidden"
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
              <motion.div
                className="relative w-48 h-48 flex items-center justify-center mb-4 group cursor-default"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Soft ambient glow behind the cutout - only appears on hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-[40px] pointer-events-none -z-10 transition-opacity duration-500"
                  style={{ background: "var(--color-primary-red)" }}
                />

                {/* The actual no-bg image with dynamic drop shadow and scale only on hover */}
                <img
                  src="/profile.png"
                  alt="Devakorn Profile"
                  className="w-full h-full object-contain drop-shadow-none group-hover:drop-shadow-[0_20px_20px_rgba(200,16,46,0.4)] group-hover:scale-105 transition-all duration-500"
                />
              </motion.div>
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

            {/* ── Infinite Marquee Tech Stack ───────────────────────── */}
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 mt-4 w-full">
              <h3
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--text-muted)" }}
              >
                {t("about_stack_title")}
              </h3>

              {/* Inject animation keyframes */}
              <style>{`
                @keyframes marquee-left {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                  0% { transform: translateX(-50%); }
                  100% { transform: translateX(0); }
                }
                .marquee-track-left {
                  animation: marquee-left 20s linear infinite;
                }
                .marquee-track-right {
                  animation: marquee-right 24s linear infinite;
                }
                .marquee-track-left:hover,
                .marquee-track-right:hover {
                  animation-play-state: paused;
                }
              `}</style>

              {/* Row 1 — scrolls left */}
              <div className="w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
                <div className="marquee-track-left flex gap-3 w-max">
                  {/* Duplicate array for seamless loop */}
                  {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                    <span
                      key={`r1-${tech}-${i}`}
                      className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300 cursor-default"
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
              </div>

              {/* Row 2 — scrolls right (reversed array for visual variety) */}
              <div className="w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
                <div className="marquee-track-right flex gap-3 w-max">
                  {[...[...TECH_STACK].reverse(), ...[...TECH_STACK].reverse()].map((tech, i) => (
                    <span
                      key={`r2-${tech}-${i}`}
                      className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300 cursor-default"
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
              </div>

            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
