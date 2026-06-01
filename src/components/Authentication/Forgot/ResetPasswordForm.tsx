/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Lock, Loader2, KeyRound } from "lucide-react";
import {

} from "./forgotPasswordSchema";
import { api } from "@/app/verify-email/otp-api";
import * as z from "zod";

const newResetSchema = z
  .object({
    otp: z.string().length(6, { message: "OTP must be 6 digits" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type NewResetValues = z.infer<typeof newResetSchema>;

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  const form = useForm<NewResetValues>({
    resolver: zodResolver(newResetSchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: NewResetValues) => {
    if (!email) return toast.error("ইমেইল পাওয়া যায়নি!");

    setLoading(true);
    try {
      const response = await api.post("/auth/reset-password", {
        email,
        otp: values.otp,
        newPassword: values.password,
      });

      if (response.data.success) {
        toast.success("পাসওয়ার্ড রিসেট সফল হয়েছে!");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "OTP ভুল বা মেয়াদ শেষ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* OTP */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP কোড</FormLabel>
              <FormControl>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="6 digit OTP"
                    className="pl-10 tracking-widest text-center text-lg"
                    maxLength={6}
                    {...field}
                    disabled={loading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>নতুন পাসওয়ার্ড</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="******"
                    className="pl-10"
                    {...field}
                    disabled={loading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পাসওয়ার্ড নিশ্চিত করুন</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="******"
                    className="pl-10"
                    {...field}
                    disabled={loading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full h-11"
          type="submit"
          disabled={loading || !email}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          পাসওয়ার্ড সেভ করুন
        </Button>
      </form>
    </Form>
  );
}
