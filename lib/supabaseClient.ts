// lib/supabaseClient.ts
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Named export that every client component will use
export const createClient = () => createClientComponentClient();
