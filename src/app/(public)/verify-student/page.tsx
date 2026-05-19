/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Search, ShieldCheck, CheckCircle2, AlertTriangle, ArrowLeft, Printer } from "lucide-react";
import { getResultByRollAction } from "@/features/public_assets/student-result/actions.ts";

function StudentVerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [session, setSession] = useState("");
  const [activeTab, setActiveTab] = useState<"id-card" | "reg-sheet">("id-card");
  const [urlType, setUrlType] = useState<string | null>(null);

  useEffect(() => {
    const rollFromUrl = searchParams.get("roll");
    const sessFromUrl = searchParams.get("sess");
    const typeFromUrl = searchParams.get("type");
    if (sessFromUrl) {
      setSession(sessFromUrl);
    }
    if (typeFromUrl) {
      setUrlType(typeFromUrl);
      if (typeFromUrl === "reg") {
        setActiveTab("reg-sheet");
      } else {
        setActiveTab("id-card");
      }
    } else {
      setUrlType(null);
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
    // Update the URL to include the roll number, triggering useEffect
    router.push(`/verify-student?roll=${roll.trim()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden select-none">
      
      {/* Dynamic Background Glowing Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-500" />

      {/* Main Container */}
      <div className="w-full max-w-md z-10 space-y-6">
        
        {/* Back navigation or reset if already searched */}
        {searched && (
          <button
            onClick={() => {
              setSearched(false);
              setStudent(null);
              setNotFound(false);
              setRoll("");
              router.push("/verify-student");
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors duration-200 print:hidden"
          >
            <ArrowLeft size={14} /> Search Another Student
          </button>
        )}

        {/* --- STATE 1: Search Form --- */}
        {!searched && (
          <div className="bg-slate-955 bg-opacity-70 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
                <ShieldCheck size={26} className="text-amber-500 animate-bounce" />
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1 uppercase">
                Student Verification
              </h1>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Scan QR or Enter Roll to Verify Profile
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Student Roll..."
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full bg-slate-900/80 border border-white/10 text-white placeholder:text-slate-500 px-4 py-3.5 pl-11 rounded-xl outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/30 text-center font-bold text-lg tracking-widest transition-all"
                />
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Verify Profile
              </button>
            </div>
          </div>
        )}

        {/* --- STATE 2: Loading State --- */}
        {loading && (
          <div className="bg-slate-950/70 backdrop-blur-xl border border-white/10 p-12 rounded-2xl shadow-2xl flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-200">
            <Loader2 className="animate-spin text-amber-500" size={40} />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">
              Retrieving Verified Records...
            </p>
          </div>
        )}

        {/* --- STATE 3: Not Found State --- */}
        {searched && !loading && notFound && (
          <div className="bg-slate-950/70 backdrop-blur-xl border border-red-500/20 p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 text-red-500">
              <AlertTriangle size={30} className="animate-wiggle" />
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
                router.push("/verify-student");
              }}
              className="mt-2 text-xs font-bold text-amber-500 hover:underline uppercase tracking-wider"
            >
              Try Another Search
            </button>
          </div>
        )}

        {/* --- STATE 4: Verified ID Card View (Perfect Alignment to User Screenshot!) --- */}
        {searched && !loading && student && (
          <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 fade-in duration-300 w-full max-w-xl">
            
            {/* Top Verified Floating Badge */}
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-green-500/15 border border-green-500/30 text-green-400 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-green-500/5 print:hidden">
              <CheckCircle2 size={14} className="animate-pulse" /> Official Record Verified
            </div>

            {/* Premium Tab Controller (Shown only if no specific type is scanned) */}
            {!urlType && (
              <div className="flex gap-2 p-1 bg-slate-900/80 border border-slate-800 rounded-xl shadow-lg print:hidden">
                <button
                  onClick={() => setActiveTab("id-card")}
                  className={`px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
                    activeTab === "id-card"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Student ID Card
                </button>
                <button
                  onClick={() => setActiveTab("reg-sheet")}
                  className={`px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
                    activeTab === "reg-sheet"
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/10"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Registration Details
                </button>
              </div>
            )}

            {/* CONDITIONAL RENDER BY ACTIVE TAB */}
            {activeTab === "id-card" ? (
              /* Premium Student ID Card Layout */
              <div 
                className="w-[320px] h-[510px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden shrink-0 flex flex-col font-sans text-black border border-gray-150 rounded-[4px]"
              >
                {/* Header Section */}
                <div className="text-center pt-[24px] pb-[6px] flex flex-col items-center">
                  <div className="text-[#c1121f] font-black text-[14.5px] uppercase leading-tight tracking-[0.4px]">
                    Bangladesh Technical
                  </div>
                  <div className="text-[#003049] font-bold text-[13px] uppercase tracking-[0.4px] mt-[3px]">
                    Education Technology
                  </div>
                </div>

                {/* Middle Section */}
                <div className="flex w-full items-stretch">
                  
                  {/* Vertical Red Bar */}
                  <div 
                    className="w-[44px] bg-[#e63946] text-white flex items-center justify-center font-black text-[14px] uppercase tracking-[1.6px] shrink-0"
                    style={{ 
                      writingMode: 'vertical-rl', 
                      transform: 'rotate(180deg)',
                      paddingTop: '4px',
                      paddingBottom: '4px'
                    }}
                  >
                    STUDENT ID
                  </div>

                  {/* Photo & Name Banner Content */}
                  <div className="flex-1 flex flex-col items-center bg-white">
                    
                    {/* Photo Frame */}
                    <div className="w-[140px] h-[164px] border-[1.5px] border-black overflow-hidden my-[9px] bg-slate-50 flex items-center justify-center">
                      {student.picture ? (
                        <img 
                          src={student.picture} 
                          className="w-full h-full object-cover" 
                          alt={student.name} 
                        />
                      ) : (
                        <div className="text-slate-400 text-xs font-bold uppercase select-none">No Photo</div>
                      )}
                    </div>

                    {/* Name Banner */}
                    <div className="w-full bg-[#1d3557] text-white text-center py-[10px] font-extrabold text-[16px] uppercase tracking-[0.6px] px-2 truncate">
                      {student.name || "N/A"}
                    </div>
                  </div>

                </div>

                {/* Details Section */}
                <div className="px-[30px] py-[20px] text-[13px] text-black flex flex-col gap-[8px] flex-1 justify-center leading-normal">
                  <p className="font-semibold">
                    <span className="font-black text-gray-900">Roll No: </span>
                    <span className="text-gray-800">{student.roll || "—"}</span>
                  </p>
                  <p className="font-semibold">
                    <span className="font-black text-gray-900">Reg No: </span>
                    <span className="text-gray-800">{student.regNumber || "—"}</span>
                  </p>
                  <p className="font-semibold">
                    <span className="font-black text-gray-900">Sess: </span>
                    <span className="text-gray-800">
                      {session || (student.month1 && student.year1 ? `${student.month1}-${student.year1}` : "—")}
                    </span>
                  </p>
                  <p className="font-semibold truncate">
                    <span className="font-black text-gray-900">Course: </span>
                    <span className="text-gray-800">{student.educationQualification || "—"}</span>
                  </p>
                  <p className="font-semibold">
                    <span className="font-black text-gray-900">Mobile: </span>
                    <span className="text-gray-800">{student.guardianPhone || "—"}</span>
                  </p>
                </div>

                {/* Bottom Subtle Branding Footer */}
                <div className="border-t border-slate-100 bg-slate-50/50 py-3 text-center px-4">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                    Verified Online Security ID Card
                  </p>
                </div>
              </div>
            ) : (
              /* Premium Registration Statement Sheet */
              <div className="w-full bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col space-y-6 text-white border-white/10">
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-500 shadow-inner shrink-0">
                    <ShieldCheck size={26} />
                  </div>
                  <div>
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
            )}

            {/* Print Card Button (Optional helper for printing verification) */}
            <div className="flex gap-3 w-full max-w-[340px] print:hidden">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/5 active:scale-[0.98]"
              >
                <Printer size={15} /> Print Card
              </button>
              <button
                onClick={() => {
                  setSearched(false);
                  setStudent(null);
                  setRoll("");
                  router.push("/verify-student");
                }}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
              >
                Verify New
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Global CSS Injecting Print Rules */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          /* Center the card precisely when printing */
          body > div {
            padding: 0 !important;
            min-height: auto !important;
            background: none !important;
          }
          /* Hide dynamic gradients in print */
          .bg-gradient-to-br, .bg-blue-500\\/10, .bg-red-500\\/5 {
            background: none !important;
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function DetailItem({ label, value, className = "" }: { label: string; value?: string | null; className?: string }) {
  return (
    <div className={`flex flex-col space-y-0.5 bg-slate-950/40 border border-white/5 rounded-xl p-3 ${className}`}>
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
      <span className="text-xs font-bold text-slate-100">{value || "—"}</span>
    </div>
  );
}

export default function StudentVerificationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={40} />
      </div>
    }>
      <StudentVerificationContent />
    </Suspense>
  );
}
