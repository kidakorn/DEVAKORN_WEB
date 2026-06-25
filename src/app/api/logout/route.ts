import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: "admin_token",
    path: "/",
  });
  
  // Purge the router cache so protected pages immediately disappear
  revalidatePath("/", "layout");
  
  return NextResponse.json({ success: true });
}
