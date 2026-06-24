"use client";

// ─────────────────────────────────────────────────────────────────
// Breadcrumb.tsx — Reusable breadcrumb navigation
// Usage: <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: "My Project" }]} />
// The last item is always the current page (no link, styled differently)
// ─────────────────────────────────────────────────────────────────

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export type BreadcrumbItem = {
  label: string;
  href?: string; // If omitted, this is the current (active) page
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label="Breadcrumb"
    >
      <ol
        className="flex flex-wrap items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em]"
        style={{ color: "var(--text-muted)" }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {/* Separator — shown before all items except the first */}
              {index > 0 && (
                <ChevronRight
                  size={12}
                  strokeWidth={2.5}
                  className="flex-shrink-0"
                  aria-hidden="true"
                />
              )}

              {/* Link or current page label */}
              {isLast || !item.href ? (
                // Current page — not a link, highlighted
                <span
                  aria-current="page"
                  style={{ color: "var(--color-primary-red)" }}
                  className="truncate max-w-[180px]"
                >
                  {item.label}
                </span>
              ) : (
                // Ancestor link
                <Link
                  href={item.href}
                  className="hover:underline underline-offset-2 transition-colors duration-200 truncate max-w-[120px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
