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
    // Responsive Padding: মোবাইলে কম, বড় স্ক্রিনে বেশি
    <div className="w-full px-2 sm:px-6 lg:px-10 py-6 md:py-10">
      
      <div className="w-full space-y-4 pb-10">

        {/* Header - Responsive Text Size */}
        <div className="text-center py-6 md:py-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black italic uppercase tracking-tight">
            Student Result
          </h1>
          <p className="text-blue-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">
            Check Result by Roll Number
          </p>
        </div>

        {/* Search Box - মোবাইলে কলাম হবে, বড় স্ক্রিনে রো (Flex) হবে */}
        <div className="bg-[#1e3a8a] p-4 sm:p-6 md:p-8 rounded-xl border-b-4 border-blue-400 w-full shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Roll Number লিখুন..."
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full sm:flex-1 bg-white/10 border border-white/20 text-white placeholder:text-blue-200 px-4 py-3 rounded-lg outline-none focus:border-white/50 font-bold text-base sm:text-lg"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading
                ? <Loader2 size={20} className="animate-spin" />
                : <Search size={20} />
              }
              <span className="inline">Search</span>
            </button>
          </div>
        </div>

        {/* Not Found State */}
        {notFound && (
          <div className="text-center py-10 transition-all animate-in fade-in zoom-in">
            <p className="text-red-500 font-black uppercase tracking-widest text-sm sm:text-base">
              ❌ No results found.
            </p>
          </div>
        )}

        {/* Result View - Full width with bottom margin for mobile spacing */}
        <div className="w-full mt-6">
          {result && <ResultView result={result} />}
        </div>
        
      </div>
    </div>
  );
}