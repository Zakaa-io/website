import FadeIn from "./FadeIn";
import SectionLabel from "./SectionLabel";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle: string;
  layout?: "center" | "left" | "split";
}

export default function SectionHeader({ label, title, subtitle, layout = "center" }: SectionHeaderProps) {
  const layoutClass = layout === "left" ? "text-left max-w-none" : layout === "split" ? "text-left max-w-none" : "text-center max-w-[640px] mx-auto";
  return (
    <div className={`${layoutClass} mb-16`}>
      <FadeIn>
        <SectionLabel text={label} />
      </FadeIn>
      <FadeIn delay={100}>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold tracking-tight mb-4">
          {title}
        </h2>
      </FadeIn>
      <FadeIn delay={200}>
        <p className="text-[#94A3B8] text-lg">{subtitle}</p>
      </FadeIn>
    </div>
  );
}
