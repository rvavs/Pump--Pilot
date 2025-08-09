"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import WaitlistForm from "@/components/WaitlistForm";
import Link from "next/link";

export default function Page() {
  // Launch countdown
  useEffect(() => {
    const el = document.getElementById("countVal");
    if (!el) return;

    // Set your go-live timestamp here
    const target = new Date("2025-08-29T13:00:00-04:00").getTime();
    const pad = (n: number) => n.toString().padStart(2, "0");

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      el.textContent = `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    };

    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // Click-to-expand feature cards (optional)
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-feature]");
    const handlers: Array<() => void> = [];

    cards.forEach((card) => {
      const handler = () => {
        const key = card.getAttribute("data-feature");
        if (!key) return;
        const panel = document.querySelector<HTMLElement>(`[data-details="${key}"]`);
        if (!panel) return;
        panel.classList.toggle("hidden");
      };
      card.addEventListener("click", handler);
      handlers.push(() => card.removeEventListener("click", handler));
    });

    return () => handlers.forEach((off) => off());
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <Header />

      {/* Hero */}
      <section className="px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-emerald-400">
            Your Hypertrophy Copilot
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Name your days. Per-movement progression. AM & Post-Pump photos.
            Macros that remind you when to eat.
          </p>

          {/* Waitlist form */}
          <div className="max-w-xl mx-auto mt-6">
            <WaitlistForm />
          </div>

          <p className="text-sm text-zinc-500">
            Launching in <span id="countVal" className="tabular-nums" />.
          </p>
        </div>
      </section>

      {/* Core features (click to expand details) */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            data-feature="progression"
            className="feature-card rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 cursor-pointer"
          >
            <div className="text-xs px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-max mb-3">
              Core v0.1
            </div>
            <h3 className="text-xl font-semibold">Per-Movement Progression</h3>
            <p className="text-zinc-400 mt-2">
              Targets follow the lift — not the calendar. +1/0/−1 sets and smart load bumps.
            </p>
            <div
              data-details="progression"
              className="feature-details hidden mt-4 text-sm text-zinc-300"
            >
              Examples: Incline DB Press picks up where you left it, even if you did it in multiple
              sessions. Swap equipment and keep the curve.
            </div>
          </article>

          <article
            data-feature="meals"
            className="feature-card rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 cursor-pointer"
          >
            <div className="text-xs px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-max mb-3">
              Core v0.1
            </div>
            <h3 className="text-xl font-semibold">Named Meals + Reminders</h3>
            <p className="text-zinc-400 mt-2">
              Every 2–3h nudges with exact P/C/F. Pre/Post shift with your training time.
            </p>
            <div
              data-details="meals"
              className="feature-details hidden mt-4 text-sm text-zinc-300"
            >
              Example: “Pre-Workout — 120C/10F/45P” at the right time based on your planned session.
            </div>
          </article>

          <article
            data-feature="photos"
            className="feature-card rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 cursor-pointer"
          >
            <div className="text-xs px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-max mb-3">
              Core v0.1
            </div>
            <h3 className="text-xl font-semibold">AM + Post-Pump Photos</h3>
            <p className="text-zinc-400 mt-2">
              Session-linked gallery by DayName. Compare AM vs Post-Pump views.
            </p>
            <div
              data-details="photos"
              className="feature-details hidden mt-4 text-sm text-zinc-300"
            >
              Consistency tools: ghost grid and pose alignment checks.
            </div>
          </article>

          <article
            data-feature="pose"
            className="feature-card rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 cursor-pointer"
          >
            <div className="text-xs px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-max mb-3">
              v0.2
            </div>
            <h3 className="text-xl font-semibold">Pose Coach</h3>
            <p className="text-zinc-400 mt-2">
              Slider compares, overlays, and micro-tips. Visual deltas — no fake BF%.
            </p>
            <div
              data-details="pose"
              className="feature-details hidden mt-4 text-sm text-zinc-300"
            >
              Example tips: Lats out. Chin down 5–10°. Elbows level.
            </div>
          </article>

          <article
            data-feature="coach"
            className="feature-card rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 cursor-pointer"
          >
            <div className="text-xs px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-max mb-3">
              v0.2
            </div>
            <h3 className="text-xl font-semibold">Coach-Level Tools</h3>
            <p className="text-zinc-400 mt-2">
              Equipment profiles, warm-ups, schemes & supersets. Joint-stress balancer.
            </p>
            <div
              data-details="coach"
              className="feature-details hidden mt-4 text-sm text-zinc-300"
            >
              Swap Hack → Pendulum with matched strength-curves; plate math built-in.
            </div>
          </article>

          <article
            data-feature="integrations"
            className="feature-card rounded-2xl border border-zinc-800 p-6 hover:border-zinc-700 cursor-pointer"
          >
            <div className="text-xs px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-max mb-3">
              v0.3
            </div>
            <h3 className="text-xl font-semibold">Integrations</h3>
            <p className="text-zinc-400 mt-2">
              Barcode foods, wearables, coach mode, guardrails & advanced labs.
            </p>
            <div
              data-details="integrations"
              className="feature-details hidden mt-4 text-sm text-zinc-300"
            >
              Roadmap includes steps, hydration, HRV, and coach assignment.
            </div>
          </article>
        </div>

        {/* Access link (optional) */}
        <div className="max-w-6xl mx-auto text-center mt-12">
          <p className="text-sm text-zinc-500">
            Got an invite code already?{" "}
            <Link href="/access" className="text-emerald-400 hover:underline">
              Claim access
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
