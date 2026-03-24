"use client";

import { authClient } from "@/components/Authentication/Logout/auth-client";
import { User, Bell, Loader2, Search } from "lucide-react";
import { ModeToggle } from "../ModeToggle";

export const AdminDashboardNavbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="h-16 border-b bg-background/50 backdrop-blur-md sticky top-0 z-30 flex items-center px-6 justify-between">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-sm font-semibold text-muted-foreground hidden sm:block">
          Admin / <span className="text-foreground capitalize">Dashboard</span>
        </h2>
        {/* Admin Search */}
        <div className="relative max-w-xs w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="w-full bg-accent/50 border rounded-md py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <button className="p-2 hover:bg-accent rounded-full transition relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-background"></span>
        </button>

        <div className="flex items-center gap-3 border-l pl-4">
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-extrabold leading-none text-primary">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  System Admin
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                <User className="h-5 w-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};