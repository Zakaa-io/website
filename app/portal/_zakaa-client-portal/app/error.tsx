"use client";

export default function GlobalError({
  error,
  reset,
}: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4">
      <section className="w-full rounded-xl border border-rose-500/40 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-300">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
