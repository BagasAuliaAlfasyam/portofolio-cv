import { NextResponse, type NextRequest } from "next/server";

const LANGUAGE_COOKIE = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const preferredLocale = request.cookies.get(LANGUAGE_COOKIE)?.value;

  if (request.nextUrl.pathname === "/" && preferredLocale === "en") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
