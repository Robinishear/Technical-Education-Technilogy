/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSemesterGrade, Mark } from "@/features/AdminDashboard/all-students/markStudent/types/markStudent.types";
import { QRCode } from "react-qr-code";

export default function ResultView({ result }: { result: any }) {
  const marks: Mark[] = result.marks ?? [];

  return (
    <div className="w-full font-sans print-wrapper">

      {/* Print Button */}
      <div className="flex justify-end mb-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-slate-700 transition-all"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Result Sheet */}
      <div
        className="print-area border border-slate-300 rounded-lg overflow-hidden shadow-sm"
        style={{ backgroundColor: "#ffffff", color: "#000000", fontFamily: "sans-serif" }}
      >

{/* Header */}
<div style={{ borderBottom: "1px solid #cbd5e1", padding: "24px" }}>
  <div
    className="result-header" 
    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
  >
          {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}> */}
            <img
              src="https://i.ibb.co.com/r2dVnpdh/Screenshot-from-2026-03-04-16-25-16-removebg-preview.png"
              alt="Logo"
              style={{ width: 64, height: 64, objectFit: "contain" }}
            />
            <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
                Government of the People's Republic of Bangladesh
              </p>
              <p style={{ fontSize: 16, fontWeight: 900, textTransform: "uppercase", margin: "4px 0 0" }}>
                Bangladesh Technical Education Institute
              </p>
              <p style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", margin: "4px 0 0" }}>
                RESULT SHEET
              </p>
            </div>
            {result.picture ? (
              <img
                src={result.picture}
                alt="Student"
                style={{ width: 64, height: 80, objectFit: "cover", border: "2px solid #cbd5e1" }}
              />
            ) : (
              <div style={{ width: 64, height: 80, border: "2px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                Photo
              </div>
            )}
          </div>
        </div>

        {/* Student Info */}
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #cbd5e1" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <tbody>
              <InfoRow label="Name of Student" value={result.name} />
              <InfoRow label="Father's Name" value={result.fatherName} />
              <InfoRow label="Mother's Name" value={result.motherName} />
              <InfoRow label="Date of Birth" value={result.dob ? new Date(result.dob).toLocaleDateString("en-GB") : "—"} />
              <InfoRow label="Institute Name" value={result.institute} />
              <InfoRow label="Roll" value={result.roll} />
              <InfoRow label="Registration No" value={result.regNumber} />
              <InfoRow label="Course Duration" value={result.duration} />
              <InfoRow label="Education" value={result.educationQualification} />
              <InfoRow label="Director" value={result.directorName} />
              <InfoRow label="District" value={result.district} />
              <InfoRow
                label="CGPA Result"
                value={
                  marks.length > 0
                    ? getSemesterGrade(marks.reduce((acc, m) => acc + m.cgpa, 0) / marks.length)
                    : "—"
                }
              />
            </tbody>
          </table>
        </div>

        {/* Semester Tables — 2 column */}
        <div style={{ padding: "16px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {marks.map((mark) => {
              const totalCredit = mark.subjects.reduce((acc, s) => acc + s.credit, 0);
              return (
                <div key={mark.id} style={{ border: "1px solid #cbd5e1" }}>
                  <div style={{ textAlign: "center", padding: "4px", borderBottom: "1px solid #cbd5e1", backgroundColor: "#f8fafc" }}>
                    <p style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#334155", margin: 0 }}>
                      {mark.semesterTitle}
                    </p>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9 }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #cbd5e1", backgroundColor: "#f8fafc" }}>
                        <th style={{ padding: "4px 6px", textAlign: "left", borderRight: "1px solid #e2e8f0", fontSize: 8, fontWeight: 900, textTransform: "uppercase", color: "#475569" }}>Code</th>
                        <th style={{ padding: "4px 6px", textAlign: "left", borderRight: "1px solid #e2e8f0", fontSize: 8, fontWeight: 900, textTransform: "uppercase", color: "#475569" }}>Title</th>
                        <th style={{ padding: "4px 6px", textAlign: "center", borderRight: "1px solid #e2e8f0", fontSize: 8, fontWeight: 900, textTransform: "uppercase", color: "#475569" }}>CR</th>
                        <th style={{ padding: "4px 6px", textAlign: "center", borderRight: "1px solid #e2e8f0", fontSize: 8, fontWeight: 900, textTransform: "uppercase", color: "#475569" }}>Grade</th>
                        <th style={{ padding: "4px 6px", textAlign: "center", fontSize: 8, fontWeight: 900, textTransform: "uppercase", color: "#475569" }}>GP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mark.subjects.map((sub, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9", backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                          <td style={{ padding: "3px 6px", borderRight: "1px solid #f1f5f9", color: "#64748b" }}>{sub.subjectCode}</td>
                          <td style={{ padding: "3px 6px", borderRight: "1px solid #f1f5f9", fontWeight: 700, color: "#1e293b" }}>{sub.subjectName}</td>
                          <td style={{ padding: "3px 6px", borderRight: "1px solid #f1f5f9", textAlign: "center" }}>{sub.credit}</td>
                          <td style={{ padding: "3px 6px", borderRight: "1px solid #f1f5f9", textAlign: "center", fontWeight: 900, color: sub.grade === "F" ? "#ef4444" : "#1e293b" }}>{sub.grade}</td>
                          <td style={{ padding: "3px 6px", textAlign: "center", fontWeight: 700 }}>{sub.gradePoint.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ borderTop: "1px solid #cbd5e1", backgroundColor: "#f8fafc" }}>
                        <td colSpan={2} style={{ padding: "3px 6px", fontWeight: 900, fontSize: 8, textTransform: "uppercase", color: "#475569" }}>
                          Total Credit: {totalCredit}
                        </td>
                        <td colSpan={2} style={{ padding: "3px 6px", textAlign: "right", fontWeight: 900, fontSize: 8, color: "#475569" }}>
                          GPA:
                        </td>
                        <td style={{ padding: "3px 6px", textAlign: "center", fontWeight: 900, color: "#1e293b" }}>
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

        {/* Footer Summary */}
        {/* {marks.length > 0 && (
          <div style={{ padding: "12px 24px", borderTop: "1px solid #cbd5e1", backgroundColor: "#f8fafc", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#334155" }}>
            <span>Total Credit: {marks.reduce((acc, m) => acc + m.totalCredit, 0)}</span>
            <span>Credit Earned: {marks.reduce((acc, m) => acc + m.totalCredit, 0)}</span>
            <span>CGPA: {(marks.reduce((acc, m) => acc + m.cgpa, 0) / marks.length).toFixed(2)}</span>
          </div>
        )} */}
        {/* Footer Summary */}
{marks.length > 0 && (
  <div style={{ padding: "12px 24px", borderTop: "1px solid #cbd5e1", backgroundColor: "#f8fafc" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
      
      {/* Summary text */}
      <div style={{ display: "flex", gap: 24, fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#334155" }}>
        <span>Total Credit: {marks.reduce((acc, m) => acc + m.totalCredit, 0)}</span>
        <span>Credit Earned: {marks.reduce((acc, m) => acc + m.totalCredit, 0)}</span>
        <span>CGPA: {(marks.reduce((acc, m) => acc + m.cgpa, 0) / marks.length).toFixed(2)}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        {/* <QRCode
          value={`${typeof window !== "undefined" ? window.location.origin : ""}/student-result?roll=${result.roll}`}
          size={64}
        /> */}
        <QRCode
  value={`${process.env.NEXT_PUBLIC_APP_URL}/student-result?roll=${result.roll}`}
  size={64}
/>
        <p style={{ fontSize: 8, color: "#94a3b8", margin: 0, fontWeight: 700, textTransform: "uppercase" }}>
          Scan to verify
        </p>
      </div>

    </div>
  </div>
)}

        {/* Note */}
        <div style={{ padding: "10px 24px", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
          <p style={{ fontSize: 9, color: "#94a3b8", fontStyle: "italic", margin: 0 }}>
            Note: This is a computer-generated marksheet and does not require any signature.
          </p>
        </div>
      </div>

  <style>{`
  @media print {
    .print\\:hidden { display: none !important; }
    header, footer, nav { display: none !important; }
    
    @page { 
      size: A4 portrait;
      margin: 8mm;
    }
    
    body { 
      background: white !important; 
    }

    .print-area > div > div > div {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .print-area > div > div {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 8px !important;
    }

    .print-area table {
      font-size: 7px !important;
    }

    .print-area .result-header {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
    }
    .print-area {
      width: 100% !important;
    }
  }
`}</style>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
      <td style={{ padding: "4px 16px 4px 0", fontWeight: 700, color: "#475569", fontSize: 11, whiteSpace: "nowrap", width: 160 }}>
        {label}
      </td>
      <td style={{ padding: "4px 0", color: "#1e293b", fontWeight: 600, fontSize: 11 }}>
        {value || "—"}
      </td>
    </tr>
  );
};  