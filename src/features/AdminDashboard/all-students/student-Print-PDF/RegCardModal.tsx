/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { Student } from "../type-utils";
import { RegQR, RegQRHidden } from "../QR/RegQR";
import { Button } from "@/components/ui/button";

export const RegCardModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {
  const [scale, setScale] = useState(1);

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric"
    });

    const qrSvgEl = document.getElementById("reg-qr-code");
    const qrSvgString = qrSvgEl ? qrSvgEl.outerHTML : "";

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<title>Registration Card - ${student.name}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4 portrait; margin: 0; }
  body { width: 210mm; height: 297mm; font-family: 'Courier New', monospace; overflow: hidden; }
  .card { width: 210mm; height: 297mm; position: relative; background: white; }
  .bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; z-index: 0; }
  .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; padding: 48mm 12mm 10mm 12mm; overflow: hidden; }
  .serial { font-size: 8pt; color: #cc0000; margin-bottom: 4mm; }
  .serial span { font-weight: 900; }
  .top-right { position: absolute; top: 48mm; right: 12mm; display: flex; flex-direction: column; align-items: flex-end; gap: 2mm; }
  .photo { width: 28mm; height: 34mm; object-fit: cover; border: 1px solid #aaa; display: block; }
  .qr-wrap svg { width: 22mm !important; height: 22mm !important; }
  .info-table { width: 100%; border-collapse: collapse; margin-top: 2mm; }
  .info-table tr td { padding: 2.2mm 0; vertical-align: top; font-size: 9pt; }
  .info-table .lbl { font-weight: 900; color: #111; width: 46mm; white-space: nowrap; font-family: 'Courier New', monospace; }
  .info-table .colon { width: 6mm; color: #111; font-weight: 900; }
  .info-table .val { color: #111; font-family: 'Courier New', monospace; word-break: break-word; max-width: 90mm; }
  .sig-row { position: absolute; bottom: 42mm; left: 12mm; right: 12mm; display: flex; justify-content: space-between; }
  .sig-block { text-align: center; font-size: 7.5pt; color: #333; }
  .sig-line { border-top: 1px solid #555; width: 40mm; margin: 0 auto 1mm; }
  .note { position: absolute; bottom: 20mm; left: 12mm; right: 12mm; font-size: 7pt; color: #555; line-height: 1.5; }
  .print-date { position: absolute; bottom: 10mm; left: 12mm; font-size: 7pt; color: #555; }
</style>
</head>
<body>
<div class="card">
  <img class="bg" src="${window.location.origin}/reg.png" crossorigin="anonymous" />
  <div class="overlay">
    <p class="serial">Serial: <span>${student.studentId}</span></p>
    <div class="top-right">
      <img class="photo" src="${student.picture}" crossorigin="anonymous" alt="${student.name}" />
      <div class="qr-wrap">${qrSvgString}</div>
    </div>
    <table class="info-table">
      <tbody>
        <tr><td class="lbl">Student Name</td><td class="colon">:</td><td class="val">${student.name || "—"}</td></tr>
        <tr><td class="lbl">Father's Name</td><td class="colon">:</td><td class="val">${student.fatherName || "—"}</td></tr>
        <tr><td class="lbl">Mother's Name</td><td class="colon">:</td><td class="val">${student.motherName || "—"}</td></tr>
        <tr><td class="lbl">Sex</td><td class="colon">:</td><td class="val">${student.gender || "—"}</td></tr>
        <tr><td class="lbl">Name of the Institute</td><td class="colon">:</td><td class="val">${student.institute || "—"}</td></tr>
        <tr><td class="lbl">Institute Code</td><td class="colon">:</td><td class="val">${student.studentId?.slice(0, 6) || "—"}</td></tr>
        <tr><td class="lbl">Post Office</td><td class="colon">:</td><td class="val">${student.thana || "—"}</td></tr>
        <tr><td class="lbl">Upazilla/Thana</td><td class="colon">:</td><td class="val">${student.thana || "—"}</td></tr>
        <tr><td class="lbl">District</td><td class="colon">:</td><td class="val">${student.district || "—"}</td></tr>
        <tr><td class="lbl">Trade Code &amp; Name</td><td class="colon">:</td><td class="val">${student.educationQualification || "—"}</td></tr>
        <tr><td class="lbl">Registration Number</td><td class="colon">:</td><td class="val">${student.regNumber || "—"}</td></tr>
        <tr><td class="lbl">Session</td><td class="colon">:</td><td class="val">${student.month1} - ${student.month2} ${student.year1}</td></tr>
        <tr><td class="lbl">Course Duration</td><td class="colon">:</td><td class="val">${student.duration || "—"}</td></tr>
      </tbody>
    </table>
    <div class="sig-row">
      <div class="sig-block"><div class="sig-line"></div><p>Signature of the Student</p></div>
      <div class="sig-block"><div class="sig-line"></div><p>Signature of Head of the Institute</p></div>
      <div class="sig-block"><div class="sig-line"></div><p>Deputy Secretary<br/>(Registration)</p></div>
    </div>
    <div class="note">Note: This registration card is valid for six (6) months. For all communications with the board, the institute code, registration number and study session are to be mentioned. This registration card is generated by BTET ESHEBA (btetbd.com). The registration card must be printed in color.</div>
    <p class="print-date">Print Date: ${today}</p>
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

  // ── info rows — label + value ──
  const rows: [string, string | undefined][] = [
    ["Student Name",          student.name],
    ["Father's Name",         student.fatherName],
    ["Mother's Name",         student.motherName],
    ["Sex",                   student.gender],
    ["Name of the Institute", student.institute],
    ["Institute Code",        student.studentId?.slice(0, 6)],
    ["Post Office",           student.thana],
    ["Upazilla/Thana",        student.thana],
    ["District",              student.district],
    ["Trade Code & Name",     student.educationQualification],
    ["Registration Number",   student.regNumber],
    ["Session",               `${student.month1} - ${student.month2} ${student.year1}`],
    ["Course Duration",       student.duration],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[95vh]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Registration Card Preview</h2>
            <p className="text-xs text-gray-400 mt-0.5">{student.name} · {student.studentId}</p>
          </div>
          {/* Zoom Controls */}
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

        {/* Hidden QR */}
        <RegQRHidden student={student} />

        {/* ── Preview ── */}
        <div className="overflow-auto flex-1 p-6 flex items-start justify-center bg-gray-50 dark:bg-gray-950">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease",
              width: "100%",
              aspectRatio: "210 / 297",
              position: "relative",
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }}
          >
            <img src="/reg.png" alt="" className="absolute inset-0 w-full h-full object-fill" />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ padding: "16% 5% 4% 5%", fontFamily: "'Courier New', monospace" }}
            >
              {/* Serial */}
              <p style={{ fontSize: "0.7vw", color: "#cc0000", marginBottom: "1%" }}>
                Serial: <strong>{student.studentId}</strong>
              </p>

              {/* Photo + QR top right */}
              <div className="absolute flex flex-col items-end gap-1" style={{ top: "16%", right: "5%" }}>
                <img
                  src={student.picture}
                  alt=""
                  style={{ width: "7vw", height: "8.5vw", objectFit: "cover", border: "1px solid #aaa" }}
                />
                <RegQR student={student} size={55} />
              </div>

              {/* ✅ Info rows — word wrap করবে */}
              <div className="mt-2" style={{ paddingRight: "25%" }}>
                {rows.map(([label, value], i) => (
                  <div key={i} className="flex" style={{ fontSize: "0.7vw", marginBottom: "0.35vw", gap: "0.3vw" }}>
                    <span style={{ fontWeight: 900, minWidth: "10vw", flexShrink: 0, color: "#111" }}>
                      {label}
                    </span>
                    <span style={{ color: "#111", fontWeight: 700, flexShrink: 0 }}>:</span>
                    {/* ✅ word break যোগ করা হয়েছে */}
                    <span style={{ color: "#111", wordBreak: "break-word", whiteSpace: "normal" }}>
                      {value || "—"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Signatures */}
              <div
                className="absolute flex justify-between"
                style={{ bottom: "15%", left: "5%", right: "5%", fontSize: "0.6vw", color: "#333" }}
              >
                {["Signature of the Student", "Signature of Head of the Institute", "Deputy Secretary\n(Registration)"].map((sig, i) => (
                  <div key={i} className="text-center">
                    <div style={{ borderTop: "1px solid #555", width: "7vw", margin: "0 auto 0.3vw" }} />
                    <p style={{ whiteSpace: "pre-line" }}>{sig}</p>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div
                className="absolute"
                style={{ bottom: "7%", left: "5%", right: "5%", fontSize: "0.5vw", color: "#555", lineHeight: 1.5 }}
              >
                Note: This registration card is valid for six (6) months. For all communications with the board, the institute code, registration number and study session are to be mentioned. This registration card is generated by BTET ESHEBA (btetbd.com). The registration card must be printed in color.
              </div>

              {/* Print date */}
              <div className="absolute" style={{ bottom: "3%", left: "5%", fontSize: "0.55vw", color: "#555" }}>
                Print Date: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </div>
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