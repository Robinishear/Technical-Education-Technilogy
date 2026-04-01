/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion";
import { 
  ShieldCheck,  Settings,  MapPin, 
  BookOpen, User as  CalendarDays, 
   GraduationCap, Building2,  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE_URL = "http://localhost:5000";

const getImageUrl = (src?: string | null) =>
  src ? (src.startsWith("http") ? src : `${BASE_URL}/uploads/${src}`) : null;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

const InfoCard = ({ label, value, icon: Icon, isSpecial }: { label: string; value: any; icon?: any; isSpecial?: boolean }) => (
  <motion.div 
    variants={itemVariants}
    className={`group grid grid-cols-1 md:grid-cols-[1.2fr_2fr] items-center p-4 rounded-xl border-2 transition-all
    ${isSpecial 
      ? "border-primary/30 bg-primary/5 dark:bg-primary/10" 
      : "border-border/40 bg-transparent hover:border-primary/30"}`}
  >
    <div className="flex items-center gap-3 overflow-hidden">
      <div className={`shrink-0 p-2 rounded-lg ${isSpecial ? "text-primary bg-primary/10" : "text-muted-foreground group-hover:text-primary bg-muted/50"}`}>
        {Icon ? <Icon size={16} strokeWidth={2.5} /> : <Fingerprint size={16} />}
      </div>
      <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground/70 truncate">{label}</span>
    </div>
    
    <span className={`text-sm font-bold md:text-right wrap-break-word mt-1 md:mt-0 ${isSpecial ? "text-primary" : "text-foreground"}`}>
      {value || "—"}
    </span>
  </motion.div>
);

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="flex items-center gap-4 mb-6 pt-4">
    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-foreground/5 border-2 border-border/50 text-primary shrink-0">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <h2 className="text-lg font-black tracking-tighter uppercase italic">{title}</h2>
    <div className="h-0.5 flex-1 bg-linear-to-r from-border/60 to-transparent" />
  </div>
);

export const ProfileContent = ({ user }: { user: any }) => {
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 selection:bg-primary/20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-10"
      >
        <motion.div variants={itemVariants} className="relative p-6 md:p-10 rounded-[2.5rem] border-4 border-border bg-card/20 backdrop-blur-sm overflow-hidden">
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-primary/20 p-1 bg-background overflow-hidden">
                <img 
                  src={getImageUrl(user?.directorPhoto) || `https://api.dicebear.com/7.x/shapes/svg?seed=${user?.name}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight">{user?.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 text-sm font-mono font-bold">
                  <span className="text-primary">@{user?.username}</span>
                  <span className="text-muted-foreground/30">/</span>
                  <span className="text-muted-foreground">{user?.branchId}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <div className={`px-4 py-1 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest
                  ${isAdmin ? "border-red-500/50 text-red-500" : "border-emerald-500/50 text-emerald-500"}`}>
                  {user?.role || "STUDENT"}
                </div>
              </div>
            </div>

            <Button variant="outline" className="border-2 border-foreground hover:bg-foreground hover:text-background rounded-xl font-black uppercase text-xs h-12 px-6">
              <Settings size={18} className="mr-2" /> Settings
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-10">
          
          <div className="space-y-10">
            <section>
              <SectionHeader title="Academic Path" icon={GraduationCap} />
              <div className="grid gap-3">
                <InfoCard label="Primary Course" value={user?.courseName} isSpecial icon={BookOpen} />
                <div className="grid md:grid-cols-2 gap-3">
                  <InfoCard label="Qualification" value={user?.educationQualification} />
                  <InfoCard label="Duration" value={user?.duration} />
                </div>
                <InfoCard label="Active Session" value={`${user?.startMonth} ${user?.startYear} — ${user?.endYear}`} icon={CalendarDays} />
              </div>
            </section>

            <section>
              <SectionHeader title="Geo Location" icon={MapPin} />
              <div className="grid gap-3">
                <InfoCard label="Full Address" value={user?.fullAddress} icon={MapPin} />
                <div className="grid md:grid-cols-2 gap-3">
                  <InfoCard label="District/City" value={user?.district} />
                  <InfoCard label="Area Code/Village" value={user?.village} />
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <div className="p-6 rounded-[2rem] border-4 border-border bg-card/10 space-y-6">
               <h3 className="font-black text-sm uppercase flex items-center gap-2">
                  <Building2 size={18} className="text-primary" /> Authority
               </h3>
               <div className="space-y-3">
                  <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
                      <p className="text-[9px] font-black uppercase text-primary/60 mb-1">Institute Name</p>
                      <p className="font-bold text-sm leading-snug">{user?.instituteName}</p>
                  </div>
                  <InfoCard label="Director" value={user?.directorName} />
                  <InfoCard label="Stability" value={`${user?.instituteAge} Years`} />
               </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-2">Authentication Image</p>
              <div className="aspect-square rounded-[2rem] border-4 border-border overflow-hidden bg-muted">
                 <img 
                    src={getImageUrl(user?.directorPhoto) || ""} 
                    className="w-full h-full object-cover grayscale" 
                    alt="Verify" 
                 />
              </div>
            </div>

            <div className="p-5 rounded-2xl border-4 border-emerald-500/30 flex items-center justify-between bg-emerald-500/5 group">
               <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Integrity</span>
                  <span className="font-black text-xl italic uppercase">Verified</span>
               </div>
               <div className="h-12 w-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <ShieldCheck size={28} strokeWidth={2.5} />
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};