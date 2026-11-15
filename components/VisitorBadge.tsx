"use client";
import { useEffect, useState } from "react";

export default function VisitorBadge({ label = "readers ever" }: { label?: string }) {
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
    <p className="quiet">
      {count === null ? "—" : count.toLocaleString()} {label}
    </p>
  );
}
