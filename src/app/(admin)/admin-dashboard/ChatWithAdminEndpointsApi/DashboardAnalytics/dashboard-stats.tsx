"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BookOpen,
  DollarSign,
  Activity,
  UserCheck,
  TrendingUp,
} from "lucide-react";

/** 🌈 Premium Analytics Dashboard Styling **/
export default function AnalyticsDashboard() {
  const adminStats = [
    { label: "Total Students", value: "1,240", icon: Users, color: "from-blue-500 to-cyan-400", iconColor: "text-blue-500" },
    { label: "Active Courses", value: "45", icon: BookOpen, color: "from-green-500 to-emerald-400", iconColor: "text-green-500" },
    { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "from-amber-500 to-yellow-400", iconColor: "text-yellow-500" },
    { label: "Server Status", value: "99.9%", icon: Activity, color: "from-purple-500 to-indigo-400", iconColor: "text-purple-500" },
    { label: "Active Users", value: "980", icon: UserCheck, color: "from-pink-500 to-rose-400", iconColor: "text-pink-500" },
    { label: "Growth Rate", value: "+12%", icon: TrendingUp, color: "from-emerald-500 to-teal-400", iconColor: "text-emerald-500" },
  ];

  return (
    <div className="p-8 bg-gray-50 dark:bg-black min-h-screen">
      {/* 📊 Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here’s what’s happening today. ✨</p>
      </div>

      {/* 🗂️ Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {adminStats.map((stat) => (
          <Card
            key={stat.label}
            className="group relative overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm 
            bg-white dark:bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 
            hover:shadow-2xl hover:-translate-y-2"
          >
            {/* 🏎️ Animated Bottom Border Gradient */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r ${stat.color} transition-all duration-500 group-hover:w-full`} />

            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-500">
                {stat.label}
              </CardTitle>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {stat.value}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs font-medium text-gray-400 dark:text-zinc-500 uppercase">
                  Live Updates
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}