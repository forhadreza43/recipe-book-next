import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  console.log("Middleware executing for path:", request.nextUrl.pathname);

  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      raw: true,
    });

    console.log("Middleware token:", token);

    if (!token) {
      console.log("Invalid token, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Valid token found, continuing to protected route");
    return NextResponse.next();
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
