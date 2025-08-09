export default function Header() {
  return (
    <header className="border-b border-zinc-900/80">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.webp" alt="Pump Pilot logo" className="h-12 w-12 object-contain" />
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#features" className="hover:text-zinc-200">Features</a>
          <a href="#roadmap" className="hover:text-zinc-200">Roadmap</a>
          <a href="#faq" className="hover:text-zinc-200">FAQ</a>
          <a href="/login" className="hover:text-zinc-200">Login</a>
        </nav>
      </div>
    </header>
  );
}
