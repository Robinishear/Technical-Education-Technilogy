import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      if (!allCookies) {
        const next = encodeURIComponent(pathname + (search || ""));
        return NextResponse.redirect(new URL(`/login?next=${next}`, request.url));
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/me`, {
        headers: {
          Cookie: allCookies,         },
        cache: "no-store",
      });

      const result = await response.json();

      const user = result?.data;
      const isAuthenticated = !!user;

      if (!isAuthenticated) {
        const next = encodeURIComponent(pathname + (search || ""));
        return NextResponse.redirect(new URL(`/login?next=${next}`, request.url));
      }

      if (pathname.startsWith("/dashboard/admin") && user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

    } catch (error) {
      console.error("Proxy Auth Error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/signup";
  if (isAuthPage) {
    const cookieStore = await cookies();
    const hasSession = cookieStore.has("auth_session") || cookieStore.has("session");
    
    if (hasSession) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/signup",
  ],
};