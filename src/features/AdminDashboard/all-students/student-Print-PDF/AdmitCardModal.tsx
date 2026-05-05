/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { StudentQR, StudentQRHidden } from "../QR/AdminQR";
import { Button } from "@/components/ui/button";
import { Student } from "../admin-students/types/admin-students.types";

export const AdmitCardModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {
  const [scale, setScale] = useState(1);

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric"
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
  body { width: 297mm; height: 210mm; font-family: Arial, sans-serif; overflow: hidden; }
  .card { width: 297mm; height: 210mm; position: relative; background: white; }
  .bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; z-index: 0; }
  .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; padding: 4mm 14mm 4mm 14mm; overflow: hidden; }
  .header-spacer { height: 48mm; }
  .serial { font-size: 8.5pt; color: #333; margin-bottom: 2.5mm; }
  .main { display: flex; width: 100%; }
  .col-label { width: 40mm; flex-shrink: 0; }
  .col-value { flex: 1; min-width: 0; }
  .col-right { width: 58mm; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 1.5mm; }
  .row { font-size: 9pt; color: #222; margin-bottom: 2.2mm; white-space: nowrap; }
  .lbl { font-weight: 700; font-family: 'Times New Roman', serif; }
  .val { color: #222; }
  .photo { width: 25mm; height: 31mm; object-fit: cover; border: 1.5px solid #777; display: block; }
  .rr-row { display: flex; align-items: center; justify-content: flex-end; gap: 1.5mm; margin-bottom: 1.5mm; }
  .rr-label { font-size: 8.5pt; font-weight: 700; color: #222; font-family: 'Times New Roman', serif; white-space: nowrap; }
  .rr-box { border: 1.5px solid #555; min-width: 26mm; text-align: center; padding: 0.8mm 2mm; font-weight: 700; font-size: 8.5pt; color: #111; background: rgba(255,255,255,0.9); }
  .sex-line { font-size: 8.5pt; font-weight: 700; color: #222; text-align: right; font-family: 'Times New Roman', serif; margin-bottom: 1mm; }
  .print-date { position: absolute; bottom: 6mm; left: 14mm; font-size: 7pt; color: #555; z-index: 2; }
  .qr-block { position: absolute; bottom: 4mm; left: 90mm; z-index: 2; }
  .qr-block svg { width: 18mm !important; height: 18mm !important; }
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
        <div class="row val">: &nbsp;${student.dob || "—"}</div>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[95vh]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Admit Card Preview</h2>
            <p className="text-xs text-gray-400 mt-0.5">{student.name} · {student.studentId}</p>
          </div>
          
          {/* ── Zoom Controls ── */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(1)))}
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

        <StudentQRHidden student={student} />

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
            <img src="/admit.png" alt="" className="absolute inset-0 w-full h-full object-fill" />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ padding: "1.5% 4.8% 2% 4.8%", fontFamily: "Arial, sans-serif" }}
            >
              <div style={{ height: "23%" }} />

              <p style={{ fontSize: "0.8vw", color: "#333", marginBottom: "0.5%" }}>
                Serial No. {student.studentId}
              </p>

              <div className="flex w-full">
                {/* Labels */}
                <div style={{ width: "14%", flexShrink: 0 }}>
                  {["Institute Code","Name of the Institute","Name of the Student","Father's Name","Mother's Name","Date of Birth","Session"].map((l) => (
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
                    student.dob,
                    `${student.month1} - ${student.month2} ${student.year1}`,
                  ].map((v, i) => (
                    <div key={i} style={{ fontSize: "0.75vw", color: "#222", marginBottom: "0.42vw", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      : &nbsp;{v || "—"}
                    </div>
                  ))}
                  <div style={{ fontSize: "0.75vw", color: "#222", marginTop: "0.1vw" }}>:</div>
                </div>

                {/* Right col */}
                <div style={{ width: "20%", flexShrink: 0 }} className="flex flex-col items-end gap-1">
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
                  <p style={{ fontSize: "0.68vw", fontWeight: 700, color: "#222", textAlign: "right", fontFamily: "Georgia, serif" }}>
                    Type of the Examinee : Regular
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-3 left-[4.8%] flex items-end gap-12">
                <p style={{ fontSize: "0.65vw", color: "#666" }}>
                  Printing Date: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
                <StudentQR student={student} size={45} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl"
          >
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