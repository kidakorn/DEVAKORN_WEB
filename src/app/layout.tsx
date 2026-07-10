// ─────────────────────────────────────────────────────────────────
// layout.tsx — Root layout
// Sets up metadata, providers, and <html> attributes
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { Prompt, Chakra_Petch } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { LanguageProvider } from "@/lib/LanguageContext";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
  display: "swap",
});

const chakra = Chakra_Petch({
  weight: ["500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-chakra",
  display: "swap",
});

// ── SEO Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.devakorn.com"),
  title: {
    template: "%s | Devakorn (Kidakorn Intha)",
    default: "Devakorn | Staff Developer & Enterprise Systems",
  },
  description:
    "Portfolio of Kidakorn Intha (Devakorn), a Staff Developer based in Thailand. Specializing in enterprise system development using IBM i, RPG, LANSA, Db2, and modern web applications with Next.js and Node.js.",
  keywords: [
    "Kidakorn Intha",
    "Devakorn",
    "Staff Developer",
    "Enterprise System Developer",
    "IBM i Developer",
    "RPG Developer",
    "LANSA Developer",
    "Db2 Database",
    "Web Developer Thailand",
    "Full Stack Developer",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Devakorn | Staff Developer & Enterprise Systems",
    description:
      "Explore the portfolio of Kidakorn Intha (Devakorn). Expert in building robust enterprise systems and scalable modern web applications.",
    url: "https://www.devakorn.com",
    siteName: "Devakorn Portfolio",
    locale: "th_TH",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Devakorn | Staff Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devakorn | Staff Developer & Enterprise Systems",
    description:
      "Explore the portfolio of Kidakorn Intha (Devakorn). Expert in building robust enterprise systems and scalable modern web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import ContactWidget from "@/components/ContactWidget";
import SmoothScrolling from "@/components/SmoothScrolling";

import { Analytics } from "@vercel/analytics/react";

// ── Root Layout ──────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * lang="th" — default Thai; JavaScript toggles this client-side
     * data-theme="dark" — DaisyUI dark theme by default
     * suppressHydrationWarning — needed because ThemeProvider updates
     *   data-theme from localStorage before first paint (avoids mismatch)
     */
    <html lang="th" data-theme="dark" suppressHydrationWarning>
      <body 
        className={`${prompt.variable} ${chakra.variable} font-sans bg-main text-main min-h-screen antialiased`}
        style={{
          '--font-sans': `${prompt.style.fontFamily}, ui-sans-serif, system-ui, sans-serif`,
          '--font-display': `${chakra.style.fontFamily}, ${prompt.style.fontFamily}, ui-sans-serif, system-ui, sans-serif`
        } as React.CSSProperties}
      >
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScrolling>
              <Preloader />
              <ScrollToTop />
              {children}
              <Analytics />
            </SmoothScrolling>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
