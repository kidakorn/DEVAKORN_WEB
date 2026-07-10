"use client";

// ─────────────────────────────────────────────────────────────────
// AboutSection.tsx — 2-column editorial split layout
// Left: sticky avatar with red frame + name + location
// Right: tagline, bio, value props, tech stack pills
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { MapPin, CheckCircle, Clock, Award, Code2, Zap, Terminal, FileCode2, Server, Cpu, Database, Leaf, LayoutTemplate, AppWindow, FileCode, Box, Layers, Briefcase, FileJson, Coffee } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const TECH_STACK = [
  { name: "LANSA", icon: Layers },
  { name: "RPG", icon: Terminal },
  { name: "RMDL", icon: FileCode2 },
  { name: "Db2", icon: Database },
  { name: "ERP Systems", icon: Briefcase },
  { name: "C# / .NET", icon: FileJson },
  { name: "Java", icon: Coffee },
  { name: "Python", icon: FileCode },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Zap },
  { name: "Angular", icon: Terminal },
  { name: "TypeScript", icon: FileCode2 },
  { name: "Node.js", icon: Server },
  { name: "Express", icon: Cpu },
  { name: "MySQL", icon: Database },
  { name: "MongoDB", icon: Leaf },
  { name: "WordPress", icon: LayoutTemplate },
  { name: "HTML/CSS", icon: AppWindow },
  { name: "PHP", icon: FileCode },
  { name: "Docker", icon: Box },
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
      className="w-full px-6 py-28 border-t"
      style={{
        background: "var(--bg-main)",
        borderColor: "var(--border-main)",
      }}
    >
      <div className="max-w-7xl mx-auto">

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start mt-8">

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
                className="relative w-56 h-56 overflow-hidden rounded-[1.25rem] border shadow-xl"
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
                <div className="absolute inset-0 bg-[var(--color-primary-red)] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Name */}
            <div className="text-center lg:text-left mt-2">
              <h2
                id="about-heading"
                className="text-3xl font-black tracking-tight leading-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-strong)" }}
              >
                Devakorn
              </h2>
              <p
                className="mt-2 text-sm font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--color-primary-red)" }}
              >
                Kidakorn Intha
              </p>
            </div>

            {/* Location pill */}
            <p
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border shadow-sm"
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
                className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-strong)" }}
              >
                Bringing ideas <span className="gradient-text">to Life</span>
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl leading-[1.8] font-light max-w-3xl"
                style={{ color: "var(--text-main)" }}
              >
                {t("about_bio")}
              </motion.p>
            </motion.div>

            {/* Value Props */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6"
            >
              {[
                { id: "v1", title: "about_value1_title", desc: "about_value1_desc", icon: CheckCircle },
                { id: "v2", title: "about_value2_title", desc: "about_value2_desc", icon: Clock },
                { id: "v3", title: "about_value3_title", desc: "about_value3_desc", icon: Award },
              ].map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(200,16,46,0.08)]"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-main)" }}
                >
                  <item.icon size={26} strokeWidth={2} style={{ color: "var(--color-primary-red)" }} />
                  <div>
                    <h4 className="font-bold text-lg mb-1" style={{ color: "var(--text-strong)", fontFamily: "var(--font-display)" }}>
                      {t(item.title)}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {t(item.desc)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Divider */}
            <div
              className="w-full h-px opacity-60"
              style={{ background: "var(--border-main)" }}
              aria-hidden="true"
            />

            {/* Tech Stack Pills */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {t("about_stack_title")}
              </motion.p>

              <motion.div
                variants={stagger}
                className="flex flex-wrap gap-2.5"
              >
                {TECH_STACK.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={fadeUp}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary-red)] hover:text-[var(--color-primary-red)] cursor-default group"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--border-main)",
                      color: "var(--text-main)"
                    }}
                  >
                    <tech.icon size={16} className="text-[var(--text-muted)] group-hover:text-[var(--color-primary-red)] transition-colors" />
                    {tech.name}
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
