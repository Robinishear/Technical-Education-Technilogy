"use client";

import { authClient } from "@/components/Authentication/Logout/auth-client";
import { User, Bell, Loader2,  } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";

export const UserDashboardNavbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="h-16 border-b bg-background/50 backdrop-blur-md sticky top-0 z-30 flex items-center px-6 justify-between">
      <div className="md:hidden">
        <Link href="/" className="font-bold text-primary">Clean<span className="text-foreground">Structure</span></Link>
      </div>

      <div className="hidden md:block">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Dashboard / <span className="text-foreground capitalize">Overview</span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        
        <button className="p-2 hover:bg-accent rounded-full transition text-muted-foreground">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-l pl-4">
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">{session?.user?.name || "User"}</p>
                <p className="text-[10px] text-muted-foreground capitalize">{session?.user?.role || "Student"}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};