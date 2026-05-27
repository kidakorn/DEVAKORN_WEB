"use client";

// ─────────────────────────────────────────────────────────────────
// ContactSection.tsx — mailto CTA + real social icons
// Real email: kidakorn.1@gmail.com
// Real socials: GitHub, Facebook, Fastwork
// ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, GitFork, Globe, Briefcase, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const EMAIL = "kidakorn.1@gmail.com";
const PHONE = "090-759-6314";

const SOCIAL_LINKS = [
  { id: "contact-github", href: "https://github.com/kidakorn", icon: GitFork, label: "GitHub" },
  { id: "contact-facebook", href: "https://facebook.com/devakorn", icon: Globe, label: "Facebook" },
  { id: "contact-fastwork", href: "https://fastwork.co/user/kidakorn43", icon: Briefcase, label: "Fastwork" },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent mailto from opening blank tabs if no client is configured
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="relative rounded-[2rem] p-10 md:p-16 flex flex-col items-center text-center border shadow-2xl"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-main)",
          }}
        >

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            id="contact-heading"
            className="relative z-10 text-5xl md:text-7xl font-bold font-[var(--font-display)] tracking-tighter leading-tight mb-8"
            style={{ color: "var(--text-strong)" }}
          >
            Let's build something <br className="hidden md:block" />
            <span className="gradient-text text-[var(--color-primary-red)] drop-shadow-xl">extraordinary.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="relative z-10 text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 font-light"
            style={{ color: "var(--text-main)" }}
          >
            {t("contact_subtitle")}
          </motion.p>

          {/* Contact Actions */}
          <motion.div variants={fadeUp} className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <a
              href={`mailto:${EMAIL}`}
              onClick={handleEmailClick}
              id="contact-email-btn"
              className={`group relative flex items-center gap-4 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer ${copied ? "border-[var(--color-primary-red)] text-[var(--color-primary-red)]" : ""}`}
              style={{
                background: "var(--bg-main)",
                color: copied ? "var(--color-primary-red)" : "var(--text-strong)",
                border: `2px solid ${copied ? "var(--color-primary-red)" : "var(--border-main)"}`,
              }}
              onMouseEnter={(e) => {
                if (!copied) (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-red)";
              }}
              onMouseLeave={(e) => {
                if (!copied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border-main)";
              }}
            >
              {copied ? (
                <CheckCircle2 size={24} className="text-[var(--color-primary-red)] transition-colors" />
              ) : (
                <Mail size={24} className="group-hover:text-[var(--color-primary-red)] transition-colors" />
              )}
              {copied ? t("contact_email_copied") : t("contact_email_btn")}
            </a>

            <a
              href={`tel:+66${PHONE.replace(/-/g, "").slice(1)}`}
              className="flex items-center gap-3 px-8 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                color: "var(--text-main)",
                border: "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-primary-red)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-main)";
              }}
            >
              <Phone size={24} />
              {PHONE}
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={fadeUp} className="relative z-10 flex items-center gap-6 mt-16 pt-8 border-t w-full max-w-lg justify-center" style={{ borderColor: "var(--border-main)" }}>
            {SOCIAL_LINKS.map(({ id, href, icon: Icon, label }) => (
              <a
                key={id}
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ background: "var(--bg-hover)", color: "var(--text-main)", border: "1px solid var(--border-main)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-primary-red)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-main)";
                }}
              >
                <Icon size={24} strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
