import { NextResponse } from "next/server";
import { isLang, LANG_COOKIE, type Lang } from "@/lib/i18n";
import { getPost, getTranslation } from "@/lib/posts";

function safePath(from: string) {
  if (!from.startsWith("/") || from.startsWith("//") || from.startsWith("/\\")) return "/";
  if (from.includes("://") || from.includes("\\") || from.includes("\0")) return "/";
  return from;
}

function destination(from: string, to: Lang) {
  const path = safePath(from);
  const pathname = path.split("?")[0];
  const m = pathname.match(/^\/posts\/([^/]+)$/);
  if (!m) return path;
  const post = getPost(decodeURIComponent(m[1]));
  if (!post) return path;
  const translation = getTranslation(post);
  if (translation && translation.lang === to) return `/posts/${translation.slug}`;
  return path;
}

export function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get("to");
  const from = url.searchParams.get("from") || "/";
  if (!isLang(to)) {
    return NextResponse.redirect(new URL("/", req.url), 303);
  }
  const res = NextResponse.redirect(new URL(destination(from, to), req.url), 303);
  res.cookies.set(LANG_COOKIE, to, { path: "/", maxAge: 31536000, sameSite: "lax" });
  return res;
}
