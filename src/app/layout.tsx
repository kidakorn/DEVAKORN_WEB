// ─────────────────────────────────────────────────────────────────
// layout.tsx — Root layout
// Sets up metadata, providers, and <html> attributes
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { Space_Grotesk, Syncopate } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { LanguageProvider } from "@/lib/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-syncopate",
  display: "swap",
});

// ── SEO Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.devakorn.com"),
  title: {
    template: "%s | Kidakorn Intha (Devakorn)",
    default: "Devakorn | Kidakorn Intha — Web Developer & Graphic Designer",
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
      <body className={`${spaceGrotesk.variable} ${syncopate.variable} min-h-screen antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <Preloader />
            <ScrollToTop />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
