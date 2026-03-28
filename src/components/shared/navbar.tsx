"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard, LogOut,  } from "lucide-react";
import { PUBLIC_NAV_LINKS } from "@/core/constants/navigation";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/core/utils/utils";
import { getCookie, deleteCookie } from "@/core/utils/cookieUtils"; // আপনার বানানো
import { jwtUtils } from "@/core/utils/jwtUtils"; // আপনার বানানো
import { getDefaultDashboardRoute } from "@/core/utils/authUtils"; // আপনার বানানো
import { toast } from "sonner";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState("/dashboard");

  // ১. মাউন্ট হওয়ার পর সেশন চেক করা
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
  }, [pathname]); // পাথ চেঞ্জ হলেই আবার চেক করবে

  // ২. লগআউট হ্যান্ডেলার
  const handleLogout = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* 🏷️ Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight">
          Clean<span className="text-primary">Structure</span>
        </Link>

        {/* 💻 Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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
                {/* লগইন থাকলে এই বাটনগুলো দেখাবে */}
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
                {/* লগইন না থাকলে এই বাটনগুলো দেখাবে */}
                <Link href="/login" className="px-4 py-1.5 text-sm border rounded-lg hover:bg-accent transition-all">
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-1.5 text-sm bg-primary text-white rounded-lg hover:opacity-90 transition-all">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* 📱 Mobile Menu Button */}
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