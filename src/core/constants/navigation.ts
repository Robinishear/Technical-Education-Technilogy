import { 
  LayoutDashboard, Users, BookOpen, CreditCard, 
  Settings, Bell, MessageSquare, ShieldCheck, 
  GraduationCap, History, FileText, Home 
} from "lucide-react";

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "All Students", href: "/admin-dashboard/AllStudents", icon: Users },
  { label: "All Courses", href: "/admin-dashboard/courses", icon: BookOpen },
  { label: "Instructor Directory", href: "/admin-dashboard/InstructorDirectory", icon: ShieldCheck },
  { label: "Payments", href: "/admin-dashboard/payments", icon: CreditCard },
  { label: "Withdraw Requests", href: "/admin-dashboard/withdraw", icon: CreditCard },
  { label: "Support Tickets", href: "/admin-dashboard/support", icon: MessageSquare },
  { label: "Site Settings", href: "/admin-dashboard/settings", icon: Settings },
  { label: "Notifications", href: "/admin-dashboard/notices", icon: Bell },
  { label: "Reports", href: "/admin-dashboard/reports", icon: FileText },
];

export const USER_NAV_LINKS = [
  { label: "My Profile", href: "/dashboard/profile", icon: Users },
  { label: "Students-form", href: "/dashboard/student-form", icon: GraduationCap },
  { label: "Students-list", href: "/dashboard/StudentsList", icon: History },
  { label: "Certificates", href: "/dashboard/certificates", icon: FileText },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Help & Support", href: "/dashboard/support", icon: MessageSquare },
  
];

export const PUBLIC_NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Browse Courses", href: "/courses", icon: BookOpen },
  { label: "About Us", href: "/about", icon: FileText },
  { label: "Contact", href: "/contact", icon: MessageSquare },

];