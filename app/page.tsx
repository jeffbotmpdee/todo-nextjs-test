import { GlobeExperience } from "@/components/GlobeExperience";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed833,transparent_35%),radial-gradient(circle_at_20%_80%,#7c3aed22,transparent_32%),linear-gradient(180deg,#020617_0%,#01030a_100%)]" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 sm:px-10 lg:px-16">
        <header className="max-w-2xl space-y-5 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-cyan-200/90 backdrop-blur">
            Orbital Atlas
          </div>
          <div className="space-y-4">
            <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Earth, from just far enough away to feel unreal.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Swipe the planet, drift a little closer, and let the atmosphere, cloud bands, and stars do the rest.
            </p>
          </div>
        </header>

        <div className="relative flex flex-1 items-center justify-center py-8 sm:py-0">
          <GlobeExperience />
        </div>

        <footer className="relative z-10 flex flex-col gap-3 pb-2 text-xs uppercase tracking-[0.28em] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Drag / swipe to rotate</span>
          <span>Scroll / pinch for gentle zoom</span>
          <span>Procedural planet • realtime rendering</span>
        </footer>
      </div>
    </main>
  );
}
