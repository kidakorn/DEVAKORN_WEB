"use client";

// ─────────────────────────────────────────────────────────────────
// Navbar.tsx — Sticky navigation bar
// - Logo/name left, nav links center, toggles right
// - Active section highlight via IntersectionObserver
// - Smooth hide on scroll-down, show on scroll-up (Framer Motion)
// - Hamburger menu on mobile (< 768px)
// ─────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";

const NAV_LINKS = [
  { key: "nav_about", href: "#about" },
  { key: "nav_projects", href: "#projects" },
  { key: "nav_links", href: "#links" },
  { key: "nav_contact", href: "#contact" },
] as const;

const SECTION_IDS = ["about", "projects", "links", "contact"];

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false); // true = slid off-screen
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Highlight active section on scroll ──────────────────────────
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // ── Smooth hide on scroll-down / show on scroll-up ──────────────
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Only hide after user has scrolled past the hero (> 80px)
      if (y > 80) {
        setHidden(y > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when a link is clicked
  const handleNavClick = () => setMenuOpen(false);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled
        ? "glass-card shadow-lg border-b"
        : "bg-transparent border-b border-transparent"
        }`}
      style={{ borderColor: scrolled ? "var(--border-main)" : "transparent" }}
    >
      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20 w-full"
        aria-label="Main navigation"
      >
        {/* ── Logo ───────────────────────────────────────────────── */}
        <a
          href="#"
          className="flex items-center gap-0.5 focus-visible:rounded group"
          aria-label="Devakorn — back to top"
        >
          <img
            src="/icon.svg"
            alt="Devakorn Logo"
            className="w-8 h-8 transition-all duration-300 group-hover:scale-110 drop-shadow-md"
          />
          <span className="text-2xl font-bold tracking-tight gradient-text group-hover:brightness-110 transition-all">
            EVAKORN
          </span>
        </a>

        {/* ── Desktop Nav Links ───────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ key, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={key}>
                <a
                  href={href}
                  className={`text-sm font-medium transition-colors duration-200 ${isActive
                    ? "text-[var(--color-primary-red)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-strong)]"
                    }`}
                >
                  {t(key)}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Toggles ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          {/* Language toggle — min 44px tap target */}
          <button
            onClick={toggleLang}
            className="btn btn-ghost btn-sm text-xs font-semibold tracking-wide px-3 min-h-11"
            aria-label={t("aria_toggle_lang")}
            id="lang-toggle-btn"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>

          {/* Theme toggle — min 44px tap target */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm btn-circle min-h-11 min-w-11"
            aria-label={t("aria_toggle_theme")}
            id="theme-toggle-btn"
          >
            {theme === "dark" ? (
              <Sun size={18} strokeWidth={1.75} />
            ) : (
              <Moon size={18} strokeWidth={1.75} />
            )}
          </button>

          {/* Hamburger — mobile only, min 44px tap target */}
          <button
            className="btn btn-ghost btn-sm btn-circle md:hidden min-h-11 min-w-11"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? t("aria_close_menu") : t("aria_open_menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            id="hamburger-btn"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden"
            style={{ background: "var(--glass-bg)", backdropFilter: "blur(12px)" }}
          >
            <ul className="flex flex-col gap-1 px-6 pb-4 pt-2" role="list">
              {NAV_LINKS.map(({ key, href }) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <li key={key}>
                    <a
                      href={href}
                      onClick={handleNavClick}
                      className={`block py-3 text-sm font-medium transition-colors min-h-[44px] flex items-center ${isActive
                        ? "text-[var(--color-primary-red)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-strong)]"
                        }`}
                    >
                      {t(key)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
