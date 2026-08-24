"use client";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

/**
 * Share bar for post pages.
 * - X / LinkedIn / Threads / Email: standard intent URLs (open compose window)
 * - Copy Link: navigator.clipboard
 * - WeChat: shows a modal with QR + copy link + instruction. WeChat doesn't
 *   let external websites trigger Moments share directly; the QR path is the
 *   universal workaround.
 */
export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
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
      // Older browsers: fallback prompt
      window.prompt("Copy this URL:", url);
    }
  }

  return (
    <div className="my-8">
      <div className="text-xs uppercase tracking-widest text-lilac-600 mb-3 text-center">
        Share this
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <a href={links.x} target="_blank" rel="noreferrer" className="chip">
          X
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="chip">
          LinkedIn
        </a>
        <a href={links.threads} target="_blank" rel="noreferrer" className="chip">
          Threads
        </a>
        <button
          type="button"
          onClick={() => setShowWechat(true)}
          className="chip"
        >
          微信 / 朋友圈
        </button>
        <a href={links.email} className="chip">
          Email
        </a>
        <button type="button" onClick={copyLink} className="chip">
          {copied ? "✓ Copied" : "Copy link"}
        </button>
      </div>

      {showWechat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setShowWechat(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="glass-strong rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs uppercase tracking-widest text-lilac-600 mb-2">
              分享到微信 / 朋友圈
            </div>
            <h3 className="font-display text-xl text-ink-900 mb-5">
              扫码在微信里打开
            </h3>
            <div className="bg-white rounded-2xl p-3 inline-block mb-4 shadow-soft">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${enc}`}
                alt="QR code"
                width={220}
                height={220}
              />
            </div>
            <p className="text-sm text-ink-500 leading-relaxed mb-5">
              手机微信扫码 → 在微信里打开 → 点右上角 <span className="font-medium text-ink-900">···</span> → 分享到朋友圈
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={copyLink}
                className="btn-ghost justify-center"
              >
                {copied ? "✓ 链接已复制" : "或复制链接"}
              </button>
              <button
                type="button"
                onClick={() => setShowWechat(false)}
                className="text-xs text-ink-500 hover:text-ink-900 mt-2"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
