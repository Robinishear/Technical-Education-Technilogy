/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut, Download, Eye } from "lucide-react";
import { useState } from "react";
import { StudentQR, StudentQRHidden } from "../QR/AdminQR";
import { Student } from "../admin-students/types/admin-students.types";

const formatDOB = (dob: string): string => {
  if (!dob) return "—";
  try {
    const date = new Date(dob);
    if (isNaN(date.getTime())) return dob;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dob;
  }
};

export const AdmitCardModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {
  const [scale, setScale] = useState(1);

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });

    const qrSvgEl = document.getElementById("admit-qr-code");
    const qrSvgString = qrSvgEl ? qrSvgEl.outerHTML : "";

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<title>Admit Card - ${student.name}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  @page { size: A4 landscape; margin: 0; }

  body {
    width: 297mm;
    height: 210mm;
    font-family: Arial, sans-serif;
    overflow: hidden;
  }

  .card {
    width: 297mm;
    height: 210mm;
    position: relative;
    background: white;
  }

  .bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: 0;
  }

  .overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    /* বর্ডারের ভেতরে রাখার জন্য প্যাডিং বাড়ানো হয়েছে */
    padding: 18mm 32mm 18mm 32mm;
    display: flex;
    flex-direction: column;
  }

  .header-spacer { height: 50mm; }

  .serial {
    font-size: 9pt;
    color: #333;
    margin-bottom: 4mm;
  }

  .main { 
    display: flex; 
    width: 100%; 
    gap: 5mm;
  }

  .col-label { width: 42mm; flex-shrink: 0; }

  .col-value { flex: 1; min-width: 0; }

  .col-right {
    width: 65mm;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2mm;
  }

  .row {
    font-size: 9.5pt;
    color: #111;
    margin-bottom: 3mm;
    white-space: nowrap;
    /* ডট ডট বর্ডার রিমুভ করা হয়েছে */
    border: none; 
  }

  .lbl {
    font-weight: 700;
    font-family: 'Times New Roman', serif;
  }

  .val { color: #000; padding-left: 2mm; }

  .photo {
    width: 32mm;
    height: 38mm;
    object-fit: cover;
    border: 1.5px solid #444;
    display: block;
    margin-bottom: 2mm;
  }

  .rr-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2mm;
    margin-bottom: 1.5mm;
  }

  .rr-label {
    font-size: 9pt;
    font-weight: 700;
    font-family: 'Times New Roman', serif;
  }

  .rr-box {
    border: 1.5px solid #333;
    min-width: 28mm;
    text-align: center;
    padding: 0.8mm 2mm;
    font-weight: 700;
    font-size: 9.5pt;
    background: #fff;
  }

  .sex-line {
    font-size: 9pt;
    font-weight: 700;
    color: #111;
    text-align: right;
    font-family: 'Times New Roman', serif;
    margin-top: 1mm;
  }

  /* নিচের অংশ গুছিয়ে দেওয়া হয়েছে */
  .footer-area {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 5mm;
  }

  .directions {
    font-size: 8.5pt;
    line-height: 1.4;
    max-width: 55%;
  }

  .qr-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5mm;
  }

  .qr-block svg {
    width: 22mm !important;
    height: 22mm !important;
  }

  .signature-box {
    text-align: center;
    min-width: 60mm;
  }

  .sig-line {
    border-top: 1.2px solid #222;
    margin-bottom: 1mm;
  }

  .sig-text {
    font-size: 9pt;
    font-weight: 700;
    font-family: 'Times New Roman', serif;
  }

  .print-date {
    position: absolute;
    bottom: 6mm;
    left: 22mm;
    font-size: 7.5pt;
    color: #666;
  }
</style>
</head>
<body>
<div class="card">
  <img class="bg" src="${window.location.origin}/admit.png" crossorigin="anonymous" />
  <div class="overlay">
    <div class="header-spacer"></div>
    <p class="serial">Serial No. ${student.studentId}</p>
    <div class="main">
      <div class="col-label">
        <div class="row lbl">Institute Code</div>
        <div class="row lbl">Name of the Institute</div>
        <div class="row lbl">Name of the Student</div>
        <div class="row lbl">Father's Name</div>
        <div class="row lbl">Mother's Name</div>
        <div class="row lbl">Date of Birth</div>
        <div class="row lbl">Session</div>
        <div class="row lbl">Subject Name:</div>
        <div class="row val">${student.educationQualification || "—"}</div>
      </div>
      <div class="col-value">
        <div class="row val">: &nbsp;${student.studentId?.slice(0, 6) || "—"}</div>
        <div class="row val">: &nbsp;${student.institute || "—"}</div>
        <div class="row val">: &nbsp;${student.name || "—"}</div>
        <div class="row val">: &nbsp;${student.fatherName || "—"}</div>
        <div class="row val">: &nbsp;${student.motherName || "—"}</div>
        <div class="row val">: &nbsp;${formatDOB(student.dob)}</div>
        <div class="row val">: &nbsp;${student.month1} - ${student.month2} ${student.year1}</div>
        <div class="row val">:</div>
      </div>
      <div class="col-right">
        <img class="photo" src="${student.picture}" crossorigin="anonymous" alt="${student.name}" />
        <div style="width:100%">
          <div class="rr-row">
            <span class="rr-label">Roll.No :</span>
            <span class="rr-box">${student.roll || "—"}</span>
          </div>
          <div class="rr-row">
            <span class="rr-label">Reg.No :</span>
            <span class="rr-box">${student.regNumber || "—"}</span>
          </div>
        </div>
        <p class="sex-line">Sex: ${student.gender || "—"}</p>
        <p class="sex-line">Type of the Examinee : Regular</p>
      </div>
    </div>
    <p class="print-date">Printing Date: ${today}</p>
    <div class="qr-block">${qrSvgString}</div>
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      {/* Modal container */}
      <div
        className="flex flex-col w-full max-w-5xl"
        style={{
          background: "white",
          borderRadius: "20px",
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
          {/* Left: icon + title */}
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
              <h2 className="font-semibold text-white" style={{ fontSize: 15, letterSpacing: "0.01em" }}>
                Admit Card Preview
              </h2>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>
                {student.name} &middot; {student.studentId}
              </p>
            </div>
          </div>

          {/* Right: zoom + close */}
          <div className="flex items-center gap-2">
            {/* Zoom out */}
            <button
              onClick={() => setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(1)))}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <ZoomOut size={15} color="white" />
            </button>

            {/* Scale display */}
            <span
              style={{
                fontSize: 12, fontWeight: 600, color: "white",
                width: 44, textAlign: "center",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 6, padding: "4px 0",
                letterSpacing: "0.02em",
              }}
            >
              {Math.round(scale * 100)}%
            </span>

            {/* Zoom in */}
            <button
              onClick={() => setScale((s) => Math.min(2, +(s + 0.1).toFixed(1)))}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <ZoomIn size={15} color="white" />
            </button>

            {/* Divider */}
            <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(239,68,68,0.15)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.35)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.15)")}
            >
              <X size={16} color="#f87171" />
            </button>
          </div>
        </div>

        <StudentQRHidden student={student} />

        {/* ── Preview area ── */}
        <div
          className="flex-1 overflow-auto flex items-start justify-center"
          style={{ background: "#0f0f1a", padding: "28px 24px" }}
        >
          {/* Checker pattern subtle background */}
          <div
            style={{
              width: "100%",
              aspectRatio: "297 / 210",
              position: "relative",
              background: "white",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease",
            }}
          >
            <img src="/admit.png" alt="" className="absolute inset-0 w-full h-full object-fill" />

            <div
              className="absolute inset-0 mx-10  mt-12 overflow-hidden"
              style={{ padding: "1.5% 4.8% 2% 4.8%", fontFamily: "Arial, sans-serif" }}
            >
              <div style={{ height: "27%" }} />

              <p style={{ fontSize: "0.8vw", color: "#333", marginBottom: "0.5%" }}>
                Serial No. {student.studentId}
              </p>

              <div className="flex gap-10 w-full">
                {/* Labels */}
                <div style={{ width: "14%", flexShrink: 0 }}>
                  {["Institute Code", "Name of the Institute", "Name of the Student", "Father's Name", "Mother's Name", "Date of Birth", "Session"].map((l) => (
                    <div key={l} style={{ fontSize: "0.75vw", fontWeight: 700, color: "#222", marginBottom: "0.42vw", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}>
                      {l}
                    </div>
                  ))}
                  <div style={{ fontSize: "0.75vw", fontWeight: 700, color: "#222", fontFamily: "Georgia, serif", marginTop: "0.1vw" }}>Subject Name:</div>
                  <div style={{ fontSize: "0.75vw", color: "#222", marginTop: "0.1vw" }}>{student.educationQualification || "—"}</div>
                </div>

                {/* Values */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {[
                    student.studentId?.slice(0, 6),
                    student.institute,
                    student.name,
                    student.fatherName,
                    student.motherName,
                    formatDOB(student.dob),     // ← fixed here
                    `${student.month1} - ${student.month2} ${student.year1}`,
                  ].map((v, i) => (
                    <div key={i} style={{ fontSize: "0.75vw", color: "#222", marginBottom: "0.42vw", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      : &nbsp;{v || "—"}
                    </div>
                  ))}
                  <div style={{ fontSize: "0.75vw", color: "#222", marginTop: "0.1vw" }}>:</div>
                </div>

                {/* Right col */}
                <div style={{ width: "20%", flexShrink: 0 }} className="flex flex-col -mt-12  items-end gap-1">
                  <img
                    src={student.picture}
                    alt=""
                    style={{ width: "8vw", height: "10vw", objectFit: "cover", border: "1.5px solid #777" }}
                  />
                  <div className="w-full">
                    <div className="flex items-center justify-end gap-1 mb-1">
                      <span style={{ fontSize: "0.7vw", fontWeight: 700, color: "#222", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}>Roll.No :</span>
                      <span style={{ border: "1.5px solid #555", minWidth: "5.5vw", textAlign: "center", padding: "0.1vw 0.3vw", fontSize: "0.7vw", fontWeight: 700, color: "#111", background: "rgba(255,255,255,0.85)" }}>
                        {student.roll}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <span style={{ fontSize: "0.7vw", fontWeight: 700, color: "#222", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}>Reg.No :</span>
                      <span style={{ border: "1.5px solid #555", minWidth: "5.5vw", textAlign: "center", padding: "0.1vw 0.3vw", fontSize: "0.7vw", fontWeight: 700, color: "#111", background: "rgba(255,255,255,0.85)" }}>
                        {student.regNumber}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.7vw", fontWeight: 700, color: "#222", textAlign: "right", fontFamily: "Georgia, serif" }}>
                    Sex: {student.gender}
                  </p>
                  <p style={{ fontSize: "0.68vw", fontWeight: 700, color: "#222", textAlign: "right", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}>
                    Type of the Examinee : Regular
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-10 left-[4.8%] flex items-end gap-12">
                <p style={{ fontSize: "0.65vw", color: "#666" }}>
                  Printing Date: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
                <StudentQR student={student} size={45} />
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
              flex: 1, height: 44, borderRadius: 12,
              border: "1.5px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
              fontSize: 14, fontWeight: 600, color: "#6b7280",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#d1d5db"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
          >
            Cancel
          </button>

          <button
            onClick={handleDownload}
            style={{
              flex: 1, height: 44, borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              cursor: "pointer",
              fontSize: 13, fontWeight: 700, color: "white",
              letterSpacing: "0.08em", textTransform: "uppercase",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
              transition: "all 0.15s",
            }}
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