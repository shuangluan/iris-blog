import { NextResponse, type NextRequest } from "next/server";

// Exposes the pathname to server components (the root layout uses it to set
// <html lang> from the post's own language on article pages).
export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon|.*\\.(?:svg|png|jpg|xml|txt)$).*)"]
};
