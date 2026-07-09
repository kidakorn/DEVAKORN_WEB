"use client";

// ─────────────────────────────────────────────────────────────────
// LinksSection.tsx — Linktree-style vertical link list
// Full-width rows with muted index numbers + red slide-in on hover
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { GitFork, Globe, Briefcase, ChevronRight, Facebook, MessageCircle, Mail, MonitorPlay } from "lucide-react";
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
    icon: Facebook,
    href: "https://facebook.com/kidakorn43",
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
    href: "https://line.me/ti/p/~kidakorn",
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

  return (
    <section
      id="links"
      aria-labelledby="links-heading"
      className="w-full px-6 py-28 border-t noise-bg"
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

        {/* Premium Vertical List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col border-t"
          style={{ borderColor: "var(--border-main)" }}
        >
          {LINKS.map(({ id, titleKey, descKey, icon: Icon, href, external }, index) => (
            <motion.a
              key={id}
              variants={fadeUp}
              id={id}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-14 border-b overflow-hidden"
              style={{ borderColor: "var(--border-main)" }}
            >
              {/* Red background slide-in on hover */}
              <div
                className="absolute inset-0 w-full h-full -translate-y-[101%] group-hover:translate-y-0 pointer-events-none z-0"
                style={{
                  background: "var(--color-primary-red)",
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-center gap-6 md:gap-10 w-full">
                {/* Muted index number */}
                <span
                  className="hidden md:block text-sm font-bold tabular-nums flex-shrink-0 w-8 transition-colors duration-300 group-hover:text-white/60"
                  style={{
                    color: "var(--color-primary-red)",
                    fontFamily: "var(--font-display)",
                  }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Desktop Icon */}
                <div
                  className="hidden md:block flex-shrink-0 transition-colors duration-500 group-hover:text-white"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Icon size={44} strokeWidth={1} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 mb-1">
                    {/* Mobile Icon */}
                    <div
                      className="md:hidden flex-shrink-0 transition-colors duration-500 group-hover:text-white"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <p
                      className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter transition-colors duration-500 group-hover:text-white"
                      style={{
                        color: "var(--text-strong)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {t(titleKey)}
                    </p>
                  </div>
                  <p
                    className="text-base md:text-lg font-light transition-colors duration-500 group-hover:text-white/80"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t(descKey)}
                  </p>
                </div>
              </div>

              {/* Arrow button */}
              <div
                className="relative z-10 mt-6 md:mt-0 self-end md:self-center flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-all duration-500 overflow-hidden group-hover:border-white group-hover:bg-transparent"
                style={{
                  background: "var(--bg-main)",
                  borderColor: "var(--border-main)",
                }}
              >
                <ChevronRight
                  size={24}
                  className="absolute text-[var(--text-strong)] group-hover:text-white group-hover:translate-x-[200%] transition-transform duration-400 ease-in-out"
                />
                <ChevronRight
                  size={24}
                  className="absolute text-white -translate-x-[200%] group-hover:translate-x-0 transition-transform duration-400 ease-in-out"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
