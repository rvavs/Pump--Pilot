"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function AccessCodeForm() {
  const supabase = createClient();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    try {
      const { data, error } = await supabase.rpc("claim_access", { p_code: code.trim() });
      if (error) throw error;
      setStatus("ok");
      setMsg("Access granted. Redirecting…");
      // small delay then go to app
      setTimeout(()=>{ window.location.href = "/app"; }, 600);
    } catch (err: any) {
      setStatus("error");
      setMsg(err?.message || "Invalid code.");
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md w-full mx-auto mt-8 space-y-3">
      <input
        value={code}
        onChange={(e)=>setCode(e.target.value)}
        placeholder="Enter access code"
        className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
      />
      <button
        disabled={!code || status==='loading'}
        className="w-full rounded-xl px-5 py-3 font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition disabled:opacity-60"
      >
        {status==='loading' ? 'Checking…' : 'Unlock Pump Pilot'}
      </button>
      {msg && (
        <p className={"text-sm " + (status==='ok' ? 'text-emerald-400' : 'text-red-400')}>{msg}</p>
      )}
    </form>
  );
}
