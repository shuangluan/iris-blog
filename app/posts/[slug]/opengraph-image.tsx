import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Iris Luan";

async function loadFace(family: string, text: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
          }
        }
      )
    ).text();
    const m = css.match(/src:\s*url\((.+?)\)\s+format/);
    if (!m) return null;
    return await (await fetch(m[1])).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const title = post?.title ?? "Iris Luan";
  const description = post?.description ?? "";
  const sample = `${title} ${description} iris.luan irisluan.com`;

  const [latinFont, cjkFont] = await Promise.all([
    loadFace("Source Serif 4", sample, 600),
    loadFace("Noto Serif SC", sample, 600)
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 600; style: "normal" }[] = [];
  if (latinFont) fonts.push({ name: "Source Serif 4", data: latinFont, weight: 600, style: "normal" });
  if (cjkFont) fonts.push({ name: "Noto Serif SC", data: cjkFont, weight: 600, style: "normal" });

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
          fontFamily: "Source Serif 4, Noto Serif SC, serif"
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 600, letterSpacing: 0 }}>
          iris.luan
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 42 ? 52 : 64,
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: 0
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
            borderTop: "6px solid #1c1b19",
            paddingTop: 28
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              lineHeight: 1.4,
              color: "#5c5a55",
              maxWidth: "74%"
            }}
          >
            {description}
          </div>
          <div style={{ display: "flex", fontSize: 22 }}>irisluan.com</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
