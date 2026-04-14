/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Settings,
  MapPin,
  BookOpen,
  User,
  CalendarDays,
  GraduationCap,
  Building2,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileUpdateForm } from "./ProfileUpdateForm";

// const BASE_URL = "https://apple-assignment-five-your-backend.onrender.com";

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

const InfoCard = ({
  label,
  value,
  icon: Icon,
  isSpecial,
}: {
  label: string;
  value: any;
  icon?: any;
  isSpecial?: boolean;
}) => (
  <motion.div
    variants={itemVariants}
    className={`group grid grid-cols-1 md:grid-cols-[1.2fr_2fr] items-center p-4 rounded-xl border-2 transition-all
    ${
      isSpecial
        ? "border-primary/30 bg-primary/5"
        : "border-border/40 hover:border-primary/30"
    }`}
  >
    <div className="flex items-center gap-3 overflow-hidden">
      <div
        className={`shrink-0 p-2 rounded-lg ${
          isSpecial
            ? "text-primary bg-primary/10"
            : "text-muted-foreground group-hover:text-primary bg-muted/50"
        }`}
      >
        {Icon ? <Icon size={16} /> : <Fingerprint size={16} />}
      </div>
      <span className="text-[11px] font-black uppercase truncate">
        {label}
      </span>
    </div>

    <span className="text-sm font-bold md:text-right wrap-break-word mt-1 md:mt-0">
      {value || "—"}
    </span>
  </motion.div>
);

const SectionHeader = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: any;
}) => (
  <div className="flex items-center gap-4 mb-6 pt-4">
    <div className="h-10 w-10 flex items-center justify-center rounded-xl border text-primary">
      <Icon size={20} />
    </div>
    <h2 className="text-lg font-black uppercase">{title}</h2>
    <div className="h-0.5 flex-1 bg-linear-to-r from-border to-transparent" />
  </div>
);

export const ProfileContent = ({ user }: { user: any }) => {
  const isAdmin = user?.role === "ADMIN";
  const [showUpdate, setShowUpdate] = useState(false);


  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-10"
      >
        {/* HEADER */}
        <motion.div
          variants={itemVariants}
          className="p-6 md:p-10 rounded-3xl border"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border">
              <img
                src={
                  getImageUrl(user?.directorPhoto) ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`
                }
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-3xl md:text-5xl font-black">
                {user?.name}
              </h1>

              <p className="text-sm text-muted-foreground">
                @{user?.username} 
              </p>

              <span
                className={`px-3 py-1 text-xs rounded-lg border ${
                  isAdmin ? "text-red-500" : "text-green-500"
                }`}
              >
                {user?.role || "STUDENT"}
              </span>
            </div>

            {/* <Button variant="outline">
              <Settings size={16} className="mr-2" />
              Settings
            </Button> */}
            <Button variant="outline" onClick={() => setShowUpdate(true)}>
  <Settings size={16} className="mr-2" />
  Settings
</Button>

          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-10">
          {/* LEFT */}
          <div className="space-y-10">
            {/* PERSONAL */}
            <section>
              <SectionHeader title="Personal Info" icon={User} />
              <div className="grid gap-3">
                <InfoCard label="Name" value={user?.name} isSpecial />
                <InfoCard label="Gender" value={user?.gender} />
                <InfoCard label="Religion" value={user?.religion} />
                <InfoCard label="Nationality" value={user?.nationality} />

                <div className="grid md:grid-cols-2 gap-3">
                  <InfoCard label="Father" value={user?.fatherName} />
                  <InfoCard label="Mother" value={user?.motherName} />
                </div>
              </div>
            </section>

            {/* ADDRESS */}
            <section>
              <SectionHeader title="Address" icon={MapPin} />
              <div className="grid gap-3">
                <InfoCard label="Full Address" value={user?.fullAddress} />
                <InfoCard label="Village" value={user?.village} />
                <InfoCard label="Post Office" value={user?.postOffice} />
                <InfoCard label="Thana" value={user?.thanaUpazila} />
                <InfoCard label="District" value={user?.district} />
              </div>
            </section>

            {/* ACADEMIC */}
            <section>
              <SectionHeader title="Academic" icon={GraduationCap} />
              <div className="grid gap-3">
                <InfoCard
                  label="Course"
                  value={user?.courseName}
                  isSpecial
                  icon={BookOpen}
                />
                <InfoCard label="Qualification" value={user?.educationQualification} />
                <InfoCard label="Duration" value={user?.duration} />
                <InfoCard
                  label="Session"
                  value={`${user?.startMonth} ${user?.startYear} — ${user?.endMonth} ${user?.endYear}`}
                  icon={CalendarDays}
                />
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">
            <div className="p-6 border rounded-2xl space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Building2 size={18} /> Institute
              </h3>

              <InfoCard label="Institute Name" value={user?.instituteName} />
              <InfoCard label="Director" value={user?.directorName} />
              <InfoCard
                label="Institute Age"
                value={`${user?.instituteAge} Years`}
              />
            </div>

            {/* IMAGE */}
            <div className="aspect-square border rounded-2xl overflow-hidden">
              <img
                src={getImageUrl(user?.directorPhoto) || ""}
                className="w-full h-full object-cover"
              />
            </div>

            {/* VERIFIED */}
            <div className="p-5 border rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs">Status</p>
                <h4 className="font-bold">Verified</h4>
              </div>
              <ShieldCheck />
            </div>
          </div>
        </div>
        {showUpdate && (
  <ProfileUpdateForm user={user} onClose={() => setShowUpdate(false)} />
)}
      </motion.div>
    </div>
  );
};