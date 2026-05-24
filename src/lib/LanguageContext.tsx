"use client";

// ─────────────────────────────────────────────────────────────────
// LanguageContext.tsx — TH/EN language toggle provider
// Usage: wrap root layout, then use useLanguage() in any component
// ─────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang } from "@/lib/translations";

// ── Types ────────────────────────────────────────────────────────
interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Translate a key to the current language */
  t: (key: string) => string;
}

// ── Context ──────────────────────────────────────────────────────
const LanguageContext = createContext<LanguageContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en"); // default: English

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === "th" ? "en" : "th"));
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) {
        console.error(`[i18n] Missing translation key: "${key}"`);
        return key;
      }
      return entry[lang];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
