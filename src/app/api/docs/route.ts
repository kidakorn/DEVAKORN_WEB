import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────────
// API: /api/docs
// GET  — List all docs for a given project slug (?slug=my-project)
// POST — Upload a new .html file doc (admin only, multipart/form-data)
// ─────────────────────────────────────────────────────────────────

const isRedisConfigured =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = isRedisConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

export type ProjectDoc = {
  id: string;       // Unique ID (timestamp-based)
  title: string;    // Display title
  description: string;
  blobUrl: string;  // Vercel Blob URL or local relative URL
  createdAt: string;
  isLocal?: boolean; // True if this file is hosted locally in public/docs
};

// ── GET /api/docs?slug=my-project ───────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing ?slug param" }, { status: 400 });
  }

  try {
    let docs: ProjectDoc[] = [];
    if (isRedisConfigured) {
      const cloudDocs = await redis?.get<ProjectDoc[]>(`devakorn_docs:${slug}`);
      if (cloudDocs) docs = [...cloudDocs];
    }

    // -- Read local files from public/docs/[slug] --
    try {
      const localDirPath = path.join(process.cwd(), "public", "docs", slug);
      if (fs.existsSync(localDirPath)) {
        const files = fs.readdirSync(localDirPath);
        const htmlFiles = files.filter(f => f.endsWith(".html") || f.endsWith(".htm"));
        
        const localDocs: ProjectDoc[] = htmlFiles.map(filename => {
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

    return NextResponse.json({ docs });
  } catch (error) {
    console.error("GET Docs Error:", error);
    return NextResponse.json({ error: "Failed to fetch docs" }, { status: 500 });
  }
}

// ── POST /api/docs — Upload a new .html doc (admin only) ─────────
// Body: FormData with fields: slug, title, description, file (.html)
export async function POST(req: Request) {
  try {
    // Auth check
    const cookieStore = await cookies();
    if (!cookieStore.has("admin_token")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) ?? "";
    const file = formData.get("file") as File | null;

    if (!slug || !title || !file) {
      return NextResponse.json({ error: "Missing required fields: slug, title, file" }, { status: 400 });
    }

    if (!file.name.endsWith(".html") && !file.name.endsWith(".htm")) {
      return NextResponse.json({ error: "Only .html files are allowed" }, { status: 400 });
    }

    // Upload raw .html file to Vercel Blob
    const blobPath = `projects/${slug}/${Date.now()}-${file.name}`;
    const blob = await put(blobPath, file, {
      access: "public",
      contentType: "text/html; charset=utf-8",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const newDoc: ProjectDoc = {
      id: `doc-${Date.now()}`,
      title,
      description,
      blobUrl: blob.url,
      createdAt: new Date().toISOString(),
    };

    // Persist doc metadata to Redis
    if (redis) {
      const existing = (await redis.get<ProjectDoc[]>(`devakorn_docs:${slug}`)) ?? [];
      await redis.set(`devakorn_docs:${slug}`, [...existing, newDoc]);
    }

    return NextResponse.json({ success: true, doc: newDoc });
  } catch (error) {
    console.error("POST Doc Error:", error);
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
  }
}
