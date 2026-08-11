"use client";
import { useEffect, useState } from "react";

/**
 * Soft-modern visitor counter. Persists per browser via localStorage; increments
 * once per session. Swap for a real API (/api/hits with KV) whenever — the
 * component contract stays the same.
 */
export default function VisitorBadge() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const key = "iris.visits";
    const session = "iris.visited.session";
    const base = 13337;
    let n = Number(localStorage.getItem(key) ?? "0") || 0;
    if (!sessionStorage.getItem(session)) {
      n += 1;
      localStorage.setItem(key, String(n));
      sessionStorage.setItem(session, "1");
    }
    setCount(base + n);
  }, []);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-white/90 px-3 py-1.5 text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blush-400 to-lilac-400" />
      <span className="text-ink-500">
        {count === null ? "—" : count.toLocaleString()} readers ever
      </span>
    </div>
  );
}
