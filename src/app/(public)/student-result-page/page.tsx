/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import ResultView from "@/features/public_assets/student-result/ResultView";
import { getResultByRollAction } from "@/features/public_assets/student-result/actions.ts";
import Link from "next/link";

function StudentResultContent() {
  const searchParams = useSearchParams();
  const [roll, setRoll] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const rollFromUrl = searchParams.get("roll");
    if (rollFromUrl) {
      setRoll(rollFromUrl);
      handleSearchByRoll(rollFromUrl);
    }
  }, [searchParams]);

  const handleSearchByRoll = async (rollNumber: string) => {
    try {
      setLoading(true);
      setNotFound(false);
      setResult(null);
      const data = await getResultByRollAction(rollNumber);
      if (!data) {
        setNotFound(true);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error(error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!roll.trim()) return;
    handleSearchByRoll(roll.trim());
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-16 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl space-y-6">
        <div className="print:hidden border-2 border-blue-800/80 rounded-[24px] bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-10 shadow-sm transition-all duration-300">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-blue-900 dark:text-blue-400">
              Student Result
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium mt-1.5">
              Enter your student roll number to check your result
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all bg-white dark:bg-slate-800">
              <div className="pl-4 pr-2 text-gray-400 shrink-0">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Enter Student Roll Number, e.g., 750279"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-transparent text-gray-700 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-2 py-3 outline-none font-medium text-sm sm:text-base"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-linear-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-5 sm:px-7 py-3 font-semibold text-sm sm:text-base transition-all disabled:opacity-60 flex items-center gap-2 whitespace-nowrap shadow-inner border-l border-blue-800"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "Check Result"
                )}
              </button>
            </div>

            <p className="text-center text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 mt-5">
              If you encounter any problems, reach out to the admin.{" "}
              <Link
                href="#"
                className="text-blue-900 dark:text-blue-400 font-bold hover:underline transition-all"
              >
                Contact Admin
              </Link>
            </p>
          </div>
        </div>

        {notFound && (
          <div className="print:hidden text-center py-6 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl animate-in fade-in zoom-in-95 duration-200">
            <p className="text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
              ❌ No results found. Please check the roll number again.
            </p>
          </div>
        )}

        <div className="w-full mt-4">
          {result && <ResultView result={result} />}
        </div>
      </div>
    </div>
  );
}

export default function StudentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
          <Loader2 className="animate-spin text-blue-600" size={36} />
        </div>
      }
    >
      <StudentResultContent />
    </Suspense>
  );
}
