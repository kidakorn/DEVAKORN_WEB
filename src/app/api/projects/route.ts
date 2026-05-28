import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Check if Redis keys are present. 
// Vercel sets KV_REST_API_URL and KV_REST_API_TOKEN when you add the Upstash Redis integration.
const isRedisConfigured = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = isRedisConfigured 
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

// Temporary in-memory fallback for local dev if keys aren't set
let localMemoryProjects: any[] | null = null;

export async function GET() {
  try {
    if (!isRedisConfigured) {
      // If DB isn't configured, we return null so the frontend falls back to DEFAULT_PROJECTS
      console.warn("No Redis configuration found, using local fallback.");
      return NextResponse.json({ projects: localMemoryProjects });
    }

    const projects = await redis?.get("devakorn_projects");
    return NextResponse.json({ projects: projects || null });
  } catch (error) {
    console.error("GET Projects Error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // Basic Security: Check for admin token
    const cookieStore = await cookies();
    if (!cookieStore.has("admin_token")) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const { projects } = await req.json();

    if (!Array.isArray(projects)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    if (!isRedisConfigured) {
      localMemoryProjects = projects;
      return NextResponse.json({ success: true, dummy: true });
    }

    await redis?.set("devakorn_projects", projects);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST Projects Error:", error);
    return NextResponse.json({ error: "Failed to save projects" }, { status: 500 });
  }
}
