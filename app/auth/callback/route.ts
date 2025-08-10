import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", request.url));
  }

  const supabase = supabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }

  // Get the logged-in user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return NextResponse.redirect(new URL("/login?error=user_not_found", request.url));
  }

  // Check if the user exists in "profiles" table, if not, create them
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!existingProfile) {
    await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        created_at: new Date().toISOString(),
      });
  }

  // ✅ Redirect to the main app page after successful login
  return NextResponse.redirect(new URL("/app", request.url));
}
