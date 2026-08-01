"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type UserRole = "admin" | "operator" | "viewer" | "client";

interface SessionState {
  authenticated: boolean;
  user?: {
    email: string;
    role: UserRole;
  };
}

interface MetricsPayload {
  viewerRole: UserRole;
  data: {
    generatedAt: string;
    windowMinutes: number;
    totals: {
      events: number;
      failures: number;
      leadSubmissions: number;
      assessments: number;
      chatResponses: number;
    };
    failureRate: number;
    conversion: {
      chatToLeadRate: number;
    };
    routeCounts: Record<string, number>;
  };
}

interface AlertsPayload {
  viewerRole: UserRole;
  generatedAt: string;
  windowMinutes: number;
  alerts: Array<{
    level: "warning" | "critical";
    code: string;
    message: string;
  }>;
  summary: {
    totalEvents: number;
    failureRate: number;
    chatToLeadRate: number;
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

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export default function InternalAnalyticsDashboard() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [session, setSession] = useState<SessionState>({ authenticated: false });
  const [windowMinutes, setWindowMinutes] = useState(15);
  const [metrics, setMetrics] = useState<MetricsPayload["data"] | null>(null);
  const [alerts, setAlerts] = useState<AlertsPayload["alerts"]>([]);
  const [alertsError, setAlertsError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    const payload = result.data as SessionState;
    setSession(payload);
    setCheckingSession(false);
  }, []);

  const loadDashboardData = useCallback(async () => {
    setLoadingData(true);
    setDataError(null);
    setAlertsError(null);

    const metricsResult = await postJson<MetricsPayload>("/api/ops/metrics", { windowMinutes });
    if (metricsResult.status === 401) {
      setSession({ authenticated: false });
      setMetrics(null);
      setAlerts([]);
      setLoadingData(false);
      setDataError("Session expired. Please log in again.");
      return;
    }
    if (metricsResult.status === 403) {
      setLoadingData(false);
      setDataError("Your role does not have access to internal analytics.");
      return;
    }
    if (metricsResult.status !== 200) {
      const errorMessage = (metricsResult.data as { error?: string }).error ?? "Failed to load metrics.";
      setLoadingData(false);
      setDataError(errorMessage);
      return;
    }

    const metricsPayload = metricsResult.data as MetricsPayload;
    setMetrics(metricsPayload.data);

    const alertsResult = await postJson<AlertsPayload>("/api/ops/alerts", { windowMinutes });
    if (alertsResult.status === 403) {
      setAlerts([]);
      setAlertsError("Your role can view metrics but cannot access alerts.");
    } else if (alertsResult.status === 200) {
      const alertsPayload = alertsResult.data as AlertsPayload;
      setAlerts(alertsPayload.alerts);
    } else if (alertsResult.status === 401) {
      setSession({ authenticated: false });
      setMetrics(null);
      setAlerts([]);
      setDataError("Session expired. Please log in again.");
      setLoadingData(false);
      return;
    } else {
      const errorMessage = (alertsResult.data as { error?: string }).error ?? "Failed to load alerts.";
      setAlerts([]);
      setAlertsError(errorMessage);
    }

    setLoadingData(false);
  }, [windowMinutes]);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (!session.authenticated) return;
    void loadDashboardData();
  }, [session.authenticated, loadDashboardData]);

  const routeRows = useMemo(() => {
    if (!metrics) return [];
    return Object.entries(metrics.routeCounts).sort((a, b) => b[1] - a[1]);
  }, [metrics]);

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    const result = await postJson<{ success: boolean; user: { email: string; role: UserRole } }>(
      "/api/auth/login",
      { email, password }
    );
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
    setMetrics(null);
    setAlerts([]);
  };

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-[#06060a] text-[#e4e4e7] p-6 md:p-10">
        <div className="max-w-6xl mx-auto text-sm text-[#a1a1aa]">Checking session...</div>
      </main>
    );
  }

  if (!session.authenticated) {
    return (
      <main className="min-h-screen bg-[#06060a] text-[#e4e4e7] p-6 md:p-10">
        <div className="max-w-md mx-auto mt-10 md:mt-20 rounded-2xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-6 md:p-8">
          <h1 className="text-2xl font-bold">Internal Analytics Login</h1>
          <p className="mt-2 text-sm text-[#a1a1aa]">Sign in with your session credentials to access ops metrics.</p>
          <form className="mt-6 space-y-4" onSubmit={onLogin}>
            <div>
              <label className="block text-sm mb-1 text-[#a1a1aa]" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0c0c12] px-3 py-2 outline-none focus:border-[#3B82F6]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#a1a1aa]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0c0c12] px-3 py-2 outline-none focus:border-[#3B82F6]"
              />
            </div>
            {authError ? <p className="text-sm text-[#ef4444]">{authError}</p> : null}
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

  return (
    <main className="min-h-screen bg-[#06060a] text-[#e4e4e7] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="rounded-2xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-5 md:p-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6366f1]">Internal Dashboard</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">Analytics & Alerts</h1>
            <p className="text-sm text-[#a1a1aa] mt-2">
              Signed in as {session.user?.email} ({session.user?.role})
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={windowMinutes}
              onChange={(event) => setWindowMinutes(Number(event.target.value))}
              className="rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0c0c12] px-3 py-2 text-sm outline-none focus:border-[#3B82F6]"
            >
              <option value={5}>Last 5 minutes</option>
              <option value={15}>Last 15 minutes</option>
              <option value={30}>Last 30 minutes</option>
              <option value={60}>Last 60 minutes</option>
            </select>
            <button
              type="button"
              onClick={() => void loadDashboardData()}
              className="rounded-lg border border-[rgba(148,163,184,0.2)] px-4 py-2 text-sm hover:bg-[#1E293B] transition-colors"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={() => void onLogout()}
              className="rounded-lg border border-[rgba(248,113,113,0.5)] px-4 py-2 text-sm text-[#fca5a5] hover:bg-[rgba(239,68,68,0.06)] transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {dataError ? (
          <div className="rounded-xl border border-[rgba(239,68,68,0.3)] bg-[rgba(127,29,29,0.2)] px-4 py-3 text-sm text-[#fca5a5]">
            {dataError}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <article className="rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-4">
            <p className="text-xs text-[#a1a1aa]">Total events</p>
            <p className="text-2xl font-bold mt-2">{metrics?.totals.events ?? "-"}</p>
          </article>
          <article className="rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-4">
            <p className="text-xs text-[#a1a1aa]">Failure rate</p>
            <p className="text-2xl font-bold mt-2">{metrics ? formatPercent(metrics.failureRate) : "-"}</p>
          </article>
          <article className="rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-4">
            <p className="text-xs text-[#a1a1aa]">Chat → Lead conversion</p>
            <p className="text-2xl font-bold mt-2">{metrics ? formatPercent(metrics.conversion.chatToLeadRate) : "-"}</p>
          </article>
          <article className="rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-4">
            <p className="text-xs text-[#a1a1aa]">Lead submissions</p>
            <p className="text-2xl font-bold mt-2">{metrics?.totals.leadSubmissions ?? "-"}</p>
          </article>
          <article className="rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-4">
            <p className="text-xs text-[#a1a1aa]">Assessments generated</p>
            <p className="text-2xl font-bold mt-2">{metrics?.totals.assessments ?? "-"}</p>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-4 md:p-5">
            <h2 className="text-lg font-semibold">Alerts</h2>
            <p className="text-xs text-[#a1a1aa] mt-1">Live rule-based warnings and critical signals.</p>
            {alertsError ? <p className="mt-4 text-sm text-[#f59e0b]">{alertsError}</p> : null}
            {!alertsError && alerts.length === 0 ? (
              <p className="mt-4 text-sm text-[#10b981]">No active alerts in this window.</p>
            ) : null}
            <ul className="mt-4 space-y-3">
              {alerts.map((alert) => (
                <li
                  key={alert.code}
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    alert.level === "critical"
                      ? "border-[rgba(239,68,68,0.3)] bg-[rgba(127,29,29,0.2)] text-[#fca5a5]"
                      : "border-[rgba(245,158,11,0.3)] bg-[rgba(120,53,15,0.15)] text-[#fde68a]"
                  }`}
                >
                  <p className="font-semibold uppercase tracking-wide">{alert.level}</p>
                  <p className="mt-1">{alert.message}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[rgba(148,163,184,0.1)] bg-[#12121a] p-4 md:p-5">
            <h2 className="text-lg font-semibold">Route activity</h2>
            <p className="text-xs text-[#a1a1aa] mt-1">Requests grouped by endpoint within selected window.</p>
            <div className="mt-4 space-y-2">
              {routeRows.length === 0 ? (
                <p className="text-sm text-[#a1a1aa]">No route activity yet.</p>
              ) : (
                routeRows.map(([route, count]) => (
                  <div key={route} className="flex items-center justify-between rounded-lg bg-[#0c0c12] px-3 py-2 text-sm">
                    <span className="text-[#e4e4e7]">{route}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <footer className="text-xs text-[#64748B]">
          {loadingData ? "Refreshing data..." : `Last updated: ${metrics?.generatedAt ?? "N/A"}`}
        </footer>
      </div>
    </main>
  );
}
