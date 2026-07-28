interface BrandLogoProps {
  size?: "md" | "sm";
}

export default function BrandLogo({ size = "md" }: Readonly<BrandLogoProps>) {
  const iconSizeClass = size === "sm" ? "h-8 w-8" : "h-9 w-9";

  return (
    <div
      className={`${iconSizeClass} rounded-[12px] border border-[rgba(59,130,246,0.35)] bg-[linear-gradient(145deg,#0F172A,#111827)] p-1 shadow-[0_8px_24px_rgba(2,6,23,0.45)]`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" role="img">
        <defs>
          <linearGradient id="zakaa-mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path
          d="M12 17C12 13.7 14.7 11 18 11H46C49.3 11 52 13.7 52 17V47C52 50.3 49.3 53 46 53H18C14.7 53 12 50.3 12 47V17Z"
          fill="#0B1120"
        />
        <path d="M20 21H44L20 43H44" stroke="url(#zakaa-mark-gradient)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="47" cy="47" r="4" fill="#10B981" />
      </svg>
    </div>
  );
}
