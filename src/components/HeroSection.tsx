"use client";

// ─────────────────────────────────────────────────────────────────
// HeroSection.tsx — 2-column professional hero
// - Left: Name, Typing Tagline, CTAs, Socials
// - Right: Avatar Card with "Available for hire" badge
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { GitFork, Globe, Briefcase, ArrowRight, MapPin, Mail, MessageCircle, Code2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import TypingText from "@/components/TypingText";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SOCIAL_LINKS = [
  { id: "hero-github", href: "https://github.com/kidakorn", icon: GitFork, label: "GitHub" },
  { id: "hero-facebook", href: "https://facebook.com/devakorn", icon: Globe, label: "Facebook" },
  { id: "hero-fastwork", href: "https://fastwork.co/user/kidakorn43", icon: Briefcase, label: "Fastwork" },
  { id: "hero-line", href: "https://line.me/ti/p/~hume.ry", icon: MessageCircle, label: "LINE" },
  { id: "hero-email", href: "mailto:kidakorn.1@gmail.com", icon: Mail, label: "Email" },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const router = useRouter();

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-10"
      style={{ background: "var(--bg-main)" }}
    >
      {/* ── Soft Red Glow (Clean Light Mode) ────────────────────────────── */}
      <motion.div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, var(--color-primary-red) 0%, transparent 60%)" }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--color-secondary-red) 0%, transparent 60%)" }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── Main Content Grid ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 order-2 lg:order-1">
          
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border"
              style={{
                borderColor: "var(--border-main)",
                color: "var(--color-primary-red)",
                background: "var(--bg-card)",
              }}
            >
              <Code2 size={14} />
              {t("hero_greeting")}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="font-black tracking-tighter leading-[1.05]"
            style={{
              fontSize: "clamp(4rem, 10vw, 8rem)",
              fontFamily: "var(--font-display)",
              color: "var(--text-strong)",
            }}
          >
            {t("hero_name")}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-lg md:text-2xl font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            <TypingText
              strings={["Web Developer", "Problem Solver", "Builder"]}
              className="font-bold text-[var(--color-primary-red)]"
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
          >
            <a
              href="/#projects"
              className="btn-ref btn-solid-ref w-full sm:w-auto min-h-[52px] px-8 text-sm"
              onClick={(e) => {
                e.preventDefault();
                router.push("/#projects");
              }}
            >
              {t("hero_cta")}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="/portfolio#contact"
              className="btn-ref btn-outline-ref w-full sm:w-auto min-h-[52px] px-8 text-sm"
              onClick={(e) => {
                e.preventDefault();
                router.push("/portfolio#contact");
              }}
            >
              {lang === "en" ? "Hire Me" : "ติดต่อผม"}
            </a>
          </motion.div>

          {/* Social Row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6 pt-6 border-t w-full lg:max-w-md"
            style={{ borderColor: "var(--border-main)" }}
          >
            {SOCIAL_LINKS.map(({ id, href, icon: Icon, label }) => (
              <a
                key={id}
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
                style={{
                  color: "var(--text-muted)",
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                }}
              >
                <Icon size={18} strokeWidth={2} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Avatar Card */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            variants={popIn}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="relative w-full max-w-sm"
          >
            {/* Card wrapper */}
            <div
              className="relative rounded-3xl p-6 border shadow-2xl overflow-hidden group"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(12px)",
                borderColor: "var(--border-main)",
                boxShadow: "var(--glass-hover-shadow)",
              }}
            >
              {/* Abstract Developer Terminal Avatar */}
              <div
                className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 flex flex-col bg-[#050505] border shadow-inner"
                style={{ borderColor: "var(--border-main)" }}
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">developer.exe</div>
                </div>
                
                {/* Terminal Body */}
                <div className="flex-1 p-5 font-mono text-xs sm:text-sm text-green-400 flex flex-col gap-2 relative">
                  {/* Subtle Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {/* Animated Typing Sequence */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <span className="text-white/50">{">"}</span> Connect LANSA...
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-blue-400">
                    [OK] Connected.
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
                    <span className="text-white/50">{">"}</span> Compile RPG...
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="text-yellow-400">
                    [100%] Build Success.
                  </motion.div>
                  
                  {/* Final blinking cursor line */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="mt-2 text-[var(--color-primary-red)] font-bold flex items-center gap-2">
                    <span className="text-white/50 font-normal">{">"}</span> SYSTEM_READY
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-4 bg-[var(--color-primary-red)] inline-block"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Available for hire
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border" style={{ background: "var(--bg-main)", borderColor: "var(--border-main)", color: "var(--text-muted)" }}>
                  <MapPin size={12} />
                  {t("hero_location")}
                </span>
              </div>
            </div>
            
            {/* Decorative background accent */}
            <div className="absolute -inset-4 bg-[var(--color-primary-red)] opacity-[0.03] rounded-[2.5rem] -z-10 blur-xl" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
