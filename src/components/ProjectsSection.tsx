"use client";

// ─────────────────────────────────────────────────────────────────
// ProjectsSection.tsx — Service/project card grid
// 3 col desktop → 2 col tablet → 1 col mobile
// Includes Inline Project Editor with localStorage persistence
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { LayoutTemplate, Code2, PenTool, ExternalLink, GitFork, Pencil, Trash } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";

// Map string names to Lucide icons for serialization
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutTemplate,
  Code2,
  PenTool,
};

type ProjectItem = {
  id: string;
  nameKey: string;
  descKey: string;
  tags: string[];
  iconName: string;
  github: string | null;
  live: string | null;
};

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "project-1",
    nameKey: "project1_name",
    descKey: "project1_desc",
    tags: ["WordPress", "PHP", "CSS"],
    iconName: "LayoutTemplate",
    github: "https://github.com/kidakorn",
    live: null,
  },
  {
    id: "project-2",
    nameKey: "project2_name",
    descKey: "project2_desc",
    tags: ["Angular", "Node.js", "Express", "MySQL"],
    iconName: "Code2",
    github: "https://github.com/kidakorn",
    live: "https://fastwork.co/user/kidakorn43",
  },
  {
    id: "project-3",
    nameKey: "project3_name",
    descKey: "project3_desc",
    tags: ["Branding", "Print Media", "Social Media"],
    iconName: "PenTool",
    github: null,
    live: "https://fastwork.co/user/kidakorn43",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Editor State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formGithub, setFormGithub] = useState("");
  const [formLive, setFormLive] = useState("");

  // Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("devakorn_projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      } catch (e) {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
    }
    setMounted(true);
  }, []);

  const saveToStorage = (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    localStorage.setItem("devakorn_projects", JSON.stringify(newProjects));
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t("project_delete_confirm"))) {
      saveToStorage(projects.filter((p) => p.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormName("");
    setFormDesc("");
    setFormTags("");
    setFormGithub("");
    setFormLive("");
    setIsModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setFormName(project.nameKey);
    setFormDesc(project.descKey);
    setFormTags(project.tags.join(", "));
    setFormGithub(project.github || "");
    setFormLive(project.live || "");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate brief network delay for UX
    setTimeout(() => {
      const parsedTags = formTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      if (editingProject) {
        // Edit existing
        const updated = projects.map((p) =>
          p.id === editingProject.id
            ? {
              ...p,
              nameKey: formName,
              descKey: formDesc,
              tags: parsedTags,
              github: formGithub || null,
              live: formLive || null,
            }
            : p
        );
        saveToStorage(updated);
      } else {
        // Add new
        const newProject: ProjectItem = {
          id: `project-${Date.now()}`,
          nameKey: formName,
          descKey: formDesc,
          tags: parsedTags,
          iconName: "Code2", // Default icon for new projects
          github: formGithub || null,
          live: formLive || null,
        };
        saveToStorage([...projects, newProject]);
      }
      setIsSaving(false);
      setIsModalOpen(false);
    }, 400);
  };

  // Prevent hydration mismatch by returning a skeleton or nothing until mounted
  if (!mounted) {
    return (
      <section id="projects" className="w-full px-6 py-20 min-h-screen" style={{ background: "var(--bg-hover)" }}></section>
    );
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full px-6 py-20 relative"
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

        {/* Premium Vertical Projects List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col w-full max-w-6xl mx-auto border-t border-[var(--border-main)] mt-8"
        >
          {projects.map((project) => {
            const Icon = ICON_MAP[project.iconName] || Code2;
            return (
              <motion.article
                key={project.id}
                id={project.id}
                variants={fadeUp}
                className="group relative flex flex-col lg:flex-row items-start lg:items-center justify-between p-8 lg:p-12 border-b border-[var(--border-main)] transition-colors overflow-hidden"
              >
                {/* Background Hover Sweep (Slides up from bottom) */}
                <div className="absolute inset-0 w-full h-full bg-[var(--bg-card)] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0 shadow-2xl" />
                {/* Subtle red line accent at the bottom on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-primary-red)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0" />

                {/* Editor Action Buttons (Top Right - Always on top) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <button
                    onClick={() => openEditModal(project)}
                    className="btn btn-sm btn-circle btn-ghost text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-hover)]"
                    title={t("project_edit")}
                    aria-label={t("project_edit")}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="btn btn-sm btn-circle btn-ghost text-[var(--text-muted)] hover:text-[var(--color-primary-red)] hover:bg-[var(--bg-hover)]"
                    title={t("project_delete")}
                    aria-label={t("project_delete")}
                  >
                    <Trash size={16} />
                  </button>
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 w-full">

                  {/* Premium Icon Block */}
                  <div className="flex-shrink-0 w-16 h-16 lg:w-24 lg:h-24 rounded-[1.5rem] lg:rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--color-primary-red)] group-hover:border-transparent"
                    style={{ background: "var(--bg-hover)", border: "1px solid var(--border-main)" }}
                  >
                    <Icon strokeWidth={1.5} className="w-8 h-8 lg:w-12 lg:h-12 text-[var(--color-primary-red)] group-hover:text-white transition-colors duration-500" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col items-start text-left gap-4">
                    <h3 className="text-3xl lg:text-5xl font-bold tracking-tight font-[var(--font-display)] text-[var(--text-strong)] group-hover:text-[var(--color-primary-red)] transition-colors duration-500">
                      {t(project.nameKey)}
                    </h3>
                    <p className="text-lg lg:text-xl text-[var(--text-muted)] group-hover:text-[var(--text-strong)] transition-colors duration-500 max-w-3xl font-light leading-relaxed">
                      {t(project.descKey)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border border-[var(--border-main)] group-hover:border-[var(--color-primary-red)] group-hover:text-[var(--color-primary-red)] transition-colors duration-500 font-semibold"
                          style={{ background: "var(--bg-main)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-row lg:flex-col gap-4 mt-6 lg:mt-0 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border-main)] group-hover:border-transparent group-hover:bg-[var(--bg-main)] text-[var(--text-main)] hover:text-white hover:!bg-[var(--text-strong)] transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
                      >
                        <GitFork size={20} strokeWidth={2} />
                        <span className="hidden lg:inline">{t("project_view_github")}</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full border border-transparent bg-[var(--color-primary-red)] text-white hover:bg-[var(--text-strong)] transition-all duration-300 font-semibold shadow-[0_4px_14px_rgba(200,16,46,0.4)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                      >
                        <ExternalLink size={20} strokeWidth={2} />
                        <span className="hidden lg:inline">{t("project_view_live")}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Add Project Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={openAddModal}
            className="btn rounded-full px-8 font-semibold shadow-lg transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-primary-red)",
              color: "#fff",
              border: "none"
            }}
          >
            {t("project_add_btn")}
          </button>
        </div>
      </div>

      {/* ── Editor Modal ──────────────────────────────────────────── */}
      {isModalOpen && (
        <dialog className="modal modal-open" style={{ zIndex: 9999 }}>
          <div className="modal-box w-11/12 max-w-3xl" style={{ background: "var(--bg-card)", color: "var(--text-main)" }}>
            <h3 className="font-bold text-2xl mb-6 text-[var(--text-strong)]">
              {editingProject ? t("modal_edit_project") : t("modal_add_project")}
            </h3>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">{t("modal_label_name")}</span></label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="input input-bordered w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                  placeholder="e.g. My Awesome Web App"
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">{t("modal_label_desc")}</span></label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="textarea textarea-bordered h-24 w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                  placeholder="e.g. A fullstack application built with Next.js..."
                ></textarea>
              </div>

              {/* Tags */}
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">{t("modal_label_tags")}</span></label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="input input-bordered w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                  placeholder="e.g. React, Tailwind, Node.js"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GitHub */}
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">{t("modal_label_github")}</span></label>
                  <input
                    type="url"
                    value={formGithub}
                    onChange={(e) => setFormGithub(e.target.value)}
                    className="input input-bordered w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                    placeholder="https://github.com/..."
                  />
                </div>

                {/* Live URL */}
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">{t("modal_label_live")}</span></label>
                  <input
                    type="url"
                    value={formLive}
                    onChange={(e) => setFormLive(e.target.value)}
                    className="input input-bordered w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="modal-action mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
                disabled={isSaving}
              >
                {t("btn_cancel")}
              </button>
              <button
                onClick={handleSave}
                className="btn"
                style={{ backgroundColor: "var(--color-primary-red)", color: "#fff", border: "none" }}
                disabled={isSaving || !formName.trim()}
              >
                {isSaving ? <span className="loading loading-spinner"></span> : t("btn_save")}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </section>
  );
}


