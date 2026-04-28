/* eslint-disable @next/next/no-img-element */
"use client";
import { X } from "lucide-react";
import { Student } from "../type-utils";
import { RegQR, RegQRHidden } from "../QR/RegQR";

export const RegCardModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {

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

  /* Photo + QR top right */
  .top-right { position: absolute; top: 48mm; right: 12mm; display: flex; flex-direction: column; align-items: flex-end; gap: 2mm; }
  .photo { width: 28mm; height: 34mm; object-fit: cover; border: 1px solid #aaa; display: block; }
  .qr-wrap svg { width: 22mm !important; height: 22mm !important; }

  /* Info rows */
  .info-table { width: 100%; border-collapse: collapse; margin-top: 2mm; }
  .info-table tr td { padding: 2.2mm 0; vertical-align: top; font-size: 9pt; }
  .info-table .lbl { font-weight: 900; color: #111; width: 46mm; white-space: nowrap; font-family: 'Courier New', monospace; }
  .info-table .colon { width: 6mm; color: #111; font-weight: 900; }
  .info-table .val { color: #111; font-family: 'Courier New', monospace; }

  /* Signatures */
  .sig-row { position: absolute; bottom: 42mm; left: 12mm; right: 12mm; display: flex; justify-content: space-between; }
  .sig-block { text-align: center; font-size: 7.5pt; color: #333; }
  .sig-line { border-top: 1px solid #555; width: 40mm; margin: 0 auto 1mm; }

  /* Note */
  .note { position: absolute; bottom: 20mm; left: 12mm; right: 12mm; font-size: 7pt; color: #555; line-height: 1.5; }
  .print-date { position: absolute; bottom: 10mm; left: 12mm; font-size: 7pt; color: #555; }
</style>
</head>
<body>
<div class="card">
  <img class="bg" src="${window.location.origin}/reg.png" crossorigin="anonymous" />
  <div class="overlay">
    <p class="serial">Serial: <span>${student.studentId}</span></p>

    <!-- Photo + QR top right -->
    <div class="top-right">
      <img class="photo" src="${student.picture}" crossorigin="anonymous" alt="${student.name}" />
      <div class="qr-wrap">${qrSvgString}</div>
    </div>

    <!-- Info Table -->
    <table class="info-table">
      <tbody>
        <tr>
          <td class="lbl">Student Name</td>
          <td class="colon">:</td>
          <td class="val">${student.name || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Father's Name</td>
          <td class="colon">:</td>
          <td class="val">${student.fatherName || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Mother's Name</td>
          <td class="colon">:</td>
          <td class="val">${student.motherName || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Sex</td>
          <td class="colon">:</td>
          <td class="val">${student.gender || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Name of the Institute</td>
          <td class="colon">:</td>
          <td class="val">${student.institute || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Institute Code</td>
          <td class="colon">:</td>
          <td class="val">${student.studentId?.slice(0, 6) || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Post Office</td>
          <td class="colon">:</td>
          <td class="val">${student.thana || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Upazilla/Thana</td>
          <td class="colon">:</td>
          <td class="val">${student.thana || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">District</td>
          <td class="colon">:</td>
          <td class="val">${student.district || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Trade Code &amp; Name</td>
          <td class="colon">:</td>
          <td class="val">${student.educationQualification || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Registration Number</td>
          <td class="colon">:</td>
          <td class="val">${student.regNumber || "—"}</td>
        </tr>
        <tr>
          <td class="lbl">Session</td>
          <td class="colon">:</td>
          <td class="val">${student.month1} - ${student.month2} ${student.year1}</td>
        </tr>
        <tr>
          <td class="lbl">Course Duration</td>
          <td class="colon">:</td>
          <td class="val">${student.duration || "—"}</td>
        </tr>
      </tbody>
    </table>

    <!-- Signatures -->
    <div class="sig-row">
      <div class="sig-block">
        <div class="sig-line"></div>
        <p>Signature of the Student</p>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <p>Signature of Head of the Institute</p>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <p>Deputy Secretary<br/>(Registration)</p>
      </div>
    </div>

    <!-- Note -->
    <div class="note">
      Note: This registration card is valid for six (6) months. For all communications with the board, the institute code, registration number and study session are to be mentioned. This registration card is generated by BTET ESHEBA (btetbd.com). The registration card must be printed in color.
    </div>

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

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[95vh]">

        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-red-100 rounded-full transition-colors">
          <X size={18} className="text-stone-600" />
        </button>

        {/* Hidden QR */}
        <div className="hidden">
          <svg id="reg-qr-code">
            <RegQRHidden student={student} />
          </svg>
        </div>
        <div className="hidden">
          <div id="reg-qr-code">
            <RegQR student={student} size={80} />
          </div>
        </div>

        {/* Modal Preview — A4 portrait */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="relative w-full bg-white" style={{ aspectRatio: "210 / 297" }}>
            <img src="/reg.png" alt="" className="absolute inset-0 w-full h-full object-fill" />

            <div className="absolute inset-0" style={{ padding: "16% 5% 4% 5%", fontFamily: "'Courier New', monospace", overflow: "hidden" }}>

              {/* Serial */}
              <p style={{ fontSize: "0.7vw", color: "#cc0000", marginBottom: "1%" }}>
                Serial: <strong>{student.studentId}</strong>
              </p>

              {/* Photo + QR — top right */}
              <div style={{ position: "absolute", top: "16%", right: "5%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5vw" }}>
                <img src={student.picture} alt="" style={{ width: "7vw", height: "8.5vw", objectFit: "cover", border: "1px solid #aaa" }} />
                <RegQR student={student} size={55} />
              </div>

              {/* Info rows */}
              <div style={{ marginTop: "1%", paddingRight: "25%" }}>
                {[
                  ["Student Name", student.name],
                  ["Father's Name", student.fatherName],
                  ["Mother's Name", student.motherName],
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
                ].map(([label, value], i) => (
                  <div key={i} style={{ display: "flex", gap: "0.3vw", fontSize: "0.7vw", marginBottom: "0.35vw" }}>
                    <span style={{ fontWeight: 900, minWidth: "10vw", flexShrink: 0, color: "#111" }}>{label}</span>
                    <span style={{ color: "#111", fontWeight: 700 }}>:</span>
                    <span style={{ color: "#111" }}>{value || "—"}</span>
                  </div>
                ))}
              </div>

              {/* Signatures */}
              <div style={{ position: "absolute", bottom: "15%", left: "5%", right: "5%", display: "flex", justifyContent: "space-between", fontSize: "0.6vw", color: "#333" }}>
                {["Signature of the Student", "Signature of Head of the Institute", "Deputy Secretary\n(Registration)"].map((sig, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ borderTop: "1px solid #555", width: "7vw", margin: "0 auto 0.3vw" }} />
                    <p style={{ whiteSpace: "pre-line" }}>{sig}</p>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div style={{ position: "absolute", bottom: "7%", left: "5%", right: "5%", fontSize: "0.5vw", color: "#555", lineHeight: 1.5 }}>
                Note: This registration card is valid for six (6) months. For all communications with the board, the institute code, registration number and study session are to be mentioned. This registration card is generated by BTET ESHEBA (btetbd.com). The registration card must be printed in color.
              </div>

              {/* Print date */}
              <div style={{ position: "absolute", bottom: "3%", left: "5%", fontSize: "0.55vw", color: "#555" }}>
                Print Date: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="px-6 py-4 border-t border-stone-100">
          <button
            onClick={handleDownload}
            className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm tracking-widest uppercase transition-colors"
          >
            PDF Download
          </button>
        </div>
      </div>
    </div>
  );
};