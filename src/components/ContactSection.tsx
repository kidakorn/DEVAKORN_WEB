"use client";

// ─────────────────────────────────────────────────────────────────
// ContactSection.tsx — Massive conversion-focused CTA card
// Removed legacy form to reduce friction. Emphasizes email + copy.
// ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { GitFork, Globe, Briefcase, Mail, Copy, Check, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const EMAIL = "kidakorn.1@gmail.com";

const SOCIAL_LINKS = [
  { id: "contact-github", href: "https://github.com/kidakorn", icon: GitFork, label: "GitHub" },
  { id: "contact-facebook", href: "https://facebook.com/devakorn", icon: Globe, label: "Facebook" },
  { id: "contact-fastwork", href: "https://fastwork.co/user/kidakorn43", icon: Briefcase, label: "Fastwork" },
  { id: "contact-line", href: "https://line.me/ti/p/~hume.ry", icon: MessageCircle, label: "LINE" },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full px-6 py-32 border-t overflow-hidden relative"
      style={{ background: "var(--bg-main)", borderColor: "var(--border-main)" }}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10" aria-hidden="true">
        <div className="w-[800px] h-[800px] rounded-full blur-[150px]" style={{ background: "radial-gradient(circle, var(--color-primary-red) 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="relative rounded-[3rem] p-10 md:p-20 flex flex-col items-center text-center border shadow-2xl overflow-hidden"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(16px)",
            borderColor: "var(--border-main)",
            boxShadow: "0 25px 50px -12px rgba(200, 16, 46, 0.15)",
          }}
        >
          {/* Tag */}
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border mb-8"
              style={{
                borderColor: "var(--border-main)",
                color: "var(--color-primary-red)",
                background: "var(--bg-main)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-red)] animate-pulse" />
              {t("contact_reply_time")}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            id="contact-heading"
            className="font-black leading-[1.1] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--text-strong)",
            }}
          >
            {t("contact_title")}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-2xl max-w-2xl leading-relaxed mb-12 font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            {t("contact_subtitle")}
          </motion.p>

          {/* Big Email Button */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-center gap-3 w-full sm:w-auto min-h-[64px] px-10 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-[0_10px_30px_rgba(200,16,46,0.3)] hover:-translate-y-1"
              style={{ background: "var(--color-primary-red)", color: "white" }}
            >
              <Mail size={22} />
              {t("contact_email_btn")}
              <ArrowRight size={20} className="opacity-70 ml-2" />
            </a>
            
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-3 w-full sm:w-auto min-h-[64px] px-8 rounded-2xl font-bold text-lg border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--bg-main)",
                borderColor: copied ? "var(--color-primary-red)" : "var(--border-main)",
                color: copied ? "var(--color-primary-red)" : "var(--text-strong)",
              }}
            >
              {copied ? (
                <>
                  <Check size={22} />
                  {t("contact_email_copied")}
                </>
              ) : (
                <>
                  <Copy size={22} />
                  Copy Email
                </>
              )}
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full h-px opacity-50 my-12" style={{ background: "var(--border-main)" }} />

          {/* Social Row */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-4">
            {SOCIAL_LINKS.map(({ id, href, icon: Icon, label }) => (
              <a
                key={id}
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg group border"
                style={{ background: "var(--bg-main)", borderColor: "var(--border-main)" }}
              >
                <Icon size={22} className="transition-colors group-hover:text-[var(--color-primary-red)]" style={{ color: "var(--text-muted)" }} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
