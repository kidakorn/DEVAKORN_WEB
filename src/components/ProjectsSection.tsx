"use client";

// ─────────────────────────────────────────────────────────────────
// ProjectsSection.tsx — Service/project card grid
// 3 col desktop → 2 col tablet → 1 col mobile
// Cards based on real services offered
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { LayoutTemplate, Code2, PenTool, ExternalLink, GitFork } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import type { LucideIcon } from "lucide-react";

const PROJECTS: Array<{
  id: string;
  nameKey: string;
  descKey: string;
  tags: string[];
  icon: LucideIcon;
  github: string | null;
  live: string | null;
}> = [
  {
    id: "project-1",
    nameKey: "project1_name",
    descKey: "project1_desc",
    tags: ["WordPress", "PHP", "CSS"],
    icon: LayoutTemplate,
    github: "https://github.com/kidakorn",
    live: null,
  },
  {
    id: "project-2",
    nameKey: "project2_name",
    descKey: "project2_desc",
    tags: ["Angular", "Node.js", "Express", "MySQL"],
    icon: Code2,
    github: "https://github.com/kidakorn",
    live: "https://fastwork.co/user/kidakorn43",
  },
  {
    id: "project-3",
    nameKey: "project3_name",
    descKey: "project3_desc",
    tags: ["Branding", "Print Media", "Social Media"],
    icon: PenTool,
    github: null,
    live: "https://fastwork.co/user/kidakorn43",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
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
          className="mb-12 flex justify-start"
        >
          <h2
            id="projects-heading"
            className="section-title text-[var(--text-strong)]"
          >
            {t("projects_title")}
          </h2>
        </motion.div>
        <p className="mb-12 text-sm text-[var(--text-muted)]">
          {t("projects_subtitle")}
        </p>

        {/* Card Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto"
        >
          {PROJECTS.map(({ id, nameKey, descKey, tags, icon: Icon, github, live }, index) => {
            const isEven = index % 2 === 0;
            return (
                <motion.article
                key={id}
                id={id}
                variants={fadeUp}
                className="group relative rounded-[1.5rem] p-6 flex flex-col items-start gap-6 border shadow-xl transition-all duration-500"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                }}
              >
                {/* Subtle Hover Glow behind the card */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "var(--color-primary-red)" }}
                />

                {/* Top side: Icon Block */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-[1rem] flex items-center justify-center shadow-inner relative`}
                     style={{ background: "var(--bg-hover)", border: "1px solid var(--border-main)" }}
                >
                  <Icon size={32} strokeWidth={1.5} style={{ color: "var(--color-primary-red)" }} className="opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
                </div>

                {/* Bottom side: Content Block */}
                <div className={`flex-1 flex flex-col items-start text-left gap-4`}>
                  <h3
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {t(nameKey)}
                  </h3>

                  <p
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ color: "var(--text-main)" }}
                  >
                    {t(descKey)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-4 py-2 rounded-full font-semibold"
                        style={{
                          background: "var(--bg-main)",
                          color: "var(--text-strong)",
                          border: "1px solid var(--border-main)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-6 pt-4 w-full border-t mt-2" style={{ borderColor: "var(--border-main)" }}>
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-base font-semibold transition-colors hover:scale-105"
                        style={{ color: "var(--text-main)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-primary-red)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-main)"; }}
                      >
                        <GitFork size={20} strokeWidth={2} />
                        {t("project_view_github")}
                      </a>
                    )}
                    {live && (
                      <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-base font-semibold transition-colors hover:scale-105"
                        style={{ color: "var(--text-main)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-primary-red)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-main)"; }}
                      >
                        <ExternalLink size={20} strokeWidth={2} />
                        {t("project_view_live")}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


