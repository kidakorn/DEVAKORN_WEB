"use client";

// ─────────────────────────────────────────────────────────────────
// AboutSection.tsx — 2-column editorial split layout
// Left: sticky avatar with red frame + name + location
// Right: tagline, bio, 4-col tech stack grid
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const TECH_STACK = [
  { name: "React",        icon: "⚛" },
  { name: "Next.js",      icon: "▲" },
  { name: "Angular",      icon: "🅰" },
  { name: "TypeScript",   icon: "TS" },
  { name: "Node.js",      icon: "⬡" },
  { name: "Express",      icon: "Ex" },
  { name: "MySQL",        icon: "🐬" },
  { name: "MongoDB",      icon: "🍃" },
  { name: "WordPress",    icon: "W" },
  { name: "HTML/CSS",     icon: "</>" },
  { name: "PHP",          icon: "🐘" },
  { name: "Docker",       icon: "🐳" },
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
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full px-6 py-28 noise-bg border-t"
      style={{
        background: "var(--bg-main)",
        borderColor: "var(--border-main)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <p className="section-label">{t("about_title")}</p>
        </motion.div>

        {/* 2-Column editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start mt-6">

          {/* ── LEFT COLUMN: Avatar + identity ──────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="flex flex-col items-center lg:items-start gap-6 lg:sticky lg:top-28"
          >
            {/* Avatar frame — red border on 2 sides for editorial accent */}
            <motion.div
              className="relative group"
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Red frame offset accent */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[var(--color-primary-red)] opacity-60"
                style={{ borderRadius: "1.25rem" }}
                aria-hidden="true"
              />
              {/* Avatar image */}
              <div
                className="relative w-56 h-56 overflow-hidden rounded-[1.25rem] border shadow-2xl"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                }}
              >
                <img
                  src="/profile.png"
                  alt="Devakorn Profile"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {/* Red overlay on hover */}
                <div className="absolute inset-0 bg-[var(--color-primary-red)] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Name */}
            <div className="text-center lg:text-left">
              <h2
                id="about-heading"
                className="text-3xl font-black tracking-tight leading-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-strong)" }}
              >
                Devakorn
              </h2>
              <p
                className="mt-1 text-sm font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--color-primary-red)" }}
              >
                Kidakorn Intha
              </p>
            </div>

            {/* Location pill */}
            <p
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border-main)",
                background: "var(--bg-card)",
              }}
            >
              <MapPin
                size={14}
                strokeWidth={2}
                aria-hidden="true"
                style={{ color: "var(--color-primary-red)" }}
              />
              {t("contact_location")}
            </p>

            {/* Availability badge */}
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full"
              style={{
                background: "rgba(200,16,46,0.1)",
                color: "var(--color-primary-red)",
                border: "1px solid rgba(200,16,46,0.25)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-red)] animate-pulse" aria-hidden="true" />
              Available for projects
            </span>
          </motion.div>

          {/* ── RIGHT COLUMN: Bio + Tech Stack ──────────────────── */}
          <div className="flex flex-col gap-14">

            {/* Tagline + Bio */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <motion.h3
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-strong)" }}
              >
                Bringing ideas{" "}
                <span className="gradient-text">to Life</span>
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-xl leading-[1.9] font-light"
                style={{ color: "var(--text-main)" }}
              >
                {t("about_bio")}
              </motion.p>
            </motion.div>

            {/* Divider */}
            <div
              className="w-full h-px"
              style={{ background: "var(--border-main)" }}
              aria-hidden="true"
            />

            {/* Tech Stack Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              className="flex flex-col gap-5"
            >
              <motion.p variants={fadeUp} className="section-label">
                {t("about_stack_title")}
              </motion.p>

              <motion.div
                variants={stagger}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              >
                {TECH_STACK.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={fadeUp}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl border cursor-default transition-all duration-300 hover:border-[var(--color-primary-red)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(200,16,46,0.12)]"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--border-main)",
                    }}
                  >
                    <span
                      className="text-base font-mono font-bold w-7 text-center flex-shrink-0 transition-colors duration-300 group-hover:text-[var(--color-primary-red)]"
                      style={{ color: "var(--text-muted)" }}
                      aria-hidden="true"
                    >
                      {tech.icon}
                    </span>
                    <span
                      className="text-sm font-semibold transition-colors duration-300 group-hover:text-[var(--text-strong)]"
                      style={{ color: "var(--text-main)" }}
                    >
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
