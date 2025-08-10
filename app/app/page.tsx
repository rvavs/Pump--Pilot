'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AppPage() {
  const [session, setSession] = useState<any>(null);
  const bypass = process.env.NEXT_PUBLIC_BYPASS_AUTH === '1';

  useEffect(() => {
    if (bypass) return;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        window.location.href = '/login';
      } else {
        setSession(data.session);
      }
    });
  }, [bypass]);

  if (!bypass && !session) return <p className="p-6 text-zinc-400">Loading…</p>;

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-6">
      <h1 className="text-2xl font-bold">Pump Pilot — App</h1>
      {bypass && <p className="text-amber-400 mt-2">Auth bypass ON (preview mode)</p>}
      {/* Your dashboard UI goes here */}
    </main>
  );
}
