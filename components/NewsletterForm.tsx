"use client";
import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";

type State = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({ lang = "en" }: { lang?: Lang }) {
  const d = t(lang).newsletter;
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
        setMessage(data.already ? d.already : d.confirm);
        setEmail("");
      } else if (res.status === 501) {
        setState("error");
        setMessage(d.notWired);
      } else {
        setState("error");
        setMessage(d.error);
      }
    } catch {
      setState("error");
      setMessage(d.network);
    }
  }

  if (state === "success") {
    return <p className="nl-success">{message}</p>;
  }

  return (
    <>
      <form onSubmit={onSubmit} className="nl-form">
        <div className="nl-field">
          <label className="nl-label" htmlFor="newsletter-email">
            {d.label}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={d.placeholder}
            disabled={state === "loading"}
            className="nl-input"
            autoComplete="email"
          />
        </div>
        <button type="submit" disabled={state === "loading"} className="btn btn-primary">
          {state === "loading" ? d.loading : d.subscribe}
        </button>
      </form>
      {state === "error" ? <p className="nl-error">{message}</p> : null}
    </>
  );
}
