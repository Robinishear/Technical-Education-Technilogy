// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Users, BookOpen, DollarSign, Activity } from "lucide-react";
import Link from "next/link";
import { ChartAreaInteractive } from "./ChatWithAdminEndpointsApi/charts/ChartAreaInteractive";
// import { ChartPieDonutText } from "./ChatWithAdminEndpointsApi/charts/ChartPieDonutText";
// import { ChartRadialShape } from "./ChatWithAdminEndpointsApi/charts/ChartRadialShape";
import { ChartSpline } from "lucide-react";
import UsersTable from "@/features/AdminDashboard/users/users-table";



export default function AdminDashboard() {
  return (
    <div className="space-y-8">
    <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold tracking-tight">
      Admin Overview 
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

      <UsersTable></UsersTable>
           <ChartAreaInteractive></ChartAreaInteractive>

    {/* <ChartPieDonutText></ChartPieDonutText>
     <ChartRadialShape></ChartRadialShape> */}

     
    </div>
  );
}