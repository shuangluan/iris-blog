"use client";
import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setState("success");
        setMessage(
          data.already
            ? "You're already on the list."
            : "Check your inbox to confirm."
        );
        setEmail("");
      } else if (res.status === 501) {
        setState("error");
        setMessage("Newsletter isn't wired up yet. Check back soon.");
      } else {
        setState("error");
        setMessage("Something went wrong. Try again?");
      }
    } catch {
      setState("error");
      setMessage("Network error. Try again?");
    }
  }

  if (state === "success") {
    return (
      <div className="max-w-md mx-auto glass rounded-full px-5 py-3 text-center text-sm text-ink-700">
        ✓ {message}
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere.com"
          disabled={state === "loading"}
          className="flex-1 px-4 py-3 rounded-full bg-white/80 border border-white/90 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-lilac-400/40 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn-primary justify-center disabled:opacity-70"
        >
          {state === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {state === "error" && (
        <div className="mt-3 text-xs text-red-600 text-center">{message}</div>
      )}
    </>
  );
}
