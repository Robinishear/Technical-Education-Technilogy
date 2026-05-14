/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Bell, Loader2, Search, Menu } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { getCookie } from "@/core/utils/cookieUtils";
import { jwtUtils } from "@/core/utils/jwtUtils";
import { getUnreadCountAction } from "@/features/AdminDashboard/contacts/admin-contact.actions";
import Link from "next/link";

export const AdminDashboardNavbar = ({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) => {
  const [adminData, setAdminData] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const prevCountRef = useRef(0);
  const [userInteracted, setUserInteracted] = useState(false);

  //  unread count
  const { data: unreadData } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCountAction,
    refetchInterval: 60000,
  });

  const unreadCount = (unreadData?.data as any)?.data?.count ?? 0;

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = await getCookie("accessToken");
      if (token) {
        const decoded = jwtUtils.decodedToken(token);
        setAdminData({ 
          name: decoded?.name || "Admin User", 
          role: decoded?.role || "ADMIN" 
        });
      }
      setLoading(false);
    };
    fetchAdmin();
  }, []);


useEffect(() => {
  const handleInteraction = () => setUserInteracted(true);
  document.addEventListener("click", handleInteraction, { once: true });
  return () => document.removeEventListener("click", handleInteraction);
}, []);

// sound useEffect এ check করো
useEffect(() => {
  if (unreadCount > prevCountRef.current && userInteracted) {
    const audio = new Audio("/notification.mp3");
    audio.play();

    if (Notification.permission === "granted") {
      new Notification("New Contact Message 🔔", {
        body: "Someone sent you a message!",
        icon: "/favicon.ico",
      });
    }
  }
  prevCountRef.current = unreadCount;
}, [unreadCount, userInteracted]);

  return (
    <header className="h-16 border-b bg-background/50 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 md:px-6 justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onOpenMobileMenu}
          className="p-2 hover:bg-accent rounded-md md:hidden"
        >
          <Menu className="h-5 w-5 text-primary" />
        </button>

        <h2 className="text-sm font-semibold text-muted-foreground hidden sm:block">
          Admin / <span className="text-foreground font-bold capitalize">Dashboard</span>
        </h2>

        <div className="relative max-w-xs w-full hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search students/records..." 
            className="w-full bg-accent/30 border rounded-lg py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        
        <Link href="/admin-dashboard/ContactMessagesTable">
          <button className="p-2 hover:bg-accent rounded-full transition relative text-muted-foreground">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </Link>

        <div className="flex items-center gap-2 md:gap-3 border-l pl-3 md:pl-4">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-extrabold leading-none text-primary uppercase">
                  {adminData?.name}
                </p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">
                  {adminData?.role}
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 ring-2 ring-primary/10">
                <User className="h-5 w-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};