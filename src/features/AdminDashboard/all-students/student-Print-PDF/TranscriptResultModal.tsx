/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { Loader2, GraduationCap, ZoomIn, ZoomOut, X, Printer } from "lucide-react";
import { getSemesterGrade, Mark } from "@/features/AdminDashboard/all-students/markStudent/types/markStudent.types";
import { getMarksAction } from "@/features/AdminDashboard/all-students/markStudent/actions/markStudent.actions";

interface Props {
  studentId: string;
  student: any;
  onClose: () => void;
}

export default function TranscriptResultModal({ studentId, student, onClose }: Props) {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(0.75);

  useEffect(() => {
    let ignore = false;
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const data = await getMarksAction(studentId);
        if (!ignore) setMarks(data ?? []);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchMarks();
    return () => { ignore = true; };
  }, [studentId]);

  const avgCgpa =
    marks.length > 0
      ? marks.reduce((acc, m) => acc + m.cgpa, 0) / marks.length
      : 0;
  const totalCredit = marks.reduce((acc, m) => acc + m.totalCredit, 0);

  return (
    <>
      <style>{`
        #transcript-print-only { display: none; }

        @media print {
          @page {
            size: A4 portrait;
            margin: 5mm;
          }
          html, body {
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          #transcript-modal-overlay { display: none !important; }
          #transcript-print-only {
            display: block !important;
            position: fixed !important;
            inset: 0 !important;
            background: #ffffff !important;
            z-index: 999999 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>

      {/* MODAL */}
      <div id="transcript-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[95vh]">

          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Result Sheet Preview</h2>
              <p className="text-xs text-gray-400 mt-0.5">{student?.name} · {student?.roll}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setScale((s) => Math.max(0.3, +(s - 0.1).toFixed(1)))} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition">
                <ZoomOut size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
              <span className="text-xs font-mono text-gray-500 w-10 text-center">{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale((s) => Math.min(2, +(s + 0.1).toFixed(1)))} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition">
                <ZoomIn size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
              <button onClick={onClose} className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 transition">
                <X size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="overflow-auto flex-1 p-6 bg-gray-50 dark:bg-gray-950">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Loading Results...</p>
              </div>
            )}
            {!loading && marks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <GraduationCap size={48} className="text-slate-300" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">কোনো Result পাওয়া যায়নি</p>
              </div>
            )}
            {!loading && marks.length > 0 && (
              <div style={{ transform: `scale(${scale})`, transformOrigin: "top center", transition: "transform 0.2s ease" }}>
                <Sheet student={student} marks={marks} avgCgpa={avgCgpa} totalCredit={totalCredit} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
            <button onClick={onClose} className="flex-1 h-11 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              Cancel
            </button>
            <button
              onClick={() => window.print()}
              disabled={loading || marks.length === 0}
              className="flex-1 h-11 bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2"
            >
              <Printer size={16} />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* PRINT ONLY */}
      <div id="transcript-print-only">
        {!loading && marks.length > 0 && (
          <Sheet student={student} marks={marks} avgCgpa={avgCgpa} totalCredit={totalCredit} />
        )}
      </div>
    </>
  );
}

function Sheet({ student, marks, avgCgpa, totalCredit }: {
  student: any; marks: Mark[]; avgCgpa: number; totalCredit: number;
}) {
  // Dynamic columns: ≤6 semesters → 2 col, 7-9 → 3 col, 10+ → 3 col tighter
  const cols = marks.length <= 6 ? 2 : 2  // For simplicity, using 3 columns for 7 or more semesters. Adjust as needed.

  return (
    <div style={{
      width: 794,
      backgroundColor: "#ffffff",
      color: "#000000",
      fontFamily: "'Arial', sans-serif",
      border: "1px solid #cbd5e1",
      borderRadius: 4,
      overflow: "hidden",
    }}>

      {/* HEADER */}
      <div style={{ borderBottom: "2px solid #1e293b", padding: "5px 12px", backgroundColor: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img
            src="https://i.ibb.co.com/r2dVnpdh/Screenshot-from-2026-03-04-16-25-16-removebg-preview.png"
            alt="Logo" crossOrigin="anonymous"
            style={{ width: 40, height: 40, objectFit: "contain" }}
          />
          <div style={{ textAlign: "center", flex: 1, padding: "0 6px" }}>
            <p style={{ fontSize: 6.5, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
              Government of the People's Republic of Bangladesh
            </p>
            <p style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", margin: "2px 0 0", color: "#1e293b" }}>
              Bangladesh Technical Education Institute
            </p>
            <p style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.18em", margin: "2px 0 0", color: "#0f172a" }}>
              RESULT SHEET
            </p>
          </div>
          {student?.picture ? (
            <img src={student.picture} alt="Student" crossOrigin="anonymous"
              style={{ width: 38, height: 48, objectFit: "cover", border: "1px solid #cbd5e1" }} />
          ) : (
            <div style={{ width: 38, height: 48, border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#94a3b8", fontWeight: 700 }}>
              PHOTO
            </div>
          )}
        </div>
      </div>

      {/* STUDENT INFO */}
      <div style={{ padding: "4px 12px", borderBottom: "1px solid #cbd5e1", backgroundColor: "#fafafa" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <InfoRow label="Name of Student" value={student?.name} />
              <InfoRow label="Father's Name"   value={student?.fatherName} />
              <InfoRow label="Mother's Name"   value={student?.motherName} />
              <InfoRow label="Date of Birth"   value={student?.dob ? new Date(student.dob).toLocaleDateString("en-GB") : "—"} />
              <InfoRow label="Institute Name"  value={student?.institute} />
              <InfoRow label="District"        value={student?.district} />
            </tbody>
          </table>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <InfoRow label="Roll"            value={student?.roll} />
              <InfoRow label="Registration No" value={student?.regNumber} />
              <InfoRow label="Course Duration" value={student?.duration} />
              <InfoRow label="Education"       value={student?.educationQualification} />
              <InfoRow label="Director"        value={student?.directorName} />
              <InfoRow label="Overall CGPA"    value={getSemesterGrade(avgCgpa)} />
            </tbody>
          </table>
        </div>
      </div>

      {/* SEMESTER TABLES */}
      <div style={{ padding: "4px 12px" }}>
        <div style={{ columns: cols, columnGap: 6 }}>
          {marks.map((mark) => {
            const semCredit = mark.subjects.reduce((acc, s) => acc + s.credit, 0);
            return (
              <div key={mark.id} style={{
                breakInside: "avoid",
                pageBreakInside: "avoid",
                border: "1px solid #cbd5e1",
                marginBottom: 4,
                display: "inline-block",
                width: "100%",
              }}>
                <div style={{ backgroundColor: "#1e293b", padding: "1.5px 5px", textAlign: "center" }}>
                  <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff", margin: 0 }}>
                    {mark.semesterTitle}
                  </p>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #cbd5e1" }}>
                      <Th>Code</Th><Th>Title</Th><Th center>CR</Th><Th center>Grade</Th><Th center>GP</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {mark.subjects.map((sub, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                        <Td muted>{sub.subjectCode}</Td>
                        <Td bold>{sub.subjectName}</Td>
                        <Td center>{sub.credit}</Td>
                        <Td center bold color={sub.grade === "F" ? "#ef4444" : "#0f172a"}>{sub.grade}</Td>
                        <Td center>{sub.gradePoint.toFixed(2)}</Td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop: "1px solid #cbd5e1", backgroundColor: "#f8fafc" }}>
                      <td colSpan={2} style={{ padding: "1.5px 4px", fontWeight: 900, fontSize: 5.5, textTransform: "uppercase", color: "#475569" }}>
                        Total Credit: {semCredit}
                      </td>
                      <td colSpan={2} style={{ padding: "1.5px 4px", textAlign: "right", fontWeight: 900, fontSize: 5.5, color: "#475569" }}>GPA:</td>
                      <td style={{ padding: "1.5px 4px", textAlign: "center", fontWeight: 900, fontSize: 6.5, color: "#0f172a" }}>
                        {mark.cgpa.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "4px 12px", borderTop: "2px solid #1e293b", backgroundColor: "#fafafa" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 16, fontSize: 8, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em", color: "#334155" }}>
            <span>Total Credit: {totalCredit}</span>
            <span>Credit Earned: {totalCredit}</span>
            <span>CGPA: {avgCgpa.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=52x52&data=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_APP_URL}/student-result-page?roll=${student?.roll}`
              )}`}
              alt="QR" crossOrigin="anonymous" width={42} height={42}
            />
            <p style={{ fontSize: 5.5, color: "#94a3b8", margin: 0, fontWeight: 700, textTransform: "uppercase" }}>Scan to verify</p>
          </div>
        </div>
      </div>

      {/* NOTE */}
      <div style={{ padding: "3px 12px", borderTop: "1px solid #e2e8f0", textAlign: "center", backgroundColor: "#fff" }}>
        <p style={{ fontSize: 6, color: "#94a3b8", fontStyle: "italic", margin: 0 }}>
          Note: This is a computer-generated marksheet and does not require any signature.
        </p>
      </div>
    </div>
  );
}

function Th({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <th style={{ padding: "1.5px 4px", textAlign: center ? "center" : "left", borderRight: "1px solid #e2e8f0", fontSize: 5.5, fontWeight: 900, textTransform: "uppercase", color: "#475569" }}>
      {children}
    </th>
  );
}

function Td({ children, center, bold, muted, color }: {
  children: React.ReactNode; center?: boolean; bold?: boolean; muted?: boolean; color?: string;
}) {
  return (
    <td style={{ padding: "1px 4px", textAlign: center ? "center" : "left", borderRight: "1px solid #f1f5f9", fontSize: 5.5, fontWeight: bold ? 700 : 400, color: color ?? (muted ? "#64748b" : "#1e293b") }}>
      {children}
    </td>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
      <td style={{ padding: "1.5px 8px 1.5px 0", fontWeight: 700, color: "#475569", fontSize: 7.5, whiteSpace: "nowrap", width: 110 }}>
        {label}
      </td>
      <td style={{ padding: "1.5px 0", color: "#1e293b", fontWeight: 600, fontSize: 7.5 }}>
        {value || "—"}
      </td>
    </tr>
  );
}