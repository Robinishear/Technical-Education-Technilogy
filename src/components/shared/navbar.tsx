"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; 
import { Menu, X, LogOut, User, Loader2 } from "lucide-react"; 
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
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Clean<span className="text-primary">Structure</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 text-sm font-medium transition",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          <div className="hidden md:flex items-center gap-2">
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : !session ? (
              <>
                <Link href="/login" className="px-4 py-1.5 text-sm border rounded-md hover:bg-accent transition">
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-md transition">
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                 <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium border px-3 py-1.5 rounded-md hover:bg-accent transition">
                    <User className="h-4 w-4" />
                    {session.user.name?.split(' ')[0] || "User"}
                 </Link>
                 <Button variant="destructive" size="sm" onClick={handleLogout} className="h-8 gap-1">
                    <LogOut className="h-4 w-4" /> Logout
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
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-4 animate-in slide-in-from-top-2">
          {PUBLIC_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium p-2 rounded-md",
                pathname === link.href ? "bg-accent text-primary" : "text-muted-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t flex flex-col gap-2">
            {!session ? (
              <Link href="/login" className="w-full text-center p-2 border rounded-md" onClick={() => setOpen(false)}>Sign In</Link>
            ) : (
              <Button variant="destructive" className="w-full gap-2" onClick={() => { setOpen(false); handleLogout(); }}>
                <LogOut size={16} /> Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}