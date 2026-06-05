/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2 } from "lucide-react";
import { SemesterFormProps } from "../types/markStudent.types";

export default function SemesterForm({
  sem,
  semIdx,
  summary,
  onTitleChange,
  onSubjectChange,
  onRemove,
}: SemesterFormProps) {
  return (
    <div className="bg-white shadow-2xl border-2 border-zinc-300 rounded-sm overflow-hidden mb-10 transition-all">
      <div className="bg-[#1e3a8a] text-white flex justify-between items-center px-6 py-4">
        <input
          className="bg-transparent border-b border-white/30 text-2xl font-black italic tracking-wider uppercase outline-none focus:border-white w-full max-w-lg"
          value={sem.title}
          onChange={(e) => onTitleChange(semIdx, e.target.value)}
        />
        {semIdx > 0 && (
          <button
            onClick={() => onRemove(sem.id)}
            className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Trash2 size={16} /> Delete Page
          </button>
        )}
      </div>

      <div className="overflow-x-auto p-4 bg-white">
        <table className="w-full border-collapse border-2 border-zinc-800 text-center text-[11px]" style={{ tableLayout: "fixed" }}>
          <thead className="bg-[#4a90e2] text-white uppercase">
            <tr className="divide-x divide-zinc-800">
              <th className="p-2 border-b-2 border-zinc-800" style={{ width: "6%" }}>Code</th>
              <th className="p-2 border-b-2 border-zinc-800" style={{ width: "23%" }}>Subject Name</th>
              <th className="p-2 border-b-2 border-zinc-800" style={{ width: "5%" }}>Credit</th>
              <th className="p-2 border-b-2 border-zinc-800" style={{ width: "5%" }}>Written</th>
              <th className="p-2 border-b-2 border-zinc-800" style={{ width: "5%" }}>Practical</th>
              <th className="p-2 border-b-2 border-zinc-800" style={{ width: "5%" }}>Viva</th>
              <th className="p-2 border-b-2 border-zinc-800 bg-blue-700 italic" style={{ width: "5%" }}>Total</th>
              <th className="p-2 border-b-2 border-zinc-800 bg-purple-700 italic" style={{ width: "6%" }}>Full Mark</th>
              <th className="p-2 border-b-2 border-zinc-800" style={{ width: "5%" }}>CGPA</th>
              <th className="p-2 border-b-2 border-zinc-800" style={{ width: "5%" }}>Grade</th>
              <th className="p-2 border-b-2 border-zinc-800 bg-zinc-800 text-[9px]" style={{ width: "6%" }}>Written(T)</th>
              <th className="p-2 border-b-2 border-zinc-800 bg-zinc-800 text-[9px]" style={{ width: "6%" }}>Practical(T)</th>
              <th className="p-2 border-b-2 border-zinc-800 bg-zinc-800 text-[9px]" style={{ width: "6%" }}>Viva(T)</th>
              <th className="p-2 border-b-2 border-zinc-800 bg-blue-900 italic text-xs" style={{ width: "8%" }}>Grand Total</th>
              <th className="p-2 border-b-2 border-zinc-800 bg-purple-900 italic text-xs" style={{ width: "8%" }}>Total F.M</th>
            </tr>
          </thead>
          <tbody>
            {sem.subjects.map((sub: any, idx: number) => (
              <tr key={idx} className="divide-x divide-zinc-400 border-b border-zinc-300 hover:bg-blue-50/30 transition-colors">
                <td className="p-0"><input type="text" className="w-full h-7 text-center outline-none bg-transparent font-bold text-xs" placeholder="Code" value={sub.code} onChange={(e) => onSubjectChange(sem.id, idx, 'code', e.target.value)} /></td>
                <td className="p-0"><input type="text" className="w-full h-7 px-2 outline-none text-left bg-transparent text-xs" placeholder="Enter Subject Name" value={sub.name} onChange={(e) => onSubjectChange(sem.id, idx, 'name', e.target.value)} /></td>
                <td className="p-0"><input type="number" className="w-full h-7 text-center outline-none bg-transparent text-xs" value={sub.credit || ""} onChange={(e) => onSubjectChange(sem.id, idx, 'credit', e.target.value)} /></td>
                <td className="p-0"><input type="number" className="w-full h-7 text-center outline-none bg-transparent text-xs" value={sub.w || ""} onChange={(e) => onSubjectChange(sem.id, idx, 'w', e.target.value)} /></td>
                <td className="p-0"><input type="number" className="w-full h-7 text-center outline-none bg-transparent text-xs" value={sub.p || ""} onChange={(e) => onSubjectChange(sem.id, idx, 'p', e.target.value)} /></td>
                <td className="p-0"><input type="number" className="w-full h-7 text-center outline-none bg-transparent text-xs" value={sub.v || ""} onChange={(e) => onSubjectChange(sem.id, idx, 'v', e.target.value)} /></td>

                {/* Total — auto */}
                <td className="p-0 bg-blue-50 font-bold text-blue-900 text-xs">{sub.marks}</td>

                {/* ✅ Full Mark — manually input */}
                <td className="p-0">
                  <input
                    type="number"
                    className="w-full h-7 text-center outline-none bg-purple-50 font-bold text-purple-900 text-xs"
                    value={sub.fullMark || ""}
                    onChange={(e) => onSubjectChange(sem.id, idx, 'fullMark', e.target.value)}
                  />
                </td>

                <td className="p-0 font-semibold text-xs">{sub.gp.toFixed(2)}</td>
                <td className={`p-0 font-black text-xs ${sub.grade === 'F' ? 'text-red-600' : 'text-blue-800'}`}>{sub.grade}</td>

                {idx === 0 && (
                  <>
                    <td rowSpan={8} className="bg-zinc-50 border-l border-zinc-800 font-bold text-zinc-700 text-xs">{summary.totalWritten}</td>
                    <td rowSpan={8} className="bg-zinc-50 border-l border-zinc-800 font-bold text-zinc-700 text-xs">{summary.totalPractical}</td>
                    <td rowSpan={8} className="bg-zinc-50 border-l border-zinc-800 font-bold text-zinc-700 text-xs">{summary.totalViva}</td>
                    <td rowSpan={8} className="bg-blue-100 border-l border-zinc-800 text-xl font-black text-blue-900 shadow-inner">{summary.totalMarks}</td>
                    {/* ✅ Total Full Mark — auto */}
                    <td rowSpan={8} className="bg-purple-100 border-l border-zinc-800 text-xl font-black text-purple-900 shadow-inner">{summary.totalFullMark}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-zinc-100 flex flex-wrap justify-center gap-6 border-t border-zinc-300">
        <StatBox label="Total Credit" value={summary.totalCredit} color="bg-[#1e3a8a]" />
        <StatBox label="Total Point" value={summary.totalPoints} color="bg-[#4a90e2]" />
        <StatBox label="Semester CGPA" value={summary.cgpa} color="bg-[#1e3a8a]" />
        <StatBox label="Semester Grade" value={summary.finalGrade} color={summary.finalGrade === "FAIL" ? "bg-red-600" : "bg-emerald-600"} />
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex items-stretch border-2 border-zinc-800 shadow-md transform hover:-translate-y-1 transition-all duration-200 rounded-sm overflow-hidden">
      <div className={`${color} text-white px-4 py-2 text-[10px] font-bold flex items-center flex-1 uppercase italic tracking-tighter leading-tight`}>{label}</div>
      <div className="w-24 bg-white text-black flex items-center justify-center font-black text-xl border-l-2 border-zinc-800">{value}</div>
    </div>
  );
}