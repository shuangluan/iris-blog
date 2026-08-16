/**
 * Newsletter subscribe endpoint.
 * Proxies to Buttondown so the API key stays server-side (never shipped to
 * the browser). Falls back gracefully if BUTTONDOWN_API_KEY isn't set.
 */
export const runtime = "edge";

export async function POST(req: Request) {
  let email: string | undefined;
  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return Response.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY?.trim();
  if (!apiKey) {
    return Response.json(
      { error: "Newsletter not configured" },
      { status: 501 }
    );
  }

  try {
    const res = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email_address: email })
    });

    if (res.ok) {
      return Response.json({ ok: true });
    }

    // Buttondown returns 400 for duplicate emails etc.
    const text = await res.text().catch(() => "");
    if (res.status === 400 && /already|exists|subscrib/i.test(text)) {
      return Response.json({ ok: true, already: true });
    }
    return Response.json(
      { error: "Subscription failed" },
      { status: 500 }
    );
  } catch {
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}
