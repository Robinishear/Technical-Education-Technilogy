import { 
  LayoutDashboard, Users, BookOpen,  
   MessageSquare, ShieldCheck, 
  GraduationCap, History, FileText,  
  Images,
  Webhook,
  Home,
  ServerCrash
} from "lucide-react";

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "All Students", href: "/admin-dashboard/AllStudents", icon: Users },
  { label: "All Courses", href: "/admin-dashboard/courses", icon: BookOpen },
  {
    label: "Instructor Directory",
    href: "/admin-dashboard/InstructorDirectory",
    icon: ShieldCheck,
  },
  { label: "Slider ", href: "/admin-dashboard/Slider", icon: Images },
  // { label: "users", href: "/admin-dashboard/users", icon: UserCheck },
  {
    label: "Contact Messages",
    href: "/admin-dashboard/ContactMessagesTable",
    icon: MessageSquare,
  },
  { label: "Our-Story", href: "/admin-dashboard/Our-Story", icon: ServerCrash },
  { label: "Exam", href: "/admin-dashboard/exam-page", icon: ServerCrash },
];

export const USER_NAV_LINKS = [
  { label: "My Profile", href: "/dashboard/profile", icon: Users },
  { label: "Students-form", href: "/dashboard/student-form", icon: GraduationCap },
  { label: "Students-list", href: "/dashboard/StudentsList", icon: History },
  { label: "Universal Alert Board", href: "/dashboard/UniversalAlertBoard", icon: FileText },
  
  
];

export const PUBLIC_NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Our Courses", href: "/courses", icon: BookOpen },
  { label: "About Us", href: "/about", icon: FileText },
  { label: "All Branches", href: "/AllBranches", icon: Webhook },
  {
    label: "Student Results",
    href: "/student-result-page",
    icon: GraduationCap,
  },
  { label: "Exam", href: "/online-exam-page", icon: MessageSquare },
];