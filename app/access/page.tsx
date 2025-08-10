import AccessCodeForm from "@/components/AccessCodeForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AccessPage() {
  const user = null; // 🚨 TEMP: no auth check

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-20 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-400">
          Invite-Only Access
        </h1>
        <p className="text-zinc-400">
          Pump Pilot is currently in private beta. Enter the invite code you were given to unlock the app.
        </p>
      </div>

      <AccessCodeForm />

      {user && (
        <p className="mt-6 text-sm text-zinc-500">
          Don’t have an account yet?{" "}
          <Link className="text-emerald-400 hover:underline" href="/login">
            Log in
          </Link>{" "}
          first.
        </p>
      )}
    </main>
  );
}
