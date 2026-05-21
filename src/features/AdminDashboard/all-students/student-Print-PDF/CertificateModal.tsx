/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut, Download, Eye } from "lucide-react";
import { useState } from "react";
import { Student } from "../admin-students/types/admin-students.types";

export const CertificateModal = ({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) => {
  const [scale, setScale] = useState(1);

  const slNo = student.studentId?.replace("STU-", "") || "—";
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
    const idx = parseInt(String(m)) - 1;
    return months[idx] ?? m;
  };

  const P = {
    slNo: { top: "37.9%", left: "17%" },
    regNo: { top: "37.2%", left: "74.5%" },
    session: { top: "41.8%", left: "70.5%" },
    name: { top: "43.7%", left: "32.0%" },
    father: { top: "48.3%", left: "28.0%" },
    mother: { top: "53.4%", left: "18.5%" },
    institute: { top: "58%", left: "19.5%" },
    roll: { top: "63.2%", left: "27.0%" },
    qual: { top: "63.2%", left: "50.0%" },
    exam: { top: "67.8%", left: "41.5%" },
    cgpa: { top: "68%", left: "77.5%" },
    date1: { top: "80.2%", left: "25.0%" },
    date2: { top: "82%", left: "18.5%" },
  };

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<title>Certificate - ${student.name}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4 landscape; margin: 0; }
  body { width: 297mm; height: 210mm; font-family: 'Times New Roman', serif; overflow: hidden; }
  .card { width: 297mm; height: 210mm; position: relative; background: white; }
  .bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; z-index: 0; }
  .overlay { position: absolute; inset: 0; z-index: 1; }
  .f {
    position: absolute;
    font-weight: 700;
    font-style: italic;
    color: #000;
    font-size: 11pt;
  }
</style>
</head>
<body>
<div class="card">
  <img class="bg" src="${window.location.origin}/Certificate.png" crossorigin="anonymous" />
  <div class="overlay">
    <div class="f" style="top:${P.slNo.top}; left:${P.slNo.left}; font-size:10pt;">${slNo}</div>
    <div class="f" style="top:${P.regNo.top}; left:${P.regNo.left}; font-size:10pt;">${student.regNumber || "—"}</div>
    <div class="f" style="top:${P.session.top}; left:${P.session.left}; font-size:10pt;">${monthName(student.month1)} - ${monthName(student.month2)} ${student.year1}</div>
    <div class="f" style="top:${P.name.top}; left:${P.name.left}; right:8%;">${student.name || "—"}</div>
    <div class="f" style="top:${P.father.top}; left:${P.father.left}; right:14%;">${student.fatherName || "—"}</div>
    <div class="f" style="top:${P.mother.top}; left:${P.mother.left}; right:14%;">${student.motherName || "—"}</div>
    <div class="f" style="top:${P.institute.top}; left:${P.institute.left}; right:8%;">${student.institute || "—"}</div>
    <div class="f" style="top:${P.roll.top}; left:${P.roll.left};">${student.roll || "—"}</div>
    <div class="f" style="top:${P.qual.top}; left:${P.qual.left}; right:8%;">${student.educationQualification || "—"}</div>
    <div class="f" style="top:${P.exam.top}; left:${P.exam.left};">${monthName(student.month1)} ${student.year1}</div>
    <div class="f" style="top:${P.cgpa.top}; left:${P.cgpa.left};">—</div>
    <div class="f" style="top:${P.date1.top}; left:${P.date1.left}; font-size:8.5pt;">${today}</div>
    <div class="f" style="top:${P.date2.top}; left:${P.date2.left}; font-size:8.5pt;">${today}</div>
  </div>
</div>
<script>
  window.onload = function() {
    setTimeout(function() {
      window.print();
      window.onafterprint = function() { window.close(); };
    }, 600);
  };
</script>
</body>
</html>`);
    printWindow.document.close();
  };

  const fieldStyle = (
    top: string,
    left: string,
    extra?: React.CSSProperties,
  ): React.CSSProperties => ({
    position: "absolute" as const,
    top,
    left,
    fontSize: "0.9vw",
    fontWeight: 700,
    fontStyle: "italic" as const,
    color: "#000",
    ...extra,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="flex flex-col w-full max-w-5xl"
        style={{
          background: "white",
          borderRadius: 20,
          maxHeight: "95vh",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            borderBottom: "1px solid #f0f0f0",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center"
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(255,255,255,0.12)",
              }}
            >
              <Eye size={18} color="white" />
            </div>
            <div>
              <h2 className="font-semibold text-white" style={{ fontSize: 15 }}>
                Certificate Preview
              </h2>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 1,
                }}
              >
                {student.name} &middot; {student.regNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(1)))
              }
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
              }
            >
              <ZoomOut size={15} color="white" />
            </button>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "white",
                width: 44,
                textAlign: "center",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 6,
                padding: "4px 0",
              }}
            >
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() =>
                setScale((s) => Math.min(2, +(s + 0.1).toFixed(1)))
              }
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
              }
            >
              <ZoomIn size={15} color="white" />
            </button>
            <div
              style={{
                width: 1,
                height: 24,
                background: "rgba(255,255,255,0.15)",
                margin: "0 4px",
              }}
            />
            <button
              onClick={onClose}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "rgba(239,68,68,0.15)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(239,68,68,0.35)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(239,68,68,0.15)")
              }
            >
              <X size={16} color="#f87171" />
            </button>
          </div>
        </div>

        {/* ── Preview ── */}
        <div
          className="flex-1 overflow-auto flex items-start justify-center"
          style={{ background: "#0f0f1a", padding: "28px 24px" }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "297 / 210",
              position: "relative",
              background: "white",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease",
            }}
          >
            <img
              src="/Certificate.png"
              alt=""
              className="absolute inset-0 w-full h-full object-fill"
            />

            <div
              className="absolute inset-0"
              style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
            >
              {/* SL No */}
              <div
                style={fieldStyle(P.slNo.top, P.slNo.left, {
                  fontSize: "0.85vw",
                })}
              >
                {slNo}
              </div>

              {/* Registration No */}
              <div
                style={fieldStyle(P.regNo.top, P.regNo.left, {
                  fontSize: "0.85vw",
                })}
              >
                {student.regNumber || "—"}
              </div>

              {/* Session */}
              <div
                style={fieldStyle(P.session.top, P.session.left, {
                  fontSize: "0.85vw",
                })}
              >
                {monthName(student.month1)} - {monthName(student.month2)}{" "}
                {student.year1}
              </div>

              {/* Name */}
              <div style={fieldStyle(P.name.top, P.name.left, { right: "8%" })}>
                {student.name || "—"}
              </div>

              {/* Father */}
              <div
                style={fieldStyle(P.father.top, P.father.left, {
                  right: "14%",
                })}
              >
                {student.fatherName || "—"}
              </div>

              {/* Mother */}
              <div
                style={fieldStyle(P.mother.top, P.mother.left, {
                  right: "14%",
                })}
              >
                {student.motherName || "—"}
              </div>

              {/* Institute */}
              <div
                style={fieldStyle(P.institute.top, P.institute.left, {
                  right: "8%",
                })}
              >
                {student.institute || "—"}
              </div>

              {/* Roll */}
              <div style={fieldStyle(P.roll.top, P.roll.left)}>
                {student.roll || "—"}
              </div>

              {/* Qualification */}
              <div style={fieldStyle(P.qual.top, P.qual.left, { right: "8%" })}>
                {student.educationQualification || "—"}
              </div>

              {/* Exam month year */}
              <div style={fieldStyle(P.exam.top, P.exam.left)}>
                {monthName(student.month1)} {student.year1}
              </div>

              {/* CGPA */}
              <div style={fieldStyle(P.cgpa.top, P.cgpa.left)}>—</div>

              {/* Dates */}
              <div
                style={fieldStyle(P.date1.top, P.date1.left, {
                  fontSize: "0.6vw",
                })}
              >
                {today}
              </div>
              <div
                style={fieldStyle(P.date2.top, P.date2.left, {
                  fontSize: "0.6vw",
                })}
              >
                {today}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{ borderTop: "1px solid #f0f0f0", background: "#fafafa" }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 12,
              border: "1.5px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: "#6b7280",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f9fafb";
              e.currentTarget.style.borderColor = "#d1d5db";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(245,158,11,0.5)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(245,158,11,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
