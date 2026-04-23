"use client";

export async function Certificate(student: {
  studentId?: string;
  name?: string;
  fatherName?: string;
  motherName?: string;
  roll?: string;
  regNumber?: string;
  session?: string;
  examName?: string;
  examMonth?: string;
  cgpa?: string;
  institute?: string;
  dob?: string;
  publishDate?: string;
  issueDate?: string;
}) {
  const { default: jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [1123, 794],
  });

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
      img.src = src;
    });

  try {
    const templateImg = await loadImage("/Certificate.jpeg");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = templateImg.width;
    canvas.height = templateImg.height;
    ctx.drawImage(templateImg, 0, 0);
    const templateDataUrl = canvas.toDataURL("image/jpeg", 1.0);
    pdf.addImage(templateDataUrl, "JPEG", 0, 0, 1123, 794);
  } catch {}

  const centerX = 1123 / 2;
  pdf.setTextColor(30, 30, 30);

  pdf.setFont("times", "bold");
  pdf.setFontSize(26);
  pdf.text(student.name?.toUpperCase() ?? "", centerX, 260, { align: "center" });

  pdf.setFont("times", "italic");
  pdf.setFontSize(16);

  pdf.text(student.regNumber ?? "", 800, 303);
  pdf.text(student.session ?? "", 750, 335);

  pdf.text(student.name ?? "", 290, 392);
  
  pdf.text(student.fatherName ?? "", 250, 440);
  
  pdf.text(student.motherName ?? "", 160, 490);
  
  pdf.text(student.institute ?? "", 150, 540);

  pdf.text(student.roll ?? "", 240, 592);
  pdf.text(student.examName ?? "", 535, 592);

  pdf.text(student.examMonth ?? "", 360, 640);
  pdf.text(student.cgpa ?? "", 740, 640);

  pdf.setFontSize(13);
  pdf.text(student.publishDate ?? "", 250, 715);
  pdf.text(student.issueDate ?? "", 190, 735);

  pdf.setFont("times", "normal");
  pdf.setFontSize(11);
  pdf.text(`ID: ${student.studentId ?? ""}`, 100, 320);
  
  const dobFormatted = student.dob ? new Date(student.dob).toLocaleDateString() : "";
  pdf.text(`DOB: ${dobFormatted}`, 100, 340);

  pdf.save(`Certificate_${student.name ?? "student"}.pdf`);
}