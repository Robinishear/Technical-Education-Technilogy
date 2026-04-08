"use client";

export async function Certificate(student: {
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
  // photoUrl?: string;
}) {
  const { default: jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [794, 1123],
  });

  // Helper: Image load
  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
      img.src = src;
    });

 

  // Template background
try {
    const templateImg = await loadImage("/Certificate.jpeg");

    const canvas = document.createElement("canvas");
    const scale = 2; // 2x resolution = sharp
    canvas.width = 794 * scale;
    canvas.height = 1123 * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);
    ctx.drawImage(templateImg, 0, 0, 794, 1123);
    const templateDataUrl = canvas.toDataURL("image/png");

    pdf.addImage(templateDataUrl, "PNG", 0, 0, 794, 563);
  } catch {

  }


  // ২. Text fields
  pdf.setFont("times", "normal");
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);

  const fields: [string, number, number][] = [
    [student.studentId ?? "", 370, 295],
    [student.institute ?? "", 340, 335],
    [student.name ?? "", 310, 375],
    [student.fatherName ?? "", 310, 415],
    [student.motherName ?? "", 310, 455],
    [student.dob ?? "", 310, 495],
    [
      `${student.month1 ?? ""} ${student.year1 ?? ""} - ${student.month2 ?? ""} ${student.year2 ?? ""}`,
      310,
      535,
    ],
    [student.roll ?? "", 310, 575],
    [student.regNumber ?? "", 310, 615],
    [student.gender ?? "", 310, 655],
    [student.educationQualification ?? "", 310, 695],
  ];

  for (const [text, x, y] of fields) {
    pdf.text(text, x, y);
  }



  // ৪. PDF save
  pdf.save(`admit_${student.name ?? "student"}.pdf`);
}