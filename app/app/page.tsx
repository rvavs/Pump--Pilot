import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AppHome() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return (
    <section>
      <h1 className="text-xl font-semibold">Welcome back</h1>
      <p className="text-zinc-400">You are signed in as {user.email}.</p>
      <div className="mt-4">
        <form action="/api/sets" method="post">
          <input name="movement" placeholder="Movement (e.g., Incline DB Press)" className="w-80 bg-black border border-zinc-700 text-zinc-200 p-2 rounded" />
          <input name="reps" placeholder="Reps" className="w-20 ml-2 bg-black border border-zinc-700 text-zinc-200 p-2 rounded" />
          <input name="load" placeholder="Load" className="w-20 ml-2 bg-black border border-zinc-700 text-zinc-200 p-2 rounded" />
          <button className="ml-2 bg-emerald-600 px-3 py-2 rounded">Save set</button>
        </form>
      </div>
    </section>
  );
}
