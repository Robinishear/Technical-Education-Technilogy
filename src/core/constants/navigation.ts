import { 
  LayoutDashboard, Users, BookOpen, CreditCard, 
  Settings, Bell, MessageSquare, ShieldCheck, 
  GraduationCap, History, FileText, Home 
} from "lucide-react";

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Manage Users", href: "/admin/users", icon: Users },
  { label: "All Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Instructors", href: "/admin/teachers", icon: ShieldCheck },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Withdraw Requests", href: "/admin/withdraw", icon: CreditCard },
  { label: "Support Tickets", href: "/admin/support", icon: MessageSquare },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
  { label: "Notifications", href: "/admin/notices", icon: Bell },
  { label: "Reports", href: "/admin/reports", icon: FileText },
];

export const USER_NAV_LINKS = [
  { label: "My Profile", href: "/dashboard/profile", icon: Users },
  { label: "Enrolled Courses", href: "/dashboard/my-courses", icon: GraduationCap },
  { label: "Order History", href: "/dashboard/history", icon: History },
  { label: "Certificates", href: "/dashboard/certificates", icon: FileText },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Help & Support", href: "/dashboard/support", icon: MessageSquare },
  
];

export const PUBLIC_NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Browse Courses", href: "/courses", icon: BookOpen },
  { label: "About Us", href: "/about", icon: FileText },
  { label: "Contact", href: "/contact", icon: MessageSquare },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },

  
];