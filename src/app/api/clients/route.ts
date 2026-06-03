import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const isRedisConfigured = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = isRedisConfigured 
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

// Temporary in-memory fallback for local dev if keys aren't set
let localMemoryClients: any[] | null = null;

export async function GET() {
  try {
    if (!isRedisConfigured) {
      console.warn("No Redis configuration found for Clients, using local fallback.");
      return NextResponse.json({ clients: localMemoryClients });
    }

    const clients = await redis?.get("devakorn_clients");
    return NextResponse.json({ clients: clients || null });
  } catch (error) {
    console.error("GET Clients Error:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Basic Security: Check for admin token
    const cookieStore = await cookies();
    if (!cookieStore.has("admin_token")) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const { clients } = await req.json();

    if (!Array.isArray(clients)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    if (!isRedisConfigured) {
      localMemoryClients = clients;
      return NextResponse.json({ success: true, dummy: true });
    }

    await redis?.set("devakorn_clients", clients);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST Clients Error:", error);
    return NextResponse.json({ error: "Failed to save clients" }, { status: 500 });
  }
}
