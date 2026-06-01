/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion";
import {
  User,
  MapPin,
  GraduationCap,
  Building2,
  Settings,
  ShieldCheck,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileUpdateForm } from "./ProfileUpdateForm";

const getImageUrl = (src?: string | null) =>
  src
    ? src.startsWith("http")
      ? src
      : `${process.env.BASE_URL}/uploads/${src}`
    : null;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06 },
  }),
};

function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <Icon size={16} />
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-100 dark:bg-white/5" />
    </div>
  );
}

function InfoTile({
  label,
  value,
  full = false,
}: {
  label: string;
  value?: string | null;
  full?: boolean;
}) {
  return (
    <div
      className={`rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3 ${
        full ? "col-span-2" : ""
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
        {value || "—"}
      </p>
    </div>
  );
}

export const ProfileContent = ({ user }: { user: any }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const isAdmin = user?.role === "ADMIN";
  const photoUrl = getImageUrl(user?.directorPhoto);
  const initials = user?.name
    ?.split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ── Hero card ── */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={user?.name}
                  className="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover border border-gray-200 dark:border-white/10"
                />
              ) : (
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-semibold">
                  {initials}
                </div>
              )}
              <span className="absolute -bottom-2 -right-2 h-5 w-5 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-900" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
                {user?.name}
              </h1>
              <p className="text-sm text-gray-400 font-mono mt-1">
                @{user?.username}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    isAdmin
                      ? "text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400"
                      : "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400"
                  }`}
                >
                  {user?.role || "Student"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
                  Active
                </span>
              </div>
            </div>

            {/* Settings */}
            <Button
              variant="outline"
              size="sm"
              // onClick={() => setShowUpdate(true)}
              className="shrink-0 rounded-xl gap-2 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300"
            >
              <Settings size={15} />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Personal */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
            >
              <SectionHeading icon={User} title="Personal profile" />
              <div className="grid grid-cols-2 gap-3">
                <InfoTile label="Full name" value={user?.name} full />
                <InfoTile label="Gender" value={user?.gender} />
                <InfoTile label="Religion" value={user?.religion} />
                <InfoTile label="Nationality" value={user?.nationality} full />
                <InfoTile label="Father's name" value={user?.fatherName} />
                <InfoTile label="Mother's name" value={user?.motherName} />
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
            >
              <SectionHeading icon={MapPin} title="Location details" />
              <div className="grid grid-cols-2 gap-3">
                <InfoTile label="Full address" value={user?.fullAddress} full />
                <InfoTile label="Village" value={user?.village} />
                <InfoTile label="Post office" value={user?.postOffice} />
                <InfoTile label="Upazila" value={user?.thanaUpazila} />
                <InfoTile label="District" value={user?.district} />
              </div>
            </motion.div>

            {/* Academic */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
            >
              <SectionHeading icon={GraduationCap} title="Academic status" />
              <div className="grid grid-cols-2 gap-3">
                <InfoTile label="Course" value={user?.courseName} full />
                <InfoTile
                  label="Qualification"
                  value={user?.educationQualification}
                />
                <InfoTile label="Duration" value={user?.duration} />
                <div className="col-span-2 rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3 flex items-start gap-3">
                  <div className="mt-0.5 h-7 w-7 rounded-lg bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                    <CalendarDays size={14} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Session period
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {user?.startMonth} {user?.startYear} — {user?.endMonth}{" "}
                      {user?.endYear}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3 flex items-start gap-3">
                  <div className="mt-0.5 h-7 w-7 rounded-lg bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                    <BookOpen size={14} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Institute
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {user?.institute || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-4">
            {/* Director photo */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 aspect-4/3 bg-gray-100 dark:bg-white/5"
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Director"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 dark:text-gray-600 gap-2">
                  <User size={32} />
                  <span className="text-xs">No photo</span>
                </div>
              )}
            </motion.div>

            {/* Institute info */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
            >
              <SectionHeading icon={Building2} title="Institute info" />
              <div className="space-y-3">
                {[
                  { label: "Name", value: user?.instituteName },
                  { label: "Director", value: user?.directorName },
                  {
                    label: "Established",
                    value: user?.instituteAge
                      ? `${user.instituteAge} years ago`
                      : null,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4 py-2 border-b border-gray-100 dark:border-white/5 last:border-0"
                  >
                    <span className="text-xs text-gray-400 shrink-0">
                      {label}
                    </span>
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-100 text-right">
                      {value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Account status */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
                  Account status
                </p>
                <p className="text-base font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <ShieldCheck size={18} />
                  Active
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <ShieldCheck size={22} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showUpdate && (
        <ProfileUpdateForm user={user} onClose={() => setShowUpdate(false)} />
      )}
    </div>
  );
};
