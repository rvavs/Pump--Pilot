// lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Preferred helper for server-side Supabase usage
 */
export const createServerClient = () =>
  createServerComponentClient({ cookies });

/**
 * Backwards-compat alias so older code that imports:
 *   import { supabaseServer } from "@/lib/supabaseServer";
 * and calls supabaseServer() continues to work.
 */
export const supabaseServer = createServerClient;

// (Optional) default export, harmless if someone used default import
export default createServerClient;
