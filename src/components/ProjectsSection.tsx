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

        {/* Card Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto"
        >
          {projects.map((project) => {
            const Icon = ICON_MAP[project.iconName] || Code2;
            return (
              <motion.article
                key={project.id}
                id={project.id}
                variants={fadeUp}
                className="group relative rounded-[1.5rem] p-6 flex flex-col items-start gap-6 border shadow-xl transition-all duration-500"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                }}
              >
                {/* Subtle Hover Glow behind the card */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]"
                  style={{ background: "var(--color-primary-red)" }}
                />

                {/* Editor Action Buttons (Top Right) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
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

                {/* Top side: Icon Block */}
                <div className="flex-shrink-0 w-16 h-16 rounded-[1rem] flex items-center justify-center shadow-inner relative"
                     style={{ background: "var(--bg-hover)", border: "1px solid var(--border-main)" }}
                >
                  <Icon size={32} strokeWidth={1.5} style={{ color: "var(--color-primary-red)" }} className="opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
                </div>

                {/* Bottom side: Content Block */}
                <div className="flex-1 flex flex-col items-start text-left gap-4 w-full">
                  <h3
                    className="text-2xl font-bold tracking-tight pr-12"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {/* User entries might not be translation keys, so t() will gracefully fallback to the string itself */}
                    {t(project.nameKey)}
                  </h3>

                  <p
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ color: "var(--text-main)" }}
                  >
                    {t(project.descKey)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
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
                    {project.github && (
                      <a
                        href={project.github}
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
                    {project.live && (
                      <a
                        href={project.live}
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


