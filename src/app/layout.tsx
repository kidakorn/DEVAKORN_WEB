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
    default: "Devakorn | Web Developer",
  },
  description:
    "Portfolio of Kidakorn Intha (Devakorn), a Full Stack Web Developer and UI/UX Graphic Designer based in Thailand. Specializing in modern web applications using Next.js, React, Node.js, and creative branding solutions.",
  keywords: [
    "Kidakorn Intha",
    "Devakorn",
    "Full Stack Developer",
    "Web Developer Thailand",
    "Frontend Engineer",
    "Graphic Designer",
    "UI/UX Design",
    "Next.js Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Freelance Web Developer",
    "Custom Web Applications"
  ],
  openGraph: {
    title: "Devakorn | Full Stack Web Developer & Designer",
    description:
      "Explore the portfolio of Kidakorn Intha (Devakorn). Expert in building fast, scalable web applications and delivering highly engaging UI/UX designs.",
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
        alt: "Devakorn | Full Stack Web Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devakorn | Full Stack Web Developer & Designer",
    description:
      "Explore the portfolio of Kidakorn Intha (Devakorn). Expert in building fast, scalable web applications and delivering highly engaging UI/UX designs.",
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
