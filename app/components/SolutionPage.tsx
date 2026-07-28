import MarketingPageShell from "./MarketingPageShell";

interface SolutionPageProps {
  label: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string[];
  outcomes: string[];
}

export default function SolutionPage({
  label,
  title,
  subtitle,
  problem,
  approach,
  outcomes,
}: Readonly<SolutionPageProps>) {
  return (
    <MarketingPageShell label={label} title={title} subtitle={subtitle}>
      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">Business Challenge</h2>
          <p className="mt-3 text-sm text-[#94A3B8]">{problem}</p>
        </article>
        <article className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">Expected Outcomes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#94A3B8]">
            {outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6">
        <h2 className="text-xl font-semibold">Zakaa Delivery Approach</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#94A3B8]">
          {approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </MarketingPageShell>
  );
}
