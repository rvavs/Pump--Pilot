import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Factory for a server-side Supabase client bound to cookies.
 * We export both `createServer` and `supabaseServer` so either name works.
 */
export const createServer = () =>
  createServerComponentClient({ cookies });

export const supabaseServer = createServer;

// Optional default (safe to leave here)
export default createServer;
