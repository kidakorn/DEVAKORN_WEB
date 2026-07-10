"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────
// LinksSection.tsx — Linktree-style vertical link list
// Full-width rows with muted index numbers + red slide-in on hover
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { GitFork, Globe, Briefcase, ChevronRight, User, MessageCircle, Mail, MonitorPlay, Copy, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import type { LucideIcon } from "lucide-react";

const LINKS: Array<{
  id: string;
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
  href: string;
  external: boolean;
}> = [
    {
      id: "link-facebook-profile",
      titleKey: "link1_title",
      descKey: "link1_desc",
      icon: User,
      href: "https://www.facebook.com/coke.intha",
      external: true,
    },
    {
      id: "link-facebook-page",
      titleKey: "link2_title",
      descKey: "link2_desc",
      icon: MonitorPlay,
      href: "https://facebook.com/devakorn",
      external: true,
    },
    {
      id: "link-line",
      titleKey: "link3_title",
      descKey: "link3_desc",
      icon: MessageCircle,
      href: "https://line.me/ti/p/~hume.ry",
      external: true,
    },
    {
      id: "link-fastwork",
      titleKey: "link4_title",
      descKey: "link4_desc",
      icon: Briefcase,
      href: "https://fastwork.co/user/kidakorn43",
      external: true,
    },
    {
      id: "link-email",
      titleKey: "link5_title",
      descKey: "link5_desc",
      icon: Mail,
      href: "mailto:kidakorn.1@gmail.com",
      external: true,
    },
    {
      id: "link-github",
      titleKey: "link6_title",
      descKey: "link6_desc",
      icon: GitFork,
      href: "https://github.com/kidakorn",
      external: true,
    },
  ];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function LinksSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("kidakorn.1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="links"
      aria-labelledby="links-heading"
      className="w-full px-6 py-28 border-t"
      style={{
        background: "var(--bg-hover)",
        borderColor: "var(--border-main)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-20"
        >
          <p className="section-label">{t("links_subtitle")}</p>
          <h2
            id="links-heading"
            className="section-title mt-2"
          >
            {t("links_title")}
          </h2>
        </motion.div>

        {/* Clean Grid List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {LINKS.map(({ id, titleKey, descKey, icon: Icon, href, external }) => {
            const isEmail = id === "link-email";
            const Wrapper: any = isEmail ? motion.button : motion.a;

            return (
              <Wrapper
                key={id}
                variants={fadeUp}
                id={id}
                href={isEmail ? undefined : href}
                target={!isEmail && external ? "_blank" : undefined}
                rel={!isEmail && external ? "noopener noreferrer" : undefined}
                onClick={isEmail ? handleCopyEmail : undefined}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(200,16,46,0.1)] overflow-hidden text-left w-full cursor-pointer"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-main)",
              }}
            >
              {/* Subtle hover background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 100% 100%, rgba(200,16,46,0.05) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10 flex items-center gap-4 mb-3">
                <div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-[var(--color-primary-red)] group-hover:text-white"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-strong)",
                  }}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <p
                  className="text-lg font-bold leading-tight transition-colors duration-300 group-hover:text-[var(--color-primary-red)]"
                  style={{ color: "var(--text-strong)", fontFamily: "var(--font-display)" }}
                >
                  {t(titleKey)}
                </p>
              </div>
              <p className="relative z-10 text-sm font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {t(descKey)}
              </p>

              {isEmail && (
                <div
                  className="absolute top-4 right-4 p-2 rounded-full border transition-all duration-300 group-hover:bg-[var(--color-primary-red)] group-hover:text-white group-hover:border-[var(--color-primary-red)]"
                  style={{
                    borderColor: "var(--border-main)",
                    color: copied ? "var(--color-primary-red)" : "var(--text-muted)",
                    background: "var(--bg-main)",
                  }}
                  title="Copy Email"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </div>
              )}
            </Wrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
