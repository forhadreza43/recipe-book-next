import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export default function middleware(request) {
  const session = request.cookies.get("next-auth.session-token");
  const url = request.nextUrl.clone();

  if (!session) {
    if (protectedRoutes.some((path) => url.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
