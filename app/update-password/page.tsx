"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // When Supabase hits this redirect URL, it includes a one-time code.
  // Exchange it for a session so the user is authenticated.
  useEffect(() => {
    const doExchange = async () => {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(
          params.get("code") || ""
        );
        if (error) setError(error.message);
      } catch (e: any) {
        setError(e.message);
      }
    };
    doExchange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else {
      setOk(true);
      setTimeout(() => router.push("/login"), 1200);
    }
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-xl font-semibold mb-4">Set a new password</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="New password"
          className="w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full rounded bg-emerald-600 p-2 text-white">
          Save password
        </button>
      </form>
      {ok && <p className="mt-3 text-emerald-600">Password updated!</p>}
    </main>
  );
}
