import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const path = req.nextUrl.pathname;

  const publicPaths = ["/auth/login", "/auth/register"];

  // Allow auth pages
  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow API routes
  if (path.startsWith("/api")) {
    return NextResponse.next();
  }

  // Protect everything else
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
