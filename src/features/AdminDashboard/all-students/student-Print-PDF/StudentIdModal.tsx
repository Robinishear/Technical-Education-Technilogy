/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut, Printer } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StudentIdQR, StudentIdQRHidden } from "../QR/StudentIdQR";
import { Student } from "../admin-students/types/admin-students.types";

export const StudentIdModal = ({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) => {
  const [scale, setScale] = useState(0.85);

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
        .format(date)
        .replace(/ /g, "-");
    } catch (e) {
      return dateStr;
    }
  };

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const qrSvgEl = document.getElementById("id-qr-code");
    const qrSvgString = qrSvgEl ? qrSvgEl.outerHTML : "";

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<title>Student ID - ${student.name}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4 portrait; margin: 0; }
  body { 
    width: 210mm; 
    height: 297mm; 
    display: flex; 
    justify-content: center; 
    align-items: flex-start; 
    padding-top: 30mm; 
    background: #fff; 
    font-family: Arial, sans-serif;
  }
  .id-wrapper { display: flex; gap: 10mm; }
  
  .card { 
    width: 54mm; 
    height: 86mm; 
    position: relative; 
    border: 0.2mm solid #ccc; 
    overflow: hidden; 
    background: white; 
    display: flex;
    flex-direction: column;
  }

  /* Front Card */
  .header { 
    text-align: center; 
    padding-top: 4mm; 
    padding-bottom: 1mm;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .inst-name { 
    font-size: 7.5pt; 
    font-weight: 900; 
    color: #c1121f; 
    text-transform: uppercase; 
    line-height: 1.2; 
    letter-spacing: 0.2px;
  }
  .inst-sub { 
    font-size: 6.8pt; 
    font-weight: 800; 
    color: #003049; 
    text-transform: uppercase; 
    letter-spacing: 0.2px;
    margin-top: 0.5px;
  }

  .middle-section {
    display: flex;
    width: 100%;
    align-items: stretch;
  }

  .side-bar {
    width: 7.5mm;
    background: #e63946;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 7.5pt;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    flex-shrink: 0;
  }

  .content-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
  }

  .photo-area { 
    width: 24mm; 
    height: 28mm; 
    margin-top: 1.5mm;
    margin-bottom: 1.5mm;
    border: 0.3mm solid #000; 
    overflow: hidden; 
  }
  .photo-area img { width: 100%; height: 100%; object-fit: cover; }

  .name-banner { 
    width: 100%;
    background: #1d3557; 
    color: white; 
    text-align: center; 
    padding: 1.8mm 0; 
    font-size: 9.5pt; 
    font-weight: 800; 
    text-transform: uppercase; 
    letter-spacing: 0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info-table { 
    padding: 3.5mm 5mm; 
    font-size: 7.5pt; 
    color: #000; 
    display: flex;
    flex-direction: column;
    gap: 1mm;
    flex: 1;
    justify-content: center;
    line-height: 1.3;
  }
  .info-row { 
    font-weight: 600; 
  }
  .lbl { 
    font-weight: 900;
    color: #1a1a1a;
  }
  .val {
    color: #333333;
  }

  /* Back Card */
  .back-content { display: flex; flex-direction: column; align-items: center; padding: 4mm; text-align: center; height: 100%; width: 100%; position: relative; }
  .terms-title { font-size: 8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1mm; letter-spacing: 0.2px; }
  .terms-body { font-size: 5.5pt; font-weight: 600; margin-bottom: 3mm; line-height: 1.2; color: #444; }
  
  .qr-box { width: 20mm; height: 20mm; border: 0.2mm solid #ddd; padding: 1.5mm; margin-bottom: 2mm; display: flex; align-items: center; justify-content: center; background: white; }
  .qr-box svg { width: 100% !important; height: 100% !important; }

  .dates { font-size: 6.5pt; font-weight: bold; margin-bottom: 3mm; line-height: 1.4; color: #333; }
  .off-title { color: #c1121f; font-size: 8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5px; }
  .off-addr { font-size: 5.2pt; font-weight: 700; line-height: 1.3; color: #444; max-width: 45mm; }
  
  .footer-web { position: absolute; bottom: 2mm; font-size: 6.5pt; font-weight: 900; color: #1d3557; width: 100%; text-align: center; text-transform: uppercase; }
</style>
</head>
<body>
  <div class="id-wrapper">
    <div class="card">
      <div class="header">
        <p class="inst-name">Bangladesh Technical</p>
        <p class="inst-sub">Education Technology</p>
      </div>
      
      <div class="middle-section">
        <div class="side-bar">STUDENT ID</div>
        <div class="content-right">
          <div class="photo-area"><img src="${student.picture || "https://i.ibb.co/4p7t0px/placeholder.jpg"}" /></div>
          <div class="name-banner">${student.name || "N/A"}</div>
        </div>
      </div>

      <div class="info-table">
        <p class="info-row"><span class="lbl">Roll No: </span><span class="val">${student.roll || "—"}</span></p>
        <p class="info-row"><span class="lbl">Reg No: </span><span class="val">${student.regNumber || "—"}</span></p>
        <p class="info-row"><span class="lbl">Sess: </span><span class="val">${student.month1}-${student.year1}</span></p>
        <p class="info-row" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span class="lbl">Course: </span><span class="val">${student.educationQualification || "—"}</span></p>
        <p class="info-row"><span class="lbl">Mobile: </span><span class="val">${student.guardianPhone || "—"}</span></p>
      </div>
    </div>

    <div class="card">
      <div class="back-content">
        <p class="terms-title">Terms and conditions</p>
        <p class="terms-body">This card is not transferable. If the card is found anywhere other than the user, it is requested to be returned.</p>
        
        <div class="header" style="padding-top: 0; margin-bottom: 2.5mm">
          <p class="inst-name" style="font-size: 6.5pt">Bangladesh Technical</p>
          <p class="inst-sub" style="font-size: 6pt">Education Technology</p>
        </div>

        <div class="qr-box">${qrSvgString}</div>
        <div class="dates">
          Joined Date : ${formatDate(student.joinedDate)}<br/>
          Expire Date : ${formatDate(student.expireDate)}
        </div>
        <p class="off-title">Office Address</p>
        <p class="off-addr">
          ${student.officeAddress ? student.officeAddress.replace(/\n/g, "<br/>") : "Gawsia, Bhulta, Rupganj, Narayanganj<br/>Dhaka, Bangladesh"}
        </p>
        <div class="footer-web">Website: ${student.website || "btetbd.com"}</div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); window.onafterprint = function() { window.close(); }; }, 500);
    };
  </script>
</body>
</html>`);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0b]/90 backdrop-blur-sm p-4">
      <StudentIdQRHidden student={student} />
      <div className="bg-white dark:bg-[#121214] rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <Printer size={20} className="text-blue-600" />
            <h2 className="text-md font-bold text-gray-900 dark:text-white">
              ID Card Preview
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-black dark:text-white"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-bold w-10 text-center text-black dark:text-white">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-black dark:text-white"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={onClose}
              className="ml-4 p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-black p-10 flex justify-center items-start">
          <div
            className="flex flex-col md:flex-row gap-6 p-4 bg-transparent"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            {/* Front Part */}
            <div className="w-[54mm] h-[86mm] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] relative overflow-hidden shrink-0 flex flex-col font-sans text-black border border-gray-100 rounded-xs">
              {/* Header Section */}
              <div className="text-center pt-[4mm] pb-[1mm] flex flex-col items-center">
                <div className="text-[#c1121f] font-black text-[7.5pt] uppercase leading-tight tracking-[0.2px]">
                  Bangladesh Technical
                </div>
                <div className="text-[#003049] font-bold text-[6.8pt] uppercase tracking-[0.2px] mt-[0.5px]">
                  Education Technology
                </div>
              </div>

              {/* Middle Section */}
              <div className="flex w-full items-stretch">
                {/* Vertical Red Bar */}
                <div
                  className="w-[7.5mm] bg-[#e63946] text-white flex items-center justify-center font-black text-[7.5pt] uppercase tracking-[0.8px] shrink-0"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                  }}
                >
                  STUDENT ID
                </div>

                {/* Photo & Name Banner Content */}
                <div className="flex-1 flex flex-col items-center bg-white">
                  {/* Photo Frame */}
                  <div className="w-[24mm] h-[28mm] border-[0.3mm] border-black overflow-hidden my-[1.5mm]">
                    <img
                      src={
                        student.picture ||
                        "https://i.ibb.co/4p7t0px/placeholder.jpg"
                      }
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>

                  {/* Name Banner */}
                  <div className="w-full bg-[#1d3557] text-white text-center py-[1.8mm] font-extrabold text-[9.5pt] uppercase tracking-[0.3px] px-1 truncate">
                    {student.name}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="px-[5mm] py-[3.5mm] text-[7.5pt] text-black flex flex-col gap-[1mm] flex-1 justify-center leading-normal">
                <p className="font-semibold">
                  <span className="font-black text-gray-900">Roll No: </span>
                  <span className="text-gray-800">{student.roll || "—"}</span>
                </p>
                <p className="font-semibold">
                  <span className="font-black text-gray-900">Reg No: </span>
                  <span className="text-gray-800">
                    {student.regNumber || "—"}
                  </span>
                </p>
                <p className="font-semibold">
                  <span className="font-black text-gray-900">Sess: </span>
                  <span className="text-gray-800">
                    {student.month1}-{student.year1}
                  </span>
                </p>
                <p className="font-semibold truncate">
                  <span className="font-black text-gray-900">Course: </span>
                  <span className="text-gray-800">
                    {student.educationQualification || "—"}
                  </span>
                </p>
                <p className="font-semibold">
                  <span className="font-black text-gray-900">Mobile: </span>
                  <span className="text-gray-800">
                    {student.guardianPhone || "—"}
                  </span>
                </p>
              </div>
            </div>

            {/* Back Part */}
            <div className="w-[54mm] h-[86mm] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] relative overflow-hidden shrink-0 p-[4mm] flex flex-col items-center text-center font-sans text-black border border-gray-100 rounded-xs">
              <p className="text-[8pt] font-black text-gray-900 mb-[1mm] uppercase tracking-[0.2px]">
                Terms and conditions
              </p>
              <p className="text-[5.5pt] font-medium leading-tight text-gray-700 mb-[3mm] px-1">
                This card is not transferable. If the card is found anywhere
                other than the user, it is requested to be returned.
              </p>

              <div className="mb-[2.5mm] flex flex-col items-center">
                <div className="text-[#c1121f] font-black text-[6.5pt] uppercase leading-tight tracking-[0.1px]">
                  Bangladesh Technical
                </div>
                <div className="text-[#003049] font-bold text-[6pt] uppercase tracking-[0.1px] mt-[0.5px]">
                  Education Technology
                </div>
              </div>

              <div className="w-[20mm] h-[20mm] border border-gray-200 rounded-lg p-[1.5mm] mb-[2mm] bg-white flex items-center justify-center shadow-sm">
                <StudentIdQR student={student} size={65} />
              </div>

              <div className="text-[6.5pt] font-bold text-gray-800 mb-[3mm] leading-relaxed">
                Joined Date : {formatDate(student.joinedDate)}
                <br />
                Expire Date : {formatDate(student.expireDate)}
              </div>

              <p className="text-[#c1121f] font-black text-[8pt] uppercase tracking-[0.2px] mb-[0.5px]">
                Office Address
              </p>

              <div className="text-[5.2pt] font-bold leading-normal text-gray-700 max-w-[45mm] line-clamp-3">
                {student.officeAddress ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: student.officeAddress.replace(/\n/g, "<br/>"),
                    }}
                  />
                ) : (
                  <>
                    Gawsia, Bhulta, Rupganj, Narayanganj
                    <br />
                    Dhaka, Bangladesh
                  </>
                )}
              </div>

              <div className="absolute bottom-[2mm] text-[6.5pt] font-extrabold text-[#1d3557] uppercase tracking-[0.2px]">
                {student.website || "btetbd.com"}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#121214] border-t border-gray-100 dark:border-white/5 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl font-bold"
          >
            Close
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg flex gap-2"
          >
            <Printer size={18} />
            Print ID Cards
          </Button>
        </div>
      </div>
    </div>
  );
};
