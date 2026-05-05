/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { GraduationCap, Loader2, PlusCircle, Save, X } from "lucide-react";
import SemesterForm from "./SemesterForm";
import { calculateGrade, getSemesterGrade } from "../types/markStudent.types";
import { saveMarksAction } from "../actions/markStudent.actions";

const MAX_PAGES = 8;

function createInitialSubjects() {
  return Array(8).fill(null).map((_, i) => ({
    id: i,
    code: "",
    name: "",
    credit: 0,
    w: 0,
    p: 0,
    v: 0,
    marks: 0,
    gp: 0,
    cgp: 0,
    grade: "",
    fullMark: 0,
  }));
}

export default function MarkStudent({
  onClose,
  studentId,
  student,
  onUpdated,
}: {
  onClose: () => void;
  studentId: string;
  student: any;
  onUpdated: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [semesters, setSemesters] = useState([
    { id: Date.now(), title: "First Year First Semester", subjects: createInitialSubjects() }
  ]);

  const handleSubjectChange = (semId: number, subIdx: number, field: string, value: string) => {
    setSemesters(prev =>
      prev.map(sem => {
        if (sem.id !== semId) return sem;
        const updatedSubjects = sem.subjects.map((sub, idx) => {
          if (idx !== subIdx) return sub;
          const updated = { ...sub, [field]: value };
          const written = parseFloat(String(updated.w)) || 0;
          const practical = parseFloat(String(updated.p)) || 0;
          const viva = parseFloat(String(updated.v)) || 0;
          const credit = parseFloat(String(updated.credit)) || 0;
          updated.marks = written + practical + viva;
          const { gp, grade } = calculateGrade(updated.marks);
          updated.gp = gp;
          updated.grade = grade;
          updated.cgp = parseFloat((credit * gp).toFixed(2));
          return updated;
        });
        return { ...sem, subjects: updatedSubjects };
      })
    );
  };

  const getSemesterSummary = (subjects: any[]) => {
let totalWritten = 0, totalPractical = 0, totalViva = 0, 
    totalCredit = 0, totalPoints = 0, totalFullMark = 0; 

    let hasFailed = false;
    subjects.filter(s => s.code.trim() !== "").forEach(sub => {
      totalWritten += parseFloat(sub.w) || 0;
      totalPractical += parseFloat(sub.p) || 0;
      totalViva += parseFloat(sub.v) || 0;
      totalCredit += parseFloat(sub.credit) || 0;
      totalPoints += parseFloat(sub.cgp) || 0;
          totalFullMark += parseFloat(String(sub.fullMark)) || 0; 

      if (sub.grade === "F") hasFailed = true;
    });
    const calculatedCgpa = totalCredit > 0 ? parseFloat((totalPoints / totalCredit).toFixed(2)) : 0.00;
    const cgpa = isNaN(calculatedCgpa) ? 0.00 : calculatedCgpa;
    const finalGrade = hasFailed ? "FAIL" : getSemesterGrade(cgpa);
    return { totalWritten, totalPractical, totalViva,totalFullMark, totalMarks: totalWritten + totalPractical + totalViva, totalCredit, totalPoints: parseFloat(totalPoints.toFixed(2)), cgpa, finalGrade };
  };

  const handleTitleChange = (semIdx: number, value: string) => {
    setSemesters(prev =>
      prev.map((sem, i) => i === semIdx ? { ...sem, title: value } : sem)
    );
  };

  const handleSaveAll = async () => {
    if (!studentId) return toast.error("Student ID is missing!");
    try {
      setLoading(true);
      for (const sem of semesters) {
        const validSubjects = sem.subjects.filter(
          (s) => s.code?.trim() !== "" && s.code !== "750XXX" && Number(s.credit) > 0
        );
        if (validSubjects.length === 0) continue;
        const summary = getSemesterSummary(validSubjects);
        const uniqueSubjectsMap = new Map();
        validSubjects.forEach((s) => {
          if (!uniqueSubjectsMap.has(s.code)) uniqueSubjectsMap.set(s.code, s);
        });
        const cleanSubjects = Array.from(uniqueSubjectsMap.values());
        const payload = {
          semesterTitle: sem.title || "N/A",
          totalCredit: Number(summary.totalCredit) || 0,
          totalPoints: Number(summary.totalPoints) || 0,
          cgpa: Number(summary.cgpa) || 0,
          grade: summary.finalGrade || "N/A",
          status: summary.finalGrade === "FAIL" ? "Referred" : "Passed",
          subjects: cleanSubjects.map((s) => ({
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
        await saveMarksAction(studentId, payload);
      }
      toast.success("All Results Saved Successfully!");
      onUpdated?.();
    } catch (error: any) {
      toast.error(error?.message || error?.error || "Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const addNewSemester = () => {
    if (semesters.length >= MAX_PAGES) {
      toast.error("A maximum of 8 pages can be added.!");
      return;
    }
    setSemesters(prev => [
      ...prev,
      { id: Date.now(), title: "New Semester Page", subjects: createInitialSubjects() }
    ]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      setSemesters(prev => prev.filter(sem => sem.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl overflow-y-auto p-4 custom-scrollbar">
      {loading && (
        <div className="fixed inset-0 z-100 bg-black/60 flex flex-col items-center justify-center backdrop-blur-md">
          <div className="bg-white p-8 rounded-2xl flex flex-col items-center shadow-2xl border-b-4 border-blue-600">
            <Loader2 className="h-14 w-14 text-blue-600 animate-spin mb-4" />
            <p className="text-[#1e3a8a] font-black text-xl italic uppercase tracking-widest text-center">
              Data is Saving... <br />
              <span className="text-xs text-zinc-500 font-normal">Please wait</span>
            </p>
          </div>
        </div>
      )}

      <div className={`max-w-[98%] mx-auto space-y-8 pb-10 ${!studentId ? 'opacity-20 pointer-events-none' : ''}`}>
        <div className="sticky top-0 z-50 bg-[#1e3a8a] p-4 rounded-xl shadow-2xl flex justify-between items-center border-b-4 border-blue-400">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-lg"><GraduationCap size={28} /></div>
            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tight">Academic Grading Panel</h2>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Student: {student?.name}</p>
            </div>
            {/*  Page counter */}
            <div className="bg-white/10 px-3 py-1 rounded-lg border border-white/20">
              <p className="text-[11px] text-blue-200 font-bold uppercase tracking-widest">
                Page: {semesters.length} / {MAX_PAGES}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/10">
            {/*  Max page হলে disabled */}
            <Button
              onClick={addNewSemester}
              disabled={semesters.length >= MAX_PAGES}
              className="bg-emerald-600 hover:bg-emerald-700 font-bold h-11 px-6 shadow-lg border-b-4 border-emerald-800 transition-all rounded-sm disabled:opacity-50"
            >
              <PlusCircle size={18} className="mr-2" /> Add Page
            </Button>
            <Button onClick={handleSaveAll} className="bg-blue-500 hover:bg-blue-600 font-bold h-11 px-6 shadow-lg border-b-4 border-blue-800 transition-all rounded-sm">
              <Save size={18} className="mr-2" /> Save Data
            </Button>
            <div className="w-0.5 h-8 bg-white/20 mx-1"></div>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-red-500 h-11 w-11 p-0 rounded-full transition-colors">
              <X size={24} />
            </Button>
          </div>
        </div>

        {semesters.map((sem, semIdx) => (
          <SemesterForm
            key={sem.id}
            sem={sem}
            semIdx={semIdx}
            summary={getSemesterSummary(sem.subjects)}
            onTitleChange={handleTitleChange}
            onSubjectChange={handleSubjectChange}
            onRemove={removeSemester}
          />
        ))}
      </div>
    </div>
  );
}