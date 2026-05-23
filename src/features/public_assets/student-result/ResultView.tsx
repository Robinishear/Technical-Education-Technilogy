/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getSemesterGrade, Mark } from "@/features/AdminDashboard/all-students/markStudent/types/markStudent.types";

export default function ResultView({ result }: { result: any }) {
  const marks: Mark[] = result.marks ?? [];
  const avgCgpa = marks.length > 0 ? marks.reduce((acc, m) => acc + m.cgpa, 0) / marks.length : 0;
  const totalCredit = marks.reduce((acc, m) => acc + m.totalCredit, 0);

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
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "sans-serif",
        }}
      >
       
        <div className="border-b border-slate-300 p-4 sm:p-6 print:p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 text-center md:text-left print:flex-row print:text-left">
            <div className="flex justify-center shrink-0 print:justify-start">
              <img
                src="https://i.ibb.co.com/r2dVnpdh/Screenshot-from-2026-03-04-16-25-16-removebg-preview.png"
                alt="Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
            </div>

            <div className="flex-1 w-full text-center px-0 md:px-4 print:text-center">
              <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-wider md:tracking-widest m-0">
                Government of the People&apos;s Republic of Bangladesh
              </p>
              <h2 className="text-xs sm:text-sm md:text-base font-black text-slate-800 uppercase mt-1 mb-0 leading-tight">
                Bangladesh Technical Education Institute
              </h2>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 uppercase tracking-widest mt-1.5 mb-0">
                RESULT SHEET
              </h3>
            </div>

            <div className="shrink-0 flex justify-center print:justify-end">
              {result.picture ? (
                <img
                  src={result.picture}
                  alt="Student"
                  className="w-14 h-18 sm:w-16 sm:h-20 object-cover border-2 border-slate-300 rounded shadow-sm"
                />
              ) : (
                <div className="w-14 h-18 sm:w-16 sm:h-20 border-2 border-dashed border-slate-300 flex items-center justify-center text-[9px] text-slate-400 font-bold uppercase rounded bg-slate-50">
                  Photo
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          style={{ padding: "12px 24px", borderBottom: "1px solid #cbd5e1" }}
        >
          <div className="info-grid">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 11,
              }}
            >
              <tbody>
                <InfoRow label="Name of Student" value={result.name} />
                <InfoRow label="Father's Name" value={result.fatherName} />
                <InfoRow label="Mother's Name" value={result.motherName} />
                <InfoRow
                  label="Date of Birth"
                  value={
                    result.dob
                      ? new Date(result.dob).toLocaleDateString("en-GB")
                      : "—"
                  }
                />
                <InfoRow label="Institute Name" value={result.institute} />
                <InfoRow label="District" value={result.district} />
              </tbody>
            </table>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 11,
              }}
            >
              <tbody>
                <InfoRow label="Roll" value={result.roll} />
                <InfoRow label="Registration No" value={result.regNumber} />
                <InfoRow label="Course Duration" value={result.duration} />
                <InfoRow
                  label="Education"
                  value={result.educationQualification}
                />
                <InfoRow label="Director" value={result.directorName} />
                <InfoRow
                  label="Overall CGPA"
                  value={marks.length > 0 ? getSemesterGrade(avgCgpa) : "—"}
                />
              </tbody>
            </table>
          </div>
        </div>
        {/* Semester Tables */}
        <div style={{ padding: "12px 24px" }}>
          <div className="semester-grid">
            {marks.map((mark) => {
              const semCredit = mark.subjects.reduce(
                (acc, s) => acc + s.credit,
                0,
              );
              return (
                <div
                  key={mark.id}
                  className="semester-card"
                  style={{
                    border: "1px solid #cbd5e1",
                    breakInside: "avoid",
                    pageBreakInside: "avoid",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      padding: "4px",
                      borderBottom: "1px solid #cbd5e1",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#334155",
                        margin: 0,
                      }}
                    >
                      {mark.semesterTitle}
                    </p>
                  </div>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 9,
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid #cbd5e1",
                          backgroundColor: "#f8fafc",
                        }}
                      >
                        <th
                          style={{
                            padding: "4px 6px",
                            textAlign: "left",
                            borderRight: "1px solid #e2e8f0",
                            fontSize: 8,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "#475569",
                          }}
                        >
                          Code
                        </th>
                        <th
                          style={{
                            padding: "4px 6px",
                            textAlign: "left",
                            borderRight: "1px solid #e2e8f0",
                            fontSize: 8,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "#475569",
                          }}
                        >
                          Title
                        </th>
                        <th
                          style={{
                            padding: "4px 6px",
                            textAlign: "center",
                            borderRight: "1px solid #e2e8f0",
                            fontSize: 8,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "#475569",
                          }}
                        >
                          CR
                        </th>
                        <th
                          style={{
                            padding: "4px 6px",
                            textAlign: "center",
                            borderRight: "1px solid #e2e8f0",
                            fontSize: 8,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "#475569",
                          }}
                        >
                          Grade
                        </th>
                        <th
                          style={{
                            padding: "4px 6px",
                            textAlign: "center",
                            fontSize: 8,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "#475569",
                          }}
                        >
                          GP
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mark.subjects.map((sub, idx) => (
                        <tr
                          key={idx}
                          style={{
                            borderBottom: "1px solid #f1f5f9",
                            backgroundColor:
                              idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                          }}
                        >
                          <td
                            style={{
                              padding: "3px 6px",
                              borderRight: "1px solid #f1f5f9",
                              color: "#64748b",
                            }}
                          >
                            {sub.subjectCode}
                          </td>
                          <td
                            style={{
                              padding: "3px 6px",
                              borderRight: "1px solid #f1f5f9",
                              fontWeight: 700,
                              color: "#1e293b",
                            }}
                          >
                            {sub.subjectName}
                          </td>
                          <td
                            style={{
                              padding: "3px 6px",
                              borderRight: "1px solid #f1f5f9",
                              textAlign: "center",
                            }}
                          >
                            {sub.credit}
                          </td>
                          <td
                            style={{
                              padding: "3px 6px",
                              borderRight: "1px solid #f1f5f9",
                              textAlign: "center",
                              fontWeight: 900,
                              color: sub.grade === "F" ? "#ef4444" : "#1e293b",
                            }}
                          >
                            {sub.grade}
                          </td>
                          <td
                            style={{
                              padding: "3px 6px",
                              textAlign: "center",
                              fontWeight: 700,
                            }}
                          >
                            {sub.gradePoint.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr
                        style={{
                          borderTop: "1px solid #cbd5e1",
                          backgroundColor: "#f8fafc",
                        }}
                      >
                        <td
                          colSpan={2}
                          style={{
                            padding: "3px 6px",
                            fontWeight: 900,
                            fontSize: 8,
                            textTransform: "uppercase",
                            color: "#475569",
                          }}
                        >
                          Total Credit: {semCredit}
                        </td>
                        <td
                          colSpan={2}
                          style={{
                            padding: "3px 6px",
                            textAlign: "right",
                            fontWeight: 900,
                            fontSize: 8,
                            color: "#475569",
                          }}
                        >
                          GPA:
                        </td>
                        <td
                          style={{
                            padding: "3px 6px",
                            textAlign: "center",
                            fontWeight: 900,
                            color: "#1e293b",
                          }}
                        >
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
        {marks.length > 0 && (
          <div
            style={{
              padding: "12px 24px",
              borderTop: "1px solid #cbd5e1",
              backgroundColor: "#f8fafc",
            }}
          >
            <div
              className="footer-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {/* Summary */}
              <div
                className="footer-summary"
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  fontSize: 11,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#334155",
                }}
              >
                <span>Total Credit: {totalCredit}</span>
                <span>Credit Earned: {totalCredit}</span>
                <span>CGPA: {avgCgpa.toFixed(2)}</span>
              </div>

              {/* QR */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=84x84&data=${encodeURIComponent(
                    `${typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL}/student-result-page?roll=${result.roll}`,
                  )}`}
                  alt="QR Code"
                  width={64}
                  height={64}
                />
                <p
                  style={{
                    fontSize: 8,
                    color: "#94a3b8",
                    margin: 0,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Scan to verify
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Note */}
        <div
          style={{
            padding: "10px 24px",
            borderTop: "1px solid #e2e8f0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 9,
              color: "#94a3b8",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            Note: This is a computer-generated marksheet and does not require
            any signature.
          </p>
        </div>
      </div>

      <style>{`
        /* ── Mobile Responsive ── */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        .semester-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .footer-summary {
          flex-direction: column;
          gap: 4px !important;
        }

        @media (min-width: 640px) {
          .info-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .semester-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .footer-summary {
            flex-direction: row !important;
            gap: 16px !important;
          }
        }

        /* ── Print ── */
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

          .print-wrapper {
            width: 100% !important;
          }

          .print-area {
            width: 100% !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* Info — 2 col in print */
          .info-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }

          /* Semesters — 2 col in print */
          .semester-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }

          /* Each semester card — no page break inside */
          .semester-card {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* Footer row */
          .footer-row {
            flex-direction: row !important;
          }

          .footer-summary {
            flex-direction: row !important;
            gap: 16px !important;
          }

          .print-area table {
            font-size: 7px !important;
          }

          .result-header {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
      <td style={{ padding: "4px 16px 4px 0", fontWeight: 700, color: "#475569", fontSize: 11, whiteSpace: "nowrap", width: 140 }}>
        {label}
      </td>
      <td style={{ padding: "4px 0", color: "#1e293b", fontWeight: 600, fontSize: 11 }}>
        {value || "—"}
      </td>
    </tr>
  );
}