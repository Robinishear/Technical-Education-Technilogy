/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { X, GraduationCap, Loader2 } from "lucide-react";
import { getMarksAction } from "./actions";
import { Mark, getSemesterGrade } from "./types";

interface Props {
  studentId: string;
  student: any;
  onClose: () => void;
}

export default function ViewMarks({ studentId, student, onClose }: Props) {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const data = await getMarksAction(studentId);
        setMarks(data ?? []);
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, [studentId]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl overflow-y-auto p-4">
      <div className="max-w-[98%] mx-auto space-y-8 pb-10">

        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#1e3a8a] p-4 rounded-xl shadow-2xl flex justify-between items-center border-b-4 border-blue-400">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-lg">
              <GraduationCap size={28} />
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tight">Academic Results</h2>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">
                Student: {student?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-red-500 h-11 w-11 flex items-center justify-center rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-white gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
            <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">Loading Results...</p>
          </div>
        )}

        {/* No data */}
        {!loading && marks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-white gap-3">
            <GraduationCap size={48} className="text-blue-400 opacity-50" />
            <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">কোনো Result পাওয়া যায়নি</p>
          </div>
        )}

        {/* Marks */}
        {!loading && marks.map((mark) => {
          const hasFailed = mark.subjects.some((s) => s.grade === "F");
          const finalGrade = hasFailed ? "FAIL" : getSemesterGrade(mark.cgpa);

          return (
            <div key={mark.id} className="bg-white shadow-2xl border-2 border-zinc-300 rounded-sm overflow-hidden">

              {/* Semester Title */}
              <div className="bg-[#1e3a8a] text-white px-6 py-4">
                <h3 className="text-2xl font-black italic tracking-wider uppercase">
                  {mark.semesterTitle}
                </h3>
              </div>

              {/* Table */}
              <div className="overflow-x-auto p-4 bg-white">
                <table className="w-full border-collapse border-2 border-zinc-800 text-center text-[11px]">
                  <thead className="bg-[#4a90e2] text-white uppercase">
                    <tr className="divide-x divide-zinc-800">
                      <th className="p-2 border-b-2 border-zinc-800">Code</th>
                      <th className="p-2 border-b-2 border-zinc-800 min-w-50">Subject Name</th>
                      <th className="p-2 border-b-2 border-zinc-800">Credit</th>
                      <th className="p-2 border-b-2 border-zinc-800">Written</th>
                      <th className="p-2 border-b-2 border-zinc-800">Practical</th>
                      <th className="p-2 border-b-2 border-zinc-800">Viva</th>
                      <th className="p-2 border-b-2 border-zinc-800 bg-blue-700 italic">Total</th>
                      <th className="p-2 border-b-2 border-zinc-800">GP</th>
                      <th className="p-2 border-b-2 border-zinc-800">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mark.subjects.map((sub, idx) => (
                      <tr
                        key={idx}
                        className="divide-x divide-zinc-400 border-b border-zinc-300 hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="p-2 font-bold">{sub.subjectCode}</td>
                        <td className="p-2 text-left">{sub.subjectName}</td>
                        <td className="p-2">{sub.credit}</td>
                        <td className="p-2">{sub.written}</td>
                        <td className="p-2">{sub.practical}</td>
                        <td className="p-2">{sub.viva}</td>
                        <td className="p-2 bg-blue-50 font-bold text-blue-900">{sub.totalMarks}</td>
                        <td className="p-2 font-semibold">{sub.gradePoint.toFixed(2)}</td>
                        <td className={`p-2 font-black ${sub.grade === "F" ? "text-red-600" : "text-blue-800"}`}>
                          {sub.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="p-6 bg-zinc-100 flex flex-wrap justify-center gap-6 border-t border-zinc-300">
                <StatBox label="Total Credit" value={mark.totalCredit} color="bg-[#1e3a8a]" />
                <StatBox label="Total Point" value={mark.totalPoints.toFixed(2)} color="bg-[#4a90e2]" />
                <StatBox label="Semester CGPA" value={mark.cgpa.toFixed(2)} color="bg-[#1e3a8a]" />
                <StatBox
                  label="Semester Grade"
                  value={finalGrade}
                  color={finalGrade === "FAIL" ? "bg-red-600" : "bg-emerald-600"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex items-stretch border-2 border-zinc-800 shadow-md hover:-translate-y-1 transition-all duration-200 rounded-sm overflow-hidden">
      <div className={`${color} text-white px-4 py-2 text-[10px] font-bold flex items-center flex-1 uppercase italic tracking-tighter leading-tight`}>
        {label}
      </div>
      <div className="w-24 bg-white text-black flex items-center justify-center font-black text-xl border-l-2 border-zinc-800">
        {value}
      </div>
    </div>
  );
}