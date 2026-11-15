"use client";
import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  lang?: Lang;
}

export default function ShareButtons({ url, title, description, lang = "en" }: ShareButtonsProps) {
  const d = t(lang).share;
  const [copied, setCopied] = useState(false);
  const [showWechat, setShowWechat] = useState(false);

  const enc = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);
  const encText = encodeURIComponent(`${title}\n\n${url}`);
  const encDesc = encodeURIComponent(description ?? "");

  const links = {
    x: `https://twitter.com/intent/tweet?text=${encTitle}&url=${enc}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`,
    threads: `https://www.threads.net/intent/post?text=${encText}`,
    email: `mailto:?subject=${encTitle}&body=${encDesc}%0A%0A${enc}`
  };

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this URL:", url);
    }
  }

  return (
    <div className="share">
      <p className="meta-label">{d.title}</p>
      <div className="share-row">
        <a href={links.x} target="_blank" rel="noreferrer">
          X
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={links.threads} target="_blank" rel="noreferrer">
          Threads
        </a>
        <button type="button" onClick={() => setShowWechat(true)}>
          {d.wechat}
        </button>
        <a href={links.email}>Email</a>
        <button type="button" onClick={copyLink}>
          {copied ? d.copied : d.copy}
        </button>
      </div>

      {showWechat ? (
        <div className="dialog-back" onClick={() => setShowWechat(false)} role="presentation">
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-label="微信"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="meta-label">分享到微信 / 朋友圈</p>
            <h3>扫码在微信里打开</h3>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${enc}`}
              alt="QR code"
              width={220}
              height={220}
            />
            <p className="one-line">
              手机微信扫码 → 在微信里打开 → 点右上角 <span style={{ fontWeight: 600 }}>···</span> →
              分享到朋友圈
            </p>
            <div className="offer-actions">
              <button type="button" onClick={copyLink} className="btn btn-ghost">
                {copied ? "✓ 链接已复制" : "或复制链接"}
              </button>
              <button type="button" onClick={() => setShowWechat(false)} className="btn btn-primary">
                关闭
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
