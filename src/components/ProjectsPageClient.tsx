"use client";

// ─────────────────────────────────────────────────────────────────
// ProjectsPageClient.tsx — Client component for /projects listing
// Shows all projects as Bento cards with breadcrumb + "View Details" link
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { ExternalLink, GitFork, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

type Project = {
  id: string;
  slug: string;
  nameKey: string;
  descKey: string;
  tags: string[];
  github: string | null;
  live: string | null;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectsPageClient({
  projects,
  isAdmin,
}: {
  projects: Project[];
  isAdmin: boolean;
}) {
  const { t } = useLanguage();

  return (
    <main
      className="min-h-screen pt-28 pb-24"
      style={{ background: "var(--bg-main)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: t("breadcrumb_home"), href: "/" },
              { label: t("breadcrumb_projects") },
            ]}
          />
        </div>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-4">
            {t("projects_page_title")}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontFamily: "var(--font-display)",
              color: "var(--text-strong)",
              lineHeight: 1.05,
            }}
          >
            {t("projects_page_title")}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg"
            style={{ color: "var(--text-muted)", maxWidth: "40ch" }}
          >
            {t("projects_page_subtitle")}
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
        >
          {projects.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <motion.article
                key={project.id}
                id={project.id}
                variants={fadeUp}
                className={`group relative flex flex-col justify-between p-8 md:p-10 overflow-hidden border rounded-[2rem] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  isFeatured ? "lg:col-span-2" : "col-span-1"
                }`}
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                }}
              >
                {/* Glowing hover aura */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 150%, rgba(200,16,46,0.12) 0%, transparent 60%)",
                  }}
                />

                {/* Giant Typographic Watermark */}
                <span
                  className="absolute -bottom-10 -right-6 text-[10rem] md:text-[14rem] font-black leading-none select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                  style={{
                    color: "var(--text-strong)",
                    opacity: 0.03,
                    fontFamily: "var(--font-display)",
                  }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col gap-4 mb-10">
                  <h2
                    className="text-2xl md:text-4xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[var(--color-primary-red)]"
                    style={{ color: "var(--text-strong)", fontFamily: "var(--font-display)" }}
                  >
                    {t(project.nameKey) || project.nameKey}
                  </h2>
                  <p
                    className="text-base md:text-lg leading-relaxed font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t(project.descKey) || project.descKey}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors duration-300 group-hover:border-[var(--color-primary-red)] group-hover:text-[var(--color-primary-red)]"
                        style={{
                          borderColor: "var(--border-main)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom */}
                <div className="relative z-10 flex items-center justify-between w-full mt-auto pt-6 border-t" style={{ borderColor: "var(--border-main)" }}>
                  {/* External links */}
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
                        style={{
                          color: "var(--text-strong)",
                          borderColor: "var(--border-main)",
                          background: "var(--bg-main)",
                        }}
                        aria-label="GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitFork size={18} strokeWidth={2} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
                        style={{
                          color: "var(--text-strong)",
                          borderColor: "var(--border-main)",
                          background: "var(--bg-main)",
                        }}
                        aria-label="Live Demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} strokeWidth={2} />
                      </a>
                    )}
                  </div>

                  {/* "View Details →" — navigates to project detail sub-page */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
                    style={{
                      color: "var(--text-strong)",
                      borderColor: "var(--border-main)",
                      background: "var(--bg-main)",
                    }}
                  >
                    {t("projects_view_details")}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}
