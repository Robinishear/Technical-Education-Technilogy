"use client";

import { useState } from "react";
import { Loader2, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
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
      <div className="w-full max-w-sm p-8 space-y-5 border border-gray-200 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-900 shadow-xl">
        {/* ── Avatar ── */}
        <div className="flex flex-col items-center gap-2">
          <Link href="/" className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/30 border-4 border-blue-100 dark:border-blue-800 flex items-center justify-center overflow-hidden">
            <Image
              src="/image.png"
              alt="Student"
              width={96}
              height={96}
              className="object-cover"
              onError={(e) => {
                // fallback if image not found
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold">
              <span className="text-red-500">Branch</span>{" "}
              <span className="text-blue-700 dark:text-blue-400">Login</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Log in with your information.
            </p>
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mobile Number */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Email
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                name="email"
                type="text"
                placeholder="Enter your email "
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 border border-gray-300 rounded accent-blue-600 cursor-pointer"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-red-500 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-base font-bold rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" /> Signing In...
              </>
            ) : (
              "Login"
            )}
          </Button>

          {/* Cancel Button */}
          <Link href="/" passHref>
            <button
              type="button"
              className="w-full h-11 text-base font-bold rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
            >
              Cancel
            </button>
          </Link>

          {/* Bottom links */}
          <div className="flex items-center justify-center gap-1 text-xs pt-1">
            <span className="text-gray-500">Don&apos;t Have an Account?</span>
            <Link
              href="/register"
              className="text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              Sign up
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link
              href="/contact"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Contact
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}