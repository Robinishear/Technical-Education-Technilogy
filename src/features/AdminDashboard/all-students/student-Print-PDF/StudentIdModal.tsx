/* eslint-disable @next/next/no-img-element */
"use client";
import { X, ZoomIn, ZoomOut, Printer } from "lucide-react";
import { useState } from "react";
import { Student } from "../type-utils";
import { Button } from "@/components/ui/button";
import { RegQR, RegQRHidden } from "../QR/RegQR";

export const StudentIdModal = ({ student, onClose }: { student: Student; onClose: () => void }) => {
  const [scale, setScale] = useState(0.85);

  // ডেট ফরম্যাট করার ফাংশন (ISO Date থেকে DD-MMM-YYYY)
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).format(date).replace(/ /g, '-');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return dateStr;
    }
  };

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const qrSvgEl = document.getElementById("reg-qr-code");
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
  }

  /* Front Card */
  .side-bar {
    position: absolute;
    left: 0;
    top: 25mm;
    width: 6mm;
    height: 22mm;
    background: #e63946;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 7pt;
    font-weight: bold;
    text-transform: uppercase;
    z-index: 5;
  }

  .header { text-align: center; padding-top: 3mm; }
  .logo { width: 12mm; margin-bottom: 1mm; }
  .inst-name { font-size: 7pt; font-weight: 900; color: #c1121f; text-transform: uppercase; line-height: 1.1; }
  .inst-sub { font-size: 6.5pt; font-weight: 800; color: #003049; text-transform: uppercase; }

  .photo-area { width: 22mm; height: 26mm; margin: 2mm auto; border: 0.3mm solid #000; overflow: hidden; }
  .photo-area img { width: 100%; height: 100%; object-fit: cover; }

  .name-banner { background: #1d3557; color: white; text-align: center; padding: 1.5mm 0; font-size: 9pt; font-weight: bold; text-transform: capitalize; }

  .info-table { padding: 2mm 4mm; font-size: 7.5pt; color: #000; }
  .info-row { display: flex; margin-bottom: 0.8mm; font-weight: 600; }
  .lbl { width: 14mm; }
  .val { flex: 1; }

  /* Back Card */
  .back-content { display: flex; flex-direction: column; align-items: center; padding: 4mm; text-align: center; height: 100%; }
  .terms-title { font-size: 8pt; font-weight: bold; margin-bottom: 1.5mm; }
  .terms-body { font-size: 5.5pt; font-weight: 600; margin-bottom: 3mm; line-height: 1.2; }
  
  .qr-box { width: 20mm; height: 20mm; border: 0.2mm solid #eee; padding: 1mm; margin-bottom: 2mm; }
  .qr-box svg { width: 100% !important; height: 100% !important; }

  .dates { font-size: 6.5pt; font-weight: bold; margin-bottom: 3mm; line-height: 1.4; }
  .off-title { color: #c1121f; font-size: 8.5pt; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5mm; }
  .off-addr { font-size: 5.2pt; font-weight: 700; line-height: 1.3; color: #333; }
  
  .footer-web { position: absolute; bottom: 2mm; font-size: 6.5pt; font-weight: bold; color: #1d3557; width: 100%; text-align: center; }
</style>
</head>
<body>
  <div class="id-wrapper">
    <div class="card">
      <div class="side-bar">STUDENT ID</div>
      <div class="header">
        <img src="${window.location.origin}/logo.png" class="logo" />
        <p class="inst-name">Bangladesh Technical</p>
        <p class="inst-sub">Education Technology</p>
      </div>
      <div class="photo-area"><img src="${student.picture}" /></div>
      <div class="name-banner">${student.name || "N/A"}</div>
      <div class="info-table">
        <div class="info-row"><span class="lbl">Roll No</span><span class="val">: ${student.roll || "—"}</span></div>
        <div class="info-row"><span class="lbl">Reg No</span><span class="val">: ${student.regNumber || "—"}</span></div>
        <div class="info-row"><span class="lbl">Session</span><span class="val">: ${student.month1}-${student.year1}</span></div>
        <div class="info-row"><span class="lbl">Course</span><span class="val">: ${student.educationQualification || "—"}</span></div>
        <div class="info-row"><span class="lbl">Mobile</span><span class="val">: ${student.phone || "—"}</span></div>
      </div>
    </div>

    <div class="card">
      <div class="back-content">
        <p class="terms-title">Terms and conditions</p>
        <p class="terms-body">This card is not transferable. If the card is found anywhere other than the user, it is requested to be returned.</p>
        <p class="inst-name" style="margin-bottom: 2mm">Bangladesh Technical<br/><span class="inst-sub">Education Technology</span></p>
        <div class="qr-box">${qrSvgString}</div>
        <div class="dates">
          Joined Date : ${formatDate(student.joinedDate)}<br/>
          Expire Date : ${formatDate(student.expireDate)}
        </div>
        <p class="off-title">Office Address</p>
        <p class="off-addr">
          ${student.officeAddress ? student.officeAddress.replace(/\n/g, '<br/>') : "Gawsia, Bhulta, Rupganj, Narayanganj<br/>Dhaka, Bangladesh"}
        </p>
      </div>
      <div class="footer-web">Website: ${student.website || "btetbd.com"}</div>
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
      <RegQRHidden student={student} />
      <div className="bg-white dark:bg-[#121214] rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <Printer size={20} className="text-blue-600" />
            <h2 className="text-md font-bold text-gray-900 dark:text-white">ID Card Preview</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"><ZoomOut size={16} /></button>
            <span className="text-xs font-bold w-10 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"><ZoomIn size={16} /></button>
            <button onClick={onClose} className="ml-4 p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full"><X size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-black p-10 flex justify-center items-start">
          <div className="flex flex-col md:flex-row gap-6 p-4 bg-transparent" style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>

            {/* Front Part */}
            <div className="w-[54mm] h-[86mm] bg-white shadow-lg relative overflow-hidden shrink-0">
              <div className="absolute left-0 top-[25mm] w-[6mm] h-[22mm] bg-[#e63946] text-white flex items-center justify-center font-bold text-[7pt] [writing-mode:vertical-lr] rotate-180">STUDENT ID</div>
              <div className="text-center pt-3">
                <div className="text-[#c1121f] font-black text-[7pt] uppercase leading-tight">Bangladesh Technical</div>
                <div className="text-[#003049] font-bold text-[6.5pt] uppercase">Education Technology</div>
              </div>
              <div className="w-[22mm] h-[26mm] mx-auto my-2 border-[0.3mm] border-black overflow-hidden">
                <img src={student.picture} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="bg-[#1d3557] text-white text-center py-1 font-bold text-[9pt]">{student.name}</div>
              <div className="p-4 text-[7.5pt] font-semibold space-y-1">
                <p>Roll No: {student.roll}</p>
                <p>Reg No: {student.regNumber}</p>
                <p>Sess: {student.month1}-{student.year1}</p>
                <p>Course: {student.educationQualification}</p>
                <p>Mobile: {student.guardianPhone}</p>
              </div>
            </div>

            {/* Back Part */}
            <div className="w-[54mm] h-[86mm] bg-white shadow-lg relative overflow-hidden flex-shrink-0 p-4 flex flex-col items-center text-center">
              <p className="text-[8pt] font-bold mb-1">Terms and conditions</p>
              <p className="text-[5.5pt] font-medium leading-tight mb-3">
                This card is not transferable. If the card is found anywhere other than the user, it is requested to be returned.
              </p>
              <div className="mb-2">
                <div className="text-[#c1121f] font-black text-[6.5pt] uppercase leading-tight">Bangladesh Technical</div>
                <div className="text-[#003049] font-bold text-[6pt] uppercase">Education Technology</div>
              </div>

              <div className="w-20 h-20 border p-1 mb-2">
                <RegQR student={student} size={70} />
              </div>

              <div className="text-[6.5pt] font-bold mb-3">
                Joined Date : {formatDate(student.joinedDate)}<br />
                Expire Date : {formatDate(student.expireDate)}
              </div>

              <p className="text-[#c1121f] font-black text-[8pt] uppercase">Office Address</p>

              <p className="text-[5.2pt] font-bold leading-tight">
                {student.studentAddress ? (
                  <span dangerouslySetInnerHTML={{ __html: student.studentAddress.replace(/\n/g, '<br/>') }} />
                ) : (
                  <>Address not found.!</>
                )}
              </p>

              <div className="absolute bottom-2 text-[6.5pt] font-bold text-[#1d3557]">
                {student.website || "btetbd.com"}
              </div>
            </div>

          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#121214] border-t border-gray-100 dark:border-white/5 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl font-bold">Close</Button>
          <Button onClick={handleDownload} className="flex-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg flex gap-2">
            <Printer size={18} />
            Print ID Cards
          </Button>
        </div>
      </div>
    </div>
  );
};