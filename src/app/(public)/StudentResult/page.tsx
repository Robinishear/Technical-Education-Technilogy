/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { getResultByRollAction } from "@/features/public_assets/student-result/actions.ts";
import ResultView from "@/features/public_assets/student-result/ResultView";

export default function StudentResultPage() {
  const [roll, setRoll] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!roll.trim()) return;
    try {
      setLoading(true);
      setNotFound(false);
      setResult(null);
      const data = await getResultByRollAction(roll.trim());
      if (!data) {
        setNotFound(true);
      } else {
        setResult(data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-2 sm:px-6 lg:px-10 py-6 md:py-10 min-h-screen transition-colors duration-300">
      <div className="w-full space-y-4 pb-10">

        {/* 🎨 Header Section */}
        <div className="text-center py-6 md:py-10 print:hidden">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white">
            Student Result
          </h1>
          <p className="text-blue-500 dark:text-blue-400 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">
            Check Result by Roll Number 🔍
          </p>
        </div>

        {/* 🔍 Search Box (Light/Dark Mode Support) */}
        <div className="print:hidden bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-xl w-full shadow-sm dark:shadow-blue-900/10 border border-slate-200 dark:border-slate-800 transition-all">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Roll Number লিখুন..."
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full sm:flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 py-3 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-bold text-base sm:text-lg transition-all"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading
                ? <Loader2 size={20} className="animate-spin" />
                : <Search size={20} />
              }
              <span className="inline">Search</span>
            </button>
          </div>
        </div>

        {/* ❌ Not Found Alert */}
        {notFound && (
          <div className="print:hidden text-center py-10 animate-in fade-in zoom-in">
            <p className="text-red-500 dark:text-red-400 font-black uppercase tracking-widest text-sm sm:text-base">
              ❌ No results found.
            </p>
          </div>
        )}

        {/* 📄 Result Component */}
        <div className="w-full mt-6">
          {result && <ResultView result={result} />}
        </div>

      </div>
    </div>
  );
}