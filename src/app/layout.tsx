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
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit", // Keeping the variable name the same so it works with the rest of the app without changing other CSS
  display: "swap",
});

const chakra = Chakra_Petch({
  weight: ["500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-syncopate", // Keeping the variable name the same so it maps to the display font
  display: "swap",
});

// ── SEO Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.devakorn.com"),
  title: {
    template: "%s | Kidakorn Intha (Devakorn)",
    default: "Devakorn | Kidakorn Intha",
  },
  description:
    "Web Developer and Graphic Designer specializing in Angular, React, Node.js, and creative branding. Based in Thailand.",
  keywords: [
    "Kidakorn Intha",
    "Devakorn",
    "Web Developer",
    "Graphic Designer",
    "Angular",
    "React",
    "Node.js",
    "Portfolio",
    "Thailand",
  ],
  openGraph: {
    title: "Kidakorn Intha (Devakorn) — Web Developer & Graphic Designer",
    description:
      "Web Developer and Graphic Designer specializing in Angular, React, Node.js, and creative branding. Based in Thailand.",
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
        alt: "Kidakorn Intha (Devakorn) — Web Developer & Graphic Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kidakorn Intha (Devakorn) — Web Developer & Graphic Designer",
    description:
      "Web Developer and Graphic Designer specializing in Angular, React, Node.js, and creative branding. Based in Thailand.",
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
      <body className={`${prompt.variable} ${chakra.variable} min-h-screen antialiased`} style={{ fontFamily: 'var(--font-kanit), sans-serif' }}>
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
