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

          {/* Premium Vertical List Layout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="flex flex-col border-t border-[var(--border-main)] w-full max-w-5xl mx-auto mt-12"
          >
            {LINKS.map(({ id, titleKey, descKey, icon: Icon, href, external }) => {
              return (
                <motion.a
                  key={id}
                  variants={fadeUp}
                  id={id}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b border-[var(--border-main)] overflow-hidden transition-colors"
                >
                  {/* Background Slide-in Animation on Hover */}
                  <div className="absolute inset-0 w-full h-full bg-[var(--color-primary-red)] -translate-y-[101%] group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0" />
                  
                  {/* Inner Content Container */}
                  <div className="relative z-10 flex items-center gap-6 md:gap-14 w-full">
                    {/* Large Desktop Icon */}
                    <div className="text-[var(--text-muted)] group-hover:text-white transition-colors duration-500 hidden md:block shrink-0">
                      <Icon size={56} strokeWidth={1} />
                    </div>
                    
                    {/* Text Block */}
                    <div className="flex flex-col">
                       <div className="flex items-center gap-4 mb-2">
                         {/* Mobile Icon */}
                         <div className="md:hidden text-[var(--text-muted)] group-hover:text-white transition-colors duration-500">
                           <Icon size={32} strokeWidth={1.5} />
                         </div>
                         {/* Title */}
                         <p className="text-4xl md:text-6xl lg:text-7xl font-bold font-[var(--font-display)] tracking-tighter text-[var(--text-strong)] group-hover:text-white transition-colors duration-500">
                           {t(titleKey)}
                         </p>
                       </div>
                       {/* Subtitle */}
                       <p className="text-lg md:text-xl lg:text-2xl text-[var(--text-muted)] group-hover:text-[rgba(255,255,255,0.8)] transition-colors duration-500 font-light max-w-2xl">
                         {t(descKey)}
                       </p>
                    </div>
                  </div>

                  {/* Animated Arrow Button */}
                  <div className="relative z-10 mt-8 md:mt-0 self-end md:self-center shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border border-[var(--border-main)] group-hover:border-white flex items-center justify-center bg-[var(--bg-main)] group-hover:bg-transparent transition-all duration-500 overflow-hidden shadow-sm group-hover:shadow-none">
                    {/* Primary Arrow (shoots out right) */}
                    <ChevronRight size={32} className="absolute text-[var(--text-strong)] group-hover:text-white group-hover:translate-x-[150%] transition-transform duration-500 ease-in-out" />
                    {/* Secondary Arrow (shoots in from left) */}
                    <ChevronRight size={32} className="absolute text-white -translate-x-[150%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
      </div>
    </section>
  );
}
