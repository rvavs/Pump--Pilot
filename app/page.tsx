"use client";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function Page() {
  useEffect(() => {
    // Countdown
    const el = document.getElementById("countVal");
    if (el) {
      const target = new Date("2025-08-29T13:00:00-04:00").getTime();
      const pad = (n: number) => n.toString().padStart(2, "0");
      const tick = () => {
        const diff = Math.max(0, target - Date.now());
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff / (1000*60*60)) % 24);
        const m = Math.floor((diff / (1000*60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        el.textContent = `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
      };
      tick(); const iv = setInterval(tick, 1000);
      return () => clearInterval(iv);
    }
  }, []);

  useEffect(() => {
    // Feature card toggle
    const hideAll = () => document.querySelectorAll<HTMLElement>(".feature-details").forEach(p => p.classList.add("hidden"));
    document.querySelectorAll<HTMLElement>(".feature-card").forEach(card => {
      card.addEventListener("click", () => {
        const key = card.getAttribute("data-feature");
        const panel = document.querySelector<HTMLElement>(`.feature-details[data-details='${key}']`);
        if (!panel) return;
        const isHidden = panel.classList.contains("hidden");
        hideAll();
        if (isHidden) {
          panel.classList.remove("hidden");
          panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });

    // Visual cards expand
    document.querySelectorAll<HTMLButtonElement>("[data-gallery]").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-gallery");
        const el = document.getElementById(`details-${key}`);
        if (!el) return;
        el.classList.toggle("hidden");
      });
    });
  }, []);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="py-14 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <img src="/assets/logo.webp" alt="Pump Pilot logo" className="h-24 w-24 mx-auto" />
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold"><span className="text-emerald-400">Your Hypertrophy Copilot</span></h1>
          <p className="mt-2 text-zinc-400 text-sm">Custom DayNames, movement-smart progression, and check-ins that actually inform your next session.</p>
          <p className="mt-4 text-zinc-400">Name your days. Per‑movement progression. AM + Post‑Pump photos. Macros that remind you when to eat.</p>
          <div id="countdown" className="mt-5 inline-block rounded-xl border border-zinc-800 bg-black/40 px-4 py-2 text-sm text-zinc-300">
            Launching in <span className="font-semibold text-emerald-400" id="countVal">--</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="featureGrid">
          {/* Card 1 */}
          <div className="card rounded-2xl p-6 transition feature-card cursor-pointer" data-feature="per_movement">
            <span className="text-xs text-zinc-400 border border-zinc-700 rounded px-2 py-0.5">Core v0.1</span>
            <h3 className="mt-2 text-xl font-semibold">Per-Movement Progression</h3>
            <p className="text-zinc-400">Targets follow the lift, not the calendar. +1/0/−1 sets and smart load bumps.</p>
          </div>
          <div className="feature-details hidden mt-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-5" data-details="per_movement">
            <h4 className="font-semibold text-zinc-100">Per-Movement Progression</h4>
            <div className="grid md:grid-cols-2 gap-5 mt-3 text-sm">
              <div>
                <p className="text-zinc-300 font-medium">What it does</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Targets follow the lift (e.g., Incline DB Press) wherever you place it.</li>
                  <li>Auto +1/0/−1 sets based on pump/soreness/effort/fatigue.</li>
                  <li>Smart load bumps anchored to last RIR & rep quality.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Example flow</p>
                <ol className="list-decimal ml-5 mt-2 text-zinc-400">
                  <li>Mon: Push A — 80×10 @ RIR2.</li>
                  <li>Thu: Push B — suggests 82.5×9 + 1 backoff if recovery is green.</li>
                  <li>Next week on Upper A — targets auto-carry.</li>
                </ol>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">What you’ll see</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Prev → Next overlay (80×10 RIR2 → 82.5×9).</li>
                  <li>“Add 1 backoff set” banner when recovery is strong.</li>
                  <li>Plate math by equipment profile (kg/lb, plates available).</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Pro tips</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Keep RIR honest; under-reporting blunts load bumps.</li>
                  <li>Use a “Top set” tag for clear PR tracking.</li>
                  <li>Switch equipment profile when traveling to keep rounding correct.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card rounded-2xl p-6 transition feature-card cursor-pointer" data-feature="meals">
            <span className="text-xs text-zinc-400 border border-zinc-700 rounded px-2 py-0.5">Core v0.1</span>
            <h3 className="mt-2 text-xl font-semibold">Named Meals + Reminders</h3>
            <p className="text-zinc-400">Every 2–3h nudges with exact P/C/F. Pre/Post shift with training time.</p>
          </div>
          <div className="feature-details hidden mt-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-5" data-details="meals">
            <h4 className="font-semibold text-zinc-100">Named Meals + Reminders</h4>
            <div className="grid md:grid-cols-2 gap-5 mt-3 text-sm">
              <div>
                <p className="text-zinc-300 font-medium">What it does</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Build High/Medium/Low macro profiles and map to DayNames or weekdays.</li>
                  <li>Name meals (Pre-Workout, Post-Workout, Last Meal) with exact P/C/F.</li>
                  <li>Quiet hours + snooze to respect your schedule.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Example flow</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>5 meals/day, spacing 150 min, quiet 10p–8a.</li>
                  <li>Train 6:30pm → Pre-Workout shifts automatically.</li>
                  <li>Push alert: “Pre-Workout — 120C/10F/45P”.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">What you’ll see</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Per-meal targets under each meal name.</li>
                  <li>Spillover warnings if fats blow the day late.</li>
                  <li>Weekly macro budget (v0.2) with ±5% rollovers.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Pro tips</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Link Pre/Post to the session so timing always lines up.</li>
                  <li>Use recipes for meal prep; log in grams for accuracy.</li>
                  <li>Turn on quiet hours to prevent late-night dings.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card rounded-2xl p-6 transition feature-card cursor-pointer" data-feature="photos">
            <span className="text-xs text-zinc-400 border border-zinc-700 rounded px-2 py-0.5">Core v0.1</span>
            <h3 className="mt-2 text-xl font-semibold">AM + Post-Pump Photos</h3>
            <p className="text-zinc-400">Session-linked gallery by DayName. AM vs Post-Pump viewer.</p>
          </div>
          <div className="feature-details hidden mt-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-5" data-details="photos">
            <h4 className="font-semibold text-zinc-100">AM Fasted + Post-Pump Photos</h4>
            <div className="grid md:grid-cols-2 gap-5 mt-3 text-sm">
              <div>
                <p className="text-zinc-300 font-medium">What it does</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>AM fasted weight + selfie for baseline.</li>
                  <li>Post-Pump photos tied to the session you just ran.</li>
                  <li>Filter pumps by DayName (Push A, Legs, etc.).</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Example flow</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Take AM check-in at 7:30am.</li>
                  <li>Run Legs A at 5pm → add Post-Pump with quads pumped.</li>
                  <li>Open Gallery → filter Legs A → compare last 6 sessions.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">What you’ll see</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Side-by-side AM vs Post-Pump viewer.</li>
                  <li>Consistency tools coming in v0.2: ghost grid & angle checks.</li>
                  <li>Session badge on each pump photo.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Pro tips</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Same light/spot each time; use the grid overlay.</li>
                  <li>Tag notes like “carbs low” or “travel” to explain variance.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card rounded-2xl p-6 transition feature-card cursor-pointer" data-feature="pose">
            <span className="text-xs text-zinc-400 border border-zinc-700 rounded px-2 py-0.5">v0.2</span>
            <h3 className="mt-2 text-xl font-semibold">Pose Coach</h3>
            <p className="text-zinc-400">Slider compares, ghost overlays, micro‑tips. Visual deltas—no fake BF%.</p>
          </div>
          <div className="feature-details hidden mt-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-5" data-details="pose">
            <h4 className="font-semibold text-zinc-100">Pose Coach (v0.2)</h4>
            <div className="grid md:grid-cols-2 gap-5 mt-3 text-sm">
              <div>
                <p className="text-zinc-300 font-medium">What it does</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Compare photos with a slider or grid view.</li>
                  <li>Ghost overlays to match stance/angle.</li>
                  <li>Pose checklists and micro-cues on screen.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Example flow</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Select Front Relaxed → overlay → adjust stance.</li>
                  <li>Tap cues: lats out, chin 5–10°, elbows level.</li>
                  <li>Hold for 2–3s → auto-capture.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">What you’ll see</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Pose cue chips (e.g., “Pelvis under”, “Lats out”).</li>
                  <li>Lighting/angle alerts if conditions shift.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Pro tips</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Record a 10s clip weekly for each pose; bookmark best frame.</li>
                  <li>No BF% estimates — use visual deltas + weight trends.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="card rounded-2xl p-6 transition feature-card cursor-pointer" data-feature="coach">
            <span className="text-xs text-zinc-400 border border-zinc-700 rounded px-2 py-0.5">v0.2</span>
            <h3 className="mt-2 text-xl font-semibold">Coach-Level Tools</h3>
            <p className="text-zinc-400">Equipment profiles, warm‑ups, schemes & supersets, joint‑stress balancer.</p>
          </div>
          <div className="feature-details hidden mt-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-5" data-details="coach">
            <h4 className="font-semibold text-zinc-100">Coach-Level Tools (v0.2)</h4>
            <div className="grid md:grid-cols-2 gap-5 mt-3 text-sm">
              <div>
                <p className="text-zinc-300 font-medium">What it does</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Equipment profiles (bar weights, plates available).</li>
                  <li>Warm-up calculator; top-set/backoffs, RP, myo, clusters.</li>
                  <li>Supersets/giants with one timer + target carry-over.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Example flow</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Swap Hack → Pendulum; targets convert on the fly.</li>
                  <li>Plate math shows exact loading for each set.</li>
                  <li>Stress balancer flags over-hitting elbows/low-back.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">What you’ll see</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>“Suggested: +1 backoff” when recovery is green.</li>
                  <li>Timer controls supersets; both lifts get logged.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Pro tips</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Use schemes to break plateaus without changing lifts.</li>
                  <li>Group exercises when the gym is busy to keep flow.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="card rounded-2xl p-6 transition feature-card cursor-pointer" data-feature="integrations">
            <span className="text-xs text-zinc-400 border border-zinc-700 rounded px-2 py-0.5">v0.3</span>
            <h3 className="mt-2 text-xl font-semibold">Integrations</h3>
            <p className="text-zinc-400">Barcode foods, wearables, coach mode, guardrails & advanced labs.</p>
          </div>
          <div className="feature-details hidden mt-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-5" data-details="integrations">
            <h4 className="font-semibold text-zinc-100">Integrations (v0.3)</h4>
            <div className="grid md:grid-cols-2 gap-5 mt-3 text-sm">
              <div>
                <p className="text-zinc-300 font-medium">What it does</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Scan foods, build recipes, export grocery lists.</li>
                  <li>Apple/Google/Garmin steps, HR, sleep import.</li>
                  <li>Coach Mode: propose changes — you approve.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Example flow</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Scan oatmeal barcode → confirm macros → save to Pre-Workout.</li>
                  <li>Wearables flag low sleep → volume holds for tomorrow.</li>
                  <li>Coach suggests +1 set for delts → you tap Approve.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">What you’ll see</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Trend chips: 7d/14d weight, steps, hydration, sleep.</li>
                  <li>Guardrails reminder on labs; always informational.</li>
                </ul>
              </div>
              <div>
                <p className="text-zinc-300 font-medium">Pro tips</p>
                <ul className="list-disc ml-5 mt-2 text-zinc-400">
                  <li>Use rollovers to keep weekly macros on target, not daily.</li>
                  <li>Share a read-only coach link when traveling.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Roadmap</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-zinc-400">Aug 29, 2025</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400/70"></span>
            </div>
            <p className="font-semibold text-zinc-100">v0.1 — Core</p>
            <p className="text-zinc-400 text-sm mt-1">Per-movement progression, AM + Post-Pump check-ins, named meals + reminders, cardio & steps, AI banners.</p>
          </li>
          <li className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-zinc-400">Oct 3, 2025</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400/70"></span>
            </div>
            <p className="font-semibold text-zinc-100">v0.2 — Coach-Level</p>
            <p className="text-zinc-400 text-sm mt-1">Equipment profiles, warm-ups/schemes, supersets, pose coach, rollovers, intra, session reports.</p>
          </li>
          <li className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-zinc-400">Nov 14, 2025</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400/70"></span>
            </div>
            <p className="font-semibold text-zinc-100">v0.3 — Integrations</p>
            <p className="text-zinc-400 text-sm mt-1">Barcode foods/recipes, wearables, coach mode, guardrails & labs view, smarter ML.</p>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        <div className="grid md:grid-cols-2 gap-6 text-zinc-300">
          <div className="rounded-2xl border border-zinc-800 p-5 bg-zinc-950">
            <p className="font-semibold">When does Pump Pilot launch?</p>
            <p className="text-zinc-400 text-sm mt-1">Aug 29, 2025 (v0.1), with v0.2 on Oct 3 and v0.3 on Nov 14.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 p-5 bg-zinc-950">
            <p className="font-semibold">Is there an iOS/Android app?</p>
            <p className="text-zinc-400 text-sm mt-1">Yes — install the PWA to your home screen for a full-screen app. Works offline; syncs when back online.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 p-5 bg-zinc-950">
            <p className="font-semibold">Will my data sync if I log offline?</p>
            <p className="text-zinc-400 text-sm mt-1">Yep. Sessions log offline and auto-sync when connectivity returns.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 p-5 bg-zinc-950">
            <p className="font-semibold">How do I contact support?</p>
            <p className="text-zinc-400 text-sm mt-1">Email <a className="underline" href="mailto:Rileyvavrik@gmail.com">Rileyvavrik@gmail.com</a>.</p>
          </div>
        </div>
      </section>

      {/* Visual Cards */}
      <section id="visual-cards" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6">Visual Cards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {f: "PP_TRAILER_title.webp", t: "Install the PWA • Aug 29", d: "Add to Home Screen in one tap. Offline logging, instant launch, native feel—no app store wait."},
            {f: "PP_TRAILER_feature1.webp", t: "Per-Movement Progression", d: "Targets follow the lift — not the calendar. Ex: 80×10 @ RIR2 → 82.5×9 next time with +1 backoff when recovery is green."},
            {f: "PP_TRAILER_feature2.webp", t: "Macros that Text You", d: "Named meals every 2–3h with exact P/C/F. Pre/Post shift with training time. Quiet hours + snooze."},
            {f: "PP_TRAILER_feature3.webp", t: "AM Fasted + Post-Pump Photos", d: "Session-linked pump gallery by DayName. Compare AM vs Post-Pump; filter Push A, Legs, etc. v0.2 adds ghost grid & angle checks."},
            {f: "PP_TRAILER_feature4.webp", t: "Pose Coach (v0.2)", d: "Slider compares, overlays, micro-tips. Visual deltas — no fake BF%."},
            {f: "PP_TRAILER_feature5.webp", t: "Coach-Level Tools (v0.2)", d: "Equipment profiles, warm-ups, schemes & supersets, joint-stress balancer, block review, exports."}
          ].map(({f,t,d}) => (
            <div key={f} className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden group">
              <button className="w-full text-left" data-gallery={f}>
                <img src={`/assets/${f}`} alt={t} className="w-full object-cover group-hover:opacity-95 transition"/>
                <div className="px-4 py-3 border-t border-zinc-800">
                  <h4 className="font-semibold text-zinc-100">{t}</h4>
                  <p className="text-xs text-zinc-500">Click to expand</p>
                </div>
              </button>
              <div id={`details-${f}`} className="hidden px-4 pb-4 text-sm text-zinc-300">
                <p className="text-zinc-400">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-900 py-8">
        <div className="mx-auto max-w-6xl px-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} Pump Pilot · <a href="mailto:Rileyvavrik@gmail.com" className="underline decoration-dotted">Contact</a>
        </div>
      </footer>
    </>
  );
}
