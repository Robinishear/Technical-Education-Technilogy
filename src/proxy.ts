import { NextRequest, NextResponse } from "next/server";
import { getRouteOwner, isValidRedirectForRole } from "./core/utils/authUtils";
import { jwtUtils } from "./core/utils/jwtUtils";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const routeOwner = getRouteOwner(pathname);

  if (routeOwner && !accessToken) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url));
  }

  if (accessToken) {
    const decoded = jwtUtils.decodedToken(accessToken);
    const userRole = decoded?.role; 
    const userStatus = decoded?.status;

     // PENDING user dashboard এ 
    if (userStatus === "PENDING" && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/pending-approval", request.url));
    }

    // BLOCKED user dashboard
    if (userStatus === "BLOCKED" && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/blocked", request.url));
    }

    if (routeOwner && !isValidRedirectForRole(pathname, userRole)) {
      return NextResponse.redirect(new URL("/login", request.url)); 
    }
    
    if (pathname === "/login" || pathname === "/register") {
       return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", 
    "/admin-dashboard/:path*",
      "/login", 
      "/register",
      "/pending-approval", 
      "/blocked"],
};