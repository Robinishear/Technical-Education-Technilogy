"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"
import Link from "next/link"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const loginSchema = z.object({
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(1, "পাসওয়ার্ড দিন"),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log("Login Data:", values)
    alert("লগইন বাটন কাজ করছে!")
  }

  return (
    <Card className="border-border/50 shadow-xl bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">লগইন করুন</CardTitle>
        <CardDescription>আবার স্বাগতম!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full">প্রবেশ করুন</Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          নতুন? <Link href="/register" className="text-primary font-bold">অ্যাকাউন্ট খুলুন</Link>
        </div>
      </CardContent>
    </Card>
  )
}