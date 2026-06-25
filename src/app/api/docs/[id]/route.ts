import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { del } from "@vercel/blob";
import { cookies } from "next/headers";
import type { ProjectDoc } from "@/app/api/docs/route";
import fs from "fs";
import path from "path";

// ─────────────────────────────────────────────────────────────────
// API: /api/docs/[id]
// DELETE — Remove a specific doc by ID (admin only)
//          Requires ?slug=my-project in the query
// PATCH  — Update title/description of a doc (admin only)
// ─────────────────────────────────────────────────────────────────

const isRedisConfigured =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = isRedisConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

// ── DELETE /api/docs/[id]?slug=my-project ───────────────────────
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("admin_token")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing ?slug param" }, { status: 400 });
    }

    if (id.startsWith("local-")) {
      const filename = id.replace("local-", "");
      const localPath = path.join(process.cwd(), "public", "docs", slug, filename);
      
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
        return NextResponse.json({ success: true, local: true });
      } else {
        return NextResponse.json({ error: "Local file not found" }, { status: 404 });
      }
    }

    if (!redis) {
      return NextResponse.json({ success: true });
    }

    const existing = (await redis.get<ProjectDoc[]>(`devakorn_docs:${slug}`)) ?? [];
    const docToDelete = existing.find((d) => d.id === id);

    if (!docToDelete) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Delete from Vercel Blob
    try {
      await del(docToDelete.blobUrl, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    } catch {
      // Blob deletion failure is non-fatal — still remove from metadata
      console.warn("Could not delete blob:", docToDelete.blobUrl);
    }

    // Remove from Redis metadata
    const updated = existing.filter((d) => d.id !== id);
    await redis.set(`devakorn_docs:${slug}`, updated);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Doc Error:", error);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}

// ── PATCH /api/docs/[id]?slug=my-project ────────────────────────
// Body JSON: { title?: string, description?: string }
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("admin_token")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const body = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Missing ?slug param" }, { status: 400 });
    }

    if (!redis) {
      return NextResponse.json({ success: true });
    }

    if (id.startsWith("local-")) {
      const existingLocalOverrides = (await redis.get<Record<string, Partial<ProjectDoc>>>(`devakorn_local_docs:${slug}`)) ?? {};
      existingLocalOverrides[id] = {
        title: body.title,
        description: body.description,
        category: body.category,
        createdAt: body.createdAt,
      };
      await redis.set(`devakorn_local_docs:${slug}`, existingLocalOverrides);
      return NextResponse.json({ success: true });
    }

    const existing = (await redis.get<ProjectDoc[]>(`devakorn_docs:${slug}`)) ?? [];
    const updated = existing.map((doc) =>
      doc.id === id
        ? {
            ...doc,
            title: body.title ?? doc.title,
            description: body.description ?? doc.description,
            category: body.category !== undefined ? body.category : doc.category,
            createdAt: body.createdAt ?? doc.createdAt,
          }
        : doc
    );

    await redis.set(`devakorn_docs:${slug}`, updated);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH Doc Error:", error);
    return NextResponse.json({ error: "Failed to update document" }, { status: 500 });
  }
}
