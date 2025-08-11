// lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Named export that every server file will use
export const createServerClient = () =>
  createServerComponentClient({ cookies });
