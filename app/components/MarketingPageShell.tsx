interface MarketingPageShellProps {
  label: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function MarketingPageShell({
  label,
  title,
  subtitle,
  children,
}: Readonly<MarketingPageShellProps>) {
  return (
<main className="min-h-screen bg-[#06060a] px-6 py-24 text-[#e4e4e7]">
        <div className="mx-auto max-w-6xl space-y-10">
          <header className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6366f1]">{label}</p>
            <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="text-sm text-[#a1a1aa] md:text-base">{subtitle}</p>
          </header>
          {children}
        </div>
      </main>
  );
}
