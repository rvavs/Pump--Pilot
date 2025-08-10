import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Server-side Supabase (for route handlers / server components)
export const createServerClient = () => {
  return createServerComponentClient({ cookies });
};
