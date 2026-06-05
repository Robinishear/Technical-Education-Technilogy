/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { 
  Loader2, 
  AlertTriangle, 
  Printer, 
  ArrowLeft
} from "lucide-react";
import { getResultByRollAction } from "@/features/public_assets/student-result/actions.ts";
import Link from "next/link";
import QRCode from "react-qr-code";

// Helper: format ISO date to readable string
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

const formatSession = (student: any) => {
  if (!student) return "—";
  if (!student.month1 && !student.year1) return "—";
  const m1 = student.month1 ? monthName(student.month1) : "";
  const m2 = student.month2 ? monthName(student.month2) : "";
  const y1 = student.year1 || "";
  if (m1 && m2) return `${m1} - ${m2} ${y1}`.trim();
  if (m1) return `${m1} ${y1}`.trim();
  return y1 || "—";
};

// Sub-component to render the dynamic QR inside the card preview
const CardQRCode = ({ value, size = 60 }: { value: string; size?: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: size, height: size }} />;
  }

  return (
    <QRCode
      value={value}
      size={size}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  );
};

function VerificationPortalContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cardType = (params.cardType as string) || "admit";
  const roll = searchParams.get("roll") || "";
  const sess = searchParams.get("sess") || "";

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (cardType === "transcript") {
      router.replace(`/student-result-page?roll=${roll}`);
      return;
    }
    const fetchStudentData = async () => {
      if (!roll) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setNotFound(false);
        const data = await getResultByRollAction(roll);
        if (!data) {
          setNotFound(true);
        } else {
          setStudent(data);
        }
      } catch (error) {
        console.error("Error verifying student:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [roll, sess]);

  const getQRData = (type: string) => {
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    const sessionStr = student?.month1 && student?.year1 ? `&sess=${student.month1}-${student.year1}` : "";
    
    if (type === "reg") {
      return `${origin}/verify-student/reg?roll=${student?.roll || ""}${sessionStr}`;
    } else if (type === "id") {
      return `${origin}/verify-student/id?roll=${student?.roll || ""}${sessionStr}`;
    } else if (type === "certificate") {
      return `${origin}/verify-student/certificate?roll=${student?.roll || ""}`;
    }
    return `${origin}/verify-student/admit?roll=${student?.roll || ""}${sessionStr}`;
  };

  const handlePrint = () => {
    if (!student) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const qrUrl = getQRData(cardType);

    if (cardType === "admit") {
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
  .qr-cover { position: absolute; bottom: 21mm; left: 183.5mm; transform: translateX(-50%); width: 21.5mm; height: 21.5mm; background: #fff; z-index: 8; }
  .qr-block { position: absolute; bottom: 21mm; left: 183.5mm; transform: translateX(-50%); background: #fff; z-index: 10; width: 21.5mm; height: 21.5mm; display: flex; align-items: center; justify-content: center; }
  .qr-block img, .qr-block canvas { width: 21.5mm !important; height: 21.5mm !important; }
</style>
</head>
<body>
<div class="card">
  <img class="bg" src="${window.location.origin}/admit.png" />
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
      <img class="photo" src="${student.picture}" alt="${student.name}" />
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
    <div class="qr-block" id="print-qr-target"></div>
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script>
  new QRCode(document.getElementById("print-qr-target"), {
    text: "${qrUrl}",
    width: 90,
    height: 90,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
  window.onload = function() {
    setTimeout(function() {
      window.print();
      window.close();
    }, 600);
  };
</script>
</body>
</html>`);
    } else if (cardType === "reg") {
      printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Registration Card</title>
<style>
@page { size: A4; margin: 0; }
body { margin: 0; font-family: Arial, sans-serif; }
.page { width: 210mm; height: 297mm; position: relative; }
.bg { position: absolute; width: 210mm; height: 297mm; top: 0; left: 0; }
.content { position: absolute; top: 82mm; left: 22mm; right: 22mm; }
.serial { position: absolute; top: -10mm; left: 0; font-size: 11pt; color: red; font-weight: bold; }
.photo-box { position: absolute; top: 0; right: 0; width: 38mm; text-align: center; }
.photo { width: 32mm; height: 38mm; object-fit: cover; border: 1px solid #aaa; margin-bottom: 4mm; }
.qr { width: 30mm; height: 30mm; margin: 0 auto; display: flex; align-items: center; justify-content: center; }
.info { width: calc(100% - 20mm); max-height: 120mm; }
.row { display: flex; margin-bottom: 3.2mm; font-size: 10pt; }
.label { width: 58mm; font-weight: bold; }
.colon { width: 5mm; }
.value { flex: 1; }
.footer-note { position: absolute; bottom: 20mm; left: 22mm; right: 22mm; font-size: 7pt; text-align: justify; }
.print-date { position: absolute; bottom: 10mm; left: 22mm; font-size: 7pt; }
</style>
</head>
<body>
<div class="page">
  <img src="${window.location.origin}/reg.png" class="bg"/>
  <div class="content">
    <div class="serial">Serial: ${student.studentId}</div>
    <div class="photo-box">
      <img src="${student.picture}" class="photo"/>
      <div class="qr" id="print-qr-target"></div>
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
  <div class="print-date">Print Date: ${today}</div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script>
  new QRCode(document.getElementById("print-qr-target"), {
    text: "${qrUrl}",
    width: 110,
    height: 110,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
  window.onload = function () {
    setTimeout(() => {
      window.print();
      window.close();
    }, 600);
  };
</script>
</body>
</html>`);
    } else if (cardType === "id") {
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
  .middle-section { display: flex; width: 100%; align-items: stretch; }
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
  .content-right { flex: 1; display: flex; flex-direction: column; align-items: center; background: white; }
  .photo-area { width: 24mm; height: 28mm; margin-top: 1.5mm; margin-bottom: 1.5mm; border: 0.3mm solid #000; overflow: hidden; }
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
  .info-row { font-weight: 600; }
  .lbl { font-weight: 900; color: #1a1a1a; }
  .val { color: #333333; }
  .back-content { display: flex; flex-direction: column; align-items: center; padding: 4mm; text-align: center; height: 100%; width: 100%; position: relative; }
  .terms-title { font-size: 8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1mm; letter-spacing: 0.2px; }
  .terms-body { font-size: 5.5pt; font-weight: 600; margin-bottom: 3mm; line-height: 1.2; color: #444; }
  .qr-box { width: 20mm; height: 20mm; border: 0.2mm solid #ddd; padding: 1.5mm; margin-bottom: 2mm; display: flex; align-items: center; justify-content: center; background: white; }
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
        <div class="qr-box" id="print-qr-target"></div>
        <div class="dates">
          Joined Date : ${student.joinedDate ? new Date(student.joinedDate).toLocaleDateString("en-GB").replace(/ /g, "-") : "N/A"}<br/>
          Expire Date : ${student.expireDate ? new Date(student.expireDate).toLocaleDateString("en-GB").replace(/ /g, "-") : "N/A"}
        </div>
        <p class="off-title">Office Address</p>
        <p class="off-addr">
          ${student.officeAddress ? student.officeAddress.replace(/\n/g, "<br/>") : "Gawsia, Bhulta, Rupganj, Narayanganj<br/>Dhaka, Bangladesh"}
        </p>
        <div class="footer-web">Website: ${student.website || "btetbd.com"}</div>
      </div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <script>
    new QRCode(document.getElementById("print-qr-target"), {
      text: "${qrUrl}",
      width: 70,
      height: 70,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
    window.onload = function() {
      setTimeout(function() { window.print(); window.close(); }, 600);
    };
  </script>
</body>
</html>`);
    } else if (cardType === "certificate") {
      const slNo = student.studentId?.replace("STU-", "") || "—";
      const P = {
        slNo: { top: "37.9%", left: "17%" },
        regNo: { top: "37.2%", left: "74.5%" },
        session: { top: "41.8%", left: "70.5%" },
        name: { top: "43.7%", left: "32.0%" },
        father: { top: "48.3%", left: "28.0%" },
        mother: { top: "53.4%", left: "18.5%" },
        institute: { top: "58%", left: "19.5%" },
        roll: { top: "63.2%", left: "27.0%" },
        qual: { top: "63.2%", left: "50.0%" },
        exam: { top: "67.8%", left: "41.5%" },
        cgpa: { top: "68%", left: "77.5%" },
        date1: { top: "80.2%", left: "25.0%" },
        date2: { top: "82%", left: "18.5%" },
        qr: { top: "23%", left: "80%" },
      };
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
  .overlay { position: absolute; inset: 0; z-index: 1; }
  .f {
    position: absolute;
    font-weight: 700;
    font-style: italic;
    color: #000;
    font-size: 11pt;
  }
</style>
</head>
<body>
<div class="card">
  <img class="bg" src="${window.location.origin}/Certificate.png" crossorigin="anonymous" />
  <div class="overlay">
    <div class="f" style="top:${P.slNo.top}; left:${P.slNo.left}; font-size:10pt;">${slNo}</div>
    <div class="f" style="top:${P.regNo.top}; left:${P.regNo.left}; font-size:10pt;">${student.regNumber || "—"}</div>
    <div class="f" style="top:${P.session.top}; left:${P.session.left}; font-size:10pt;">${monthName(student.month1)} - ${monthName(student.month2)} ${student.year1}</div>
    <div class="f" style="top:${P.name.top}; left:${P.name.left}; right:8%;">${student.name || "—"}</div>
    <div class="f" style="top:${P.father.top}; left:${P.father.left}; right:14%;">${student.fatherName || "—"}</div>
    <div class="f" style="top:${P.mother.top}; left:${P.mother.left}; right:14%;">${student.motherName || "—"}</div>
    <div class="f" style="top:${P.institute.top}; left:${P.institute.left}; right:8%;">${student.institute || "—"}</div>
    <div class="f" style="top:${P.roll.top}; left:${P.roll.left};">${student.roll || "—"}</div>
    <div class="f" style="top:${P.qual.top}; left:${P.qual.left}; right:8%;">${student.educationQualification || "—"}</div>
    <div class="f" style="top:${P.exam.top}; left:${P.exam.left};">${monthName(student.month1)} ${student.year1}</div>
    <div class="f" style="top:${P.cgpa.top}; left:${P.cgpa.left};">—</div>
    <div class="f" style="top:${P.date1.top}; left:${P.date1.left}; font-size:8.5pt;">${today}</div>
    <div class="f" style="top:${P.date2.top}; left:${P.date2.left}; font-size:8.5pt;">${today}</div>
  </div>
</div>
<script>
  window.onload = function() {
    setTimeout(function() {
      window.print();
      window.close();
    }, 600);
  };
</script>
</body>
</html>`);
    }
    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl w-16 h-16 animate-pulse"></div>
          <Loader2 className="animate-spin text-blue-600 relative" size={44} />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Verifying Digital Record...</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto animate-pulse">
            Connecting to Bangladesh Technical Education Technology registry
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !student) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white dark:bg-slate-900 border-2 border-red-200 dark:border-red-950/40 rounded-[24px] p-8 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center border-2 border-red-200 dark:border-red-900/50 shadow-inner">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-red-600 dark:text-red-400 tracking-tight uppercase">
            Verification Failed
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            No active student record could be verified matching Roll Number: <strong className="text-slate-800 dark:text-slate-100">{roll || "None"}</strong>
          </p>
        </div>
        <div className="text-xs text-left bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl space-y-2 leading-relaxed text-slate-600 dark:text-slate-400">
          <p className="font-bold text-slate-800 dark:text-slate-200">Common reasons for failure:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>The Roll Number is entered incorrectly.</li>
            <li>The student profile has not been approved or issued yet.</li>
            <li>The record might have expired or been deactivated.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/student-result-page"
            className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Search Other Students
          </Link>
          <Link
            href="/"
            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold uppercase tracking-wider"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Card Render Section */}
      <div className="bg-slate-950 rounded-[28px] border-4 border-slate-900 overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8 flex justify-center items-center print:bg-white print:border-none print:shadow-none">
        
        {/* Render: Admit Card */}
        {cardType === "admit" && (
          <div
            className="w-full relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md"
            style={{
              aspectRatio: "297 / 210",
              containerType: "inline-size",
            }}
          >
            <img
              src="/admit.png"
              alt=""
              className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            />
            <div
              className="absolute inset-0"
              style={{
                padding: "6.06cqw 10.77cqw 6.06cqw 10.77cqw",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div style={{ height: "17.51cqw" }} />
              <p style={{ fontSize: "1.36cqw", color: "#333", marginBottom: "1.51cqw", fontWeight: 700 }}>
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
                  ].map((l) => (
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

                {/* Values */}
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

              {/* Right column */}
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
                  alt=""
                  style={{
                    width: "10.1cqw",
                    height: "12.12cqw",
                    objectFit: "cover",
                    border: "1.5px solid #777",
                    marginBottom: "0.84cqw",
                  }}
                />

                <div className="w-full flex flex-col" style={{ gap: "0.67cqw" }}>
                  <div className="flex items-center justify-end" style={{ gap: "0.67cqw" }}>
                    <span style={{ fontSize: "1.3cqw", fontWeight: 700, color: "#222", fontFamily: "'Times New Roman', Georgia, serif" }}>
                      Roll.No :
                    </span>
                    <span style={{ border: "1.5px solid #555", minWidth: "8.75cqw", textAlign: "center", padding: "0.27cqw 0.67cqw", fontSize: "1.36cqw", fontWeight: 700, color: "#111", background: "white" }}>
                      {student.roll || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-end" style={{ gap: "0.67cqw" }}>
                    <span style={{ fontSize: "1.3cqw", fontWeight: 700, color: "#222", fontFamily: "'Times New Roman', Georgia, serif" }}>
                      Reg.No :
                    </span>
                    <span style={{ border: "1.5px solid #555", minWidth: "8.75cqw", textAlign: "center", padding: "0.27cqw 0.67cqw", fontSize: "1.36cqw", fontWeight: 700, color: "#111", background: "white" }}>
                      {student.regNumber || "—"}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: "1.3cqw", fontWeight: 700, color: "#222", textAlign: "right", fontFamily: "'Times New Roman', Georgia, serif", marginTop: "0.5cqw" }}>
                  Sex: {student.gender || "—"}
                </p>
                <p style={{ fontSize: "1.3cqw", fontWeight: 700, color: "#222", textAlign: "right", fontFamily: "'Times New Roman', Georgia, serif", marginTop: "0.3cqw" }}>
                  Type of the Examinee : Regular
                </p>
              </div>

              {/* Printing Date */}
              <div style={{ position: "absolute", bottom: "4.04cqw", left: "11.78cqw" }}>
                <p style={{ fontSize: "1.07cqw", color: "#222", fontWeight: 700 }}>
                  Verified Date: {formatDOB(student.joinedDate || new Date().toISOString())}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Render: Certificate */}
        {cardType === "certificate" && (() => {
          const slNo = student.studentId?.replace("STU-", "") || "—";
          const today = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          const P = {
            slNo: { top: "37.9%", left: "17%" },
            regNo: { top: "37.2%", left: "74.5%" },
            session: { top: "41.8%", left: "70.5%" },
            name: { top: "43.7%", left: "32.0%" },
            father: { top: "48.3%", left: "28.0%" },
            mother: { top: "53.4%", left: "18.5%" },
            institute: { top: "58%", left: "19.5%" },
            roll: { top: "63.2%", left: "27.0%" },
            qual: { top: "63.2%", left: "50.0%" },
            exam: { top: "67.8%", left: "41.5%" },
            cgpa: { top: "68%", left: "77.5%" },
            date1: { top: "80.2%", left: "25.0%" },
            date2: { top: "82%", left: "18.5%" },
            qr: { top: "23%", left: "80%" },
          };
          return (
            <div
              className="w-full relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md"
              style={{
                aspectRatio: "297 / 210",
                containerType: "inline-size",
              }}
            >
              <img
                src="/Certificate.png"
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
              />
              <div
                className="absolute inset-0"
                style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                {/* SL No */}
                <div style={{ position: "absolute", top: P.slNo.top, left: P.slNo.left, fontSize: "1.25cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {slNo}
                </div>
                {/* Reg No */}
                <div style={{ position: "absolute", top: P.regNo.top, left: P.regNo.left, fontSize: "1.25cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {student.regNumber || "—"}
                </div>
                {/* Session */}
                <div style={{ position: "absolute", top: P.session.top, left: P.session.left, fontSize: "1.25cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {monthName(student.month1)} - {monthName(student.month2)} {student.year1}
                </div>
                {/* Name */}
                <div style={{ position: "absolute", top: P.name.top, left: P.name.left, right: "8%", fontSize: "1.35cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {student.name || "—"}
                </div>
                {/* Father */}
                <div style={{ position: "absolute", top: P.father.top, left: P.father.left, right: "14%", fontSize: "1.35cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {student.fatherName || "—"}
                </div>
                {/* Mother */}
                <div style={{ position: "absolute", top: P.mother.top, left: P.mother.left, right: "14%", fontSize: "1.35cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {student.motherName || "—"}
                </div>
                {/* Institute */}
                <div style={{ position: "absolute", top: P.institute.top, left: P.institute.left, right: "8%", fontSize: "1.35cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {student.institute || "—"}
                </div>
                {/* Roll */}
                <div style={{ position: "absolute", top: P.roll.top, left: P.roll.left, fontSize: "1.35cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {student.roll || "—"}
                </div>
                {/* Qual */}
                <div style={{ position: "absolute", top: P.qual.top, left: P.qual.left, right: "8%", fontSize: "1.35cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {student.educationQualification || "—"}
                </div>
                {/* Exam */}
                <div style={{ position: "absolute", top: P.exam.top, left: P.exam.left, fontSize: "1.35cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {monthName(student.month1)} {student.year1}
                </div>
                {/* CGPA */}
                <div style={{ position: "absolute", top: P.cgpa.top, left: P.cgpa.left, fontSize: "1.35cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  —
                </div>
                {/* Date 1 */}
                <div style={{ position: "absolute", top: P.date1.top, left: P.date1.left, fontSize: "1.1cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {today}
                </div>
                {/* Date 2 */}
                <div style={{ position: "absolute", top: P.date2.top, left: P.date2.left, fontSize: "1.1cqw", fontWeight: 700, fontStyle: "italic", color: "#000" }}>
                  {today}
                </div>

                {/* QR Code */}
                <div style={{
                  position: "absolute",
                  top: P.qr.top,
                  left: P.qr.left,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                }}>
                  <CardQRCode
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/verify-student/certificate?roll=${student.roll || ""}`}
                    size={52}
                  />
                </div>

              </div>
            </div>
          );
        })()}

        {/* Render: Registration Card */}
        {cardType === "reg" && (
          <div
            className="w-full relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md"
            style={{
              aspectRatio: "210 / 297",
              containerType: "inline-size",
            }}
          >
            <img src="/reg.png" alt="" className="absolute inset-0 w-full h-full object-fill pointer-events-none" />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                top: "39cqw",
                left: "10.5cqw",
                right: "10.5cqw",
                bottom: "0",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {/* Serial No */}
              <p
                style={{
                  position: "absolute",
                  top: "-4.76cqw",
                  left: "0",
                  fontSize: "1.43cqw",
                  color: "red",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                Serial: <strong>{student.studentId}</strong>
              </p>

              {/* Photo — top right (Matching A4 dimensions) */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "18.1cqw",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={student.picture}
                  alt=""
                  style={{
                    width: "15.24cqw",
                    height: "18.1cqw",
                    objectFit: "cover",
                    border: "1px solid #aaa",
                    display: "block",
                  }}
                />
              </div>

              {/* Info rows */}
              <div style={{ width: "calc(100% - 20cqw)", marginTop: "0.5cqw" }}>
                {[
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
                  ["Session", formatSession(student)],
                  ["Course Duration", student.duration],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      fontSize: "1.35cqw",
                      marginBottom: "1.52cqw",
                      lineHeight: 1.3,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 900,
                        width: "27.6cqw",
                        flexShrink: 0,
                        color: "#111",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </span>
                    <span style={{ color: "#111", fontWeight: 900, flexShrink: 0, marginRight: "2.4cqw" }}>:</span>
                    <span style={{ color: "#111", wordBreak: "break-word", fontWeight: 500 }}>
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
                  left: "0",
                  right: "0",
                  fontSize: "1.0cqw",
                  color: "#555",
                  lineHeight: 1.5,
                  textAlign: "justify",
                }}
              >
                Note: This registration card is valid for six (6) months. For all communications with the board, the institute code, registration number and study session are to be mentioned.
              </div>

              {/* Print date */}
              <div style={{ position: "absolute", bottom: "3.5%", left: "0", fontSize: "1.0cqw", color: "#555" }}>
                Verified Date: {formatDOB(student.joinedDate || new Date().toISOString())}
              </div>
            </div>
          </div>
        )}

        {/* Render: Student ID Card */}
        {cardType === "id" && (
          <div className="flex flex-col sm:flex-row gap-8 py-4 w-full justify-center items-center">
            {/* Front Card */}
            <div className="w-[54mm] h-[86mm] bg-white shadow-xl relative overflow-hidden shrink-0 flex flex-col font-sans text-black border border-gray-200 rounded-sm scale-110 sm:scale-120">
              <div className="text-center pt-[4mm] pb-[1mm] flex flex-col items-center">
                <div className="text-[#c1121f] font-black text-[7.5pt] uppercase leading-tight tracking-[0.2px]">
                  Bangladesh Technical
                </div>
                <div className="text-[#003049] font-bold text-[6.8pt] uppercase tracking-[0.2px] mt-[0.5px]">
                  Education Technology
                </div>
              </div>
              <div className="flex w-full items-stretch">
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
                <div className="flex-1 flex flex-col items-center bg-white">
                  <div className="w-[24mm] h-[28mm] border-[0.3mm] border-black overflow-hidden my-[1.5mm]">
                    <img
                      src={student.picture || "https://i.ibb.co/4p7t0px/placeholder.jpg"}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="w-full bg-[#1d3557] text-white text-center py-[1.8mm] font-extrabold text-[9.5pt] uppercase tracking-[0.3px] px-1 truncate">
                    {student.name}
                  </div>
                </div>
              </div>
              <div className="px-[5mm] py-[3.5mm] text-[7.5pt] text-black flex flex-col gap-[1mm] flex-1 justify-center leading-normal">
                <p className="font-semibold">
                  <span className="font-black text-gray-900">Roll No: </span>
                  <span className="text-gray-800">{student.roll || "—"}</span>
                </p>
                <p className="font-semibold">
                  <span className="font-black text-gray-900">Reg No: </span>
                  <span className="text-gray-800">{student.regNumber || "—"}</span>
                </p>
                <p className="font-semibold">
                  <span className="font-black text-gray-900">Sess: </span>
                  <span className="text-gray-800">{student.month1}-{student.year1}</span>
                </p>
                <p className="font-semibold truncate">
                  <span className="font-black text-gray-900">Course: </span>
                  <span className="text-gray-800">{student.educationQualification || "—"}</span>
                </p>
                <p className="font-semibold">
                  <span className="font-black text-gray-900">Mobile: </span>
                  <span className="text-gray-800">{student.guardianPhone || "—"}</span>
                </p>
              </div>
            </div>

            {/* Back Card */}
            <div className="w-[54mm] h-[86mm] bg-white shadow-xl relative overflow-hidden shrink-0 p-[4mm] flex flex-col items-center text-center font-sans text-black border border-gray-200 rounded-sm scale-110 sm:scale-120">
              <p className="text-[8pt] font-black text-gray-900 mb-[1mm] uppercase tracking-[0.2px]">
                Terms and conditions
              </p>
              <p className="text-[5.5pt] font-medium leading-tight text-gray-700 mb-[3mm] px-1">
                This card is not transferable. If the card is found anywhere other than the user, it is requested to be returned.
              </p>

              <div className="mb-[2.5mm] flex flex-col items-center">
                <div className="text-[#c1121f] font-black text-[6.5pt] uppercase leading-tight tracking-[0.1px]">
                  Bangladesh Technical
                </div>
                <div className="text-[#003049] font-bold text-[6pt] uppercase tracking-[0.1px] mt-[0.5px]">
                  Education Technology
                </div>
              </div>



              <div className="text-[6.5pt] font-bold text-gray-800 mb-[3mm] leading-relaxed">
                Joined Date: {student.joinedDate ? new Date(student.joinedDate).toLocaleDateString("en-GB").replace(/ /g, "-") : "N/A"}
                <br />
                Expire Date: {student.expireDate ? new Date(student.expireDate).toLocaleDateString("en-GB").replace(/ /g, "-") : "N/A"}
              </div>

              <p className="text-[#c1121f] font-black text-[8pt] uppercase tracking-[0.2px] mb-[0.5px]">
                Office Address
              </p>

              <div className="text-[5.2pt] font-bold leading-normal text-gray-700 max-w-[45mm] line-clamp-3">
                {student.officeAddress ? (
                  <span dangerouslySetInnerHTML={{ __html: student.officeAddress.replace(/\n/g, "<br/>") }} />
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
        )}
      </div>



      {/* Print / Download Button Block */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
        <button
          onClick={handlePrint}
          className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider"
        >
          <Printer size={18} />
          Print / Save Official PDF
        </button>
        <Link
          href="/student-result-page"
          className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider border border-slate-300/55 dark:border-slate-700/60"
        >
          <ArrowLeft size={18} />
          Back to Verification Portal
        </Link>
      </div>
    </div>
  );
}

export default function StudentVerificationPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[70vh] bg-slate-50 dark:bg-slate-950">
            <Loader2 className="animate-spin text-blue-600" size={44} />
          </div>
        }
      >
        <VerificationPortalContent />
      </Suspense>
    </div>
  );
}
