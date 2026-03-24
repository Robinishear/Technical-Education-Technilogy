"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; 
import { Menu, X, LogOut,  Loader2, LayoutDashboard } from "lucide-react"; 
import { PUBLIC_NAV_LINKS } from "@/core/constants/navigation";
import { cn } from "@/core/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { authClient } from "../Authentication/Logout/auth-client";
import { handleLogout } from "../Authentication/Logout/auth.service";

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight">
          Clean<span className="text-primary">Structure</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />

          <div className="hidden md:flex items-center gap-2">
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : !session ? (
              // ❌ লগইন না থাকলে এই বাটনগুলো দেখাবে
              <>
                <Link href="/login" className="px-4 py-1.5 text-sm border rounded-lg hover:bg-accent transition font-medium">
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg transition font-medium shadow-md shadow-primary/20">
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                 <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-sm font-bold bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                 >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                 </Link>
                 
                 <div className="h-8 w-px bg-border mx-1" /> {/* Separator */}

                 <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout} 
                    className="text-muted-foreground hover:text-destructive gap-2 px-2"
                 >
                    <LogOut className="h-4 w-4" />
                 </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 border rounded-md hover:bg-accent transition">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-background px-4 py-6 space-y-4 animate-in slide-in-from-top-2">
          {PUBLIC_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 text-sm font-medium p-3 rounded-xl",
                pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
          
          <div className="pt-4 border-t flex flex-col gap-3">
            {!session ? (
              <>
                <Link href="/login" className="w-full text-center p-3 border rounded-xl font-medium" onClick={() => setOpen(false)}>Sign In</Link>
                <Link href="/register" className="w-full text-center p-3 bg-primary text-white rounded-xl font-medium" onClick={() => setOpen(false)}>Get Started</Link>
              </>
            ) : (
              <>
                <Link 
                  href="/dashboard" 
                  className="w-full flex justify-center items-center gap-2 p-3 bg-primary/10 text-primary rounded-xl font-bold"
                  onClick={() => setOpen(false)}
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Button variant="destructive" className="w-full gap-2 py-6 rounded-xl" onClick={() => { setOpen(false); handleLogout(); }}>
                  <LogOut size={18} /> Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}