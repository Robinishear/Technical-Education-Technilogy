/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Lock, Loader2 } from "lucide-react";
import { resetPasswordSchema, ResetPasswordValues } from "./forgotPasswordSchema";
import { api } from "@/app/verify-email/otp-api";
export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema as any),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token) return toast.error("টোকেন পাওয়া যায়নি!");

    setLoading(true);
    try {
      const response = await api.post("/auth/reset-password", { 
        token, 
        newPassword: values.password 
      });

      if (response.data.success) {
        toast.success("পাসওয়ার্ড রিসেট সফল হয়েছে!");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "লিঙ্কটি কাজ করছে না!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>নতুন পাসওয়ার্ড</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="******" className="pl-10" {...field} disabled={loading} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পাসওয়ার্ড নিশ্চিত করুন</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="******" className="pl-10" {...field} disabled={loading} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full h-11" type="submit" disabled={loading || !token}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          পাসওয়ার্ড সেভ করুন
        </Button>
      </form>
    </Form>
  );
}