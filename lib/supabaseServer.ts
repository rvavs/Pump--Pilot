// /lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Canonical server-side Supabase client factory.
 */
export function createServerClient() {
  return createServerComponentClient({ cookies });
}

/**
 * Alias to support existing imports in the codebase like:
 *   import { supabaseServer } from "@/lib/supabaseServer";
 *   const supabase = supabaseServer();
 */
export const supabaseServer = createServerClient;

/**
 * Optional default export so either style works:
 *   import createClient from "@/lib/supabaseServer";
 *   const supabase = createClient();
 */
export default createServerClient;
