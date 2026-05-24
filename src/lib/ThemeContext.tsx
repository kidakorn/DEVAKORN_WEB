"use client";

// ─────────────────────────────────────────────────────────────────
// ThemeContext.tsx — Dark / Light mode provider
// Persists preference in localStorage and syncs <html data-theme>
// ─────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

// ── Types ────────────────────────────────────────────────────────
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// ── Context ──────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark"); // default: dark

  // Read from localStorage on mount (client only)
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  // Sync <html data-theme="..."> whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}
