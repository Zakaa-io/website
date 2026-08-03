import type { Metadata } from "next";

interface PageMetadata {
  title: string;
  description: string;
  label?: string;
}

export function generateMetadata({ title, description, label }: PageMetadata): Metadata {
  const fullTitle = label ? `${title} | ${label} | Zakaa` : `${title} | Zakaa`;
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
    },
  };
}
