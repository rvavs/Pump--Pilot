import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    body = await request.json();
  } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    body = Object.fromEntries(form.entries());
  } else {
    body = await request.json().catch(() => ({}));
  }

  const { movement, reps, load, session_id, rir, notes } = body;
  const { data, error } = await supabase
    .from("sets")
    .insert([{
      user_id: user.id,
      session_id: session_id || null,
      movement,
      reps: reps ? Number(reps) : null,
      load: load ? Number(load) : null,
      rir: rir ? Number(rir) : null,
      notes: notes || null
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, set: data });
}
