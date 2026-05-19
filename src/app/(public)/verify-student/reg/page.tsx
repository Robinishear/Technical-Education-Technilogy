/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Search, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { getResultByRollAction } from "@/features/public_assets/student-result/actions.ts";

function DetailItem({ label, value, className = "" }: { label: string; value?: string | null; className?: string }) {
  return (
    <div className={`flex flex-col space-y-0.5 bg-slate-950/40 border border-white/5 rounded-xl p-3 ${className}`}>
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
      <span className="text-xs font-bold text-slate-100">{value || "—"}</span>
    </div>
  );
}

function VerifyRegContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [session, setSession] = useState("");

  useEffect(() => {
    const rollFromUrl = searchParams.get("roll");
    const sessFromUrl = searchParams.get("sess");
    if (sessFromUrl) {
      setSession(sessFromUrl);
    }
    if (rollFromUrl) {
      setRoll(rollFromUrl);
      fetchStudentDetails(rollFromUrl);
    }
  }, [searchParams]);

  const fetchStudentDetails = async (rollNumber: string) => {
    if (!rollNumber.trim()) return;
    try {
      setLoading(true);
      setNotFound(false);
      setStudent(null);
      setSearched(true);
      const data = await getResultByRollAction(rollNumber.trim());
      if (!data) {
        setNotFound(true);
      } else {
        setStudent(data);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!roll.trim()) return;
    router.push(`/verify-student/reg?roll=${roll.trim()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden select-none">
      
      {/* Dynamic Background Glowing Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-500" />

      {/* Main Container */}
      <div className="w-full max-w-xl flex flex-col items-center z-10 text-center">
        
        {/* --- STATE 1: Search Form --- */}
        {!searched && !loading && (
          <div className="w-full max-w-[450px] bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
              <Search size={28} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                Registration Verify
              </h1>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Bangladesh Technical Education Technology
              </p>
            </div>
            <div className="w-full space-y-3">
              <input
                type="text"
                placeholder="Enter Student Roll Number"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-5 py-4 bg-slate-950/80 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-center font-bold tracking-widest text-lg transition-all"
              />
              <button
                onClick={handleSearch}
                className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-lg shadow-amber-600/25 active:scale-[0.98]"
              >
                Verify Registration Details
              </button>
            </div>
          </div>
        )}

        {/* --- STATE 2: Loading State --- */}
        {loading && (
          <div className="w-full max-w-[450px] bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-12 shadow-2xl flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-amber-500" size={44} />
            <p className="text-slate-300 text-xs font-black uppercase tracking-widest animate-pulse">
              Verifying Security Credentials...
            </p>
          </div>
        )}

        {/* --- STATE 3: Not Found State --- */}
        {searched && !loading && notFound && (
          <div className="w-full max-w-[450px] bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400 shadow-inner">
              <AlertTriangle size={28} className="animate-bounce" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                Verification Failed
              </h2>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                No student matched Roll: <span className="text-red-400 font-mono font-black">{roll}</span>
              </p>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed px-4">
              Please double check the roll number on the card. If you believe this is a system error, contact support.
            </p>
            <button
              onClick={() => {
                setSearched(false);
                setNotFound(false);
                setRoll("");
                router.push("/verify-student/reg");
              }}
              className="mt-2 text-xs font-bold text-amber-500 hover:underline uppercase tracking-wider"
            >
              Try Another Search
            </button>
          </div>
        )}

        {/* --- STATE 4: Verified Registration Sheet View --- */}
        {searched && !loading && student && (
          <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 fade-in duration-300 w-full max-w-xl">
            
            {/* Top Verified Floating Badge */}
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-green-500/15 border border-green-500/30 text-green-400 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-green-500/5 print:hidden">
              <CheckCircle2 size={14} className="animate-pulse" /> Official Record Verified
            </div>

            {/* Premium Registration Statement Sheet */}
            <div className="w-full bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col space-y-6 text-white border-white/10">
              {/* Header */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-500 shadow-inner shrink-0">
                  <ShieldCheck size={26} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black uppercase tracking-widest text-amber-500 leading-tight">
                    Bangladesh Technical
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-[2px]">
                    Education Technology
                  </p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                    Official Registration Record
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <DetailItem label="Student Name" value={student.name} className="sm:col-span-2" />
                <DetailItem label="Father's Name" value={student.fatherName} />
                <DetailItem label="Mother's Name" value={student.motherName} />
                <DetailItem label="Date of Birth" value={student.dob ? new Date(student.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"} />
                <DetailItem label="Gender (Sex)" value={student.gender} />
                <DetailItem label="Registration Number" value={student.regNumber} />
                <DetailItem label="Roll Number" value={student.roll} />
                <DetailItem label="Session" value={session || (student.month1 && student.year1 ? `${student.month1}-${student.year1}` : "—")} />
                <DetailItem label="Course Duration" value={student.duration} />
                <DetailItem label="Trade/Course Name" value={student.educationQualification} className="sm:col-span-2" />
                <DetailItem label="Institute Name" value={student.institute} className="sm:col-span-2" />
                <DetailItem label="Institute Code" value={student.studentId?.slice(0, 6)} />
                <DetailItem label="Upazilla/Thana" value={student.thana} />
                <DetailItem label="District" value={student.district} />
                <DetailItem label="Serial Number" value={student.studentId} />
              </div>

              {/* Verification Notice */}
              <div className="bg-green-500/10 border border-green-500/25 rounded-xl p-3.5 text-center">
                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest leading-relaxed">
                  ✔ This student's registration record is verified online as active. BTET Online registry system generated.
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex gap-3 w-full max-w-[200px] print:hidden">
              <button
                onClick={() => {
                  setSearched(false);
                  setStudent(null);
                  setRoll("");
                  router.push("/verify-student/reg");
                }}
                className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
              >
                Verify New
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function VerifyRegPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={40} />
      </div>
    }>
      <VerifyRegContent />
    </Suspense>
  );
}
