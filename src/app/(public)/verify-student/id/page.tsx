/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Search, CheckCircle2, AlertTriangle, ArrowLeft, Printer } from "lucide-react";
import { getResultByRollAction } from "@/features/public_assets/student-result/actions.ts";

function VerifyIdContent() {
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
    router.push(`/verify-student/id?roll=${roll.trim()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden select-none">
      
      {/* Dynamic Background Glowing Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-500" />

      {/* Main Container */}
      <div className="w-full max-w-[450px] flex flex-col items-center z-10 text-center">
        
        {/* --- STATE 1: Search Form --- */}
        {!searched && !loading && (
          <div className="w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 shadow-inner">
              <Search size={28} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                ID Card Verification
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
                className="w-full px-5 py-4 bg-slate-950/80 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-center font-bold tracking-widest text-lg transition-all"
              />
              <button
                onClick={handleSearch}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98]"
              >
                Verify ID Card
              </button>
            </div>
          </div>
        )}

        {/* --- STATE 2: Loading State --- */}
        {loading && (
          <div className="w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-12 shadow-2xl flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-blue-500" size={44} />
            <p className="text-slate-300 text-xs font-black uppercase tracking-widest animate-pulse">
              Verifying Security Credentials...
            </p>
          </div>
        )}

        {/* --- STATE 3: Not Found State --- */}
        {searched && !loading && notFound && (
          <div className="w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center space-y-6">
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
                router.push("/verify-student/id");
              }}
              className="mt-2 text-xs font-bold text-blue-500 hover:underline uppercase tracking-wider"
            >
              Try Another Search
            </button>
          </div>
        )}

        {/* --- STATE 4: Verified Student ID Card View --- */}
        {searched && !loading && student && (
          <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 fade-in duration-300">
            
            {/* Top Verified Floating Badge */}
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-green-500/15 border border-green-500/30 text-green-400 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-green-500/5 print:hidden">
              <CheckCircle2 size={14} className="animate-pulse" /> Official Record Verified
            </div>

            {/* Premium Student ID Card Layout */}
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

            {/* Print Card Button */}
            <div className="flex gap-3 w-full max-w-[320px] print:hidden">
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
                  router.push("/verify-student/id");
                }}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
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
          body > div {
            padding: 0 !important;
            min-height: auto !important;
            background: none !important;
          }
          .bg-gradient-to-br, .bg-blue-500\\/10, .bg-red-500\\/5 {
            background: none !important;
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function VerifyIdPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    }>
      <VerifyIdContent />
    </Suspense>
  );
}
