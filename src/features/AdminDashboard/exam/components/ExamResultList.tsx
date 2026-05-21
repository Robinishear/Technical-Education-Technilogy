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
  User,
  Calendar,
  Percent,
  CheckSquare,
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
      toast.success("🔄 Retry এক্সেস দেওয়া হয়েছে!");
      setData((prev) =>
        prev.map((r) =>
          r.student.id === studentId ? { ...r, canRetry: true } : r,
        ),
      );
    } else {
      toast.error(res.message || "❌ ব্যর্থ হয়েছে!");
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl shadow-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-all duration-300">
      {/* 🔍 Search Bar Header Box */}
      <div className="p-5 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500"
          />
          <input
            type="text"
            placeholder="ছাত্রের নাম বা Roll দিয়ে খোঁজো..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-2xl text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-600"
          />
        </div>
        <div className="text-xs font-black text-stone-400 dark:text-stone-500 bg-stone-50 dark:bg-stone-950/40 px-3 py-1.5 rounded-xl border border-stone-200/50 dark:border-stone-800 self-start sm:self-center">
          🎯 ফিল্টারড ডাটা: {filteredData.length} টি
        </div>
      </div>

      {/* 📭 Empty State View */}
      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white dark:bg-stone-900">
          <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-full border border-stone-100 dark:border-stone-800/60 text-stone-300 dark:text-stone-700 animate-pulse">
            <Trophy size={48} />
          </div>
          <p className="text-stone-500 dark:text-stone-400 font-bold text-sm">
            কোনো রেজাল্ট খুঁজে পাওয়া যায়নি 🔍
          </p>
        </div>
      ) : (
        <>
          {/* 📊 Fully Responsive Table Container Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-stone-50 dark:bg-stone-950/60 border-b border-stone-100 dark:border-stone-800/80">
                <tr className="text-left whitespace-nowrap">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-black text-stone-400 dark:text-stone-500 w-12">
                    #
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-black text-stone-400 dark:text-stone-500">
                    <span className="flex items-center gap-1">
                      <User size={12} /> Student
                    </span>
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-black text-stone-400 dark:text-stone-500">
                    Roll
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-black text-stone-400 dark:text-stone-500">
                    <span className="flex items-center gap-1">
                      <CheckSquare size={12} /> Score
                    </span>
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-black text-stone-400 dark:text-stone-500">
                    <span className="flex items-center gap-1">
                      <Percent size={12} /> Percentage
                    </span>
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-wider font-black text-stone-400 dark:text-stone-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> Date
                    </span>
                  </th>
                  <th className="px-6 py-4 text-right text-[10px] uppercase tracking-wider font-black text-stone-400 dark:text-stone-500 pr-8">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/50">
                {paginatedData.map((result, index) => {
                  const finalPercentage =
                    (result.score / result.totalMarks) * 100;
                  return (
                    <tr
                      key={result.id}
                      className="hover:bg-stone-50/60 dark:hover:bg-stone-950/30 transition-colors whitespace-nowrap group"
                    >
                      {/* # Index Counter */}
                      <td className="px-6 py-4.5 text-stone-400 dark:text-stone-600 text-xs font-mono">
                        {String(
                          (currentPage - 1) * itemsPerPage + index + 1,
                        ).padStart(2, "0")}
                      </td>

                      {/* Student Details */}
                      <td className="px-6 py-4.5">
                        <p className="font-bold text-stone-800 dark:text-stone-200 text-sm group-hover:text-amber-500 transition-colors">
                          {result.student.name}
                        </p>
                        <p className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                          {result.student.email}
                        </p>
                      </td>

                      {/* Roll Code */}
                      <td className="px-6 py-4.5 text-amber-600 dark:text-amber-400 font-black text-xs font-mono">
                        #{result.student.roll}
                      </td>

                      {/* Marks Score Badge */}
                      <td className="px-6 py-4.5">
                        <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                          {result.score} / {result.totalMarks}
                        </span>
                      </td>

                      {/* Percentage Counter */}
                      <td className="px-6 py-4.5 text-stone-700 dark:text-stone-300 text-xs font-black">
                        {finalPercentage.toFixed(1)}%
                      </td>

                      {/* Creation Date String */}
                      <td className="px-6 py-4.5 text-stone-400 dark:text-stone-500 text-xs">
                        {new Date(result.createdAt).toLocaleDateString("bn-BD")}
                      </td>

                      {/* Admin Controls Action Area */}
                      <td className="px-6 py-4.5 pr-8">
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleRetry(result.student.id)}
                            disabled={
                              loadingId === result.student.id || result.canRetry
                            }
                            className={`h-8 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all text-[10px] font-black uppercase shadow-sm active:scale-[0.98] ${
                              result.canRetry
                                ? "bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-600 border-stone-200 dark:border-stone-700 opacity-60 pointer-events-none"
                                : "bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border-amber-200/60 dark:border-amber-900/40 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {loadingId === result.student.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <RotateCcw
                                size={12}
                                className={
                                  result.canRetry
                                    ? ""
                                    : "group-hover:rotate-180 transition-transform duration-500"
                                }
                              />
                            )}
                            <span>
                              {result.canRetry ? "Allowed" : "Give Retry"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 🛠️ Modern Pagination Controls Box */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-5 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 gap-4">
            <p className="text-xs text-stone-400 dark:text-stone-500 font-bold">
              Page{" "}
              <span className="text-stone-700 dark:text-stone-300">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="text-stone-700 dark:text-stone-300">
                {totalPages}
              </span>
            </p>

            <div className="flex items-center gap-1.5">
              {/* Previous Trigger */}
              <button
                className="h-9 w-9 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 transition-all active:scale-95 shadow-sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dynamic Pages Array Map */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`h-9 w-9 rounded-xl text-xs font-black border transition-all active:scale-95 shadow-sm ${
                      currentPage === page
                        ? "bg-amber-500 text-white border-amber-500 shadow-amber-500/10"
                        : "bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {String(page).padStart(2, "0")}
                  </button>
                ),
              )}

              {/* Next Trigger */}
              <button
                className="h-9 w-9 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 transition-all active:scale-95 shadow-sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExamResultList;
