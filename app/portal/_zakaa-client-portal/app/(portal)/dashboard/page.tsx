export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-300">
          High-level account summary and operational visibility.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-slate-700 bg-slate-950/50 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">Active Projects</p>
          <p className="mt-2 text-3xl font-semibold">3</p>
        </article>
        <article className="rounded-lg border border-slate-700 bg-slate-950/50 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">Open Tickets</p>
          <p className="mt-2 text-3xl font-semibold">2</p>
        </article>
        <article className="rounded-lg border border-slate-700 bg-slate-950/50 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">Pending Invoices</p>
          <p className="mt-2 text-3xl font-semibold">1</p>
        </article>
      </div>
    </section>
  );
}
