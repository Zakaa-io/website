import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-[#F8FAFC] flex items-center justify-center px-6">
      <section className="w-full max-w-[680px] text-center rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-10">
        <p className="text-sm font-semibold tracking-[0.14em] text-[#EF4444] mb-3">404 ERROR</p>
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-[#94A3B8] leading-relaxed mb-8">
          The page you requested does not exist or may have been moved. You can return to the homepage
          or jump to our services section.
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all no-underline"
          >
            Back to Home
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold text-[#94A3B8] bg-transparent border border-[rgba(148,163,184,0.16)] hover:bg-[#1E293B] hover:text-[#F8FAFC] transition-all no-underline"
          >
            View Services
          </Link>
        </div>
      </section>
    </main>
  );
}
