import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, PlayCircle, Trophy, Clock } from "lucide-react";

const stats = [
  { label: "Enrolled Courses", value: "12", icon: GraduationCap, color: "text-blue-500" },
  { label: "Completed", value: "08", icon: Trophy, color: "text-yellow-500" },
  { label: "In Progress", value: "04", icon: PlayCircle, color: "text-green-500" },
  { label: "Study Hours", value: "156h", icon: Clock, color: "text-purple-500" },
];

export default function dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Robin! 👋</h1>
        <p className="text-muted-foreground font-medium">আপনার আজকের লার্নিং ড্যাশবোর্ড।</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm shadow-black/5 bg-background">
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

      <div className="grid gap-6 md:grid-cols-2">
         <Card className="min-h-50 flex flex-col justify-center items-center border-dashed text-muted-foreground">
            <PlayCircle className="h-10 w-10 mb-2 opacity-20" />
            <p>আপনার কোর্সগুলো এখানে লোড হবে</p>
         </Card>
      </div>
    </div>
  );
}