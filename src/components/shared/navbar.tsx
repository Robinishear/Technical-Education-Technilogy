"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV_LINKS } from "@/core/constants/navigation";
import { cn } from "@/core/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-1.5 text-sm border rounded-md hover:bg-accent transition"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md border hover:bg-accent transition"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-4">
          
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/login"
              className="w-full text-center px-4 py-2 border rounded-md"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};