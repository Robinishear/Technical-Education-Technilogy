"use client";

import { ADMIN_NAV_LINKS } from "@/core/constants/navigation";  
import { cn } from "@/core/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminDashboardNavbar } from "@/components/shared/admin/AdminDashboardNavbar";
import { handleLogout } from "@/components/Authentication/Logout/auth.service";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
            Admin<span className="text-foreground">Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {ADMIN_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
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
            className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminDashboardNavbar /> 
        <main className="flex-1 bg-accent/5 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {children} 
          </div>
        </main>
      </div>
    </div>
  );
}