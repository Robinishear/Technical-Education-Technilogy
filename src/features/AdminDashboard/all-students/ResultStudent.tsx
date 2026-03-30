"use client";

import { X } from "lucide-react";

interface Student {
  id: string; name: string; email: string; picture: string; fatherName: string;
  motherName: string; dob: string; gender: string; passport: string;
  guardianPhone: string; studentAddress: string; district: string;
  thana: string; duration: string; year1: string; month1: string;
  year2: string; month2: string; educationQualification: string;
  institute: string; directorName: string; issueDate: string;
  expireDate: string; studentId: string; roll: string; regNumber: string;
}

interface Props {
  student: Student;
  onClose: () => void;
  onUpdated: (updated: Student) => void;
}

export default function ResultStudent({ student, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-stone-100">
          <div>
            <h2 className="text-lg font-black text-stone-800 uppercase tracking-tight">Result Sheet</h2>
            <p className="text-xs text-stone-400 mt-0.5">Student result information</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors text-stone-500"
          >
            <X size={16} />
          </button>
        </div>

        {/* Student Info */}
        <div className="px-8 py-5 bg-amber-50 border-b border-amber-100 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={student.picture} alt="" className="h-12 w-12 rounded-xl object-cover border-2 border-amber-200 shadow" />
          <div>
            <p className="font-black text-stone-800 text-sm uppercase">{student.name}</p>
            <div className="flex gap-2 mt-1">
              <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full font-mono">ID: {student.studentId}</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full font-mono">Roll: {student.roll}</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-mono">Reg: {student.regNumber}</span>
            </div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="px-8 py-6 space-y-4">
          <Row label="Full Name" value={student.name} />
          <Row label="Father's Name" value={student.fatherName} />
          <Row label="Mother's Name" value={student.motherName} />
          <Row label="Institute" value={student.institute} />
          <Row label="Education Qualification" value={student.educationQualification} />
          <Row label="Session" value={`${student.month1}/${student.year1} — ${student.month2}/${student.year2}`} />
          <Row label="Duration" value={student.duration} />
          <Row label="Issue Date" value={student.issueDate} />
          <Row label="Expire Date" value={student.expireDate} />
        </div>

        {/* Footer */}
        <div className="px-8 pb-7">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-sm font-bold uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-4 border-b border-stone-100 pb-3">
    <span className="text-[11px] text-stone-400 uppercase font-semibold tracking-wider w-40 shrink-0">{label}</span>
    <span className="text-[13px] font-semibold text-stone-700 text-right">{value || "—"}</span>
  </div>
);