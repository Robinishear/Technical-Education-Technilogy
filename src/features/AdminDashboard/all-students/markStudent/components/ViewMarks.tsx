/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { X, GraduationCap, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { calculateGrade, getSemesterGrade, Mark } from "../types/markStudent.types";
import { deleteMarkAction, getMarksAction, updateMarkAction } from "../actions/markStudent.actions";
import { Props } from "../types/markStudent.types";


export default function ViewMarks({ studentId, student, onClose }: Props) {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMarkId, setActiveMarkId] = useState<string | null>(null);
  const [editingMarkId, setEditingMarkId] = useState<string | null>(null);
  const [editSubjects, setEditSubjects] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMarks();
  }, [studentId]);

  const fetchMarks = async () => {
    try {
      setLoading(true);
      const data = await getMarksAction(studentId);
      setMarks(data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (markId: string) => {
    if (!confirm("Think about whether you seriously want to delete this.?")) return;
    try {
      setDeletingId(markId);
      await deleteMarkAction(markId);
      setMarks(prev => prev.filter(m => m.id !== markId));
      setActiveMarkId(null);
      toast.success("Deleted successfully!");
    } catch {
      toast.error("Delete failed!");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditStart = (mark: Mark) => {
    setEditingMarkId(mark.id);
    setEditSubjects(
      mark.subjects.map(s => ({
        code: s.subjectCode,
        name: s.subjectName,
        credit: s.credit,
        w: s.written,
        p: s.practical,
        v: s.viva,
        marks: s.totalMarks,
        gp: s.gradePoint,
        cgp: s.credit * s.gradePoint,
        grade: s.grade,
        fullMark: s.fullMark,
      }))
    );
  };

  const handleSubjectChange = (idx: number, field: string, value: string) => {
    setEditSubjects(prev =>
      prev.map((sub, i) => {
        if (i !== idx) return sub;
        const updated = { ...sub, [field]: value };
        const written = Number(updated.w) || 0;
        const practical = Number(updated.p) || 0;
        const viva = Number(updated.v) || 0;
        const credit = Number(updated.credit) || 0;
        updated.marks = written + practical + viva;
        const { gp, grade } = calculateGrade(updated.marks);
        updated.gp = gp;
        updated.grade = grade;
        updated.cgp = parseFloat((credit * gp).toFixed(2));
        return updated;
      })
    );
  };

  const handleSaveUpdate = async (mark: Mark) => {
    try {
      setSavingId(mark.id);
      const totalCredit = editSubjects.reduce((acc, s) => acc + (Number(s.credit) || 0), 0);
      const totalPoints = editSubjects.reduce((acc, s) => acc + (Number(s.cgp) || 0), 0);
      const cgpa = totalCredit > 0 ? parseFloat((totalPoints / totalCredit).toFixed(2)) : 0;
      const hasFailed = editSubjects.some(s => s.grade === "F");

      const payload = {
        semesterTitle: mark.semesterTitle,
        totalCredit,
        totalPoints: parseFloat(totalPoints.toFixed(2)),
        cgpa,
        grade: hasFailed ? "FAIL" : mark.grade,
        status: hasFailed ? "Referred" : "Passed",
        subjects: editSubjects.map(s => ({
          subjectCode: String(s.code),
          subjectName: s.name || "N/A",
          credit: Number(s.credit) || 0,
          written: Number(s.w) || 0,
          practical: Number(s.p) || 0,
          viva: Number(s.v) || 0,
          totalMarks: Number(s.marks) || 0,
          gradePoint: Number(s.gp) || 0,
          grade: s.grade || "N/A",
          fullMark: Number(s.fullMark) || 0,
        })),
      };

      await updateMarkAction(mark.id, payload);
      toast.success("Updated successfully!");
      setEditingMarkId(null);
      setActiveMarkId(null);
      await fetchMarks();
    } catch {
      toast.error("Update failed!");
    } finally {
      setSavingId(null);
    }
  };

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
          const isEditing = editingMarkId === mark.id;
          const currentSubjects = isEditing ? editSubjects : mark.subjects.map(s => ({
            code: s.subjectCode,
            name: s.subjectName,
            credit: s.credit,
            w: s.written,
            p: s.practical,
            v: s.viva,
            marks: s.totalMarks,
            gp: s.gradePoint,
            cgp: s.credit * s.gradePoint,
            grade: s.grade,
            fullMark: s.fullMark,
          }));

          const hasFailed = currentSubjects.some((s: any) => s.grade === "F");
          const finalGrade = hasFailed ? "FAIL" : getSemesterGrade(mark.cgpa);
          const totalWritten = currentSubjects.reduce((acc: number, s: any) => acc + (Number(s.w) || 0), 0);
          const totalPractical = currentSubjects.reduce((acc: number, s: any) => acc + (Number(s.p) || 0), 0);
          const totalViva = currentSubjects.reduce((acc: number, s: any) => acc + (Number(s.v) || 0), 0);
          const grandTotal = totalWritten + totalPractical + totalViva;
          const totalFullMark = currentSubjects.reduce((acc: number, s: any) => acc + (Number(s.fullMark) || 0), 0);

          return (
            <div key={mark.id} className="bg-white shadow-2xl border-2 border-zinc-300 rounded-sm overflow-hidden">

              {/* Semester Title + Manage Button */}
              <div className="bg-[#1e3a8a] text-white px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-black italic tracking-wider uppercase">
                  {mark.semesterTitle}
                </h3>
                <button
                  onClick={() => {
                    setActiveMarkId(activeMarkId === mark.id ? null : mark.id);
                    setEditingMarkId(null);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border border-white/20"
                >
                  {activeMarkId === mark.id ? "Close" : "Manage"}
                </button>
              </div>

              {/* Manage Panel */}
              {activeMarkId === mark.id && (
                <div className="bg-zinc-50 border-b-2 border-zinc-300 px-6 py-4 flex gap-3">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => handleEditStart(mark)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Update Semester
                      </button>
                      <button
                        onClick={() => handleDelete(mark.id)}
                        disabled={deletingId === mark.id}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {deletingId === mark.id && <Loader2 size={14} className="animate-spin" />}
                        Delete Semester
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSaveUpdate(mark)}
                        disabled={savingId === mark.id}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {savingId === mark.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Save Update
                      </button>
                      <button
                        onClick={() => setEditingMarkId(null)}
                        className="bg-zinc-400 hover:bg-zinc-500 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              )}

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
                      <th className="p-2 border-b-2 border-zinc-800 bg-purple-700 italic">Full Mark</th>
                      <th className="p-2 border-b-2 border-zinc-800">GP</th>
                      <th className="p-2 border-b-2 border-zinc-800">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubjects.map((sub: any, idx: number) => (
                      <tr key={idx} className="divide-x divide-zinc-400 border-b border-zinc-300 hover:bg-blue-50/30 transition-colors">
                        <td className="p-0">
                          {isEditing
                            ? <input type="text" className="w-full h-10 text-center outline-none bg-transparent font-bold" value={sub.code} onChange={(e) => handleSubjectChange(idx, 'code', e.target.value)} />
                            : <span className="block p-2 font-bold">{sub.code}</span>
                          }
                        </td>
                        <td className="p-0">
                          {isEditing
                            ? <input type="text" className="w-full h-10 px-2 outline-none text-left bg-transparent" value={sub.name} onChange={(e) => handleSubjectChange(idx, 'name', e.target.value)} />
                            : <span className="block p-2 text-left">{sub.name}</span>
                          }
                        </td>
                        <td className="p-0">
                          {isEditing
                            ? <input type="number" className="w-full h-10 text-center outline-none bg-transparent" value={sub.credit || ""} onChange={(e) => handleSubjectChange(idx, 'credit', e.target.value)} />
                            : <span className="block p-2">{sub.credit}</span>
                          }
                        </td>
                        <td className="p-0">
                          {isEditing
                            ? <input type="number" className="w-full h-10 text-center outline-none bg-transparent" value={sub.w || ""} onChange={(e) => handleSubjectChange(idx, 'w', e.target.value)} />
                            : <span className="block p-2">{sub.w}</span>
                          }
                        </td>
                        <td className="p-0">
                          {isEditing
                            ? <input type="number" className="w-full h-10 text-center outline-none bg-transparent" value={sub.p || ""} onChange={(e) => handleSubjectChange(idx, 'p', e.target.value)} />
                            : <span className="block p-2">{sub.p}</span>
                          }
                        </td>
                        <td className="p-0">
                          {isEditing
                            ? <input type="number" className="w-full h-10 text-center outline-none bg-transparent" value={sub.v || ""} onChange={(e) => handleSubjectChange(idx, 'v', e.target.value)} />
                            : <span className="block p-2">{sub.v}</span>
                          }
                        </td>
                        <td className="p-2 bg-blue-50 font-bold text-blue-900">{sub.marks}</td>
                        <td className="p-0">
                          {isEditing
                            ? <input type="number" className="w-full h-10 text-center outline-none bg-purple-50 font-bold text-purple-900" value={sub.fullMark || ""} onChange={(e) => handleSubjectChange(idx, 'fullMark', e.target.value)} />
                            : <span className="block p-2 bg-purple-50 font-bold text-purple-900">{sub.fullMark}</span>
                          }
                        </td>
                        <td className="p-2 font-semibold">{Number(sub.gp).toFixed(2)}</td>
                        <td className={`p-2 font-black ${sub.grade === "F" ? "text-red-600" : "text-blue-800"}`}>
                          {sub.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-zinc-100 border-t-2 border-zinc-800 font-black text-[11px]">
                      <td colSpan={3} className="p-2 text-right font-black uppercase text-zinc-700">Total</td>
                      <td className="p-2 bg-zinc-200 font-black text-zinc-800">{totalWritten}</td>
                      <td className="p-2 bg-zinc-200 font-black text-zinc-800">{totalPractical}</td>
                      <td className="p-2 bg-zinc-200 font-black text-zinc-800">{totalViva}</td>
                      <td className="p-2 bg-blue-100 font-black text-blue-900">{grandTotal}</td>
                      <td className="p-2 bg-purple-100 font-black text-purple-900">{totalFullMark}</td>
                      <td className="p-2"></td>
                      <td className="p-2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Summary */}
              <div className="p-6 bg-zinc-100 flex flex-wrap justify-center gap-6 border-t border-zinc-300">
                <StatBox label="Total Credit" value={mark.totalCredit} color="bg-[#1e3a8a]" />
                <StatBox label="Total Point" value={mark.totalPoints.toFixed(2)} color="bg-[#4a90e2]" />
                <StatBox label="Semester CGPA" value={mark.cgpa.toFixed(2)} color="bg-[#1e3a8a]" />
                <StatBox label="Total F.M" value={totalFullMark} color="bg-purple-700" />
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