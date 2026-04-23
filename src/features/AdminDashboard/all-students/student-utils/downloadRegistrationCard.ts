"use client";

import { default as jspdf } from "jspdf";
import QRCode from "qrcode";

export async function downloadRegistrationCard(student: {
  studentId?: string;
  name?: string;
  fatherName?: string;
  motherName?: string;
  dob?: string;
  month1?: string;
  year1?: string;
  month2?: string;
  year2?: string;
  roll?: string;
  regNumber?: string;
  gender?: string;
  educationQualification?: string;
  institute?: string;
  photoUrl?: string;
}) {
  const { default: jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [794, 1123],
  });

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
      img.src = src;
    });

  const imageToDataURL = (img: HTMLImageElement): string => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || 300;
    canvas.height = img.naturalHeight || 300;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  };

  try {
    const templateImg = await loadImage("/Reg.png");
    const templateDataUrl = imageToDataURL(templateImg);
    pdf.addImage(templateDataUrl, "PNG", 0, 0, 794, 1123);
  } catch {}

  pdf.setFont("times", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);

  const labelX = 140;
  const valueX = 280;
  let currentY = 380;
  const rowGap = 32;

  const drawField = (label: string, value: string) => {
    pdf.setFont("times", "bold");
    pdf.text(label, labelX, currentY);
    pdf.text(":", valueX - 20, currentY);
    pdf.setFont("times", "normal");
    pdf.text(value || "N/A", valueX, currentY);
    currentY += rowGap;
  };

  const formattedDob = student.dob ? new Date(student.dob).toLocaleDateString() : "N/A";

  drawField("Student ID", student.studentId!);
  drawField("Name of Student", student.name!.toUpperCase());
  drawField("Father's Name", student.fatherName!);
  drawField("Mother's Name", student.motherName!);
  drawField("Date of Birth", formattedDob);
  drawField("Session", `${student.month1} ${student.year1} - ${student.month2} ${student.year2}`);
  drawField("Roll Number", student.roll!);
  drawField("Registration No", student.regNumber!);
  drawField("Gender", student.gender!);
  drawField("Qualification", student.educationQualification!);
  drawField("Institute", student.institute || "N/A");

  if (student.photoUrl) {
    try {
      const res = await fetch(
        `/api/proxy-image?url=${encodeURIComponent(student.photoUrl)}`
      );
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const photoImg = await loadImage(objectUrl);
      const photoDataUrl = imageToDataURL(photoImg);
      URL.revokeObjectURL(objectUrl);

      pdf.setDrawColor(0);
      pdf.setLineWidth(1);
      pdf.rect(580, 320, 100, 120);
      pdf.addImage(photoDataUrl, "JPEG", 582, 322, 96, 116);
    } catch {}
  }

  try {
    const qrData = student.regNumber || "N/A";
    const qrDataUrl = await QRCode.toDataURL(qrData, { 
        margin: 1, 
        width: 200,
        color: {
            dark: "#000000",
            light: "#ffffff"
        }
    });
    pdf.addImage(qrDataUrl, "PNG", 580, 450, 100, 100);
  } catch (err) {}

  pdf.save(`Registration_${student.name ?? "card"}.pdf`);
}