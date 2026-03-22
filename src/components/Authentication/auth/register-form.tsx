"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Lock } from "lucide-react" // 🟢 এখান থেকে Form আইকন সরিয়েছি
import Link from "next/link"
// 🟢 এখান থেকে আসল Form কম্পোনেন্টগুলো ইম্পোর্ট করা হয়েছে
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, "নাম দিন"),
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
})

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Data:", values)
    alert("রেজিস্ট্রেশন বাটন কাজ করছে!")
  }

  return (
    <Card className="border-border/50 shadow-xl bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">নতুন অ্যাকাউন্ট</CardTitle>
        <CardDescription>আপনার তথ্য দিয়ে জয়েন করুন</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 🟢 এই Form এখন shadcn এর আসল লজিক্যাল Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>নাম</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="রবিন আহমেদ" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ইমেইল</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="example@mail.com" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>পাসওয়ার্ড</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">রেজিস্ট্রেশন করুন</Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          অ্যাকাউন্ট আছে? <Link href="/login" className="text-primary font-bold">লগইন</Link>
        </div>
      </CardContent>
    </Card>
  )
}