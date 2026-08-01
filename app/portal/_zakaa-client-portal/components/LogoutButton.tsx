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
      className="rounded-lg border border-[rgba(239,68,68,0.5)] px-4 py-2 text-sm text-[#fca5a5] transition-colors hover:bg-[rgba(239,68,68,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? "Signing out..." : "Sign out"}
    </button>
  );
}
