// ─────────────────────────────────────────────────────────────────
// /projects/page.tsx — Public project listing page
// Mirrors the Bento Grid from the homepage but on its own route
// ─────────────────────────────────────────────────────────────────

import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsPageClient from "@/components/ProjectsPageClient";

export const metadata = {
  title: "Projects — Devakorn",
  description: "Browse all projects by Devakorn with reference documents and details.",
};

const isRedisConfigured =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = isRedisConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

// Default projects (same as ProjectsSection defaults, with slug added)
const DEFAULT_PROJECTS = [
  {
    id: "project-1",
    slug: "wordpress-development",
    nameKey: "WordPress Development",
    descKey: "Professional setup, customization, and maintenance of WordPress sites for businesses and blogs.",
    tags: ["WordPress", "PHP", "CSS"],
    github: "https://github.com/kidakorn",
    live: null,
  },
  {
    id: "project-2",
    slug: "web-application-development",
    nameKey: "Web Application Development",
    descKey: "Custom-built web apps using Node.js and Angular for performance and scalability.",
    tags: ["Angular", "Node.js", "Express", "MySQL"],
    github: "https://github.com/kidakorn",
    live: "https://fastwork.co/user/kidakorn43",
  },
  {
    id: "project-3",
    slug: "graphic-design-branding",
    nameKey: "Graphic Design & Branding",
    descKey: "Unique logo creation, banner design, and print media layout for standout branding.",
    tags: ["Branding", "Print Media", "Social Media"],
    github: null,
    live: "https://fastwork.co/user/kidakorn43",
  },
];

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_token");

  // Fetch projects from Redis if available
  let projects = DEFAULT_PROJECTS;
  if (redis) {
    try {
      const stored = await redis.get<typeof DEFAULT_PROJECTS>("devakorn_projects");
      if (stored && Array.isArray(stored) && stored.length > 0) {
        // Ensure slug field exists (migrate if stored projects lack it)
        projects = stored.map((p: any) => ({
          ...p,
          slug: p.slug ?? p.nameKey?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? p.id,
        }));
      }
    } catch {
      // Fallback to defaults
    }
  }

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <ProjectsPageClient projects={projects} isAdmin={isAdmin} />
      <Footer />
    </>
  );
}
