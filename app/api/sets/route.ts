// /app/api/sets/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabaseServer";

export async function GET() {
  // Simple sanity response so the route compiles
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  const supabase = createServerClient();

  // Require an authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  // TODO: add your real create/update logic here
  return NextResponse.json({ ok: true, body });
}
