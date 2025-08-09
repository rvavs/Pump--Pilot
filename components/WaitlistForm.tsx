"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function WaitlistForm({ compact=false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle"|"saving"|"ok"|"error">("idle");
  const [message, setMessage] = useState<string>("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");

    try {
      const source = typeof window !== "undefined" ? (new URLSearchParams(window.location.search).get("s") || "landing") : "landing";
      const { error } = await supabase.from("waitlist").insert({ email, name, source });
      if (error) throw error;
      setStatus("ok");
      setMessage("You're on the list. We’ll email you at launch.");
      setEmail("");
      setName("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Something went wrong. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={"w-full max-w-xl " + (compact ? "" : "mt-6")}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
        />
        <button
          type="submit"
          disabled={status==="saving"}
          className="shrink-0 rounded-xl px-5 py-3 font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status==="saving" ? "Adding..." : "Join Waitlist"}
        </button>
      </div>
      {message && (
        <p className={"mt-3 text-sm " + (status==="ok" ? "text-emerald-400" : "text-red-400")}>
          {message}
        </p>
      )}
    </form>
  );
}
