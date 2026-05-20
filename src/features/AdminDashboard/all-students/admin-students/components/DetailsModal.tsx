/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  X,
  ShieldCheck,
  BookOpen,
  User,
  MapPin,
  Calendar,
  Download,
} from "lucide-react";
import { Student } from "../types/admin-students.types";
import { AdmitCardModal } from "../../student-Print-PDF/AdmitCardModal";
import { RegCardModal } from "../../student-Print-PDF/RegCardModal";
import { CertificateModal } from "../../student-Print-PDF/CertificateModal";
import { StudentIdModal } from "../../student-Print-PDF/StudentIdModal";
import TranscriptResultModal from "../../student-Print-PDF/TranscriptResultModal";

const DataRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] text-stone-400 uppercase font-semibold tracking-wider">
      {label}
    </span>
    <span
      className={`text-[13px] font-medium leading-tight ${highlight ? "text-amber-600 font-bold" : "text-stone-700"}`}
    >
      {value || "Not Provided"}
    </span>
  </div>
);

const DetailsModal = ({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) => {
  const [showAdmit, setShowAdmit] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showStudentId, setShowStudentId] = useState(false);
  const [showTranscriptResult, setShowTranscriptResult] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-10 text-stone-500"
          >
            <X size={18} />
          </button>
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-7 items-center md:items-start border-b border-stone-100 pb-8 mb-8">
              <div className="relative">
                <img
                  src={student.picture}
                  className="h-28 w-28 rounded-2xl object-cover ring-4 ring-amber-100 shadow-lg"
                  alt=""
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-500 p-1.5 rounded-lg shadow">
                  <ShieldCheck className="text-white h-4 w-4" />
                </div>
              </div>
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-2xl font-black text-stone-800 tracking-tight uppercase leading-none">
                  {student.name}
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold font-mono">
                    ID: {student.studentId}
                  </span>
                  <span className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold font-mono">
                    Roll: {student.roll}
                  </span>
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold font-mono">
                    Reg: {student.regNumber}
                  </span>
                </div>
                <p className="text-stone-400 text-sm pt-1">{student.email}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-amber-600 font-black uppercase text-[10px] tracking-widest border-b border-amber-100 pb-2">
                  <BookOpen size={13} /> Academic Profile
                </h4>
                <DataRow label="Institute" value={student.institute} />
                <DataRow
                  label="Qualification"
                  value={student.educationQualification}
                />
                <DataRow label="Director" value={student.directorName} />
                <DataRow label="Duration" value={student.duration} />
                <DataRow
                  label="Session"
                  value={`${student.month1}/${student.year1} - ${student.month2}/${student.year2}`}
                />
              </div>
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-blue-500 font-black uppercase text-[10px] tracking-widest border-b border-blue-100 pb-2">
                  <User size={13} /> Personal & Family
                </h4>
                <DataRow label="Father's Name" value={student.fatherName} />
                <DataRow label="Mother's Name" value={student.motherName} />
                <DataRow label="Date of Birth" value={student.dob} />
                <DataRow label="Gender" value={student.gender} />
                <DataRow label="Passport/NID" value={student.passport} />
              </div>
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest border-b border-rose-100 pb-2">
                  <MapPin size={13} /> Location & Contact
                </h4>
                <DataRow
                  label="Phone"
                  value={student.guardianPhone}
                  highlight
                />
                <DataRow label="District" value={student.district} />
                <DataRow label="Thana" value={student.thana} />
                <DataRow label="Address" value={student.studentAddress} />
              </div>
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-emerald-600 font-black uppercase text-[10px] tracking-widest border-b border-emerald-100 pb-2">
                  <Calendar size={13} /> Validity Dates
                </h4>
                <DataRow label="Issue Date" value={student.issueDate} />
                <DataRow label="Expire Date" value={student.expireDate} />
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">
                    Status Note
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1">
                    The student identity is verified for the current session.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
              <button
                onClick={() => setShowAdmit(true)}
                className="flex-1 h-11 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
              >
                <Download size={15} /> Admit Card
              </button>
              <button
                onClick={() => setShowReg(true)}
                className="flex-1 h-11 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
              >
                <Download size={15} /> Reg Card
              </button>
              <button
                onClick={() => setShowCertificate(true)}
                className="flex-1 h-11 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
              >
                <Download size={15} /> Certificate
              </button>
              <button
                onClick={() => setShowStudentId(true)}
                className="flex-1 h-11 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
              >
                <Download size={15} /> Student ID
              </button>
              <button
                onClick={() => setShowTranscriptResult(true)}
                className="flex-1 h-11 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
              >
                <Download size={15} /> Transcript
              </button>
              <button
                className="flex-1 h-11 rounded-xl font-bold text-sm bg-stone-800 text-white hover:bg-stone-900 transition-colors uppercase tracking-wider"
                onClick={onClose}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAdmit && (
        <AdmitCardModal student={student} onClose={() => setShowAdmit(false)} />
      )}
      {showReg && (
        <RegCardModal student={student} onClose={() => setShowReg(false)} />
      )}
      {showCertificate && (
        <CertificateModal
          student={student}
          onClose={() => setShowCertificate(false)}
        />
      )}
      {showStudentId && (
        <StudentIdModal
          student={student}
          onClose={() => setShowStudentId(false)}
        />
      )}
      {showTranscriptResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 my-8">
            <TranscriptResultModal
              studentId={student.id}
              student={student}
              onClose={() => setShowTranscriptResult(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsModal;
