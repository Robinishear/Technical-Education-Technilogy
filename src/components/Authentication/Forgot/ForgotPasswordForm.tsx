/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { forgotPasswordSchema, ForgotPasswordValues } from "./forgotPasswordSchema";
import { api } from "@/app/verify-email/otp-api";

export default function ForgotPasswordForm() {
    const router = useRouter(); 
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema as any),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/forget-password", values);
      if (response.data.success) {
        setIsSent(true);
        toast.success("পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে!");
         router.push(`/reset-password?email=${values.email}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "কিছু একটা ভুল হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center space-y-4 py-6">
        <Mail className="h-12 w-12 text-primary mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold">মেইল চেক করুন</h2>
        <p className="text-muted-foreground">আমরা আপনার ইমেইলে একটি রিসেট লিঙ্ক পাঠিয়েছি।</p>
        <Link href="/login" className="text-primary hover:underline block pt-4">লগইন পেজে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ইমেইল অ্যাড্রেস</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="name@example.com" className="pl-10" {...field} disabled={loading} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full h-11" type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          রিসেট লিঙ্ক পাঠান
        </Button>
        <Link href="/login" className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> ব্যাক টু লগইন
        </Link>
      </form>
    </Form>
  );
}