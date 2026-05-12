/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut, Download, FileText } from "lucide-react";
import { useState } from "react";
import { RegQR, RegQRHidden } from "../QR/RegQR";
import { Student } from "../admin-students/types/admin-students.types";

// ── Helper: format ISO date → "08 Nov 1978"
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

export const RegCardModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {
  const [scale, setScale] = useState(1);

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const qrSvgEl = document.getElementById("reg-qr-code");
    const qrSvgString = qrSvgEl ? qrSvgEl.outerHTML : "";

    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Registration Card</title>

<style>
@page {
  size: A4;
  margin: 0;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.page {
  width: 210mm;
  height: 297mm;
  position: relative;
}

.bg {
  position: absolute;
  width: 210mm;
  height: 297mm;
  top: 0;
  left: 0;
}

.content {
  position: absolute;
  top: 82mm;
  left: 22mm;
  right: 22mm;
}

.serial {
  position: absolute;
  top: -10mm;
  left: 0;
  font-size: 11pt;
  color: red;
  font-weight: bold;
}

.photo-box {
  position: absolute;
  top: 0;
  right: 0;
  width: 38mm;
  text-align: center;
}

.photo {
  width: 32mm;
  height: 38mm;
  object-fit: cover;
  border: 1px solid #aaa;
  margin-bottom: 4mm;
}

.qr svg {
  width: 30mm;
  height: 30mm;
}

/* LEFT INFO */
.info {
  width: calc(100% - 20mm);
  max-height: 120mm;
}

.row {
  display: flex;
  margin-bottom: 3.2mm;
  font-size: 10pt;
}

.label {
  width: 58mm;
  font-weight: bold;
}

.colon {
  width: 5mm;
}

.value {
  flex: 1;
}

/* SIGNATURE */
.signatures {
  position: absolute;
  bottom: 40mm;
  left: 22mm;
  right: 22mm;
  display: flex;
  justify-content: space-between;
  font-size: 9pt;
}

.sign {
  text-align: center;
}

.line {
  border-top: 1px solid #000;
  width: 50mm;
  margin-bottom: 3mm;
}

.footer-note {
  position: absolute;
  bottom: 20mm;
  left: 22mm;
  right: 22mm;
  font-size: 7pt;
  text-align: justify;
}

.print-date {
  position: absolute;
  bottom: 10mm;
  left: 22mm;
  font-size: 7pt;
}

</style>
</head>

<body>

<div class="page">
  <img src="${window.location.origin}/reg.png" class="bg"/>

  <div class="content">

    <div class="serial">Serial: ${student.studentId}</div>

    <div class="photo-box">
      <img src="${student.picture}" class="photo"/>
      <div class="qr">${qrSvgString}</div>
    </div>

    <div class="info">

  <div class="row"><div class="label">Student Name</div><div class="colon">:</div><div class="value">${student.name || "—"}</div></div>
  <div class="row"><div class="label">Father's Name</div><div class="colon">:</div><div class="value">${student.fatherName || "—"}</div></div>
  <div class="row"><div class="label">Mother's Name</div><div class="colon">:</div><div class="value">${student.motherName || "—"}</div></div>
  <div class="row"><div class="label">Date of Birth</div><div class="colon">:</div><div class="value">${formatDOB(student.dob)}</div></div>
  <div class="row"><div class="label">Sex</div><div class="colon">:</div><div class="value">${student.gender || "—"}</div></div>
  <div class="row"><div class="label">Name of the Institute</div><div class="colon">:</div><div class="value">${student.institute || "—"}</div></div>
  <div class="row"><div class="label">Institute Code</div><div class="colon">:</div><div class="value">${student.studentId?.slice(0, 6) || "—"}</div></div>
  <div class="row"><div class="label">Post Office</div><div class="colon">:</div><div class="value">${student.thana || "—"}</div></div>
  <div class="row"><div class="label">Upazilla/Thana</div><div class="colon">:</div><div class="value">${student.thana || "—"}</div></div>
  <div class="row"><div class="label">District</div><div class="colon">:</div><div class="value">${student.district || "—"}</div></div>
  <div class="row"><div class="label">Trade Code & Name</div><div class="colon">:</div><div class="value">${student.educationQualification || "—"}</div></div>
  <div class="row"><div class="label">Registration Number</div><div class="colon">:</div><div class="value">${student.regNumber || "—"}</div></div>
  <div class="row"><div class="label">Session</div><div class="colon">:</div><div class="value">${student.month1} - ${student.month2} ${student.year1}</div></div>
  <div class="row"><div class="label">Course Duration</div><div class="colon">:</div><div class="value">${student.duration || "—"}</div></div>

</div>

  </div>

 

  <div class="footer-note">
    Note: This registration card is valid for six (6) months. For all communications with the board, the institute code, registration number and study session are to be mentioned.
  </div>

  <div class="print-date">
    Print Date: ${today}
  </div>

</div>

<script>
window.onload = function () {
  setTimeout(() => {
    window.print();
    window.close();
  }, 500);
};
</script>

</body>
</html>
`);

    printWindow.document.close();
  };

  const rows: [string, string | undefined][] = [
    ["Student Name", student.name],
    ["Father's Name", student.fatherName],
    ["Mother's Name", student.motherName],
    ["Date of Birth", formatDOB(student.dob)],
    ["Sex", student.gender],
    ["Name of the Institute", student.institute],
    ["Institute Code", student.studentId?.slice(0, 6)],
    ["Post Office", student.thana],
    ["Upazilla/Thana", student.thana],
    ["District", student.district],
    ["Trade Code & Name", student.educationQualification],
    ["Registration Number", student.regNumber],
    ["Session", `${student.month1} - ${student.month2} ${student.year1}`],
    ["Course Duration", student.duration],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="flex flex-col w-full max-w-2xl"
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
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center"
              style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.12)" }}
            >
              <FileText size={18} color="white" />
            </div>
            <div>
              <h2 className="font-semibold text-white" style={{ fontSize: 15 }}>
                Registration Card Preview
              </h2>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>
                {student.name} &middot; {student.studentId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(1)))}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <ZoomOut size={15} color="white" />
            </button>

            <span style={{
              fontSize: 12, fontWeight: 600, color: "white",
              width: 44, textAlign: "center",
              background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 0",
            }}>
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => setScale((s) => Math.min(2, +(s + 0.1).toFixed(1)))}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <ZoomIn size={15} color="white" />
            </button>

            <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />

            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(239,68,68,0.15)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.35)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.15)")}
            >
              <X size={16} color="#f87171" />
            </button>
          </div>
        </div>

        <RegQRHidden student={student} />

        {/* ── Preview area ── */}
        <div
          className="flex-1 overflow-auto flex items-start justify-center"
          style={{ background: "#0f0f1a", padding: "28px 24px" }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "210 / 297",
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
            <img src="/reg.png" alt="" className="absolute inset-0 w-full h-full object-fill" />

            <div
              className="absolute mt-32 mx-10 inset-0 overflow-hidden"
              style={{ padding: "17.5% 5% 4% 5%",  }}
            >
              {/* Serial */}
              <p style={{ fontSize: "0.7vw", color: "#cc0000", marginBottom: "1%", fontWeight: 700 }}>
                Serial: <strong>{student.studentId}</strong>
              </p>

              {/* Photo + QR — top right */}
              <div
                style={{
                  position: "absolute",
                  top: "15.5%",
                  right: "5%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.5vw",
                }}
              >
                <img
                  src={student.picture}
                  alt=""
                  style={{ width: "7vw", height: "8.5vw", objectFit: "cover", border: "1px solid #aaa" }}
                />
                <RegQR student={student} size={120} />
              </div>

              {/* Info rows */}
              <div style={{ paddingRight: "26%", marginTop: "0.5%" }}>
                {rows.map(([label, value], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      fontSize: "0.68vw",
                      marginBottom: "0.32vw",
                      lineHeight: 1.3,
                    }}
                  >
                    <span style={{
                      fontWeight: 900,
                      width: "9.5vw",
                      flexShrink: 0,
                      color: "#111",
                      whiteSpace: "nowrap",
                    }}>
                      {label}
                    </span>
                    <span style={{ color: "#111", fontWeight: 900, flexShrink: 0, marginRight: "0.3vw" }}>:</span>
                    <span style={{ color: "#111", wordBreak: "break-word" }}>
                      {value || "—"}
                    </span>
                  </div>
                ))}
              </div>

            

              {/* Note */}
              <div
                style={{
                  position: "absolute",
                  bottom: "7%",
                  left: "5%",
                  right: "5%",
                  fontSize: "0.48vw",
                  color: "#555",
                  lineHeight: 1.5,
                }}
              >
                Note: This registration card is valid for six (6) months. For all communications with the board, the institute code, registration number and study session are to be mentioned. This registration card is generated by BTET ESHEBA (btetbd.com). The registration card must be printed in color.
              </div>

              {/* Print date */}
              <div style={{ position: "absolute", bottom: "3%", left: "5%", fontSize: "0.5vw", color: "#555" }}>
                Print Date: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
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
              border: "1.5px solid #e5e7eb", background: "white",
              cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#6b7280",
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
              cursor: "pointer", fontSize: 13, fontWeight: 700, color: "white",
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