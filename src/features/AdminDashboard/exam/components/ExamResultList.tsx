"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  RotateCcw,
  Trophy,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { giveRetryAction } from "../exam.actions";
import { ExamResult, Props } from "../types";

const ExamResultList = ({ results }: Props) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [data, setData] = useState<ExamResult[]>(results);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(
    (r) =>
      r.student.name.toLowerCase().includes(search.toLowerCase()) ||
      r.student.roll.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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

  return (
    <div className="overflow-hidden rounded-xl shadow-sm border border-stone-200">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-stone-100">
        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="নাম বা Roll দিয়ে খোঁজো..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-4 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white">
          <Trophy size={40} className="text-stone-300" />
          <p className="text-stone-400 text-sm">কোনো result নেই</p>
        </div>
      ) : (
        <>
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
              {paginatedData.map((result, index) => (
                <tr
                  key={result.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-6 py-4 text-stone-400 text-xs font-mono">
                    {(currentPage - 1) * itemsPerPage + index + 1}
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

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 bg-white border-t border-stone-100">
            <p className="text-xs text-stone-400 font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-1.5">
              <button
                className="h-8 w-8 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:bg-stone-50 disabled:opacity-40 transition-colors"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`h-8 w-8 rounded-lg text-xs font-bold border transition-colors ${
                      currentPage === page
                        ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                        : "bg-white text-stone-500 border-stone-200 hover:bg-stone-50"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                className="h-8 w-8 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:bg-stone-50 disabled:opacity-40 transition-colors"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExamResultList;
