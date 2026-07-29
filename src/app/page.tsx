// ─────────────────────────────────────────────────────────────────
// page.tsx — Main page (Server Component)
// Composes all sections in single-page layout
// ─────────────────────────────────────────────────────────────────

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_token");

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection isAdmin={isAdmin} />
      </main>
      <Footer />
    </>
  );
}
