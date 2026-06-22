"use client";

// ─────────────────────────────────────────────────────────────────
// ProjectsSection.tsx — Numbered editorial list layout
// Each project is a full-width row with large index number,
// tech tags, and a red slide-in border on hover
// Includes Inline Project Editor with cloud persistence
// ─────────────────────────────────────────────────────────────────

import { motion, type Variants } from "framer-motion";
import { ExternalLink, GitFork, Pencil, Trash, Plus } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectsSection({ isAdmin = false }: { isAdmin?: boolean }) {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      } catch (e) {
        console.error("Failed to load projects", e);
        setProjects(DEFAULT_PROJECTS);
      }
      setMounted(true);
    };
    fetchProjects();
  }, []);

  const saveToCloud = async (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: newProjects }),
      });
    } catch (e) {
      console.error("Failed to save projects to cloud", e);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t("project_delete_confirm"))) {
      saveToCloud(projects.filter((p) => p.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormName(""); setFormDesc(""); setFormTags(""); setFormGithub(""); setFormLive("");
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
    setTimeout(() => {
      const parsedTags = formTags.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
      if (editingProject) {
        const updated = projects.map((p) =>
          p.id === editingProject.id
            ? { ...p, nameKey: formName, descKey: formDesc, tags: parsedTags, github: formGithub || null, live: formLive || null }
            : p
        );
        saveToCloud(updated);
      } else {
        const newProject: ProjectItem = {
          id: `project-${Date.now()}`,
          nameKey: formName,
          descKey: formDesc,
          tags: parsedTags,
          iconName: "Code2",
          github: formGithub || null,
          live: formLive || null,
        };
        saveToCloud([...projects, newProject]);
      }
      setIsSaving(false);
      setIsModalOpen(false);
    }, 400);
  };

  if (!mounted) {
    return (
      <section id="projects" className="w-full px-6 py-28 min-h-[50vh]" style={{ background: "var(--bg-hover)" }} />
    );
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full px-6 py-28 noise-bg border-t"
      style={{
        background: "var(--bg-hover)",
        borderColor: "var(--border-main)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20"
        >
          <div>
            <p className="section-label">{t("projects_title")}</p>
            <h2
              id="projects-heading"
              className="section-title mt-2"
            >
              {t("projects_subtitle")}
            </h2>
          </div>
          {isAdmin && (
            <button
              onClick={openAddModal}
              className="btn-ref flex-shrink-0 self-start sm:self-auto"
            >
              <Plus size={16} />
              {t("project_add_btn")}
            </button>
          )}
        </motion.div>

        {/* ── Bento Box Project Grid ───────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
        >
          {projects.map((project, index) => {
            const isFeatured = index === 0; // First item spans both columns on large screens

            return (
              <motion.article
                key={project.id}
                id={project.id}
                variants={fadeUp}
                className={`group relative flex flex-col justify-between p-8 md:p-12 overflow-hidden border rounded-[2rem] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  isFeatured ? "lg:col-span-2" : "col-span-1"
                }`}
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                }}
              >
                {/* Noise overlay for premium texture */}
                <div className="absolute inset-0 noise-bg opacity-[0.2] pointer-events-none mix-blend-overlay" />

                {/* Glowing hover aura */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 150%, rgba(200,16,46,0.15) 0%, transparent 60%)",
                  }}
                />

                {/* Giant Typographic Watermark */}
                <span
                  className="absolute -bottom-10 -right-6 text-[10rem] md:text-[16rem] font-black leading-none select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                  style={{
                    color: "var(--text-strong)",
                    opacity: 0.03,
                    fontFamily: "var(--font-display)",
                  }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Card Content Top */}
                <div className="relative z-10 flex flex-col gap-4 max-w-2xl mb-12">
                  <h3
                    className="text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[var(--color-primary-red)]"
                    style={{ color: "var(--text-strong)", fontFamily: "var(--font-display)" }}
                  >
                    {t(project.nameKey)}
                  </h3>
                  <p
                    className="text-lg md:text-xl leading-relaxed font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t(project.descKey)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors duration-300 group-hover:border-[var(--color-primary-red)] group-hover:text-[var(--color-primary-red)] bg-white/5 backdrop-blur-md"
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

                {/* Card Bottom: Actions & Admin Controls */}
                <div className="relative z-10 flex items-center justify-between w-full mt-auto pt-6 border-t border-[var(--border-main)] border-opacity-50">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
                        style={{ color: "var(--text-strong)", borderColor: "var(--border-main)", background: "var(--bg-main)" }}
                        aria-label={t("project_view_github")}
                      >
                        <GitFork size={20} strokeWidth={2} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
                        style={{ color: "var(--text-strong)", borderColor: "var(--border-main)", background: "var(--bg-main)" }}
                        aria-label={t("project_view_live")}
                      >
                        <ExternalLink size={20} strokeWidth={2} />
                      </a>
                    )}
                  </div>

                  {/* Admin Editor Buttons */}
                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="px-4 py-2 text-sm font-semibold rounded-full border transition-colors hover:text-[var(--color-primary-red)] hover:border-[var(--color-primary-red)]"
                        style={{ color: "var(--text-muted)", borderColor: "var(--border-main)", background: "var(--bg-main)" }}
                        title={t("project_edit")}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors hover:text-red-500 hover:border-red-500"
                        style={{ color: "var(--text-muted)", borderColor: "var(--border-main)", background: "var(--bg-main)" }}
                        title={t("project_delete")}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Admin logout */}
        {isAdmin && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" });
                router.refresh();
              }}
              className="text-sm font-semibold transition-colors underline underline-offset-4"
              style={{ color: "var(--text-muted)" }}
            >
              Logout of Admin
            </button>
          </div>
        )}
      </div>

      {/* ── Editor Modal ──────────────────────────────────────────── */}
      {isModalOpen && (
        <dialog className="modal modal-open" style={{ zIndex: 9999 }}>
          <div
            className="modal-box w-11/12 max-w-3xl rounded-2xl border"
            style={{ background: "var(--bg-card)", color: "var(--text-main)", borderColor: "var(--border-main)" }}
          >
            <h3 className="font-bold text-2xl mb-6" style={{ color: "var(--text-strong)" }}>
              {editingProject ? t("modal_edit_project") : t("modal_add_project")}
            </h3>

            <div className="flex flex-col gap-4">
              {[
                { label: t("modal_label_name"), value: formName, set: setFormName, type: "text", placeholder: "e.g. My Awesome Web App" },
                { label: t("modal_label_tags"), value: formTags, set: setFormTags, type: "text", placeholder: "React, Tailwind, Node.js" },
                { label: t("modal_label_github"), value: formGithub, set: setFormGithub, type: "url", placeholder: "https://github.com/..." },
                { label: t("modal_label_live"), value: formLive, set: setFormLive, type: "url", placeholder: "https://..." },
              ].map(({ label, value, set, type, placeholder }) => (
                <div key={label} className="form-control">
                  <label className="label"><span className="label-text font-semibold" style={{ color: "var(--text-strong)" }}>{label}</span></label>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    className="input input-bordered w-full focus:outline-none"
                    style={{ background: "var(--bg-main)", color: "var(--text-strong)", borderColor: "var(--border-main)" }}
                  />
                </div>
              ))}
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold" style={{ color: "var(--text-strong)" }}>{t("modal_label_desc")}</span></label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="textarea textarea-bordered h-24 w-full focus:outline-none"
                  placeholder="A short description..."
                  style={{ background: "var(--bg-main)", color: "var(--text-strong)", borderColor: "var(--border-main)" }}
                />
              </div>
            </div>

            <div className="modal-action mt-8">
              <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost" disabled={isSaving}>
                {t("btn_cancel")}
              </button>
              <button
                onClick={handleSave}
                className="btn"
                style={{ background: "var(--color-primary-red)", color: "#fff", border: "none" }}
                disabled={isSaving || !formName.trim()}
              >
                {isSaving ? <span className="loading loading-spinner" /> : t("btn_save")}
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
