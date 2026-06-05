/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, AlertTriangle, Search } from "lucide-react";
import { getResultByRollAction } from "@/features/public_assets/student-result/actions.ts";

function VerifyRedirectContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reg = searchParams.get("reg") || "";
  
  const [loading, setLoading] = useState(true);
  const [manualRoll, setManualRoll] = useState("");

  useEffect(() => {
    const tryLookup = async () => {
      if (!reg) {
        setLoading(false);
        return;
      }
      try {
        const data = (await getResultByRollAction(reg)) as any;
        if (data && data.roll) {
          router.replace(`/verify-student/certificate?roll=${data.roll}`);
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    };
    tryLookup();
  }, [reg, router]);

  const handleManualSearch = async () => {
    if (!manualRoll.trim()) return;
    setLoading(true);
    try {
      const data = (await getResultByRollAction(manualRoll.trim())) as any;
      if (data && data.roll) {
        router.replace(`/verify-student/certificate?roll=${data.roll}`);
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
        <Loader2 className="animate-spin text-blue-600" size={44} />
        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
          Looking up Certificate Record...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-amber-50 dark:bg-amber-950/30 rounded-full flex items-center justify-center border-2 border-amber-200 dark:border-amber-900/50 shadow-inner">
        <AlertTriangle size={32} className="text-amber-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Certificate Verification
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          We couldn&apos;t automatically verify the certificate with Registration Number: <strong>{reg || "None"}</strong>.
        </p>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl space-y-4 text-left border border-slate-200 dark:border-slate-800">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Enter Student Roll Number to Verify
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Roll Number"
            value={manualRoll}
            onChange={(e) => setManualRoll(e.target.value)}
            className="flex-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 outline-none text-sm focus:border-blue-500"
          />
          <button
            onClick={handleManualSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
          >
            <Search size={16} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyRedirectPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-16 px-4">
      <Suspense fallback={<Loader2 className="animate-spin text-blue-600" size={44} />}>
        <VerifyRedirectContent />
      </Suspense>
    </div>
  );
}
