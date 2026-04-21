/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSemesterGrade, Mark } from "@/features/AdminDashboard/all-students/markStudent/types";

export default function ResultView({ result }: { result: any }) {
  const marks: Mark[] = result.marks ?? [];

  return (
    <div className="space-y-6 w-full font-mono">

      {/* Student Profile */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-900/40 bg-gradient-to-br from-[#0f1f5c] via-[#1a2d7a] to-[#0f172a] shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

        <div className="relative px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-2 h-8 rounded-full bg-blue-400 shrink-0" />
          <h2 className="text-base sm:text-lg font-black uppercase tracking-[0.2em] text-white">
            Student Profile
          </h2>
        </div>

  
        <div className="relative p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5">
          <Field label="Full Name" value={result.name} highlight />
          <Field label="Student ID" value={result.studentId} highlight />
          <Field label="Roll No." value={result.roll} highlight />
          <Field label="Registration" value={result.regNumber} />
          <Field label="Father's Name" value={result.fatherName} />
          <Field label="Mother's Name" value={result.motherName} />
          <Field label="Gender" value={result.gender} />
          <Field label="Date of Birth" value={result.dob ? new Date(result.dob).toLocaleDateString("en-GB") : undefined} />
          <Field label="Guardian Phone" value={result.guardianPhone} />
          <Field label="Address" value={result.studentAddress} />
          <Field label="District" value={result.district} />
          <Field label="Duration" value={result.duration} />
          <Field label="Education" value={result.educationQualification} />
          <Field label="Institute" value={result.institute} />
          <Field label="Director" value={result.directorName} />
        </div>
      </div>

      {/* No marks */}
      {marks.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-sm">
          কোনো Result পাওয়া যায়নি
        </div>
      )}

      {/* Semester Results */}
      {marks.map((mark, markIdx) => {
        const hasFailed = mark.subjects.some(s => s.grade === "F");
        const finalGrade = hasFailed ? "F" : getSemesterGrade(mark.cgpa);
        const totalWritten = mark.subjects.reduce((acc, s) => acc + (s.written || 0), 0);
        const totalPractical = mark.subjects.reduce((acc, s) => acc + (s.practical || 0), 0);
        const totalViva = mark.subjects.reduce((acc, s) => acc + (s.viva || 0), 0);
        const grandTotal = totalWritten + totalPractical + totalViva;
        const totalFullMark = mark.subjects.reduce((acc, s) => acc + (s.fullMark || 0), 0);

        return (
          <div key={mark.id} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">

            {/* Semester header */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 bg-slate-900 dark:bg-slate-950 text-white">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded-full tracking-widest shrink-0">
                  #{markIdx + 1}
                </span>
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest">
                  {mark.semesterTitle}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  CGPA: <span className="text-white">{mark.cgpa.toFixed(2)}</span>
                </span>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full border tracking-widest ${
                  finalGrade === "F" || finalGrade === "FAIL"
                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                }`}>
                  {finalGrade}
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 uppercase font-black tracking-widest text-[9px]">
                    <th className="px-3 py-2 text-left border-b border-r border-slate-200 dark:border-slate-600">Code</th>
                    <th className="px-3 py-2 text-left border-b border-r border-slate-200 dark:border-slate-600 min-w-[140px]">Subject</th>
                    <th className="px-3 py-2 border-b border-r border-slate-200 dark:border-slate-600">CR</th>
                    <th className="px-3 py-2 border-b border-r border-slate-200 dark:border-slate-600">W</th>
                    <th className="px-3 py-2 border-b border-r border-slate-200 dark:border-slate-600">P</th>
                    <th className="px-3 py-2 border-b border-r border-slate-200 dark:border-slate-600">V</th>
                    <th className="px-3 py-2 border-b border-r border-slate-200 dark:border-slate-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Total</th>
                    <th className="px-3 py-2 border-b border-r border-slate-200 dark:border-slate-600 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">F.M</th>
                    <th className="px-3 py-2 border-b border-r border-slate-200 dark:border-slate-600">GP</th>
                    <th className="px-3 py-2 border-b border-slate-200 dark:border-slate-600">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {mark.subjects.map((sub, idx) => (
                    <tr key={idx} className={`border-b border-slate-100 dark:border-slate-700 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-700/40 ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-slate-800"
                        : "bg-slate-50/30 dark:bg-slate-700/20"
                    }`}>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 font-bold text-slate-400 dark:text-slate-400">{sub.subjectCode}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-100 text-left">{sub.subjectName}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 text-center text-slate-600 dark:text-slate-300">{sub.credit}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 text-center text-slate-600 dark:text-slate-300">{sub.written}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 text-center text-slate-600 dark:text-slate-300">{sub.practical}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 text-center text-slate-600 dark:text-slate-300">{sub.viva}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 text-center font-black text-blue-700 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-900/20">{sub.totalMarks}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 text-center font-bold text-purple-700 dark:text-purple-300 bg-purple-50/40 dark:bg-purple-900/20">{sub.fullMark}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-700 text-center font-bold text-slate-700 dark:text-slate-200">{sub.gradePoint.toFixed(2)}</td>
                      <td className={`px-3 py-2 text-center font-black ${sub.grade === "F" ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                        {sub.grade}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 dark:bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest">
                    <td colSpan={3} className="px-3 py-2 text-slate-400">Semester Total</td>
                    <td className="px-3 py-2 text-center">{totalWritten}</td>
                    <td className="px-3 py-2 text-center">{totalPractical}</td>
                    <td className="px-3 py-2 text-center">{totalViva}</td>
                    <td className="px-3 py-2 text-center text-blue-300">{grandTotal}</td>
                    <td className="px-3 py-2 text-center text-purple-300">{totalFullMark}</td>
                    <td className="px-3 py-2 text-center text-slate-400">—</td>
                    <td className="px-3 py-2 text-center text-slate-400">—</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Stat pills */}
            <div className="px-4 sm:px-5 py-4 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2 sm:gap-3">
              <Pill label="Credit" value={mark.totalCredit} color="slate" />
              <Pill label="Points" value={mark.totalPoints.toFixed(2)} color="blue" />
              <Pill label="CGPA" value={mark.cgpa.toFixed(2)} color="indigo" />
              <Pill label="Full Mark" value={totalFullMark} color="purple" />
              <Pill label="Grade" value={finalGrade} color={finalGrade === "F" || finalGrade === "FAIL" ? "red" : "green"} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, value, highlight }: { label: string; value?: string | null; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-300/70">
        {label}
      </span>
      <span className={`leading-tight break-words ${highlight ? "text-white font-black text-sm sm:text-base" : "text-slate-300 font-semibold text-xs sm:text-sm"}`}>
        {value || "—"}
      </span>
    </div>
  );
}

function Pill({ label, value, color }: { label: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    slate:  "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600",
    blue:   "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
    indigo: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700",
    purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700",
    green:  "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
    red:    "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700",
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${colors[color]}`}>
      <span className="opacity-60">{label}:</span>
      <span>{value}</span>
    </div>
  );
}