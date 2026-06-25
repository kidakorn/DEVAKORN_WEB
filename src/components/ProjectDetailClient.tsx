"use client";

// ─────────────────────────────────────────────────────────────────
// ProjectDetailClient.tsx — Client component for /projects/[slug]
// Shows project header, breadcrumbs, and document library
// Admin can upload new .html docs and delete existing ones
// ─────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, type Variants } from "framer-motion";
import {
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  Calendar,
  ArrowRight,
  GitFork,
  Pencil,
  X,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

type ProjectDoc = {
  id: string;
  title: string;
  description: string;
  blobUrl: string;
  createdAt: string;
  isLocal?: boolean;
  isAdminOnly?: boolean;
};

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectDetailClient({
  project,
  initialDocs,
  isAdmin,
}: {
  project: Project;
  initialDocs: ProjectDoc[];
  isAdmin: boolean;
}) {
  const { t } = useLanguage();
  const [docs, setDocs] = useState<ProjectDoc[]>(initialDocs);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Upload modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit modal state
  const [editDoc, setEditDoc] = useState<ProjectDoc | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  const projectName = t(project.nameKey) || project.nameKey;
  const projectDesc = t(project.descKey) || project.descKey;

  // ── Upload new document ──────────────────────────────────────
  const handleUpload = async () => {
    if (!selectedFile || !formTitle.trim()) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("slug", project.slug);
      fd.append("title", formTitle.trim());
      fd.append("description", formDesc.trim());
      fd.append("file", selectedFile);

      const res = await fetch("/api/docs", { method: "POST", body: fd });
      const data = await res.json();

      if (data.success && data.doc) {
        setDocs((prev) => [...prev, data.doc]);
        setModalOpen(false);
        setFormTitle("");
        setFormDesc("");
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // ── Delete document ──────────────────────────────────────────
  const handleDelete = async (doc: ProjectDoc) => {
    if (!confirm(t("doc_delete_confirm"))) return;
    try {
      await fetch(`/api/docs/${doc.id}?slug=${project.slug}`, { method: "DELETE" });
      setDocs((prev) => prev.filter((d) => d.id !== doc.id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ── Edit document metadata ───────────────────────────────────
  const openEdit = (doc: ProjectDoc) => {
    setEditDoc(doc);
    setEditTitle(doc.title);
    setEditDesc(doc.description);
  };

  const handleEditSave = async () => {
    if (!editDoc) return;
    setEditSaving(true);
    try {
      await fetch(`/api/docs/${editDoc.id}?slug=${project.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, description: editDesc }),
      });
      setDocs((prev) =>
        prev.map((d) =>
          d.id === editDoc.id ? { ...d, title: editTitle, description: editDesc } : d
        )
      );
      setEditDoc(null);
    } catch (err) {
      console.error("Edit failed:", err);
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-24" style={{ background: "var(--bg-main)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumb
            items={[
              { label: t("breadcrumb_home"), href: "/" },
              { label: t("breadcrumb_projects"), href: "/projects" },
              { label: projectName },
            ]}
          />
        </div>

        {/* Project Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mb-16"
        >
          {/* Tags row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{
                  borderColor: "var(--border-main)",
                  color: "var(--text-muted)",
                  background: "var(--bg-card)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-bold tracking-tight mb-5"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              fontFamily: "var(--font-display)",
              color: "var(--text-strong)",
              lineHeight: 1.05,
            }}
          >
            {projectName}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl leading-relaxed font-light mb-8"
            style={{ color: "var(--text-muted)", maxWidth: "60ch" }}
          >
            {projectDesc}
          </motion.p>

          {/* External links */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
                style={{
                  color: "var(--text-strong)",
                  borderColor: "var(--border-main)",
                  background: "var(--bg-card)",
                }}
              >
                <GitFork size={15} /> GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
                style={{
                  color: "var(--text-strong)",
                  borderColor: "var(--border-main)",
                  background: "var(--bg-card)",
                }}
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full mb-12" style={{ background: "var(--border-main)" }} />

        {/* Docs Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label mb-1">{t("project_docs_title")}</p>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--text-strong)", fontFamily: "var(--font-display)" }}
            >
              {t("project_docs_title")}
            </h2>
          </div>

          {/* Admin Upload Button */}
          {isAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:opacity-90"
              style={{
                background: "var(--color-primary-red)",
                color: "#fff",
              }}
              id="add-doc-btn"
            >
              <Upload size={15} />
              {t("doc_add_btn")}
            </button>
          )}
        </div>

        {/* Docs Grid */}
        {docs.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed rounded-3xl"
            style={{ borderColor: "var(--border-main)" }}
          >
            <FileText size={40} className="mb-4" style={{ color: "var(--text-muted)", opacity: 0.4 }} />
            <p className="text-xl font-semibold mb-2" style={{ color: "var(--text-strong)" }}>
              {t("project_docs_empty")}
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {isAdmin ? t("project_docs_empty_sub") : "Check back later."}
            </p>
            {isAdmin && (
              <button
                onClick={() => setModalOpen(true)}
                className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:opacity-90"
                style={{ background: "var(--color-primary-red)", color: "#fff" }}
              >
                <Upload size={15} /> {t("doc_add_btn")}
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {docs.filter(doc => isAdmin || !doc.isAdminOnly).map((doc) => (
              <motion.div
                key={doc.id}
                variants={fadeUp}
                className="group relative flex flex-col justify-between p-6 border rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-main)",
                }}
              >
                {/* Card glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 100%, rgba(200,16,46,0.1) 0%, transparent 70%)",
                  }}
                />

                {/* Top */}
                <div className="relative z-10 mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-xl mb-4"
                    style={{ background: "rgba(200,16,46,0.1)" }}
                  >
                    <FileText size={20} style={{ color: "var(--color-primary-red)" }} />
                  </div>

                  <h3
                    className="text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--color-primary-red)]"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {doc.title}
                  </h3>
                  {doc.description && (
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {doc.description}
                    </p>
                  )}
                </div>

                {/* Bottom */}
                <div className="relative z-10 flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border-main)" }}>
                  {/* Date */}
                  <span
                    className="flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Calendar size={12} />
                    {new Date(doc.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {isAdmin && !doc.isLocal && (
                      <>
                        <button
                          onClick={() => openEdit(doc)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border transition-colors hover:border-[var(--color-primary-red)] hover:text-[var(--color-primary-red)]"
                          style={{ color: "var(--text-muted)", borderColor: "var(--border-main)", background: "var(--bg-main)" }}
                          title={t("doc_edit_btn")}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(doc)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border transition-colors hover:border-red-500 hover:text-red-500"
                          style={{ color: "var(--text-muted)", borderColor: "var(--border-main)", background: "var(--bg-main)" }}
                          title={t("doc_delete_btn")}
                        >
                          <Trash2 size={13} />
                        </button>
                      </>
                    )}
                    {/* Open viewer */}
                    <Link
                      href={`/projects/${project.slug}/${doc.id}`}
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:text-white"
                      style={{
                        background: "var(--color-primary-red)",
                        color: "#fff",
                      }}
                      title={t("doc_view_btn")}
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Upload Modal ───────────────────────────────────────────── */}
      {modalOpen && mounted && createPortal(
        <dialog className="modal modal-open" style={{ zIndex: 9999 }}>
          <div
            className="modal-box w-11/12 max-w-2xl rounded-2xl border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-main)", color: "var(--text-main)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl" style={{ color: "var(--text-strong)" }}>
                {t("doc_modal_add_title")}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-ghost btn-circle btn-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold" style={{ color: "var(--text-strong)" }}>
                    {t("doc_label_title")} *
                  </span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Installation Guide"
                  className="input input-bordered w-full focus:outline-none"
                  style={{ background: "var(--bg-main)", color: "var(--text-strong)", borderColor: "var(--border-main)" }}
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold" style={{ color: "var(--text-strong)" }}>
                    {t("doc_label_desc")}
                  </span>
                </label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="A short summary of this document..."
                  className="textarea textarea-bordered h-20 w-full focus:outline-none"
                  style={{ background: "var(--bg-main)", color: "var(--text-strong)", borderColor: "var(--border-main)" }}
                />
              </div>

              {/* File picker */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold" style={{ color: "var(--text-strong)" }}>
                    {t("doc_label_file")} *
                  </span>
                </label>
                <div
                  className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors hover:border-[var(--color-primary-red)]"
                  style={{ borderColor: selectedFile ? "var(--color-primary-red)" : "var(--border-main)" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={28} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
                  {selectedFile ? (
                    <p className="text-sm font-semibold" style={{ color: "var(--color-primary-red)" }}>
                      {selectedFile.name}
                    </p>
                  ) : (
                    <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
                      Click to select an <strong>.html</strong> file
                    </p>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".html,.htm"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="modal-action mt-8">
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-ghost"
                disabled={uploading}
                style={{ color: "var(--text-muted)" }}
              >
                {t("btn_cancel")}
              </button>
              <button
                onClick={handleUpload}
                className="btn"
                disabled={uploading || !formTitle.trim() || !selectedFile}
                style={{ background: "var(--color-primary-red)", color: "#fff", border: "none" }}
              >
                {uploading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    {t("doc_uploading")}
                  </>
                ) : (
                  <>
                    <Upload size={15} />
                    {t("doc_add_btn")}
                  </>
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
            <button type="submit">close</button>
          </form>
        </dialog>,
        document.body
      )}

      {/* ── Edit Modal ─────────────────────────────────────────────── */}
      {editDoc && mounted && createPortal(
        <dialog className="modal modal-open" style={{ zIndex: 9999 }}>
          <div
            className="modal-box w-11/12 max-w-2xl rounded-2xl border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-main)", color: "var(--text-main)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl" style={{ color: "var(--text-strong)" }}>
                {t("doc_modal_edit_title")}
              </h3>
              <button
                onClick={() => setEditDoc(null)}
                className="btn btn-ghost btn-circle btn-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold" style={{ color: "var(--text-strong)" }}>
                    {t("doc_label_title")}
                  </span>
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="input input-bordered w-full focus:outline-none"
                  style={{ background: "var(--bg-main)", color: "var(--text-strong)", borderColor: "var(--border-main)" }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold" style={{ color: "var(--text-strong)" }}>
                    {t("doc_label_desc")}
                  </span>
                </label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="textarea textarea-bordered h-20 w-full focus:outline-none"
                  style={{ background: "var(--bg-main)", color: "var(--text-strong)", borderColor: "var(--border-main)" }}
                />
              </div>
            </div>

            <div className="modal-action mt-8">
              <button onClick={() => setEditDoc(null)} className="btn btn-ghost" disabled={editSaving} style={{ color: "var(--text-muted)" }}>
                {t("btn_cancel")}
              </button>
              <button
                onClick={handleEditSave}
                className="btn"
                disabled={editSaving || !editTitle.trim()}
                style={{ background: "var(--color-primary-red)", color: "#fff", border: "none" }}
              >
                {editSaving ? <span className="loading loading-spinner loading-sm" /> : t("btn_save")}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onSubmit={(e) => { e.preventDefault(); setEditDoc(null); }}>
            <button type="submit">close</button>
          </form>
        </dialog>,
        document.body
      )}
    </main>
  );
}
