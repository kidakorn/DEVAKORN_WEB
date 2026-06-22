"use client";

// ─────────────────────────────────────────────────────────────────
// Footer.tsx — Minimal footer with logo watermark
// ─────────────────────────────────────────────────────────────────

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="relative w-full px-6 py-20 text-center overflow-hidden border-t"
      style={{
        background: "var(--bg-hover)",
        borderColor: "var(--border-main)",
      }}
    >


      {/* Top gradient border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-primary-red), transparent)",
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center gap-4">
        {/* Logo + name */}
        <div className="flex items-center gap-2 mb-2">
          <div className="relative w-7 h-7">
            <Image src="/logo.png" alt="Devakorn" fill className="object-contain" />
          </div>
          <span
            className="text-base font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-strong)" }}
          >
            Devakorn
          </span>
        </div>

        <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
          {t("footer_copy")}
        </p>

        <div
          className="w-1 h-1 rounded-full mt-1"
          style={{ background: "var(--color-primary-red)", opacity: 0.6 }}
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
