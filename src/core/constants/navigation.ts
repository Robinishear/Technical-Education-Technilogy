import { 
  LayoutDashboard, Users, BookOpen,  
  Settings, Bell, MessageSquare, ShieldCheck, 
  GraduationCap, History, FileText, Home, 
  Images,
  Webhook,
  UserCheck
} from "lucide-react";

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "All Students", href: "/admin-dashboard/AllStudents", icon: Users },
  { label: "All Courses", href: "/admin-dashboard/courses", icon: BookOpen },
  { label: "Instructor Directory", href: "/admin-dashboard/InstructorDirectory", icon: ShieldCheck },
  { label: "Slider ", href: "/admin-dashboard/Slider", icon: Images },
  { label: "users", href: "/admin-dashboard/users", icon: UserCheck },
  { label: "Contact Messages", href: "/admin-dashboard/ContactMessagesTable", icon: MessageSquare },
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
  { label: "Our Courses", href: "/courses", icon: BookOpen },
  { label: "About Us", href: "/about", icon: FileText },
  { label: "All Branches", href: "/AllBranches", icon: Webhook },
  { label: "Student Results", href: "/StudentResult", icon: Webhook },
  { label: "Contact", href: "/contact", icon: MessageSquare },

];