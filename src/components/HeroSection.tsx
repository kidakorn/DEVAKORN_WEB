"use client";

// ─────────────────────────────────────────────────────────────────
// HeroSection.tsx — Full-viewport hero
// - Bilingual greeting + name + tagline (staggered 0.15s delay)
// - CSS-only dot-grid background
// - CTA scroll button
// - Social icon links (GitHub, Facebook, Fastwork)
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { GitFork, Globe, Briefcase, ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import TypingText from "@/components/TypingText";

// Real social links
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

// Staggered fade + slide-up for hero elements (0.15s between each)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="hero" className="relative w-full px-6 py-20 min-h-screen flex items-center dot-grid-bg overflow-hidden">
      {/* ── Abstract Glow Backgrounds ─────────────────────────────── */}
      <div 
        className="absolute inset-y-0 left-0 w-[800px] flex items-center pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="w-[800px] h-[600px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--color-primary-red) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="flex flex-col items-start text-left gap-6">
            
            {/* Location badge — delay 0 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-sm backdrop-blur-sm"
                style={{
                  borderColor: "var(--border-main)",
                  color: "var(--text-muted)",
                  background: "var(--bg-card)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary-red)] animate-pulse" />
                {t("hero_location")}
              </span>
            </motion.div>

            <div className="space-y-2">
              {/* Greeting — delay 0.15 */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.15}
                className="text-xl md:text-2xl font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {t("hero_greeting")}
              </motion.p>

              {/* Name (h1) — delay 0.30 */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
                className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] gradient-text max-w-full break-words"
              >
                {t("hero_name")}
              </motion.h1>
            </div>

            {/* Tagline — delay 0.45 */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="text-xl md:text-3xl mt-2 font-medium"
              style={{ color: "var(--text-main)" }}
            >
              {lang === "en" ? "I am a " : "ผมคือ "}
              <TypingText
                strings={["Software Developer", "Builder", "Problem Solver"]}
                className="font-bold text-[var(--color-primary-red)]"
              />
            </motion.p>

            {/* CTA + Social — delay 0.60 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="flex flex-col sm:flex-row items-center gap-6 mt-6"
            >
              <a
                href="#projects"
                id="hero-cta-btn"
                className="btn-ref btn-solid-ref min-h-12 px-8 text-sm"
              >
                {t("hero_cta")}
                <ArrowDown size={18} aria-hidden="true" />
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ id, href, icon: Icon, label }) => (
                  <a
                    key={id}
                    id={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm"
                    style={{ 
                      color: "var(--text-muted)",
                      background: "var(--bg-card)",
                      borderColor: "var(--border-main)"
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-red)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-primary-red)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 25px -5px rgba(200, 16, 46, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-main)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                    }}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Abstract Decorative Elements */}
          <motion.div 
            className="hidden lg:flex justify-end items-center relative h-full min-h-[400px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
             <div className="relative w-80 h-80">
                {/* Decorative glowing circles */}
                <motion.div 
                  className="absolute inset-0 rounded-full border border-dashed"
                  style={{ borderColor: "var(--border-main)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-4 rounded-full border"
                  style={{ borderColor: "var(--border-main)", opacity: 0.5 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div 
                     className="w-40 h-40 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl border"
                     style={{ 
                       background: "var(--bg-card)", 
                       borderColor: "var(--color-primary-red)",
                       boxShadow: "0 0 60px -15px rgba(200, 16, 46, 0.4)" 
                     }}
                   >
                     <span className="font-[var(--font-display)] text-5xl font-bold gradient-text tracking-tighter">
                       DK
                     </span>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Bouncing scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="w-8 h-12 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: "var(--text-muted)" }}>
          <motion.div 
            className="w-1.5 h-3 rounded-full" 
            style={{ background: "var(--text-muted)" }}
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
