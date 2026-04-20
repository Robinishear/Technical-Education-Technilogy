/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard, LogOut,  } from "lucide-react";
import { PUBLIC_NAV_LINKS } from "@/core/constants/navigation";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/core/utils/utils";
import { getCookie, deleteCookie } from "@/core/utils/cookieUtils"; 
import { jwtUtils } from "@/core/utils/jwtUtils"; 
import { getDefaultDashboardRoute } from "@/core/utils/authUtils";
import { toast } from "sonner";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState("/dashboard");

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie("accessToken");
      if (token) {
        setIsLoggedIn(true);
        const decoded = jwtUtils.decodedToken(token);
        const role = decoded?.role;
        setDashboardUrl(getDefaultDashboardRoute(role));
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
          <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <img
              src="https://i.ibb.co.com/r2dVnpdh/Screenshot-from-2026-03-04-16-25-16-removebg-preview.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-red-500 font-bold text-lg md:text-xl leading-tight">
              BANGLADESH <span className="text-blue-700">TECHNICAL</span>
            </h1>
            <p className="text-green-500 text-[10px] md:text-[11px] font-semibold uppercase">
              EDUCATION TECHNOLOGY
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ⚙️ Actions Section */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link 
                  href={dashboardUrl} 
                  className="flex items-center gap-2 px-4 py-1.5 text-sm border rounded-lg hover:bg-accent transition-all"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm bg-destructive/10 text-destructive rounded-lg hover:bg-destructive hover:text-white transition-all"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-1.5 text-sm border rounded-lg hover:bg-accent transition-all">
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-1.5 text-sm bg-primary text-white rounded-lg hover:opacity-90 transition-all">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 border rounded-md hover:bg-accent"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};