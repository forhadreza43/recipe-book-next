import { NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/dashboard"];

export default auth((request) => {
  const url = request.nextUrl.clone();
  const isProtected = protectedRoutes.some((path) =>
    url.pathname.startsWith(path)
  );
  const isLoggedIn = !!request.auth;

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
