// ─────────────────────────────────────────────────────────────────
// portfolio/page.tsx — Portfolio and Client Sections
// ─────────────────────────────────────────────────────────────────

import Navbar from "@/components/Navbar";
import WorkProcessSection from "@/components/WorkProcessSection";
import ClientsSection from "@/components/ClientsSection";
import LinksSection from "@/components/LinksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import { cookies } from "next/headers";

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_token");

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <main className="pt-[70px]">
        <WorkProcessSection />
        <ClientsSection isAdmin={isAdmin} />
        <LinksSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
