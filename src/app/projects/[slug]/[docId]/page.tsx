// ─────────────────────────────────────────────────────────────────
// /projects/[slug]/[docId]/page.tsx — HTML document viewer
// Fetches the doc metadata from Redis and embeds the blob URL in an iframe
// Breadcrumb: Home > Projects > [Project] > [Doc Title]
// ─────────────────────────────────────────────────────────────────

import { Redis } from "@upstash/redis";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import HtmlViewerClient from "@/components/HtmlViewerClient";
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
  { id: "project-1", slug: "wordpress-development", nameKey: "WordPress Development" },
  { id: "project-2", slug: "web-application-development", nameKey: "Web Application Development" },
  { id: "project-3", slug: "graphic-design-branding", nameKey: "Graphic Design & Branding" },
];

type ProjectDoc = {
  id: string;
  title: string;
  description: string;
  blobUrl: string;
  createdAt: string;
  isLocal?: boolean;
  isAdminOnly?: boolean;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; docId: string }>;
}) {
  const { slug, docId } = await params;
  let doc: ProjectDoc | undefined;

  if (redis) {
    const docs = (await redis.get<ProjectDoc[]>(`devakorn_docs:${slug}`)) ?? [];
    doc = docs.find((d) => d.id === docId);
  }

  if (!doc && docId.startsWith("local-")) {
    const filename = docId.replace("local-", "");
    const localPath = path.join(process.cwd(), "public", "docs", slug, filename);
    if (fs.existsSync(localPath)) {
      doc = {
        id: docId,
        title: filename.replace(/\.html?$/, "").replace(/[-_]/g, " "),
        description: "Local File",
        blobUrl: `/docs/${slug}/${filename}`,
        createdAt: new Date().toISOString(),
        isLocal: true,
      };
    }
  }

  return {
    title: doc ? `${doc.title} — Devakorn` : "Document — Devakorn",
  };
}

export default async function HtmlViewerPage({
  params,
}: {
  params: Promise<{ slug: string; docId: string }>;
}) {
  const { slug, docId } = await params;
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_token");

  // Find project info
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
    } catch { }
  }
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  // Find the specific doc
  let doc: ProjectDoc | null = null;
  if (redis) {
    try {
      const docs = (await redis.get<ProjectDoc[]>(`devakorn_docs:${slug}`)) ?? [];
      doc = docs.find((d) => d.id === docId) ?? null;
    } catch { }
  }

  if (!doc && docId.startsWith("local-")) {
    const filename = docId.replace("local-", "");
    const localPath = path.join(process.cwd(), "public", "docs", slug, filename);
    if (fs.existsSync(localPath)) {
      doc = {
        id: docId,
        title: filename.replace(/\.html?$/, "").replace(/[-_]/g, " "),
        description: "Local File",
        blobUrl: `/docs/${slug}/${filename}`,
        createdAt: fs.statSync(localPath).mtime.toISOString(),
        isLocal: true,
        isAdminOnly: true,
      };
    }
  }

  if (!doc) return notFound();
  
  if (doc.isAdminOnly && !isAdmin) return notFound();

  return (
    <>
      <HtmlViewerClient
        projectName={project.nameKey}
        projectSlug={slug}
        doc={doc}
        isAdmin={isAdmin}
      />
    </>
  );
}
