import { createBrowserClient } from "@supabase/ssr";

export function anotherName() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ✅ Add this line to also export it under the name your imports expect
export { anotherName as createClient };
