"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

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
    setAuthNotice(null);
    setIsLoggingIn(true);
    try {
      const result = await postJson<{ success: boolean; user: { email: string; role: UserRole } }>("/api/auth/login", {
        email,
        password,
      });

      if (result.status !== 200) {
        const errorMessage = (result.data as { error?: string }).error ?? "Login failed.";
        setAuthError(errorMessage);
        setIsLoggingIn(false);
        return;
      }

      setPassword("");
      setAuthNotice("Signed in successfully.");
      await loadSession();
    } catch {
      setAuthError("Login failed due to a network error. Please try again.");
      setIsLoggingIn(false);
    }
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
      <main className="min-h-screen bg-[#06060a] text-[#e4e4e7] p-6 md:p-10">
      <div className="max-w-md mx-auto mt-10 md:mt-20 rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#12121a] p-6 md:p-8">
        <h1 className="text-2xl font-bold">Admin / Client Portal Login</h1>
        <p className="mt-2 text-sm text-[#a1a1aa]">Sign in to access your portal workspace.</p>
        <form className="mt-6 space-y-4" onSubmit={onLogin} aria-busy={isLoggingIn}>
          <div>
            <label className="block text-sm mb-1 text-[#a1a1aa]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              disabled={isLoggingIn}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0c0c12] px-3 py-2 outline-none focus:border-[#6366f1] disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#a1a1aa]" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoggingIn}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0c0c12] px-3 py-2 pr-10 outline-none focus:border-[#6366f1] disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#e4e4e7] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {authError ? <p className="text-sm text-[#ef4444]">{authError}</p> : null}
          {authNotice ? <p className="text-sm text-[#10B981]">{authNotice}</p> : null}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full rounded-lg bg-[#6366f1] py-2 font-semibold hover:bg-[#4f46e5] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn ? "Signing in..." : "Sign in"}
          </button>
          <div className="text-center">
            <a
              href="mailto:hello@zakaa.io?subject=Portal%20Password%20Reset"
              className="text-sm text-[#a1a1aa] hover:text-[#6366f1] transition-colors no-underline"
            >
              Forgot password? Contact support
            </a>
          </div>
        </form>
      </div>
    </main>
    );
  }

  const userRole = session.user?.role;
  const userEmail = session.user?.email;
  const canAccessInternalOps = userRole === "admin" || userRole === "operator" || userRole === "viewer";

  return (
    <main className="min-h-screen bg-[#06060a] text-[#e4e4e7] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#12121a] p-5 md:p-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6366f1]">Portal</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">Admin / Client Workspace</h1>
            <p className="text-sm text-[#a1a1aa] mt-2">
              Signed in as {userEmail} ({userRole})
            </p>
          </div>
          <button
            type="button"
            onClick={() => void onLogout()}
            className="rounded-lg border border-[rgba(248,113,113,0.5)] px-4 py-2 text-sm text-[#fca5a5] hover:bg-[rgba(239,68,68,0.08)] transition-colors"
          >
            Logout
          </button>
        </header>

        {canAccessInternalOps ? (
          <section className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#12121a] p-5 md:p-6">
            <h2 className="text-lg font-semibold">Operations Dashboard Access</h2>
            <p className="text-sm text-[#a1a1aa] mt-2">
              Your role has access to internal analytics and alerts.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/internal/analytics";
              }}
              className="mt-4 rounded-lg bg-[#6366f1] px-4 py-2 text-sm font-semibold hover:bg-[#4f46e5] transition-colors"
            >
              Open Internal Analytics
            </button>
          </section>
        ) : (
          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#12121a] p-4">
              <h2 className="text-base font-semibold">Projects & Status</h2>
              <p className="mt-2 text-sm text-[#a1a1aa]">Track active services, milestones, and delivery updates.</p>
            </article>
            <article className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#12121a] p-4">
              <h2 className="text-base font-semibold">Billing & Invoices</h2>
              <p className="mt-2 text-sm text-[#a1a1aa]">View payment status and invoice history.</p>
            </article>
            <article className="rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#12121a] p-4">
              <h2 className="text-base font-semibold">Support Requests</h2>
              <p className="mt-2 text-sm text-[#a1a1aa]">Submit and track service requests and issue escalations.</p>
            </article>
          </section>
        )}
      </div>
    </main>
  );
}
