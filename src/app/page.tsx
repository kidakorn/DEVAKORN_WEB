// ─────────────────────────────────────────────────────────────────
// page.tsx — Main page (Server Component)
// Composes all sections in single-page layout
// ─────────────────────────────────────────────────────────────────

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import LinksSection from "@/components/LinksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <LinksSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
