/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
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
   const timeoutId = setTimeout(() => {
     setOpen(false);
   }, 0);

   return () => clearTimeout(timeoutId); 
 }, [pathname]);
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
    setOpen(false);
    toast.success("👋 সফলভাবে লগআউট করা হয়েছে!");
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur-md fixed top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 🏢 Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <img
              src="https://i.ibb.co.com/r2dVnpdh/Screenshot-from-2026-03-04-16-25-16-removebg-preview.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-red-500 font-bold text-lg md:text-xl leading-tight tracking-wide">
              BANGLADESH{" "}
              <span className="text-blue-700 dark:text-blue-500">
                TECHNICAL
              </span>
            </h1>
            <p className="text-green-500 text-[10px] md:text-[11px] font-semibold uppercase tracking-wider">
              EDUCATION TECHNOLOGY
            </p>
          </div>
        </Link>

        {/* 🌐 Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-secondary/40 p-1.5 rounded-full border border-border/50 backdrop-blur-md">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out",
                  isActive
                    ? "text-primary-foreground bg-primary shadow-sm font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                )}
              >
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ⚙️ Actions Button Section */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Desktop Authentication Trigger */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  href={dashboardUrl}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm border rounded-xl hover:bg-accent transition-all font-medium"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm bg-destructive/10 text-destructive rounded-xl hover:bg-destructive hover:text-white transition-all font-medium"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 text-sm border rounded-xl hover:bg-accent transition-all font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 text-sm bg-primary text-white rounded-xl hover:opacity-90 transition-all font-medium shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* 📱 Mobile Menu Hamburger Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 border rounded-xl bg-secondary/30 hover:bg-accent transition-all"
            aria-label="Toggle Menu"
          >
            {open ? (
              <X size={18} className="text-primary" />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden w-full border-t bg-background/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-5 duration-200 absolute top-full left-0 right-0 shadow-xl border-b border-border/60">
          <div className="flex flex-col gap-2 p-4">
            {/* Navigation Links */}
            {PUBLIC_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <hr className="my-2 border-border/60" />

            {/* Auth Buttons inside Mobile Menu */}
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href={dashboardUrl}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium border border-border rounded-xl hover:bg-accent transition-all"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard Panel
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium bg-destructive/10 text-destructive rounded-xl hover:bg-destructive hover:text-white transition-all"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium border border-border rounded-xl hover:bg-accent transition-all"
                  >
                    <LogIn size={16} />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium bg-primary text-white rounded-xl text-center hover:opacity-90 transition-all shadow-sm"
                  >
                    <UserPlus size={16} />
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
