/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "../../../core/lib/axios";
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const router = useRouter();
const searchParams = useSearchParams();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await api.post("/auth/login", { email, password });
    
    if (response.data.success) {
      toast.success("Login Successful! 🚀");

      router.refresh(); 

      const nextPath = searchParams.get("next") || "/";
      
      setTimeout(() => {
        router.push(nextPath);
      }, 100);
    }
  } catch (err: any) {
    const msg = err.response?.data?.message || "Invalid credentials! ❌";
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative z-50 flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 space-y-6 border rounded-2xl bg-card/50 backdrop-blur-xl  border-primary/10">
        
        <div className="space-y-3 text-center">
  
  <Link href="/" className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
    Welcome Back
  </Link>

  <p className="text-sm md:text-base text-gray-500">
    Sign in to continue to your account
  </p>

</div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>

          {/* Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        <div className="flex flex-col items-center gap-3 mt-4">
  
  <Link
    href="/forgot-password"
    className="text-sm text-gray-500 hover:text-primary hover:underline transition duration-200"
  >
    Forgot Password?
  </Link>

  <div className="flex items-center gap-1 text-sm text-gray-600">
    <span>Don't have an account?</span>
    <Link
      href="/register"
      className="text-primary font-medium hover:underline transition duration-200"
    >
      Sign Up
    </Link>
  </div>

</div>
        </form>
      </div>
    </div>
  );
}