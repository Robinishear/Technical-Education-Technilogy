"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, RotateCcw, Trophy } from "lucide-react";
import { giveRetryAction } from "../exam.actions";
import { ExamResult, Props } from "../types";

const ExamResultList = ({ results }: Props) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [data, setData] = useState<ExamResult[]>(results);

  const handleRetry = async (studentId: string) => {
    setLoadingId(studentId);
    const res = await giveRetryAction(studentId);
    setLoadingId(null);

    if (res.success) {
      toast.success("Retry দেওয়া হয়েছে!");
      setData((prev) =>
        prev.map((r) =>
          r.student.id === studentId ? { ...r, canRetry: true } : r,
        ),
      );
    } else {
      toast.error(res.message || "Failed!");
    }
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Trophy size={40} className="text-stone-300" />
        <p className="text-stone-400 text-sm">কোনো result নেই</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-stone-50">
          <tr className="text-left">
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">
              #
            </th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">
              Student
            </th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">
              Roll
            </th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">
              Score
            </th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">
              Percentage
            </th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">
              Date
            </th>
            <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-black text-stone-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {data.map((result, index) => (
            <tr key={result.id} className="hover:bg-stone-50 transition-colors">
              <td className="px-6 py-4 text-stone-400 text-xs font-mono">
                {index + 1}
              </td>
              <td className="px-6 py-4">
                <p className="font-bold text-stone-800 text-sm">
                  {result.student.name}
                </p>
                <p className="text-[11px] text-stone-400">
                  {result.student.email}
                </p>
              </td>
              <td className="px-6 py-4 text-amber-600 font-bold text-xs font-mono">
                {result.student.roll}
              </td>
              <td className="px-6 py-4">
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                  {result.score}/{result.totalMarks}
                </span>
              </td>
              <td className="px-6 py-4 text-stone-600 text-xs font-bold">
                {((result.score / result.totalMarks) * 100).toFixed(1)}%
              </td>
              <td className="px-6 py-4 text-stone-400 text-xs">
                {new Date(result.createdAt).toLocaleDateString("bn-BD")}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleRetry(result.student.id)}
                    disabled={loadingId === result.student.id}
                    className="h-8 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center justify-center gap-1.5 transition-colors text-amber-600 text-[10px] font-bold uppercase disabled:opacity-50"
                  >
                    {loadingId === result.student.id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <RotateCcw size={12} />
                    )}
                    Retry
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamResultList;
