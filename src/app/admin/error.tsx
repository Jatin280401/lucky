"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <p className="text-red-400">Something went wrong loading the admin panel.</p>
      <p className="text-slate-400 text-sm">Make sure you are signed in at /login first.</p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded"
        >
          Go to Login
        </Link>
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
