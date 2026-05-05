/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion";
import {
  ShieldCheck, Settings, MapPin, BookOpen, User,
  CalendarDays, GraduationCap, Building2, Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileUpdateForm } from "./ProfileUpdateForm";

const getImageUrl = (src?: string | null) =>
  src ? (src.startsWith("http") ? src : `${process.env.BASE_URL}/uploads/${src}`) : null;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const InfoCard = ({ label, value, icon: Icon, isSpecial }: any) => (
  <motion.div
    variants={itemVariants}
    className={`group grid grid-cols-1 md:grid-cols-[1.2fr_2fr] items-center p-4 rounded-xl border-2 transition-all
    ${isSpecial ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border/40 hover:border-primary/30"}`}
  >
    <div className="flex items-center gap-3 overflow-hidden">
      <div className={`shrink-0 p-2 rounded-lg ${isSpecial ? "text-primary bg-primary/10" : "text-muted-foreground group-hover:text-primary bg-muted/50"}`}>
        {Icon ? <Icon size={16} /> : <Fingerprint size={16} />}
      </div>
      <span className="text-[11px] font-black uppercase tracking-wider truncate">{label}</span>
    </div>
    <span className="text-sm font-bold md:text-right wrap-break-word mt-1 md:mt-0">{value || "—"}</span>
  </motion.div>
);

const SectionHeader = ({ title, icon: Icon }: any) => (
  <div className="flex items-center gap-4 mb-6 pt-4">
    <div className="h-10 w-10 flex items-center justify-center rounded-xl border-2 border-primary/20 text-primary bg-primary/5">
      <Icon size={20} />
    </div>
    <h2 className="text-lg font-black uppercase tracking-tight">{title}</h2>
    <div className="h-0.5 flex-1 bg-linear-to-r from-border via-border/50 to-transparent" />
  </div>
);

export const ProfileContent = ({ user }: { user: any }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background/50">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-10">
        
        <motion.div variants={itemVariants} className="p-6 md:p-10 rounded-[2.5rem] border bg-card shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-36 h-36 rounded-3xl overflow-hidden border-4 border-primary/10 shadow-2xl transition-transform hover:scale-105">
              <img
                src={getImageUrl(user?.directorPhoto) || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {user?.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">@{user?.username}</span>
                <span className={`px-4 py-1 text-[10px] font-black uppercase rounded-full border-2 ${isAdmin ? "text-rose-500 border-rose-500/20 bg-rose-500/5" : "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"}`}>
                  {user?.role || "STUDENT"}
                </span>
              </div>
            </div>

            <Button variant="outline" size="lg" className="rounded-2xl border-2 hover:bg-primary hover:text-white transition-all shadow-md" onClick={() => setShowUpdate(true)}>
              <Settings size={18} className="mr-2 animate-spin-slow" /> Settings
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          
          <div className="space-y-12">
            <section>
              <SectionHeader title="Personal Profile" icon={User} />
              <div className="grid gap-3">
                <InfoCard label="Full Name" value={user?.name} isSpecial icon={Fingerprint} />
                <div className="grid md:grid-cols-2 gap-3">
                   <InfoCard label="Gender" value={user?.gender} />
                   <InfoCard label="Religion" value={user?.religion} />
                </div>
                <InfoCard label="Nationality" value={user?.nationality} />
                <div className="grid md:grid-cols-2 gap-3">
                  <InfoCard label="Father" value={user?.fatherName} />
                  <InfoCard label="Mother" value={user?.motherName} />
                </div>
              </div>
            </section>

            <section>
              <SectionHeader title="Location Details" icon={MapPin} />
              <div className="grid gap-3">
                <InfoCard label="Address" value={user?.fullAddress} isSpecial />
                <div className="grid md:grid-cols-2 gap-3">
                  <InfoCard label="Village" value={user?.village} />
                  <InfoCard label="Post Office" value={user?.postOffice} />
                  <InfoCard label="Upazila" value={user?.thanaUpazila} />
                  <InfoCard label="District" value={user?.district} />
                </div>
              </div>
            </section>

            <section>
              <SectionHeader title="Academic Status" icon={GraduationCap} />
              <div className="grid gap-4">
                <InfoCard label="Course" value={user?.courseName} isSpecial icon={BookOpen} />
                <div className="grid md:grid-cols-2 gap-3">
                  <InfoCard label="Qualification" value={user?.educationQualification} />
                  <InfoCard label="Duration" value={user?.duration} />
                </div>
                <InfoCard 
                  label="Session Period" 
                  value={`${user?.startMonth} ${user?.startYear} — ${user?.endMonth} ${user?.endYear}`} 
                  icon={CalendarDays} 
                />
              </div>
            </section>
          </div>

          {/* RIGHT: SIDEBAR INFO */}
          <div className="space-y-8">
            <div className="p-8 border-2 border-primary/10 rounded-[2rem] bg-card/50 backdrop-blur-sm space-y-6 shadow-lg">
              <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-3 text-primary">
                <Building2 size={20} /> Institute Info
              </h3>
              <InfoCard label="Name" value={user?.instituteName} />
              <InfoCard label="Director" value={user?.directorName} />
              <InfoCard label="Age" value={`${user?.instituteAge} Years`} />
            </div>

            <div className="aspect-4/5 border-2 border-border/50 rounded-[2rem] overflow-hidden shadow-inner group">
              <img
                src={getImageUrl(user?.directorPhoto) || ""}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6 border-2 border-emerald-500/20 rounded-3xl flex items-center justify-between bg-emerald-500/5 shadow-sm">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">Account Status</p>
                <h4 className="font-bold text-emerald-600 text-lg flex items-center gap-1">Active <ShieldCheck size={18}/></h4>
              </div>
              <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
                <ShieldCheck size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* ⚙️ UPDATE MODAL */}
        {showUpdate && (
          <ProfileUpdateForm user={user} onClose={() => setShowUpdate(false)} />
        )}
      </motion.div>
    </div>
  );
};