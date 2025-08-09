"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="text-xl font-semibold mb-3">Sign in</h1>
      <p className="text-zinc-400 mb-4">Magic link to your inbox.</p>
      {sent ? (
        <p className="text-emerald-400">Check your email for the link.</p>
      ) : (
        <form onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const { error } = await supabase.auth.signInWithOtp({ email });
          if (error) setError(error.message);
          else setSent(true);
        }}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-zinc-700 bg-black p-2 mb-3"
          />
          <button className="rounded bg-emerald-600 px-3 py-2">Send link</button>
          {error && <p className="text-rose-300 mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
}
