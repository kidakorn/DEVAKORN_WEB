"use client";

// ─────────────────────────────────────────────────────────────────
// Footer.tsx — Minimal one-line footer
// ─────────────────────────────────────────────────────────────────

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative w-full px-6 py-20 text-center">
      {/* Subtle top border line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, var(--border-main), transparent)"
        }}
      />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
        <p className="text-sm font-semibold tracking-wide" style={{ color: "var(--text-muted)" }}>
          {t("footer_copy")}
        </p>
        <div className="w-1 h-1 rounded-full opacity-50 mt-2" style={{ background: "var(--color-primary-red)" }} />
      </div>
    </footer>
  );
}
