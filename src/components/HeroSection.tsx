"use client";

// ─────────────────────────────────────────────────────────────────
// HeroSection.tsx — Full-viewport cinematic hero
// - Giant centered name display
// - Animated typing role line
// - Line-grid background with red drift glow
// - New logo.png as brand mark
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { GitFork, Globe, Briefcase, ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import TypingText from "@/components/TypingText";
import Image from "next/image";

const SOCIAL_LINKS = [
  {
    id: "github-link",
    href: "https://github.com/kidakorn",
    icon: GitFork,
    label: "GitHub",
  },
  {
    id: "facebook-link",
    href: "https://facebook.com/devakorn",
    icon: Globe,
    label: "Facebook",
  },
  {
    id: "fastwork-link",
    href: "https://fastwork.co/user/kidakorn43",
    icon: Briefcase,
    label: "Fastwork",
  },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function HeroSection() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center line-grid-bg overflow-hidden noise-bg"
    >
      {/* ── Drifting Red Glow ─────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Center pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-red) 0%, transparent 65%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.07, 0.11, 0.07],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Off-center drift */}
        <motion.div
          className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-red) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── Thin top accent line ──────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary-red)] to-transparent"
        initial={{ width: "0%", opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden="true"
      />

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-6">

        {/* Logo Brand Mark */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative w-20 h-20 mx-auto rounded-full overflow-hidden"
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-40"
            style={{ background: "var(--color-primary-red)" }}
            aria-hidden="true"
          />
          <Image
            src="/logo.png"
            alt="Devakorn"
            fill
            className="object-contain relative z-10"
            priority
          />
        </motion.div>

        {/* Location badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] border"
            style={{
              borderColor: "var(--border-main)",
              color: "var(--text-muted)",
              background: "var(--bg-card)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-red)] animate-pulse"
              aria-hidden="true"
            />
            {t("hero_location")}
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-lg md:text-xl font-semibold"
          style={{ color: "var(--text-muted)" }}
        >
          {t("hero_greeting")}
        </motion.p>

        {/* Giant Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="gradient-text font-black tracking-[-0.04em] leading-[0.9] uppercase"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 12rem)",
            fontFamily: "var(--font-display)",
          }}
        >
          {t("hero_name")}
        </motion.h1>

        {/* Tagline with typing */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
          className="text-lg md:text-2xl font-bold mt-2"
          style={{ color: "var(--text-muted)" }}
        >
          {lang === "en" ? "I am a " : "ผมคือ "}
          <TypingText
            strings={["Software Developer", "Builder", "Problem Solver"]}
            className="font-bold text-[var(--text-strong)]"
          />
        </motion.p>

        {/* CTA + Social row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="flex flex-col sm:flex-row items-center gap-5 mt-4"
        >
          <a
            href="#projects"
            id="hero-cta-btn"
            className="btn-ref btn-solid-ref min-h-12 px-8 text-sm"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero_cta")}
            <ArrowDown size={16} aria-hidden="true" />
          </a>

          {/* Divider */}
          <div
            className="hidden sm:block w-px h-8 opacity-30"
            style={{ background: "var(--border-main)" }}
            aria-hidden="true"
          />

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ id, href, icon: Icon, label }) => (
              <a
                key={id}
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary-red)] hover:text-[var(--color-primary-red)]"
                style={{
                  color: "var(--text-muted)",
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                }}
              >
                <Icon size={17} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-12 origin-top"
          style={{ background: "linear-gradient(to bottom, var(--color-primary-red), transparent)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
