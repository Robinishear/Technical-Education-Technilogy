/* eslint-disable @next/next/no-img-element */
"use client";
import { X } from "lucide-react";
import { Student } from "../type-utils";
import { StudentQR, StudentQRHidden } from "../QR/AdminQR";

export const AdmitCardModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {

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
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl relative flex flex-col max-h-[95vh]">

        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-red-100 rounded-full transition-colors">
          <X size={18} className="text-stone-600" />
        </button>

        <StudentQRHidden student={student} />

        {/* Modal Preview */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="relative w-full bg-white" style={{ aspectRatio: "297 / 210" }}>
            <img src="/admit.png" alt="" className="absolute inset-0 w-full h-full object-fill" />

            <div className="absolute inset-0" style={{ padding: "1.5% 4.8% 2% 4.8%", fontFamily: "Arial, sans-serif", overflow: "hidden" }}>
              <div style={{ height: "23%" }} />

              <p style={{ fontSize: "0.8vw", color: "#333", marginBottom: "0.5%" }}>
                Serial No. {student.studentId}
              </p>

              <div style={{ display: "flex", width: "100%" }}>
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

                {/* Right */}
                <div style={{ width: "20%", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4vw" }}>
                  <img src={student.picture} alt="" style={{ width: "8vw", height: "10vw", objectFit: "cover", border: "1.5px solid #777" }} />
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.3vw", marginBottom: "0.3vw" }}>
                      <span style={{ fontSize: "0.7vw", fontWeight: 700, color: "#222", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}>Roll.No :</span>
                      <span style={{ border: "1.5px solid #555", minWidth: "5.5vw", textAlign: "center", padding: "0.1vw 0.3vw", fontSize: "0.7vw", fontWeight: 700, color: "#111", background: "rgba(255,255,255,0.85)" }}>
                        {student.roll}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.3vw" }}>
                      <span style={{ fontSize: "0.7vw", fontWeight: 700, color: "#222", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}>Reg.No :</span>
                      <span style={{ border: "1.5px solid #555", minWidth: "5.5vw", textAlign: "center", padding: "0.1vw 0.3vw", fontSize: "0.7vw", fontWeight: 700, color: "#111", background: "rgba(255,255,255,0.85)" }}>
                        {student.regNumber}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.7vw", fontWeight: 700, color: "#222", textAlign: "right", fontFamily: "Georgia, serif" }}>Sex: {student.gender}</p>
                  <p style={{ fontSize: "0.68vw", fontWeight: 700, color: "#222", textAlign: "right", fontFamily: "Georgia, serif" }}>Type of the Examinee : Regular</p>
                </div>
              </div>

              {/* Bottom row: print date + QR preview */}
              <div style={{ position: "absolute", bottom: "3%", left: "4.8%", display: "flex", alignItems: "flex-end", gap: "3vw" }}>
                <p style={{ fontSize: "0.65vw", color: "#666" }}>
                  Printing Date: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
                <StudentQR student={student} size={45} />
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