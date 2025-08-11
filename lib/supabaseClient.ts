"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Keep both the factory and a ready client so existing code can choose either.
 * This exports the name your code is trying to import: `createClient`.
 */
export const createClient = createClientComponentClient;

// Optional ready-to-use instance (some files might use this)
export const supabase = createClientComponentClient();

// Optional default (safe to leave here)
export default createClientComponentClient;
