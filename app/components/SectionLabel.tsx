interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full bg-[#111827] border border-[rgba(148,163,184,0.08)] text-xs font-semibold uppercase tracking-[0.1em] text-[#3B82F6] mb-4">
      {text}
    </span>
  );
}
