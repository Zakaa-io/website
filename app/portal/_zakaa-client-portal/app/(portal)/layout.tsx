import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import { readSessionFromCookieHeader } from "@/lib/server/session-auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/billing", label: "Billing" },
  { href: "/support", label: "Support" },
  { href: "/notifications", label: "Notifications" },
  { href: "/settings", label: "Settings" },
];

export default async function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const session = readSessionFromCookieHeader(cookieStore.toString());
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#06060a] text-[#e4e4e7]">
      <header className="border-b border-[rgba(148,163,184,0.1)] bg-[#12121a]/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6366f1]">Zakaa</p>
            <h1 className="text-lg font-semibold">Client Portal</h1>
            <p className="text-xs text-[#a1a1aa]">
              {session.email} ({session.role})
            </p>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
        <aside className="w-full rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-4 md:w-64">
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-[#e4e4e7] transition-colors hover:bg-[#1a1a24]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
