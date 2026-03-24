import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin-dashboard")) {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      if (!allCookies) {
        return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url));
      }

      const response = await fetch(`${apiUrl}/auth/me`, {
        headers: { Cookie: allCookies },
        cache: "no-store",
      });

      const result = await response.json();

      if (!result.success || !result.data) {
        return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url));
      }

      if (pathname.startsWith("/admin-dashboard") && result.data.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

    } catch (error) {
      console.error("Proxy Auth Error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*", "/login", "/register"],
};