import { NextResponse, type NextRequest } from "next/server";

const LANGUAGE_COOKIE = "NEXT_LOCALE";

function getRedirectOrigin(request: NextRequest) {
  const forwardedProto = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();
  const host = request.headers.get("host")?.split(",")[0]?.trim();
  const protocol = forwardedProto ?? request.nextUrl.protocol.replace(":", "");
  const hostname = host ?? request.nextUrl.host;

  return `${protocol}://${hostname}`;
}

export function middleware(request: NextRequest) {
  const preferredLocale = request.cookies.get(LANGUAGE_COOKIE)?.value;

  if (request.nextUrl.pathname === "/" && preferredLocale === "en") {
    return NextResponse.redirect(new URL("/en", getRedirectOrigin(request)));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
