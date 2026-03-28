"use client";

import { useState } from "react";
import { Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from 'next/link';
import { loginUserAction } from "./_action";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);
  
  try {
    const result = await loginUserAction(null, formData);
    
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    }
  } catch (err) {
    if (isRedirectError(err)) throw err;
    
    toast.error("An unexpected error occurred");
    setLoading(false);
  }
};

  return (
    <div className="relative z-50 flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 space-y-6 border rounded-2xl bg-card/50 backdrop-blur-xl border-primary/10 shadow-2xl">
        
        <div className="space-y-3 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <Button type="submit" className="w-full font-bold" disabled={loading}>
            {loading ? (
              <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Signing In...</>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="flex flex-col items-center gap-3 mt-4 text-sm">
            <Link href="/forgot-password"  className="text-gray-500 hover:text-primary hover:underline transition">
                Forgot Password?
            </Link>
            <div className="flex gap-1">
              <span className="text-gray-600">Don&apos;t have an account?</span>
              <Link href="/register" className="text-primary font-medium hover:underline">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}