"use client";

// ─────────────────────────────────────────────────────────────────
// HtmlViewerClient.tsx — Full-screen iframe viewer for HTML docs
// Shows a top chrome bar with breadcrumbs, back button, and open-new-tab
// The iframe fills the rest of the viewport
// ─────────────────────────────────────────────────────────────────

import { useLanguage } from "@/lib/LanguageContext";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

type ProjectDoc = {
  id: string;
  title: string;
  description: string;
  blobUrl: string;
  createdAt: string;
  isLocal?: boolean;
};

export default function HtmlViewerClient({
  projectName,
  projectSlug,
  doc,
  isAdmin,
}: {
  projectName: string;
  projectSlug: string;
  doc: ProjectDoc;
  isAdmin: boolean;
}) {
  const { t } = useLanguage();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Vercel Blob forces Content-Disposition: attachment for .html files to prevent XSS.
    // To render it in an iframe, we must fetch the raw text and inject it via srcDoc.
    fetch(doc.blobUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load HTML");
        return res.text();
      })
      .then((text) => {
        setHtmlContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading HTML doc:", err);
        setError(true);
        setLoading(false);
      });
  }, [doc.blobUrl]);

  return (
    <div
      className="flex flex-col h-screen w-screen"
      style={{ background: "var(--bg-main)" }}
    >
      {/* ── Top Chrome Bar ─────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 md:px-8 h-14 border-b"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(16px)",
          borderColor: "var(--border-main)",
        }}
      >
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href={`/projects/${projectSlug}`}
            className="flex-shrink-0 text-sm font-semibold transition-colors hover:text-[var(--color-primary-red)]"
            style={{ color: "var(--text-muted)" }}
            aria-label={t("viewer_back")}
          >
            {t("viewer_back")}
          </Link>

          <span className="hidden md:block h-4 w-px" style={{ background: "var(--border-main)" }} />

          <div className="hidden md:block">
            <Breadcrumb
              items={[
                { label: t("breadcrumb_home"), href: "/" },
                { label: t("breadcrumb_projects"), href: "/projects" },
                { label: projectName, href: `/projects/${projectSlug}` },
                { label: doc.title },
              ]}
            />
          </div>
        </div>

        {/* Center: Doc title on mobile */}
        <p
          className="md:hidden text-sm font-semibold truncate mx-4"
          style={{ color: "var(--text-strong)" }}
        >
          {doc.title}
        </p>

        {/* Right: Open in new tab */}
        <a
          href={doc.blobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 hover:bg-[var(--color-primary-red)] hover:border-[var(--color-primary-red)] hover:text-white"
          style={{
            color: "var(--text-muted)",
            borderColor: "var(--border-main)",
            background: "var(--bg-card)",
          }}
        >
          <ExternalLink size={13} />
          <span className="hidden sm:inline">{t("viewer_open_new_tab")}</span>
        </a>
      </header>

      {/* ── iframe ─────────────────────────────────────────────────── */}
      {/* 
        We use srcDoc to bypass Vercel Blob's forced download behavior for .html files.
      */}
      <div className="flex-1 relative w-full h-full bg-white">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--bg-main)]">
            <Loader2 className="animate-spin text-[var(--text-muted)]" size={32} />
            <p className="text-sm font-semibold text-[var(--text-muted)]">Loading document...</p>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--bg-main)]">
            <p className="text-lg font-bold text-red-500">Failed to load document.</p>
            <a href={doc.blobUrl} className="btn" target="_blank" rel="noreferrer">
              Download File Instead
            </a>
          </div>
        )}

        {!loading && !error && (
          <iframe
            srcDoc={htmlContent}
            title={doc.title}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
          />
        )}
      </div>
    </div>
  );
}
