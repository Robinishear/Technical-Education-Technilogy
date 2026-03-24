/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "../../../core/lib/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await api.post("/auth/login", { 
      email, 
      password 
    });

    // Axios-এ ডাটা সরাসরি response.data তে থাকে
    const data = response.data;

    if (data?.success) {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // প্রক্সির 'next' প্যারামিটার হ্যান্ডেল করা
      const searchParams = new URLSearchParams(window.location.search);
      const nextPath = searchParams.get("next") || "/dashboard";

      toast.success("Login Successful! 🚀");
      
      // ড্যাশবোর্ডে পাঠানো এবং প্রক্সিকে সেশন চেনানোর জন্য রিফ্রেশ
      router.push(nextPath);
      router.refresh(); 
    }
  } catch (err: any) {
    // Axios এরর মেসেজ হ্যান্ডেল করা
    const msg = err.response?.data?.message || "Invalid credentials! ❌";
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative z-50 flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 space-y-6 border rounded-2xl bg-card/50 backdrop-blur-xl shadow-2xl border-primary/10">
        
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your details to sign in</p>
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
        </form>
      </div>
    </div>
  );
}