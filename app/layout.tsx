import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zakaa — Enterprise IT Infrastructure & AI Operations",
  description:
    "We design, deploy, and manage cloud-native infrastructure with autonomous AI agents that handle repetitive operations — so your team focuses on what matters.",
  keywords: [
    "IT services",
    "cloud infrastructure",
    "DevOps",
    "managed hosting",
    "AI operations",
    "cybersecurity",
    "networking",
    "Cairo",
    "Egypt",
  ],
  openGraph: {
    title: "Zakaa — Enterprise IT Infrastructure & AI Operations",
    description:
      "Cloud-native infrastructure management powered by autonomous AI agents. 99.99% uptime SLA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('zakaa-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
