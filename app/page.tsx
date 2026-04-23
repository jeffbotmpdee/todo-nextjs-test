export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl shadow-black/20">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Built automatically
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Jeffbot Todo App
          </h1>
          <p className="text-base text-zinc-400">
            A simple starter UI for adding tasks.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter a task"
              className="h-12 flex-1 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-cyan-400"
            />
            <button
              type="button"
              className="h-12 rounded-2xl bg-cyan-400 px-6 font-semibold text-zinc-950 transition hover:bg-cyan-300"
            >
              Add Task
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="mb-3 text-sm font-medium text-zinc-400">Task List</p>
            <ul className="space-y-3">
              <li className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                <span className="text-zinc-100">Ship the first version</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Static item
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
