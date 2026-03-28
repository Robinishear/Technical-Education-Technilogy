/* eslint-disable react-hooks/static-components */
"use client";

import { useState } from "react";
import { USER_NAV_LINKS } from "@/core/constants/navigation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDashboardNavbar } from "@/components/shared/user/UserDashboardNavbar";
import { cn } from "@/core/utils/utils";
import { deleteCookie } from "@/core/utils/cookieUtils"; 
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoutAction = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    toast.success("Logged out successfully! 👋");
    router.push("/login");
    router.refresh();
  };

  const NavContent = () => (
    <>
      <div className="p-6 border-b flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
          Clean<span className="text-foreground">Structure</span>
        </Link>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-1.5">
        {USER_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              pathname === link.href 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                : "text-muted-foreground hover:bg-accent hover:text-primary"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive" 
          onClick={handleLogoutAction}
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r bg-card hidden md:flex flex-col sticky top-0 h-screen">
        <NavContent />
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <aside className="w-72 h-full bg-card border-r flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <NavContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col w-full">
        <UserDashboardNavbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} /> 

        <main className="flex-1 bg-accent/5 p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children} 
          </div>
        </main>
      </div>
    </div>
  );
}