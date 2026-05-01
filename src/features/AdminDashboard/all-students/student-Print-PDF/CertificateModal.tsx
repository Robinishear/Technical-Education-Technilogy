/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { Student } from "../type-utils";
import { Button } from "@/components/ui/button";

export const CertificateModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {
  const [scale, setScale] = useState(1);

  const slNo = student.studentId?.replace("STU-", "") || "—";
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

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
  .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; padding: 52mm 18mm 8mm 18mm; }
  .top-row { display: flex; justify-content: space-between; font-size: 9pt; margin-bottom: 5mm; font-style: italic; font-weight: 700; }
  .right-info { text-align: right; line-height: 2; }
  .line { display: flex; align-items: baseline; gap: 2mm; font-size: 10.5pt; margin-bottom: 4mm; font-style: italic; font-weight: 700; }
  .val { font-weight: 700; color: #000; }
  .sig-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 5mm; }
  .sig-block { text-align: center; font-size: 8pt; font-style: italic; }
  .sig-line { border-top: 1px solid #333; width: 45mm; margin: 0 auto 1.5mm; }
  .date-block { font-size: 8pt; font-style: italic; line-height: 1.8; }
  .bottom-note { position: absolute; bottom: 5mm; left: 0; right: 0; text-align: center; font-size: 9pt; color: #cc0000; font-weight: 700; font-style: italic; }
</style>
</head>
<body>
<div class="card">
  <img class="bg" src="${window.location.origin}/Certificate.png" crossorigin="anonymous" />
  <div class="overlay">

    <div class="top-row">
      <span>${slNo}</span>
      <div class="right-info">
        <div>${student.regNumber || "—"}</div>
        <div>${student.month1} - ${student.month2} ${student.year1}</div>
      </div>
    </div>

    <div class="line">
      <span class="val">${student.name || "—"}</span>
    </div>

    <div class="line">
      <span class="val">${student.fatherName || "—"}</span>
      <span style="font-size:8pt;font-weight:400;">(Father)</span>
    </div>

    <div class="line">
      <span class="val">${student.motherName || "—"}</span>
      <span style="font-size:8pt;font-weight:400;">(Mother)</span>
    </div>

    <div class="line">
      <span class="val">${student.institute || "—"}</span>
    </div>

    <div class="line">
      <span class="val">${student.roll || "—"}</span>
      <span style="font-weight:400;">duly passed the</span>
      <span class="val">${student.educationQualification || "—"}</span>
    </div>

    <div class="line">
      <span class="val">${student.month1} ${student.year1}</span>
      <span style="font-weight:400;">He/She Secured CGPA</span>
      <span class="val">—</span>
      <span style="font-weight:400;">on a</span>
    </div>

    <div class="line">
      <span style="font-weight:400;">Scale of 4.00 at Under the "Education Program" A Project of Bangladesh Technical Education Technology.</span>
    </div>

    <div class="sig-row">
      <div class="date-block">
        <div>${today}</div>
        <div>${today}</div>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <p>Compared By</p>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <p>Deputy Controller of Examinations</p>
      </div>
    </div>

  </div>
  <div class="bottom-note">This Certificate is issued without any alteration or erasure</div>
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[95vh]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Certificate Preview</h2>
            <p className="text-xs text-gray-400 mt-0.5">{student.name} · {student.regNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(1)))}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <ZoomOut size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-xs font-mono text-gray-500 w-10 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(2, +(s + 0.1).toFixed(1)))}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <ZoomIn size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={onClose}
              className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
            >
              <X size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* ── Preview ── */}
        <div className="overflow-auto flex-1 p-6 flex items-start justify-center bg-gray-50 dark:bg-gray-950">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease",
              width: "100%",
              aspectRatio: "297 / 210",
              position: "relative",
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }}
          >
            <img src="/Certificate.png" alt="" className="absolute inset-0 w-full h-full object-fill" />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ padding: "25% 6% 4% 6%", fontFamily: "'Times New Roman', serif" }}
            >
              {/* SL + Reg + Session — শুধু value */}
              <div className="flex justify-between" style={{ fontSize: "0.72vw", fontWeight: 700, fontStyle: "italic", marginBottom: "1.2%" }}>
                <span>{slNo}</span>
                <div className="text-right" style={{ lineHeight: 1.9 }}>
                  <div>{student.regNumber || "—"}</div>
                  <div>{student.month1} - {student.month2} {student.year1}</div>
                </div>
              </div>

              {/* This is to certify that — শুধু name */}
              <div style={{ fontSize: "0.8vw", fontWeight: 700, fontStyle: "italic", marginBottom: "0.6vw" }}>
                {student.name || "—"}
              </div>

              {/* Son/Daughter of — শুধু fatherName */}
              <div className="flex items-baseline" style={{ fontSize: "0.8vw", fontWeight: 700, fontStyle: "italic", marginBottom: "0.6vw", gap: "0.3vw" }}>
                <span>{student.fatherName || "—"}</span>
                <span style={{ fontSize: "0.6vw", fontWeight: 400 }}>(Father)</span>
              </div>

              {/* and — শুধু motherName */}
              <div className="flex items-baseline" style={{ fontSize: "0.8vw", fontWeight: 700, fontStyle: "italic", marginBottom: "0.6vw", gap: "0.3vw" }}>
                <span>{student.motherName || "—"}</span>
                <span style={{ fontSize: "0.6vw", fontWeight: 400 }}>(Mother)</span>
              </div>

              {/* of — শুধু institute */}
              <div style={{ fontSize: "0.8vw", fontWeight: 700, fontStyle: "italic", marginBottom: "0.6vw" }}>
                {student.institute || "—"}
              </div>

              {/* bearing Roll No — roll + subject */}
              <div className="flex items-baseline flex-wrap" style={{ fontSize: "0.8vw", fontWeight: 700, fontStyle: "italic", marginBottom: "0.6vw", gap: "0.3vw" }}>
                <span>{student.roll || "—"}</span>
                <span style={{ fontWeight: 400 }}>duly passed the</span>
                <span>{student.educationQualification || "—"}</span>
              </div>

              {/* Exam month + CGPA */}
              <div className="flex items-baseline flex-wrap" style={{ fontSize: "0.8vw", fontWeight: 700, fontStyle: "italic", marginBottom: "0.6vw", gap: "0.3vw" }}>
                <span>{student.month1} {student.year1}</span>
                <span style={{ fontWeight: 400 }}>He/She Secured CGPA</span>
                <span>—</span>
                <span style={{ fontWeight: 400 }}>on a</span>
              </div>

              {/* Scale line */}
              <div style={{ fontSize: "0.8vw", fontWeight: 400, fontStyle: "italic", marginBottom: "0.8vw" }}>
                Scale of 4.00 at Under the "Education Program" A Project of Bangladesh Technical Education Technology.
              </div>

              {/* Signatures */}
              <div className="flex justify-between items-end" style={{ fontSize: "0.6vw", fontStyle: "italic" }}>
                <div style={{ lineHeight: 1.8 }}>
                  <div>{today}</div>
                  <div>{today}</div>
                </div>
                {["Compared By", "Deputy Controller of Examinations"].map((sig, i) => (
                  <div key={i} className="text-center">
                    <div style={{ borderTop: "1px solid #333", width: "7vw", margin: "0 auto 0.3vw" }} />
                    <p>{sig}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <div
              className="absolute left-0 right-0 text-center"
              style={{ bottom: "2%", fontSize: "0.65vw", color: "#cc0000", fontWeight: 700, fontStyle: "italic" }}
            >
              This Certificate is issued without any alteration or erasure
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <Button variant="outline" onClick={onClose} className="flex-1 h-11 rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 h-11 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm tracking-widest uppercase"
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};