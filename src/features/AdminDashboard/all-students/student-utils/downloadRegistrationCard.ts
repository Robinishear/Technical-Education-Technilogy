/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { default as  jspdf} from "jspdf";

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
  // Next.js dynamic import — browser only
  const { default: jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [794, 1123],
  });

  // Helper: Image load করো
  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
      img.src = src;
    });

  // Helper: Image → base64 dataURL
  const imageToDataURL = (img: HTMLImageElement): string => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || 304;
    canvas.height = img.naturalHeight || 523;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  };

  // ১. Background template
  try {
    const templateImg = await loadImage("/Reg.png");
    const templateDataUrl = imageToDataURL(templateImg);
    pdf.addImage(templateDataUrl, "PNG", 0, 0, 794, 1123);
  } catch {
  }

  // ২. Text fields
  pdf.setFont("times", "normal");
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);

  const fields: [string, number, number][] = [
    [student.studentId ?? "",                                                        370, 295],
    [student.institute ?? "",                                                        340, 335],
    [student.name ?? "",                                                             310, 375],
    [student.fatherName ?? "",                                                       310, 415],
    [student.motherName ?? "",                                                       310, 455],
    [student.dob ?? "",                                                              310, 495],
    [`${student.month1 ?? ""} ${student.year1 ?? ""} - ${student.month2 ?? ""} ${student.year2 ?? ""}`, 310, 535],
    [student.roll ?? "",                                                             310, 575],
    [student.regNumber ?? "",                                                        310, 615],
    [student.gender ?? "",                                                           310, 655],
    [student.educationQualification ?? "",                                           310, 695],
  ];

  for (const [text, x, y] of fields) {
    pdf.text(text, x, y);
  }

  // ৩. Student photo
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

      pdf.addImage(photoDataUrl, "JPEG", 650, 320, 100, 120);
    } catch {
    }
  }

  // ৪. PDF save/download
  pdf.save(`admit_${student.name ?? "student"}.pdf`);
}