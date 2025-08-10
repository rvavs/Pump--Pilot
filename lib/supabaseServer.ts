import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Create the server client
export const createServerClient = () => {
  return createServerComponentClient({ cookies });
};
