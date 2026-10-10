import { ImageResponse } from "next/og";

// Default share image for every page that doesn't have its own (posts do).
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Iris Luan · AI product notes, case studies & side projects";

const TITLE = "AI product notes, case studies & side projects.";
const SUB = "Former ByteDance / TikTok lead PM. Writing between Shanghai and New York.";

async function loadFraunces(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Fraunces:wght@500&text=${encodeURIComponent(text)}`,
        { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } }
      )
    ).text();
    const m = css.match(/src:\s*url\((.+?)\)\s+format/);
    return m ? await (await fetch(m[1])).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const font = await loadFraunces(`${TITLE} ${SUB} iris.luanirisluan.com`);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background: "linear-gradient(135deg, #fef3e8 0%, #fce4ec 45%, #efe9ff 100%)",
          fontFamily: "Fraunces, serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f180a7 0%, #a690ea 100%)",
              color: "white",
              fontSize: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "serif"
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24">
              {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} cx="12" cy="6.5" rx="3.6" ry="5.2" fill="white" transform={`rotate(${r} 12 12)`} />
              ))}
            </svg>
          </div>
          <div style={{ fontSize: 30, color: "#1f1735" }}>iris.luan</div>
        </div>
        <div
          style={{
            fontSize: 76,
            color: "#1f1735",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            display: "flex"
          }}
        >
          {TITLE}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 24, color: "#463659", maxWidth: "70%", display: "flex" }}>{SUB}</div>
          <div style={{ fontSize: 20, color: "#7a5cb8", fontFamily: "ui-monospace, monospace" }}>
            irisluan.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Fraunces", data: font, weight: 500, style: "normal" }] : undefined
    }
  );
}
