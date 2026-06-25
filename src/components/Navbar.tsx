"use client";

// ─────────────────────────────────────────────────────────────────
// Navbar.tsx — Sticky navigation bar
// - Logo (logo.png) left, nav links center, toggles right
// - Active section highlight with animated red underline on scroll
// - Smooth hide on scroll-down, show on scroll-up
// - Hamburger menu on mobile
// ─────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { key: "nav_about", href: "#about" },
  { key: "nav_projects", href: "#projects" },
  { key: "nav_clients", href: "#clients" },
  { key: "nav_links", href: "#links" },
  { key: "nav_contact", href: "#contact" },
  { key: "nav_resume", href: "/resume" },
] as const;

const SECTION_IDS = ["about", "projects", "clients", "links", "contact"];

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

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

  // ── Strip hash from URL visually ────────────────────────────────
  useEffect(() => {
    const stripHash = () => {
      if (window.location.hash) {
        setTimeout(() => {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }, 50);
      }
    };
    
    stripHash();
    window.addEventListener("hashchange", stripHash);
    return () => window.removeEventListener("hashchange", stripHash);
  }, []);

  // ── Handle Navigation ─────────────────────────────────────────
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (!href.startsWith("#")) {
      // It's a different page route (e.g., /resume)
      router.push(href);
      return;
    }

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Element exists on current page, smooth scroll to it
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // Element is on the home page, but we are on a different page
      router.push("/" + href);
    }
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    await fetch("/api/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card shadow-[0_1px_0_var(--border-main)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[70px] w-full"
        aria-label="Main navigation"
      >
        {/* ── Logo ───────────────────────────────────────────────── */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-2.5 focus-visible:rounded group"
          aria-label="Devakorn — back to top"
        >
          <div className="relative w-9 h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 rounded-full overflow-hidden">
            <Image
              src="/logo.png"
              alt="Devakorn Logo"
              fill
              className="object-contain drop-shadow-[0_0_8px_rgba(200,16,46,0.5)]"
              priority
            />
          </div>
          <span
            className="text-lg font-bold tracking-tight transition-colors duration-300"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-strong)" }}
          >
            Devakorn
          </span>
        </a>

        {/* ── Desktop Nav Links ───────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ key, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={key}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`nav-link-underline relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                    isActive
                      ? "text-[var(--color-primary-red)] active"
                      : "text-[var(--text-muted)] hover:text-[var(--text-strong)]"
                  }`}
                >
                  {t(key)}
                </a>
              </li>
            );
          })}
          
          {/* Dynamic Login/Logout Link */}
          <li>
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 text-sm font-bold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: "var(--color-primary-red)" }}
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                onClick={(e) => handleNavClick(e, "/login")}
                className="nav-link-underline relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-[var(--text-muted)] hover:text-[var(--text-strong)]"
              >
                {t("nav_login")}
              </a>
            )}
          </li>
        </ul>

        {/* ── Toggles ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-1">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="btn btn-ghost btn-sm text-xs font-bold tracking-wider px-3 min-h-10 rounded-lg"
            style={{ color: "var(--text-muted)" }}
            aria-label={t("aria_toggle_lang")}
            id="lang-toggle-btn"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm btn-circle min-h-10 min-w-10 rounded-lg"
            style={{ color: "var(--text-muted)" }}
            aria-label={t("aria_toggle_theme")}
            id="theme-toggle-btn"
          >
            {theme === "dark" ? (
              <Sun size={17} strokeWidth={1.75} />
            ) : (
              <Moon size={17} strokeWidth={1.75} />
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="btn btn-ghost btn-sm btn-circle md:hidden min-h-10 min-w-10 rounded-lg"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? t("aria_close_menu") : t("aria_open_menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            id="hamburger-btn"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
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
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t relative z-50"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              borderColor: "var(--border-main)",
              isolation: "isolate",
            }}
          >
            <ul className="flex flex-col px-6 py-4" role="list">
              {NAV_LINKS.map(({ key, href }) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <li key={key}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={`flex items-center gap-3 py-3.5 text-sm font-medium transition-colors border-b min-h-[44px] ${
                        isActive
                          ? "text-[var(--color-primary-red)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-strong)]"
                      }`}
                      style={{ borderColor: "var(--border-main)" }}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-red)]" />
                      )}
                      {t(key)}
                    </a>
                  </li>
                );
              })}
              
              {/* Mobile Dynamic Login/Logout Link */}
              <li>
                {isAdmin ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-3 py-3 mt-4 text-sm font-bold transition-all rounded-full text-white shadow-sm"
                    style={{ background: "var(--color-primary-red)" }}
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    href="/login"
                    onClick={(e) => handleNavClick(e, "/login")}
                    className="flex w-full items-center gap-3 py-3.5 text-sm font-medium transition-colors border-b min-h-[44px] text-[var(--text-muted)] hover:text-[var(--text-strong)]"
                    style={{ borderColor: "var(--border-main)" }}
                  >
                    {t("nav_login")}
                  </a>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
