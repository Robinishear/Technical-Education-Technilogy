"use client";

import { useEffect, useState } from "react";
import { User, Bell, Loader2, Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import { getCookie } from "@/core/utils/cookieUtils";
import { jwtUtils } from "@/core/utils/jwtUtils";

export const UserDashboardNavbar = ({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) => {
  const [userData, setUserData] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getCookie("accessToken");
      if (token) {
        const decoded = jwtUtils.decodedToken(token);
        setUserData({ 
          name: decoded?.name || decoded?.email?.split('@')[0] || "User", 
          role: decoded?.role || "Student" 
        });
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <header className="h-16 border-b bg-background/50 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 md:px-6 justify-between">
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenMobileMenu}
          className="p-2 hover:bg-accent rounded-md md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="font-bold text-primary md:hidden">
          Clean<span className="text-foreground">Structure</span>
        </Link>
        <div className="hidden md:block">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Dashboard / <span className="text-foreground capitalize font-bold">Overview</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ModeToggle />
        
        <button className="p-2 hover:bg-accent rounded-full transition text-muted-foreground hidden sm:block">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 md:gap-3 border-l pl-2 md:pl-4">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">{userData?.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{userData?.role}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                <User className="h-5 w-5 text-primary" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};