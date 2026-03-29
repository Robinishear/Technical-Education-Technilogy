/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Mail, Settings, Crown, MapPin, BookOpen, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ================== CONFIG ================== */
const BASE_URL = "http://localhost:5000";

/* ================== Helper ================== */
const getImageUrl = (src?: string | null) =>
  src ? (src.startsWith("http") ? src : `${BASE_URL}/uploads/${src}`) : null;

/* ================== Info Card Component ================== */
const InfoCard = ({ label, value, isSpecial }: { label: string; value: any; isSpecial?: boolean }) => (
  <div className={`group flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 hover:shadow-md
    ${isSpecial ? "border-primary/20 bg-primary/5" : "border-border bg-card/40 hover:bg-card"}`}>
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
    <span className={`font-semibold text-sm ${isSpecial ? "text-primary" : "text-foreground"}`}>
      {value || "—"}
    </span>
  </div>
);

/* ================== Image Card Component ================== */
const ImageCard = ({ label, src }: { label: string; src?: string | null }) => {
  const finalSrc = getImageUrl(src);
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-muted/30 p-2 transition-all">
      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-2 ml-1">{label}</p>
      {finalSrc ? (
        <div className="aspect-video w-full rounded-xl overflow-hidden border bg-background">
          <img
            src={finalSrc}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="aspect-video w-full flex items-center justify-center text-xs text-muted-foreground border-dashed border-2 rounded-xl">
          No {label} Found
        </div>
      )}
    </div>
  );
};

/* ================== Section Wrapper ================== */
const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-2">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon size={18} />
      </div>
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">{children}</div>
  </div>
);

/* ================== MAIN PROFILE CONTENT ================== */
export const ProfileContent = ({ user }: { user: any }) => {
  const isAdmin = user?.role === "ADMIN";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6 space-y-8 border  rounded-2xl"
    >
      {/* 🚀 Header Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] border bg-linear-to-br from-background via-background to-primary/5 p-8 ">
        <div className="absolute top-0 right-0 p-8 opacity-10">
            <Crown size={120} />
        </div>
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Profile Avatar logic */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-primary/20 shadow-2xl">
              <img 
                src={getImageUrl(user?.directorPhoto) || "https://ui-avatars.com/api/?name=" + user?.name} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {isAdmin && (
              <div className="absolute -top-3 -right-3 bg-yellow-500 text-white p-2 rounded-xl shadow-lg animate-bounce">
                <Crown size={18} />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div>
              <h1 className="text-3xl font-black tracking-tight">{user?.name}</h1>
              <p className="text-primary font-medium italic">@{user?.username}</p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
                <Mail size={14} /> {user?.email}
              </span>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest
                ${isAdmin ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
                {user?.role || "USER"}
              </span>
            </div>
          </div>

          <Button variant="default" className="rounded-2xl px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <Settings size={18} className="mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* 📊 Content Body */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Data) */}
        <div className="lg:col-span-2 space-y-10">
          <Section title="Personal Details" icon={UserIcon}>
            <InfoCard label="Father's Name" value={user?.fatherName} />
            <InfoCard label="Mother's Name" value={user?.motherName} />
            <InfoCard label="Gender" value={user?.gender} />
            <InfoCard label="Nationality" value={user?.nationality} />
            <InfoCard label="Phone" value={user?.phone} isSpecial />
            <InfoCard label="Religion" value={user?.religion} />
          </Section>

          <Section title="Residential Address" icon={MapPin}>
            <div className="col-span-full">
               <InfoCard label="Full Address" value={user?.fullAddress} />
            </div>
            <InfoCard label="Village" value={user?.village} />
            <InfoCard label="District" value={user?.district} />
          </Section>

          <Section title="Course & Academic" icon={BookOpen}>
            <InfoCard label="Course Name" value={user?.courseName} isSpecial />
            <InfoCard label="Duration" value={user?.duration} />
            <InfoCard label="Education" value={user?.educationQualification} />
            <InfoCard label="Session" value={`${user?.startMonth} ${user?.startYear} - ${user?.endYear}`} />
          </Section>
        </div>

        {/* Right Column (Sidebar Style) */}
        <div className="space-y-6">
          <div className="p-6 rounded-[2rem] border bg-card/50 backdrop-blur-sm space-y-6">
             <h3 className="font-bold text-center border-b pb-3">Institute Information</h3>
             <div className="space-y-3">
                <div className="text-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Institute Name</p>
                    <p className="text-lg font-bold text-primary">{user?.instituteName}</p>
                </div>
                <InfoCard label="Director" value={user?.directorName} />
                <InfoCard label="Est. Age" value={user?.instituteAge} />
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold px-2">Verification Documents</h3>
            <ImageCard label="Director Photo" src={user?.directorPhoto} />
          </div>

          {/* Security Footer */}
          <div className="p-5 rounded-2xl border bg-emerald-500/5 border-emerald-500/20 flex items-center justify-between">
             <div>
                <p className="text-[10px] font-bold uppercase text-emerald-600">Account Status</p>
                <p className="font-bold text-emerald-700">Verified Secure</p>
             </div>
             <ShieldCheck className="text-emerald-500" size={32} />
          </div>
        </div>

      </div>

      {/* 📅 System Info */}
      <div className="text-center pt-8 border-t">
         <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Account Member Since: {user?.createdAt ? new Date(user?.createdAt).getFullYear() : '2026'}
         </p>
      </div>
    </motion.div>
  );
};