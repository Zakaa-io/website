"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setSubmitting(false);

    if (!response.ok) {
      throw new Error("Logout failed.");
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={() => {
        void onLogout();
      }}
      disabled={submitting}
      className="rounded-lg border border-rose-300/40 px-4 py-2 text-sm text-rose-200 transition-colors hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? "Signing out..." : "Sign out"}
    </button>
  );
}
