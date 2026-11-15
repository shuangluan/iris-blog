import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Iris Luan · AI product notes, case studies & side projects";

const TITLE = "AI product notes, case studies & side projects.";
const SUB = "Former ByteDance / TikTok lead PM. Writing between Shanghai and New York.";

async function loadFace(family: string, text: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`,
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
  const text = `${TITLE} ${SUB} iris.luan irisluan.com`;
  const font = await loadFace("Source Serif 4", text, 600);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f4f3f0",
          color: "#1c1b19",
          fontFamily: "Source Serif 4, serif"
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 600, letterSpacing: 0 }}>
          iris.luan
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: 0
          }}
        >
          {TITLE}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "6px solid #1c1b19",
            paddingTop: 28
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#5c5a55", maxWidth: "72%" }}>{SUB}</div>
          <div style={{ display: "flex", fontSize: 22 }}>irisluan.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Source Serif 4", data: font, weight: 600, style: "normal" }]
        : undefined
    }
  );
}
