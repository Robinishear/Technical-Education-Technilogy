/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  GraduationCap,
  ZoomIn,
  ZoomOut,
  X,
  Printer,
} from "lucide-react";
import {
  getSemesterGrade,
  Mark,
} from "@/features/AdminDashboard/all-students/markStudent/types/markStudent.types";
import { getMarksAction } from "@/features/AdminDashboard/all-students/markStudent/actions/markStudent.actions";

interface Props {
  studentId: string;
  student: any;
  onClose: () => void;
}

const SHEET_H = 1105;

export default function TranscriptResultModal({
  studentId,
  student,
  onClose,
}: Props) {
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
    return () => {
      ignore = true;
    };
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
          @page { size: A4 portrait; margin: 0; }
          html, body {
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          #transcript-modal-overlay { display: none !important; }
          #transcript-print-only {
            display: block !important;
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 794px !important;
            height: ${SHEET_H}px !important;
            background: #ffffff !important;
            z-index: 999999 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .transcript-sheet {
            width: 794px !important;
            height: ${SHEET_H}px !important;
            border: none !important;
            border-radius: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }

        .transcript-scroll-area::-webkit-scrollbar { width: 6px; height: 6px; }
        .transcript-scroll-area::-webkit-scrollbar-track { background: transparent; }
        .transcript-scroll-area::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .transcript-scroll-area::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* MODAL OVERLAY */}
      <div
        id="transcript-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col"
          style={{
            width: "min(95vw, 1000px)",
            maxHeight: "95vh",
            height: "95vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
            <div>
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
                Academic Transcript Preview
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {student?.name} · {student?.roll}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setScale((s) => Math.max(0.3, +(s - 0.1).toFixed(1)))
                }
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="Zoom Out"
              >
                <ZoomOut
                  size={16}
                  className="text-gray-600 dark:text-gray-300"
                />
              </button>
              <span className="text-xs font-mono text-gray-500 w-10 text-center select-none">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() =>
                  setScale((s) => Math.min(2, +(s + 0.1).toFixed(1)))
                }
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="Zoom In"
              >
                <ZoomIn
                  size={16}
                  className="text-gray-600 dark:text-gray-300"
                />
              </button>
              <button
                onClick={onClose}
                className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                title="Close"
              >
                <X size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Scrollable Preview */}
          <div
            className="transcript-scroll-area flex-1 overflow-auto bg-gray-100 dark:bg-gray-950"
            style={{ minHeight: 0 }}
          >
            {loading && (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                  Loading Results...
                </p>
              </div>
            )}
            {!loading && marks.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <GraduationCap size={48} className="text-slate-300" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                  কোনো Result পাওয়া যায়নি
                </p>
              </div>
            )}
            {!loading && marks.length > 0 && (
              <div
                style={{
                  minWidth: "100%",
                  minHeight: "100%",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "28px",
                  boxSizing: "border-box",
                }}
              >
                {/* proxy sized to scaled sheet */}
                <div
                  style={{
                    width: `${794 * scale}px`,
                    height: `${SHEET_H * scale}px`,
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "794px",
                      height: `${SHEET_H}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                      transition: "transform 0.2s ease",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <Sheet
                      student={student}
                      marks={marks}
                      avgCgpa={avgCgpa}
                      totalCredit={totalCredit}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300"
            >
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

      {/* PRINT-ONLY */}
      <div id="transcript-print-only">
        {!loading && marks.length > 0 && (
          <Sheet
            student={student}
            marks={marks}
            avgCgpa={avgCgpa}
            totalCredit={totalCredit}
          />
        )}
      </div>
    </>
  );
}

/* ── helpers ── */
const monthName = (m: string | number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[parseInt(String(m)) - 1] ?? m;
};

/* ── Sheet ── */
function Sheet({
  student,
  marks,
  avgCgpa,
  totalCredit,
}: {
  student: any;
  marks: Mark[];
  avgCgpa: number;
  totalCredit: number;
}) {
  const count = marks.length;

  // Auto-scale based on semester count
  const fontSize =
    count <= 4
      ? "8px"
      : count <= 6
        ? "7px"
        : count <= 8
          ? "6px"
          : count <= 10
            ? "5.5px"
            : "5px";
  const thPad =
    count <= 4
      ? "4px 4px"
      : count <= 6
        ? "3px 3px"
        : count <= 8
          ? "2px 3px"
          : "1.5px 2px";
  const tdPad =
    count <= 4
      ? "3px 3px"
      : count <= 6
        ? "2px 3px"
        : count <= 8
          ? "2px 2px"
          : "1px 2px";
  const tdPadWide =
    count <= 4
      ? "3px 5px"
      : count <= 6
        ? "2px 4px"
        : count <= 8
          ? "2px 4px"
          : "1px 3px";
  const rowGap =
    count <= 4
      ? "12px"
      : count <= 6
        ? "10px"
        : count <= 8
          ? "8px"
          : count <= 10
            ? "6px"
            : "4px";
  const lineH = count <= 6 ? "1.4" : count <= 8 ? "1.3" : "1.1";
  const footerPad =
    count <= 6 ? "3px 4px" : count <= 8 ? "2px 4px" : "1.5px 4px";

  const gridCols = "1fr 1fr";

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(
    `${typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL}/student-result-page?roll=${student?.roll}`,
  )}`;

  return (
    <div
      className="transcript-sheet"
      style={{
        width: "794px",
        height: `${SHEET_H}px`,
        color: "#000",
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        fontSize: "9px",
        position: "relative",
        backgroundImage: "url('/transcript.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "100% 100%",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        overflow: "hidden",
        paddingLeft: "50px",
        paddingRight: "50px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header spacer */}
      <div style={{ height: "172px" }} />

      {/* Serial No */}
      <div
        style={{
          fontSize: "8px",
          fontWeight: "bold",
          color: "#000",
          marginBottom: "4px",
          paddingLeft: "40px",
          paddingTop: "8px",
        }}
      >
        Serial No:{" "}
        <span style={{ color: "#0b3a7d" }}>
          {student?.studentId || "001131"}
        </span>
      </div>

      {/* Info Section */}
      <div
        style={{
          display: "flex",
          gap: "0px",
          marginBottom: "8px",
          alignItems: "flex-start",
          paddingLeft: "31px",
          paddingRight: "10px",
        }}
      >
        {/* Left col */}
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            gap: "1.5px",
          }}
        >
          <InfoRow label="Name of Student" value={student?.name} />
          <InfoRow label="Father's Name" value={student?.fatherName} />
          <InfoRow label="Mother's Name" value={student?.motherName} />
          <InfoRow label="Institution" value={student?.institute} />
          <InfoRow
            label="Technology"
            value={student?.courseName || student?.educationQualification}
          />
          <InfoRow
            label="Final CGPA"
            value={avgCgpa > 0 ? avgCgpa.toFixed(2) : "0.00"}
          />
        </div>
        {/* Middle col */}
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            gap: "1.5px",
            paddingLeft: "10px",
          }}
        >
          <InfoRow label="Roll No" value={student?.roll} />
          <InfoRow label="Registration No" value={student?.regNumber} />
          <InfoRow label="Course Duration" value={student?.duration} />
          <InfoRow
            label="Session"
            value={
              student?.month1
                ? `${monthName(student.month1)} - ${monthName(student.month2)} ${student.year1}`
                : "—"
            }
          />
          <InfoRow label="Earned Credit" value={totalCredit} />
          <InfoRow label="Letter Grade" value={getSemesterGrade(avgCgpa)} />
        </div>
        {/* Grading table */}
        <div
          style={{
            width: "130px",
            flexShrink: 0,
            marginRight: "5px",
            alignSelf: "flex-start",
            marginTop: "-18px",
          }}
        >
          <GradingSystemTable />
        </div>
      </div>

      {/* Semester Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: `${rowGap} 10px`,
          marginTop: "10px",
          marginBottom: "6px",
          paddingLeft: "40px",
          paddingRight: "40px",
          alignItems: "start",
          alignContent: "start",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {marks.map((mark) => (
          <div
            key={mark.id}
            style={{
              border: "1px solid #999",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize,
                tableLayout: "fixed",
                lineHeight: lineH,
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#d8d8d8",
                    borderBottom: "1px solid #999",
                  }}
                >
                  <th
                    style={{
                      width: "15%",
                      padding: thPad,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize,
                      borderRight: "1px solid #999",
                      color: "#000",
                    }}
                  >
                    Sub Code
                  </th>
                  <th
                    style={{
                      width: "43%",
                      padding: thPad,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize,
                      borderRight: "1px solid #999",
                      color: "#000",
                    }}
                  >
                    Subject Name
                  </th>
                  <th
                    style={{
                      width: "10%",
                      padding: thPad,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize,
                      borderRight: "1px solid #999",
                      color: "#000",
                    }}
                  >
                    Credit
                  </th>
                  <th
                    style={{
                      width: "16%",
                      padding: thPad,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize,
                      borderRight: "1px solid #999",
                      color: "#000",
                    }}
                  >
                    Grade
                  </th>
                  <th
                    style={{
                      width: "16%",
                      padding: thPad,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize,
                      color: "#000",
                    }}
                  >
                    Point
                  </th>
                </tr>
              </thead>
              <tbody>
                {mark.subjects
                  .filter(
                    (sub) =>
                      sub.subjectCode?.trim() !== "" &&
                      sub.subjectCode !== "750XXX",
                  )
                  .map((sub, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: "1px solid #e0e0e0",
                        backgroundColor: "#fff",
                      }}
                    >
                      <td
                        style={{
                          padding: tdPad,
                          textAlign: "center",
                          fontSize,
                          borderRight: "1px solid #e0e0e0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "#000",
                        }}
                      >
                        {sub.subjectCode}
                      </td>
                      <td
                        style={{
                          padding: tdPadWide,
                          textAlign: "center",
                          fontSize,
                          borderRight: "1px solid #e0e0e0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "#000",
                        }}
                      >
                        {sub.subjectName}
                      </td>
                      <td
                        style={{
                          padding: tdPad,
                          textAlign: "center",
                          fontSize,
                          borderRight: "1px solid #e0e0e0",
                          color: "#000",
                        }}
                      >
                        {sub.credit}
                      </td>
                      <td
                        style={{
                          padding: tdPad,
                          textAlign: "center",
                          fontSize,
                          fontWeight: 700,
                          color: sub.grade === "F" ? "#cc0000" : "#000",
                          borderRight: "1px solid #e0e0e0",
                        }}
                      >
                        {sub.grade}
                      </td>
                      <td
                        style={{
                          padding: tdPad,
                          textAlign: "center",
                          fontSize,
                          color: "#000",
                        }}
                      >
                        {sub.gradePoint.toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div
              style={{
                borderTop: "1px solid #999",
                backgroundColor: "#e8e8e8",
                padding: footerPad,
                fontSize,
                fontWeight: 700,
                color: "#000",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                Semester: {mark.semesterTitle.replace(/semester/i, "").trim()} |
                GPA: {mark.cgpa.toFixed(2)}
              </span>
              <span>Grade: {mark.grade || getSemesterGrade(mark.cgpa)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Signatures */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "10px",
          paddingLeft: "50px",
          paddingRight: "50px",
          flexShrink: 0,
          paddingBottom: "75px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* QR */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              alignItems: "center",
            }}
          >
            <img
              src={qrSrc}
              alt="QR"
              crossOrigin="anonymous"
              style={{ width: "56px", height: "56px", display: "block" }}
            />
            <span
              style={{
                fontSize: "7.5px",
                fontWeight: 700,
                color: "#000",
                textAlign: "center",
              }}
            >
              Result Published:{" "}
              {marks.length > 0
                ? new Date(
                    Math.max(
                      ...marks.map((m) => new Date(m.createdAt).getTime()),
                    ),
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
            </span>
          </div>
          {/* Compared By */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "130px",
            }}
          >
            <span
              style={{
                fontFamily: "cursive",
                fontSize: "15px",
                color: "#000",
                display: "block",
                marginBottom: "2px",
              }}
            >
              Zahid
            </span>
            <div
              style={{
                width: "100%",
                borderTop: "1px solid #000",
                marginBottom: "2px",
              }}
            />
            <span style={{ fontSize: "8px", fontWeight: 700, color: "#000" }}>
              Compared By
            </span>
          </div>
          {/* Controller */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "200px",
            }}
          >
            <span
              style={{
                fontFamily: "cursive",
                fontSize: "16px",
                color: "#000",
                display: "block",
                marginBottom: "2px",
              }}
            >
              Sayful
            </span>
            <div
              style={{
                width: "100%",
                borderTop: "1px solid #000",
                marginBottom: "2px",
              }}
            />
            <span
              style={{
                fontSize: "8px",
                fontWeight: 700,
                color: "#000",
                textAlign: "center",
                lineHeight: "1.3",
              }}
            >
              Controller of Examinations
              <br />
              Bangladesh National Technical Education Institute
            </span>
          </div>
        </div>
        <p
          style={{
            color: "#cc0000",
            fontSize: "7.5px",
            fontWeight: 700,
            textAlign: "center",
            marginTop: "10px",
            letterSpacing: "0.03em",
          }}
        >
          For verification please visit BNTEI website: www.bntei.com
        </p>
      </div>
    </div>
  );
}

/* ── sub-components ── */
function InfoRow({ label, value }: { label: string; value?: any }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        fontSize: "9px",
        lineHeight: "1.45",
        color: "#000",
      }}
    >
      <span style={{ fontWeight: 600, width: "105px", flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ marginRight: "6px", fontWeight: 600 }}>:</span>
      <span
        style={{
          fontWeight: 700,
          color: "#0b3a7d",
          flex: 1,
          wordBreak: "break-word",
        }}
      >
        {value !== undefined && value !== null && value !== "" ? value : "—"}
      </span>
    </div>
  );
}

function GradingSystemTable() {
  const thS: React.CSSProperties = {
    padding: "2px 3px",
    border: "1px solid #888",
    fontWeight: "bold",
    fontSize: "6px",
    whiteSpace: "nowrap",
  };
  const tdS: React.CSSProperties = {
    padding: "1.5px 3px",
    border: "1px solid #ccc",
    fontSize: "6px",
    whiteSpace: "nowrap",
  };
  return (
    <table
      style={{
        width: "85%",
        borderCollapse: "collapse",
        fontSize: "6.5px",
        textAlign: "center",
        lineHeight: "1.2",
        backgroundColor: "#fff",
        border: "1px solid #aaa",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#e8e8e8" }}>
          <th
            colSpan={3}
            style={{
              padding: "2px 3px",
              fontWeight: "bold",
              fontSize: "6.5px",
              borderBottom: "1px solid #aaa",
              textAlign: "center",
            }}
          >
            Grading System
          </th>
        </tr>
        <tr style={{ backgroundColor: "#e8e8e8" }}>
          <th style={thS}>% of Marks</th>
          <th style={thS}>Grade</th>
          <th style={thS}>GP</th>
        </tr>
      </thead>
      <tbody>
        {[
          { range: "80 or Above", grade: "A+", gp: "4.00" },
          { range: "75 - Below 80", grade: "A", gp: "3.75" },
          { range: "70 - Below 75", grade: "A-", gp: "3.50" },
          { range: "65 - Below 70", grade: "B+", gp: "3.25" },
          { range: "60 - Below 65", grade: "B", gp: "3.00" },
          { range: "55 - Below 60", grade: "B-", gp: "2.75" },
          { range: "50 - Below 55", grade: "C+", gp: "2.50" },
          { range: "45 - Below 50", grade: "C", gp: "2.25" },
          { range: "40 - Below 45", grade: "D", gp: "2.00" },
          { range: "Below 40", grade: "F", gp: "0.00" },
        ].map((row, idx) => (
          <tr
            key={idx}
            style={{ backgroundColor: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
          >
            <td style={tdS}>{row.range}</td>
            <td style={{ ...tdS, fontWeight: 700 }}>{row.grade}</td>
            <td style={tdS}>{row.gp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
