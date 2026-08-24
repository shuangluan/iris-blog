import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Iris Luan";

/**
 * Loads a subset of a Google Font containing only the characters we need.
 * Cuts font size from ~15MB down to ~5KB and works for both Latin (Fraunces)
 * and Simplified Chinese (Noto Serif SC).
 */
async function loadFont(
  family: string,
  text: string,
  weight: number
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(url, {
      headers: {
        // Ensures we get a woff/ttf URL, not woff2 which satori can't parse
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    const css = await cssRes.text();
    const m = css.match(/src:\s*url\((.+?)\)\s+format/);
    if (!m) return null;
    const res = await fetch(m[1]);
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage({
  params
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  const title = post?.title ?? "Iris Luan";
  const description = post?.description ?? "";

  // Load both fonts in parallel — one Latin serif, one CJK serif
  const [latinFont, cjkFont] = await Promise.all([
    loadFont("Fraunces", `${title} ${description} irisluan.com IRIS LUAN ✿`, 500),
    loadFont("Noto Serif SC", title + description, 500)
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 500;
    style: "normal";
  }[] = [];
  if (latinFont) {
    fonts.push({ name: "Fraunces", data: latinFont, weight: 500, style: "normal" });
  }
  if (cjkFont) {
    fonts.push({ name: "Noto Serif SC", data: cjkFont, weight: 500, style: "normal" });
  }

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
          background:
            "linear-gradient(135deg, #fef3e8 0%, #fce4ec 45%, #efe9ff 100%)",
          fontFamily: "Fraunces, Noto Serif SC, serif"
        }}
      >
        {/* Top wordmark */}
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
            ✿
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#1f1735" }}>
            iris.luan
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 60 : 76,
            fontWeight: 500,
            color: "#1f1735",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            display: "flex"
          }}
        >
          {title}
        </div>

        {/* Bottom: description + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#463659",
              lineHeight: 1.4,
              maxWidth: "70%",
              display: "flex"
            }}
          >
            {description}
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#7a5cb8",
              fontFamily: "ui-monospace, monospace",
              whiteSpace: "nowrap"
            }}
          >
            irisluan.com
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined }
  );
}
