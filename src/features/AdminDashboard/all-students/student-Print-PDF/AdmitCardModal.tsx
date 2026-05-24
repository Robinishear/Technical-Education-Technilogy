/* eslint-disable @typescript-eslint/no-unused-vars */
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

export const AdmitCardModal = ({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) => {
  const [scale, setScale] = useState(1);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

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
  .overlay {
    position: absolute; inset: 0; z-index: 1;
    padding: 18mm 32mm 18mm 32mm;
    display: flex; flex-direction: column;
  }
  .header-spacer { height: 52mm; }
  .serial { font-size: 11.5pt; color: #333; margin-bottom: 4.5mm; font-weight: bold; }
  .main { display: flex; width: 100%; gap: 5mm; position: relative; }
  .col-label { width: 58mm; flex-shrink: 0; }
  .col-value { flex: 1; min-width: 0; }
  .col-right {
    position: absolute;
    top: 68mm;
    right: 48mm;
    width: 60mm;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .row { 
    display: flex; 
    align-items: baseline; 
    font-size: 11.5pt; 
    margin-bottom: 3.4mm; 
    white-space: normal;
    line-height: 1.3;
  }
  .lbl { 
    font-weight: 700; 
    font-family: 'Times New Roman', serif; 
    white-space: nowrap;
    flex-shrink: 0;
  }
  .val { 
    color: #000; 
    margin-left: 4px;
    word-break: break-word;
    flex: 1;
  }
  .photo { width: 30mm; height: 36mm; object-fit: cover; border: 1.5px solid #444; display: block; margin-bottom: 2.5mm; }
  .rr-row { display: flex; align-items: center; justify-content: flex-end; gap: 2mm; margin-bottom: 2mm; }
  .rr-label { font-size: 11pt; font-weight: 700; font-family: 'Times New Roman', serif; white-space: nowrap; }
  .rr-box { border: 1.5px solid #333; min-width: 26mm; text-align: center; padding: 0.8mm 2mm; font-weight: 700; font-size: 11.5pt; background: #fff; }
  .sex-line { font-size: 11pt; font-weight: 700; color: #111; text-align: right; font-family: 'Times New Roman', serif; margin-top: 1.5mm; white-space: nowrap; }
  .print-date { position: absolute; bottom: 12mm; left: 35mm; font-size: 9pt; color: #111; font-weight: bold; }
  .qr-cover { position: absolute; bottom: 8mm; left: 136mm; transform: translateX(-50%); width: 18mm; height: 18mm; background: #fff; z-index: 8; }
  .qr-block { position: absolute; bottom: 8mm; left: 162mm; transform: translateX(-50%); background: #fff; z-index: 10; }
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
        <div class="row"><span class="lbl">Institute Code</span></div>
        <div class="row"><span class="lbl">Name of the Institute</span></div>
        <div class="row"><span class="lbl">Name of the Student</span></div>
        <div class="row"><span class="lbl">Father's Name</span></div>
        <div class="row"><span class="lbl">Mother's Name</span></div>
        <div class="row"><span class="lbl">Date of Birth</span></div>
        <div class="row"><span class="lbl">Session</span></div>
        <div class="row"><span class="lbl">Subject Name</span></div>
      </div>
      <div class="col-value">
        <div class="row"><span class="val">: ${student.studentId?.slice(0, 6) || "—"}</span></div>
        <div class="row"><span class="val">: ${student.institute || "—"}</span></div>
        <div class="row"><span class="val">: ${student.name || "—"}</span></div>
        <div class="row"><span class="val">: ${student.fatherName || "—"}</span></div>
        <div class="row"><span class="val">: ${student.motherName || "—"}</span></div>
        <div class="row"><span class="val">: ${formatDOB(student.dob)}</span></div>
        <div class="row"><span class="val">: ${monthName(student.month1)} - ${monthName(student.month2)} ${student.year1}</span></div>
        <div class="row"><span class="val">: ${student.educationQualification || "—"}</span></div>
      </div>
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
    <div class="qr-cover"></div>
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
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
        {/* Header */}
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
                Admit Card Preview
              </h2>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 1,
                }}
              >
                {student.name} &middot; {student.studentId}
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
            >
              <X size={16} color="#f87171" />
            </button>
          </div>
        </div>

        <StudentQRHidden student={student} />

        {/* Preview area */}
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
              containerType: "inline-size",
            }}
          >
            <img
              src="/admit.png"
              alt="Admit Card Background"
              className="absolute inset-0 w-full h-full object-fill"
            />

            <div
              className="absolute inset-0"
              style={{
                padding: "6.06cqw 10.77cqw 6.06cqw 10.77cqw",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {/* Header spacer */}
              <div style={{ height: "17.51cqw" }} />

              {/* Serial */}
              <p
                style={{
                  fontSize: "1.36cqw",
                  color: "#333",
                  marginBottom: "1.51cqw",
                  fontWeight: 700,
                }}
              >
                Serial No. {student.studentId}
              </p>

              <div className="flex w-full" style={{ gap: "1.68cqw" }}>
                {/* Labels */}
                <div style={{ width: "19.5cqw", flexShrink: 0 }}>
                  {[
                    "Institute Code",
                    "Name of the Institute",
                    "Name of the Student",
                    "Father's Name",
                    "Mother's Name",
                    "Date of Birth",
                    "Session",
                    "Subject Name",
                  ].map((l, i) => (
                    <div
                      key={l}
                      style={{
                        fontSize: "1.36cqw",
                        fontWeight: 700,
                        color: "#222",
                        marginBottom: "1.14cqw",
                        fontFamily: "'Times New Roman', Georgia, serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {l}
                    </div>
                  ))}
                </div>

                {/* Values - same line as labels */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {[
                    `: ${student.studentId?.slice(0, 6) || "—"}`,
                    `: ${student.institute || "—"}`,
                    `: ${student.name || "—"}`,
                    `: ${student.fatherName || "—"}`,
                    `: ${student.motherName || "—"}`,
                    `: ${formatDOB(student.dob)}`,
                    `: ${monthName(student.month1)} - ${monthName(student.month2)} ${student.year1}`,
                    `: ${student.educationQualification || "—"}`,
                  ].map((v, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: "1.36cqw",
                        color: "#222",
                        marginBottom: "1.14cqw",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right col */}
              <div
                style={{
                  position: "absolute",
                  top: "22.9cqw",
                  right: "16.16cqw",
                  width: "20.2cqw",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <img
                  src={student.picture}
                  alt="Student"
                  style={{
                    width: "10.1cqw",
                    height: "12.12cqw",
                    objectFit: "cover",
                    border: "1.5px solid #777",
                    marginBottom: "0.84cqw",
                  }}
                />

                <div
                  className="w-full flex flex-col"
                  style={{ gap: "0.67cqw" }}
                >
                  <div
                    className="flex items-center justify-end"
                    style={{ gap: "0.67cqw" }}
                  >
                    <span
                      style={{
                        fontSize: "1.3cqw",
                        fontWeight: 700,
                        color: "#222",
                        fontFamily: "'Times New Roman', Georgia, serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Roll.No :
                    </span>
                    <span
                      style={{
                        border: "1.5px solid #555",
                        minWidth: "8.75cqw",
                        textAlign: "center",
                        padding: "0.27cqw 0.67cqw",
                        fontSize: "1.36cqw",
                        fontWeight: 700,
                        color: "#111",
                        background: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {student.roll || "—"}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-end"
                    style={{ gap: "0.67cqw" }}
                  >
                    <span
                      style={{
                        fontSize: "1.3cqw",
                        fontWeight: 700,
                        color: "#222",
                        fontFamily: "'Times New Roman', Georgia, serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Reg.No :
                    </span>
                    <span
                      style={{
                        border: "1.5px solid #555",
                        minWidth: "8.75cqw",
                        textAlign: "center",
                        padding: "0.27cqw 0.67cqw",
                        fontSize: "1.36cqw",
                        fontWeight: 700,
                        color: "#111",
                        background: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {student.regNumber || "—"}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "1.3cqw",
                    fontWeight: 700,
                    color: "#222",
                    textAlign: "right",
                    fontFamily: "'Times New Roman', Georgia, serif",
                    marginTop: "0.5cqw",
                    whiteSpace: "nowrap",
                  }}
                >
                  Sex: {student.gender || "—"}
                </p>

                <p
                  style={{
                    fontSize: "1.3cqw",
                    fontWeight: 700,
                    color: "#222",
                    textAlign: "right",
                    fontFamily: "'Times New Roman', Georgia, serif",
                    whiteSpace: "nowrap",
                    marginTop: "0.3cqw",
                  }}
                >
                  Type of the Examinee : Regular
                </p>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "4.04cqw",
                  left: "11.78cqw",
                }}
              >
                <p
                  style={{
                    fontSize: "1.07cqw",
                    color: "#222",
                    fontWeight: 700,
                  }}
                >
                  Printing Date: {today}
                </p>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "2.69cqw",
                  left: "54.5cqw",
                  transform: "translateX(-50%)",
                  width: "6.06cqw",
                  height: "6.06cqw",
                  backgroundColor: "white",
                  zIndex: 10,
                }}
              >
                <div
                  style={{ width: "100%", height: "100%" }}
                  className="[&>svg]:w-full! [&>svg]:h-full!"
                >
                  <StudentQR student={student} size={80} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
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
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
