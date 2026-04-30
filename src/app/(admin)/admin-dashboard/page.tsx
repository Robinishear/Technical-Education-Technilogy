// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Users, BookOpen, DollarSign, Activity } from "lucide-react";
import Link from "next/link";
import { ChartAreaInteractive } from "./ChatWithAdminEndpointsApi/charts/ChartAreaInteractive";
import { ChartPieDonutText } from "./ChatWithAdminEndpointsApi/charts/ChartPieDonutText";
import { ChartRadialShape } from "./ChatWithAdminEndpointsApi/charts/ChartRadialShape";
import { ChartSpline } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Users,
//   BookOpen,
//   Activity,
//   UserCheck,
//   TrendingUp,
// } from "lucide-react";

//  const adminStats = [
//       { label: "Active Users", value: "980", icon: UserCheck, color: "from-pink-500 to-rose-400", iconColor: "text-pink-500" },
//       { label: "Active Courses", value: "45", icon: BookOpen, color: "from-green-500 to-emerald-400", iconColor: "text-green-500" },
//       { label: "Total Students", value: "1,240", icon: Users, color: "from-blue-500 to-cyan-400", iconColor: "text-blue-500" },
//       { label: "Server Status", value: "99.9%", icon: Activity, color: "from-purple-500 to-indigo-400", iconColor: "text-purple-500" },
//       { label: "Contact Messages", value: "+12%", icon: TrendingUp, color: "from-emerald-500 to-teal-400", iconColor: "text-emerald-500" },

//   ];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
    <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold tracking-tight">
      Admin Overview 🛠️
    </h1>
    <p className="text-muted-foreground font-medium">
      Current status of the system and management reports.
    </p>
  </div>
<Link
  href="/admin-dashboard/UniversalAlertBoard"
  className=" dark:bg-gray-900 dark:text-white text-black px-4 py-2 rounded-lg font-medium  transition"
>
  <ChartSpline/>
</Link>
</div>
{/* 
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {adminStats.map((stat) => (
          <Card
            key={stat.label}
            className="group relative overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm 
            bg-white dark:bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 
            hover:shadow-2xl hover:-translate-y-2"
          >
            {/* 🏎️ Animated Bottom Border Gradient */}
            {/* <div className={`absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r ${stat.color} transition-all duration-500 group-hover:w-full`} />

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
      </div> */} 
     <ChartAreaInteractive></ChartAreaInteractive>
     <div className="grid gap-4 md:grid-cols-2">
    <ChartPieDonutText></ChartPieDonutText>
     <ChartRadialShape></ChartRadialShape>

     </div>
     
    </div>
  );
}