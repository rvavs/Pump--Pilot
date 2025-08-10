// app/app/page.tsx  (SERVER COMPONENT – no "use client")
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabaseServer";

export default async function AppHome() {
  // keep your dev bypass
  const bypass = process.env.NEXT_PUBLIC_BYPASS_AUTH === "1";

  if (!bypass) {
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Pump Pilot — App</h1>
      {bypass && (
        <p className="text-amber-400 mt-2">
          Auth bypass ON (preview mode)
        </p>
      )}

      {/* Your dashboard UI goes here */}
    </main>
  );
}
