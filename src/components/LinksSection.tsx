"use client";

// ─────────────────────────────────────────────────────────────────
// LinksSection.tsx — Linktree-style vertical link list
// Real links: GitHub, Facebook, Fastwork
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { GitFork, Globe, Briefcase, ChevronRight } from "lucide-react";
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
    id: "link-github",
    titleKey: "link1_title",
    descKey: "link1_desc",
    icon: GitFork,
    href: "https://github.com/kidakorn",
    external: true,
  },
  {
    id: "link-facebook",
    titleKey: "link2_title",
    descKey: "link2_desc",
    icon: Globe,
    href: "https://facebook.com/devakorn",
    external: true,
  },
  {
    id: "link-fastwork",
    titleKey: "link3_title",
    descKey: "link3_desc",
    icon: Briefcase,
    href: "https://fastwork.co/user/kidakorn43",
    external: true,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function LinksSection() {
  const { t } = useLanguage();

  return (
    <section
      id="links"
      aria-labelledby="links-heading"
      className="w-full px-6 py-20"
      style={{ background: "var(--bg-hover)" }}
    >
      <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-10 flex justify-start"
          >
            <h2
              id="links-heading"
              className="section-title text-[var(--text-strong)] tracking-tight"
            >
              {t("links_title")}
            </h2>
          </motion.div>
          <p className="mb-10 text-sm text-[var(--text-muted)]">{t("links_subtitle")}</p>

          {/* Bento Box Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {LINKS.map(({ id, titleKey, descKey, icon: Icon, href, external }, index) => {
              // The first link (GitHub) spans the full width
              const isFeatured = index === 0;

              return (
                <motion.a
                  key={id}
                  variants={fadeUp}
                  id={id}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`group relative flex rounded-[2rem] border transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${
                    isFeatured 
                      ? "col-span-1 md:col-span-2 p-8 md:p-12 flex-col md:flex-row items-start md:items-center justify-between gap-8" 
                      : "col-span-1 p-8 flex-col justify-between min-h-[280px] gap-8"
                  }`}
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-main)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-red)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-main)";
                  }}
                >
                  {/* Hover background sweep */}
                  <div className="absolute inset-0 w-full h-full bg-[var(--color-primary-red)] opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Inner Layout Container */}
                  <div className={`flex relative z-10 w-full h-full ${isFeatured ? "flex-col md:flex-row items-start md:items-center gap-6 md:gap-8" : "flex-col items-start gap-6"}`}>
                    
                    {/* -- For Square Cards -- */}
                    {!isFeatured && (
                      <div className="flex w-full justify-between items-start">
                        {/* Icon */}
                        <div
                          className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 shadow-inner group-hover:scale-110"
                          style={{
                            background: "var(--bg-hover)",
                            color: "var(--color-primary-red)",
                            border: "1px solid var(--border-main)",
                          }}
                          aria-hidden="true"
                        >
                          <Icon size={32} strokeWidth={1.5} />
                        </div>

                        {/* Arrow (Top Right) */}
                        <div className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:border-[var(--color-primary-red)] group-hover:bg-[rgba(200,16,46,0.1)]" style={{ borderColor: "var(--border-main)", background: "var(--bg-hover)" }}>
                          <ChevronRight
                            size={24}
                            strokeWidth={2}
                            aria-hidden="true"
                            className="transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[var(--color-primary-red)]"
                            style={{ color: "var(--text-main)" }}
                          />
                        </div>
                      </div>
                    )}

                    {/* -- For Featured Card -- */}
                    {isFeatured && (
                      <div
                        className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 shadow-inner group-hover:scale-110 shrink-0"
                        style={{
                          background: "var(--bg-hover)",
                          color: "var(--color-primary-red)",
                          border: "1px solid var(--border-main)",
                        }}
                        aria-hidden="true"
                      >
                        <Icon size={40} strokeWidth={1.5} />
                      </div>
                    )}
                    
                    {/* Text block */}
                    <div className={`${!isFeatured ? "mt-auto pt-6" : ""}`}>
                      <p
                        className="text-2xl md:text-3xl font-bold tracking-tight mb-2 transition-colors duration-500 group-hover:text-[var(--color-primary-red)]"
                        style={{ color: "var(--text-strong)" }}
                      >
                        {t(titleKey)}
                      </p>
                      <p
                        className="text-base md:text-lg max-w-md"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {t(descKey)}
                      </p>
                    </div>
                  </div>

                  {/* Arrow for Featured Card (Desktop side) */}
                  {isFeatured && (
                    <div className="relative z-10 hidden md:flex shrink-0">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:border-[var(--color-primary-red)] group-hover:bg-[rgba(200,16,46,0.1)]" style={{ borderColor: "var(--border-main)", background: "var(--bg-hover)" }}>
                        <ChevronRight
                          size={28}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[var(--color-primary-red)]"
                          style={{ color: "var(--text-main)" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Arrow for Featured Card (Mobile top-right corner) */}
                  {isFeatured && (
                    <div className="md:hidden absolute top-8 right-8 z-10">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:border-[var(--color-primary-red)] group-hover:bg-[rgba(200,16,46,0.1)]" style={{ borderColor: "var(--border-main)", background: "var(--bg-hover)" }}>
                        <ChevronRight
                          size={24}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[var(--color-primary-red)]"
                          style={{ color: "var(--text-main)" }}
                        />
                      </div>
                    </div>
                  )}
                </motion.a>
              );
            })}
          </motion.div>
      </div>
    </section>
  );
}
