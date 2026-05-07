/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut, Download, Award } from "lucide-react";
import { useState } from "react";
import { Student } from "../type-utils";

export const CertificateModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {
  const [scale, setScale] = useState(1);

  const slNo = student.studentId?.replace("STU-", "") || "—";
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

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
  .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; }
  
  /* Styling for Text */
  .t { 
    position: absolute; 
    font-family: 'Times New Roman', serif; 
    font-weight: 700; 
    color: #1a1a1a; 
    font-size: 11pt; /* Font size ektu boro kora hoyeche */
  }
  
  .bottom-note { 
    position: absolute; 
    bottom: 8mm; 
    left: 0; 
    right: 0; 
    text-align: center; 
    font-size: 9pt; 
    color: #cc0000; 
    font-weight: 700; 
    font-style: italic; 
  }
</style>
</head>
<body>
<div class="card">
  <img class="bg" src="${window.location.origin}/Certificate.png" crossorigin="anonymous" />
  <div class="overlay">
    
    <!-- SL No & Reg No Section -->
    <div class="t" style="top: 38.5mm; left: 28mm;">${slNo}</div>
    <div class="t" style="top: 38.5mm; right: 28mm; text-align: right; line-height: 2.2;">
      <div>${student.regNumber || "—"}</div>
      <div>${student.month1} - ${student.month2} ${student.year1}</div>
    </div>

    <!-- Student Details - Aligning with Dotted Lines -->
    <!-- Name -->
    <div class="t" style="top: 54.5mm; left: 75mm; width: 190mm;">${student.name || "—"}</div>
    
    <!-- Father's Name -->
    <div class="t" style="top: 65.5mm; left: 60mm; width: 200mm;">${student.fatherName || "—"}</div>
    
    <!-- Mother's Name -->
    <div class="t" style="top: 76.5mm; left: 45mm; width: 220mm;">${student.motherName || "—"}</div>
    
    <!-- Institute -->
    <div class="t" style="top: 87.5mm; left: 40mm; width: 225mm;">${student.institute || "—"}</div>

    <!-- Roll & Qualification -->
    <div class="t" style="top: 98.5mm; left: 65mm;">${student.roll || "—"}</div>
    <div class="t" style="top: 98.5mm; left: 135mm; width: 130mm;">${student.educationQualification || "—"}</div>

    <!-- Exam Info & CGPA -->
    <div class="t" style="top: 109.5mm; left: 78mm;">${student.month1} ${student.year1}</div>
    <div class="t" style="top: 109.5mm; left: 190mm;">${student.cgpa || "4.00"}</div>

    <!-- Footer Dates -->
    <div class="t" style="bottom: 28mm; left: 25mm; font-size: 8.5pt; font-weight: 400; line-height: 1.8;">
      <div>Date of Publication of Result: ${today}</div>
      <div>Date of issue: ${today}</div>
    </div>

  </div>
  <div class="bottom-note">This Certificate is issued without any alteration or erasure</div>
</div>
<script>
  window.onload = function() {
    setTimeout(function() { window.print(); window.onafterprint = function() { window.close(); }; }, 800);
  };
</script>
</body>
</html>`);
    printWindow.document.close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="flex flex-col w-full max-w-5xl"
        style={{
          background: "white", borderRadius: "20px",
          maxHeight: "95vh", overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
        >
          <div className="flex items-center gap-3">
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Award size={18} color="white" />
            </div>
            <div>
              <h2 className="font-semibold text-white" style={{ fontSize: 15 }}>Certificate Preview</h2>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>
                {student.name} &middot; {student.regNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setScale(s => Math.max(0.4, +(s - 0.1).toFixed(1)))}
              style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            ><ZoomOut size={15} color="white" /></button>

            <span style={{ fontSize: 12, fontWeight: 600, color: "white", width: 44, textAlign: "center", background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 0" }}>
              {Math.round(scale * 100)}%
            </span>

            <button onClick={() => setScale(s => Math.min(2, +(s + 0.1).toFixed(1)))}
              style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            ><ZoomIn size={15} color="white" /></button>

            <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />

            <button onClick={onClose}
              style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(239,68,68,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.35)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.15)")}
            ><X size={16} color="#f87171" /></button>
          </div>
        </div>

        {/* ── Preview ── */}
        <div className="flex-1 overflow-auto flex items-start justify-center"
          style={{ background: "#0f0f1a", padding: "28px 24px" }}
        >
          <div style={{
            width: "100%", aspectRatio: "297 / 210", position: "relative",
            background: "white", borderRadius: 10, overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            transform: `scale(${scale})`, transformOrigin: "top center", transition: "transform 0.2s ease",
          }}>
            <img src="/Certificate.png" alt="" className="absolute inset-0 w-full h-full object-fill" />

            <div className="absolute inset-0" style={{ fontFamily: "'Times New Roman', serif" }}>

              {/* SL No */}
              <div style={{ position: "absolute", top: "23.5%", left: "6.7%", fontSize: "0.72vw", fontWeight: 700, fontStyle: "italic" }}>
                {slNo}
              </div>

              {/* Reg No + Session — right */}
              <div style={{ position: "absolute", top: "22.8%", right: "6.7%", textAlign: "right", fontSize: "0.72vw", fontWeight: 700, fontStyle: "italic", lineHeight: 2.1 }}>
                <div>{student.regNumber || "—"}</div>
                <div>{student.month1} - {student.month2} {student.year1}</div>
              </div>

              {/* NAME — "This is to certify that ..." dotted line */}
              <div style={{ position: "absolute", top: "34%", left: "24%", right: "6.7%", fontSize: "0.82vw", fontWeight: 700, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden" }}>
                {student.name || "—"}
              </div>

              {/* FATHER — "Son/Daughter of ..." */}
              <div style={{ position: "absolute", top: "43.5%", left: "18.5%", right: "8%", fontSize: "0.82vw", fontWeight: 700, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden" }}>
                {student.fatherName || "—"}
              </div>

              {/* MOTHER — "and ..." */}
              <div style={{ position: "absolute", top: "53%", left: "7%", right: "8%", fontSize: "0.82vw", fontWeight: 700, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden" }}>
                {student.motherName || "—"}
              </div>

              {/* INSTITUTE — "of ..." */}
              <div style={{ position: "absolute", top: "62%", left: "6%", right: "6.7%", fontSize: "0.82vw", fontWeight: 700, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden" }}>
                {student.institute || "—"}
              </div>

              {/* ROLL — "bearing Roll No ..." */}
              <div style={{ position: "absolute", top: "71%", left: "19.5%", fontSize: "0.82vw", fontWeight: 700, fontStyle: "italic" }}>
                {student.roll || "—"}
              </div>

              {/* SUBJECT — "duly passed the ..." */}
              <div style={{ position: "absolute", top: "71%", left: "37.5%", right: "6.7%", fontSize: "0.82vw", fontWeight: 700, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden" }}>
                {student.educationQualification || "—"}
              </div>

              {/* MONTH YEAR — "Examination held in month of ..." */}
              <div style={{ position: "absolute", top: "80%", left: "25%", fontSize: "0.82vw", fontWeight: 700, fontStyle: "italic" }}>
                {student.month1} {student.year1}
              </div>

              {/* CGPA — "He/She Secured CGPA ..." */}
              <div style={{ position: "absolute", top: "80%", left: "58%", fontSize: "0.82vw", fontWeight: 700, fontStyle: "italic" }}>
                —
              </div>

              {/* Date of Publication */}
              <div style={{ position: "absolute", bottom: "11%", left: "6.7%", fontSize: "0.55vw", fontStyle: "italic", lineHeight: 1.9 }}>
                <div>Date of Publication of Result: {today}</div>
                <div>Date of issue: {today}</div>
              </div>

              {/* Bottom note */}
              <div style={{ position: "absolute", bottom: "2%", left: 0, right: 0, textAlign: "center", fontSize: "0.65vw", color: "#cc0000", fontWeight: 700, fontStyle: "italic" }}>
                This Certificate is issued without any alteration or erasure
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderTop: "1px solid #f0f0f0", background: "#fafafa" }}>
          <button onClick={onClose}
            style={{ flex: 1, height: 44, borderRadius: 12, border: "1.5px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#6b7280", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#d1d5db"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
          >Cancel</button>

          <button onClick={handleDownload}
            style={{ flex: 1, height: 44, borderRadius: 12, border: "none", background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "white", letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 14px rgba(245,158,11,0.35)", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(245,158,11,0.5)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(245,158,11,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};