// Temporary stub so the app can build without @supabase/ssr
import { createClient } from "./supabaseClient";

export function createServerClient() {
  // just reuse the stubbed browser client
  return createClient();
}
