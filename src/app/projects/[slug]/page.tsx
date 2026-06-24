// ─────────────────────────────────────────────────────────────────
// /projects/[slug]/page.tsx — Project detail page
// Shows project info + all uploaded HTML docs for that project
// Admin can upload new documents via a modal
// ─────────────────────────────────────────────────────────────────

import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import fs from "fs";
import path from "path";

const isRedisConfigured =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = isRedisConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = DEFAULT_PROJECTS;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.nameKey} — Devakorn` : "Project — Devakorn",
    description: project?.descKey ?? "Project details and reference documents.",
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_token");

  // Find the project
  let projects = DEFAULT_PROJECTS as any[];
  if (redis) {
    try {
      const stored = await redis.get<any[]>("devakorn_projects");
      if (stored && Array.isArray(stored) && stored.length > 0) {
        projects = stored.map((p: any) => ({
          ...p,
          slug: p.slug ?? p.nameKey?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? p.id,
        }));
      }
    } catch {}
  }

  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  // Fetch docs for this project
  let docs: any[] = [];
  if (redis) {
    try {
      const cloudDocs = await redis.get<any[]>(`devakorn_docs:${slug}`);
      if (cloudDocs) docs = [...cloudDocs];
    } catch {}
  }

  // Also fetch local docs!
  try {
    const localDirPath = path.join(process.cwd(), "public", "docs", slug);
    if (fs.existsSync(localDirPath)) {
      const files = fs.readdirSync(localDirPath);
      const htmlFiles = files.filter((f) => f.endsWith(".html") || f.endsWith(".htm"));
      
      const localDocs = htmlFiles.map((filename) => {
        const stats = fs.statSync(path.join(localDirPath, filename));
        return {
          id: `local-${filename}`,
          title: filename.replace(/\.html?$/, "").replace(/[-_]/g, " "),
          description: "Local File",
          blobUrl: `/docs/${slug}/${filename}`,
          createdAt: stats.mtime.toISOString(),
          isLocal: true,
        };
      });
      
      docs = [...localDocs, ...docs]; // Put local files first
    }
  } catch (fsError) {
    console.warn("Failed to read local docs directory:", fsError);
  }

  return (
    <>
      <Navbar />
      <ProjectDetailClient
        project={project}
        initialDocs={docs}
        isAdmin={isAdmin}
      />
      <Footer />
    </>
  );
}
