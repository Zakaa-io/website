"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface LoginResponse {
  success: boolean;
  user: {
    email: string;
    role: "client_admin" | "client_user";
  };
}

export function LoginForm({ nextPath }: Readonly<{ nextPath: string }>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) {
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = (await response.json()) as LoginResponse | { error?: string };
    setSubmitting(false);

    if (!response.ok) {
      setErrorMessage(data && "error" in data ? data.error ?? "Login failed." : "Login failed.");
      return;
    }

    setPassword("");
    router.push(nextPath);
    router.refresh();
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <div className="w-full rounded-2xl border border-[rgba(148,163,184,0.12)] bg-[#12121a] p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6366f1]">Zakaa Portal</p>
        <h1 className="mt-2 text-2xl font-bold">Client Login</h1>
        <p className="mt-2 text-sm text-[#a1a1aa]">Sign in to access your account workspace.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm text-[#a1a1aa]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0c0c12] px-3 py-2 outline-none focus:border-[#6366f1]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#a1a1aa]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-[rgba(148,163,184,0.2)] bg-[#0c0c12] px-3 py-2 outline-none focus:border-[#6366f1]"
            />
          </div>
          {errorMessage ? <p className="text-sm text-[#ef4444]">{errorMessage}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#6366f1] py-2 font-semibold transition-colors hover:bg-[#4f46e5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
