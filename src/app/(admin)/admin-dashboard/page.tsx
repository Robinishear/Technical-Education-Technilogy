import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, Activity } from "lucide-react";

const adminStats = [
  { label: "Total Students", value: "1,240", icon: Users, color: "text-blue-500" },
  { label: "Active Courses", value: "45", icon: BookOpen, color: "text-green-500" },
  { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "text-yellow-600" },
  { label: "Server Status", value: "99.9%", icon: Activity, color: "text-purple-500" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview 🛠️</h1>
        <p className="text-muted-foreground font-medium">সিস্টেমের বর্তমান অবস্থা এবং ম্যানেজমেন্ট রিপোর্ট।</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-background">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-6 md:grid-cols-1">
         <Card className="p-10 flex flex-col justify-center items-center border-dashed border-2 text-muted-foreground">
            <Users className="h-10 w-10 mb-2 opacity-20" />
            <p className="font-medium">ইউজার অ্যাক্টিভিটি গ্রাফ এখানে লোড হবে</p>
         </Card>
      </div>
    </div>
  );
}