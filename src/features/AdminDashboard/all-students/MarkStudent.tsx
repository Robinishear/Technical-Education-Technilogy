/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { X, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { adminAddMarksAction } from "./-actions"; 

interface MarkStudentProps {
  student: any;
  onClose: () => void;
  onUpdated?: (updated: any) => void; // Parent থেকে আসা আপডেট ফাংশন
}

const getGradeFromCGPA = (cgpa: string) => {
  const num = Number(cgpa);
  if (isNaN(num) || num <= 0 || cgpa === "") return "";
  if (num >= 4.0) return "A+";
  if (num >= 3.75) return "A";
  if (num >= 3.5) return "A-";
  if (num >= 3.25) return "B+";
  if (num >= 3.0) return "B";
  if (num >= 2.75) return "B-";
  if (num >= 2.5) return "C+";
  if (num >= 2.25) return "C";
  if (num >= 2.0) return "D";
  return "F";
};

export default function MarkStudent({ student, onClose, onUpdated }: MarkStudentProps) {
  const [isSaving, setIsSaving] = useState(false);

  const [subjectEntry, setSubjectEntry] = useState({ names: "", semester: "1st" });
  const [tempSubjects, setTempSubjects] = useState<any[]>(student?.subjects || []);

  const [academicRecords, setAcademicRecords] = useState(
    ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"].map((sem) => {
      const existing = student?.academicRecords?.find((r: any) => r.semester === sem);
      return {
        semester: sem,
        mark: existing?.mark || "", 
        grade: existing?.grade || "",
      };
    })
  );

  // ৩. ফাইনাল রেজাল্ট স্টেট
  const [finalResult, setFinalResult] = useState({
    fullMark: student?.fullMark || "100",
    writtenMarks: student?.writtenMarks || "",
    vivaMarks: student?.vivaMarks || "",
    practicalMark: student?.practicalMark || "",
    totalMarks: student?.totalMarks || 0,
    letterGrade: student?.letterGrade || "",
    cgpaOverall: student?.cgpaOverall || "",
    publicationDate: student?.publicationDate || "",
    examinationMonth: student?.examinationMonth || "",
    session: student?.session || ""
  });

  useEffect(() => {
    const total = Number(finalResult.writtenMarks) + Number(finalResult.vivaMarks) + Number(finalResult.practicalMark);
    setFinalResult(prev => ({ ...prev, totalMarks: total }));
  }, [finalResult.writtenMarks, finalResult.vivaMarks, finalResult.practicalMark]);

  const handleAddSubjectsUI = () => {
    const namesArray = subjectEntry.names.split("\n").map(n => n.trim()).filter(n => n !== "");
    if (!namesArray.length) return toast.error("সাবজেক্টের নাম লিখুন!");

    const newOnes = namesArray.map(name => ({
      name,
      semester: subjectEntry.semester,
      id: Math.random().toString(36).substring(2, 9),
      cgpa: 0,
      grade: ""
    }));

    setTempSubjects([...tempSubjects, ...newOnes]);
    setSubjectEntry({ ...subjectEntry, names: "" });
  };

  const handleAcademicChange = (index: number, val: string) => {
    const updated = [...academicRecords];
    updated[index].mark = val;
    updated[index].grade = getGradeFromCGPA(val);
    setAcademicRecords(updated);
  };

  const handleFinalSubmit = async () => {
    setIsSaving(true);
    const payload = {
      ...finalResult,
      subjects: tempSubjects,
      academicRecords: academicRecords,
    };

    try {
      const res = await getAdminStudentsAction(student.id, payload);
      if (res.success) {
        toast.success(res.message || "Data Saved Successfully!");
        
        if (onUpdated) {
          onUpdated(res.studentData || res);
        }
      } else {
        toast.error(res.message || "Failed to save");
      }
    } catch (error: any) {
      toast.error("Network or Server Error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-hidden backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-[#0f111a] border border-white/10 rounded-xl shadow-2xl p-6 text-zinc-300 custom-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Manage Student Marks</h2>
            <p className="text-xs text-indigo-400">Student: {student?.name} | {student?.studentId}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-zinc-500 hover:text-white">
            <X size={20}/>
          </button>
        </div>

        {/* 1. Add Subject Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block">Semester Selection</label>
            <select 
              value={subjectEntry.semester}
              onChange={(e) => setSubjectEntry({...subjectEntry, semester: e.target.value})}
              className="w-full bg-[#1a1d2e] border border-white/10 rounded-md h-10 px-3 outline-none text-sm text-white focus:ring-1 ring-indigo-500"
            >
              {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block">Bulk Subject Entry (One per line)</label>
            <textarea 
              value={subjectEntry.names}
              onChange={(e) => setSubjectEntry({...subjectEntry, names: e.target.value})}
              placeholder="Enter subject names..."
              className="w-full bg-[#1a1d2e] border border-white/10 rounded-md p-3 h-20 text-sm outline-none text-white focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-end mb-6">
          <Button onClick={handleAddSubjectsUI} className="bg-indigo-600 hover:bg-indigo-700 h-9 px-6 text-xs font-bold transition-all active:scale-95">
            Add Subjects to List
          </Button>
        </div>

        {/* 2. Subject Preview Table */}
        <div className="mb-8 border border-white/10 rounded-md overflow-hidden bg-black/40">
          <div className="max-h-50 overflow-y-auto">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-[#1a1d2e] text-zinc-400 sticky top-0">
                <tr>
                  <th className="p-3">Subject Name</th>
                  <th className="p-3">Semester</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tempSubjects.length > 0 ? tempSubjects.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 text-zinc-200">{sub.name}</td>
                    <td className="p-3 text-indigo-400 font-bold">{sub.semester}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => setTempSubjects(tempSubjects.filter((_, i) => i !== idx))} className="text-zinc-600 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={3} className="p-8 text-center text-zinc-600 italic text-xs">No subjects added to the list.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Academic Details (8 Semester Boxes) */}
        <h3 className="text-[10px] font-bold text-indigo-500 uppercase mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          Semester Wise Performance (CGPA)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {academicRecords.map((record, idx) => (
            <div key={idx} className="bg-[#1a1d2e] border border-white/5 p-3 rounded-lg hover:border-indigo-500/30 transition-all">
              <label className="text-[10px] font-bold text-zinc-500 mb-1 block">{record.semester} Semester</label>
              <Input 
                type="number" step="0.01" 
                value={record.mark}
                onChange={(e) => handleAcademicChange(idx, e.target.value)}
                placeholder="0.00"
                className="bg-black/40 border-white/10 h-8 text-xs text-white focus:ring-1 ring-indigo-500"
              />
              <div className="text-[9px] mt-2 flex justify-between items-center">
                <span className="text-zinc-600">Grade:</span>
                <span className={`font-bold ${record.grade === 'F' ? 'text-red-500' : 'text-emerald-400'}`}>
                  {record.grade || "—"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Final Result Section */}
        <h3 className="text-[10px] font-bold text-indigo-500 uppercase mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          Summary & Final Calculation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pt-4 border-t border-white/5">
          {Object.entries(finalResult).map(([key, value]) => (
            <div key={key}>
              <label className="text-[9px] font-bold text-zinc-400 uppercase mb-1 block">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <Input 
                value={value}
                readOnly={key === "totalMarks"}
                onChange={(e) => setFinalResult({...finalResult, [key]: e.target.value})}
                className={`bg-[#1a1d2e] border-white/10 h-9 text-xs text-white focus:ring-1 ring-indigo-500 ${key === 'totalMarks' ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <Button onClick={onClose} variant="ghost" className="h-10 px-6 text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            Close Form
          </Button>
          <Button 
            onClick={handleFinalSubmit} 
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-700 h-10 px-10 font-bold shadow-xl shadow-indigo-600/10 active:scale-95 transition-all"
          >
            {isSaving ? (
              <><Loader2 className="animate-spin mr-2" size={16}/> Saving...</>
            ) : "Save Changes"}
          </Button>
        </div>

      </div>
    </div>
  );
}