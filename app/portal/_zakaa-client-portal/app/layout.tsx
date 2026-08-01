import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zakaa Client Portal",
  description: "Secure client portal for account services, billing, and support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#06060a] text-[#e4e4e7]">
        {children}
      </body>
    </html>
  );
}
