/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "./otp-api";

function VerifyContentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
  };
  
const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (otp.trim().length !== 6) {
    return toast.error("দয়া করে ৬ ডিজিটের ওটিপি কোড দিন।");
  }

  setIsVerifying(true);
  const toastId = toast.loading("ভেরিফাই হচ্ছে...");

  try {
    const payload = { 
      email: email?.trim(), 
      otp: Number(otp) 
    };

    console.log("Sending to Backend:", payload);

    const response = await api.post("/auth/verify-email", payload);

    if (response.data.success) {
      toast.success("Email verification successful! 🎉", { id: toastId });
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  } catch (err: any) {
    console.error("Backend Error Detail:", err.response?.data);
    
    const errorMessage = err.response?.data?.message || "Wrong OTP given.!";
    toast.error(errorMessage, { id: toastId });
  } finally {
    setIsVerifying(false);
  }
};
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#111] border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)] text-center">
        <h2 className="text-3xl font-bold mb-3 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
Enter the code 📧
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          We <span className="text-cyan-400 font-medium">{email}</span> I have sent a 6-digit code via email.
        </p>

        <form onSubmit={handleVerify} className="space-y-8">
          <Input
            type="text"
            maxLength={6}
            placeholder="••••••"
            value={otp}
            onChange={handleOtpChange}
            className="text-4xl text-center tracking-[1rem] font-black h-20 bg-[#1a1a1a] border-gray-800 focus:border-cyan-500 focus:ring-cyan-500 rounded-2xl transition-all"
            autoFocus
          />

          <Button 
            disabled={isVerifying || otp.length < 6} 
            className="w-full py-7 text-xl font-bold bg-linear-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all rounded-2xl"
          >
            {isVerifying ? "Verifying..." : "Submit"}
          </Button>
        </form>

        <button 
          onClick={() => router.back()}
          className="mt-6 text-sm text-gray-500 hover:text-cyan-400 transition-colors"
        >
If the email is incorrect, go back.
        </button>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-cyan-500 font-medium italic">Wait...</p>
      </div>
    }>
      <VerifyContentPage />
    </Suspense>
  );
}