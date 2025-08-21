import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  console.log("Middleware executing for path:", request.nextUrl.pathname);

  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    console.log("Middleware token:", token);
    console.log("AUTH_SECRET exists:", !!process.env.AUTH_SECRET);

    if (!token) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Token found, continuing to protected route");
    const response = NextResponse.next();
    // Ensure the response headers indicate successful auth
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: [
    "/dashboard/addRecipe/:path*",
    "/dashboard/myRecipe/:path*",
    "/dashboard/:path*",
  ],
};
