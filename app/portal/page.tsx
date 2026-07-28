"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type UserRole = "admin" | "operator" | "viewer" | "client";

interface SessionState {
  authenticated: boolean;
  user?: {
    email: string;
    role: UserRole;
  };
}

async function postJson<T>(url: string, body: Record<string, unknown>): Promise<{ status: number; data: T | { error?: string } }> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as T | { error?: string };
  return { status: response.status, data };
}

export default function PortalPage() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [session, setSession] = useState<SessionState>({ authenticated: false });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const loadSession = useCallback(async () => {
    setCheckingSession(true);
    setAuthError(null);
    const result = await postJson<SessionState>("/api/auth/me", {});
    if (result.status !== 200) {
      setSession({ authenticated: false });
      setCheckingSession(false);
      setAuthError("Could not validate session. Please log in again.");
      return;
    }

    setSession(result.data as SessionState);
    setCheckingSession(false);
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    const result = await postJson<{ success: boolean; user: { email: string; role: UserRole } }>("/api/auth/login", {
      email,
      password,
    });

    if (result.status !== 200) {
      const errorMessage = (result.data as { error?: string }).error ?? "Login failed.";
      setAuthError(errorMessage);
      return;
    }

    setPassword("");
    await loadSession();
  };

  const onLogout = async () => {
    await postJson<{ success: boolean }>("/api/auth/logout", {});
    setSession({ authenticated: false });
  };

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-[#0B1120] text-[#F8FAFC] p-6 md:p-10">
        <div className="max-w-6xl mx-auto text-sm text-[#94A3B8]">Checking session...</div>
      </main>
    );
  }

  if (!session.authenticated) {
    return (
      <main className="min-h-screen bg-[#0B1120] text-[#F8FAFC] p-6 md:p-10">
        <div className="max-w-md mx-auto mt-10 md:mt-20 rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-6 md:p-8">
          <h1 className="text-2xl font-bold">Admin / Client Portal Login</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Sign in to access your portal workspace.</p>
          <form className="mt-6 space-y-4" onSubmit={onLogin}>
            <div>
              <label className="block text-sm mb-1 text-[#94A3B8]" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0F172A] px-3 py-2 outline-none focus:border-[#3B82F6]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#94A3B8]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0F172A] px-3 py-2 outline-none focus:border-[#3B82F6]"
              />
            </div>
            {authError ? <p className="text-sm text-[#F87171]">{authError}</p> : null}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#3B82F6] py-2 font-semibold hover:bg-[#2563EB] transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    );
  }

  const userRole = session.user?.role;
  const userEmail = session.user?.email;
  const canAccessInternalOps = userRole === "admin" || userRole === "operator" || userRole === "viewer";

  return (
    <main className="min-h-screen bg-[#0B1120] text-[#F8FAFC] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-5 md:p-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#3B82F6]">Portal</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">Admin / Client Workspace</h1>
            <p className="text-sm text-[#94A3B8] mt-2">
              Signed in as {userEmail} ({userRole})
            </p>
          </div>
          <button
            type="button"
            onClick={() => void onLogout()}
            className="rounded-lg border border-[rgba(248,113,113,0.5)] px-4 py-2 text-sm text-[#FCA5A5] hover:bg-[rgba(239,68,68,0.08)] transition-colors"
          >
            Logout
          </button>
        </header>

        {canAccessInternalOps ? (
          <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-5 md:p-6">
            <h2 className="text-lg font-semibold">Operations Dashboard Access</h2>
            <p className="text-sm text-[#94A3B8] mt-2">
              Your role has access to internal analytics and alerts.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/internal/analytics";
              }}
              className="mt-4 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-semibold hover:bg-[#2563EB] transition-colors"
            >
              Open Internal Analytics
            </button>
          </section>
        ) : (
          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-4">
              <h2 className="text-base font-semibold">Projects & Status</h2>
              <p className="mt-2 text-sm text-[#94A3B8]">Track active services, milestones, and delivery updates.</p>
            </article>
            <article className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-4">
              <h2 className="text-base font-semibold">Billing & Invoices</h2>
              <p className="mt-2 text-sm text-[#94A3B8]">View payment status and invoice history.</p>
            </article>
            <article className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827] p-4">
              <h2 className="text-base font-semibold">Support Requests</h2>
              <p className="mt-2 text-sm text-[#94A3B8]">Submit and track service requests and issue escalations.</p>
            </article>
          </section>
        )}
      </div>
    </main>
  );
}
