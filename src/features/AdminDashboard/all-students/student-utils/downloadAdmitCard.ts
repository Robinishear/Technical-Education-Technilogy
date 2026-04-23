"use client";

export async function downloadAdmitCard(student: any) {
  const { default: jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [1123, 794],
  });

  const W = 1123;
  const H = 794;

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
      img.src = src;
    });

  try {
    // ===================================
    // 1. BACKGROUND (Full page)
    // ===================================
    const bg = await loadImage("/admit.png");
    pdf.addImage(bg, "PNG", 0, 0, W, H);

    // ===================================
    // 2. LAYOUT CONSTANTS (Adjusted)
    // ===================================
    const LEFT_LABEL_X = 100;
    const COLON_X = 310;
    const VALUE_X = 330;
    const VALUE_MAX_W = 400;

    // Right side boxes - MOVED LEFT for better alignment
    const RIGHT_LABEL_X = 680;
    const RIGHT_BOX_X = 740;
    const RIGHT_BOX_W = 150;
    const RIGHT_BOX_H = 30;

    // Photo position adjusted
    const PHOTO_X = 930;
    const PHOTO_Y = 200;
    const PHOTO_W = 150;
    const PHOTO_H = 175;

    // ===================================
    // 3. SERIAL NO (red)
    // ===================================
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(200, 0, 0);
    pdf.text(`Serial No.  ${student.studentId || "-"}`, LEFT_LABEL_X, 295);

    // ===================================
    // 4. LEFT INFO ROWS
    // ===================================
    pdf.setTextColor(0, 0, 0);

    const rows: [string, string][] = [
      ["Name of the Institute", student.institute || "-"],
      ["Name of the Student", student.name || "-"],
      ["Father's Name", student.fatherName || "-"],
      ["Mother's Name", student.motherName || "-"],
      ["Date of Birth", student.dob || "-"],
      [
        "Session",
        `${student.month1 || ""}/${student.year1 || ""} - ${student.month2 || ""}/${student.year2 || ""}`,
      ],
    ];

    let rowY = 330;
    const ROW_SPACING = 36;

    rows.forEach(([label, value]) => {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.text(label, LEFT_LABEL_X, rowY);
      pdf.text(":", COLON_X, rowY);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(13);
      const lines = pdf.splitTextToSize(value, VALUE_MAX_W);
      pdf.text(lines, VALUE_X, rowY);

      rowY += ROW_SPACING + (lines.length - 1) * 16;
    });

    // ===================================
    // 5. SUBJECT NAME
    // ===================================
    rowY += 8;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Subject Name:", LEFT_LABEL_X, rowY);

    rowY += 22;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(13);
    const subjectLines = pdf.splitTextToSize(
      student.educationQualification || "-",
      480
    );
    pdf.text(subjectLines, LEFT_LABEL_X, rowY);

    // ===================================
    // 6. RIGHT BLOCK - FIXED Sex field position
    // ===================================
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(0, 0, 0);

    // Roll No - boxed
    pdf.text("Roll.No :", RIGHT_LABEL_X, 385);
    pdf.setDrawColor(0);
    pdf.setLineWidth(1);
    pdf.rect(RIGHT_BOX_X, 370, RIGHT_BOX_W, RIGHT_BOX_H);
    pdf.setFont("helvetica", "normal");
    pdf.text(student.roll || "-", RIGHT_BOX_X + 10, 390);

    // Reg No - boxed
    pdf.setFont("helvetica", "bold");
    pdf.text("Reg.No :", RIGHT_LABEL_X, 435);
    pdf.rect(RIGHT_BOX_X, 420, RIGHT_BOX_W, RIGHT_BOX_H);
    pdf.setFont("helvetica", "normal");
    pdf.text(student.regNumber || "-", RIGHT_BOX_X + 10, 440);

    // Sex - NOW IN A BOX (aligned with Roll/Reg)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Sex :", RIGHT_LABEL_X, 485);
    pdf.rect(RIGHT_BOX_X, 470, RIGHT_BOX_W, RIGHT_BOX_H);
    pdf.setFont("helvetica", "normal");
    pdf.text(student.gender || "-", RIGHT_BOX_X + 10, 490);

    // Type of Examinee
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("Type of the Examinee :", RIGHT_LABEL_X - 20, 535);
    pdf.setFont("helvetica", "normal");
    pdf.text("Regular", RIGHT_LABEL_X + 130, 535);

    // ===================================
    // 7. PHOTO (Well positioned)
    // ===================================
    if (student.photoUrl) {
      try {
        const res = await fetch(
          `/api/proxy-image?url=${encodeURIComponent(student.photoUrl)}`
        );
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        const img = await loadImage(objectUrl);
        pdf.addImage(img, "JPEG", PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);
        URL.revokeObjectURL(objectUrl);
      } catch {
        // skip silently
      }
    }

    // ===================================
    // 8. BOTTOM SECTION (Professional layout)
    // ===================================
    const BOTTOM_Y = 610;
    const BOTTOM_H = 155;

    const COL1_END = 540;
    const COL2_END = 720;

    // Outer box with shadow effect
    pdf.setDrawColor(100, 100, 100);
    pdf.setLineWidth(1.2);
    pdf.rect(90, BOTTOM_Y, W - 180, BOTTOM_H);

    // Inner light border
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.rect(92, BOTTOM_Y + 2, W - 184, BOTTOM_H - 4);

    // Top divider
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.8);
    pdf.line(90, BOTTOM_Y, W - 90, BOTTOM_Y);

    // Vertical dividers
    pdf.line(COL1_END, BOTTOM_Y, COL1_END, BOTTOM_Y + BOTTOM_H);
    pdf.line(COL2_END, BOTTOM_Y, COL2_END, BOTTOM_Y + BOTTOM_H);

    // COLUMN 1: Directions
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Directions:", 105, BOTTOM_Y + 22);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    const directions = [
      "1. The examinee must bring the Registration Card",
      "   along with the Admit Card in the examination hall.",
      "2. The examinee must sign in the attendance sheet",
      "   otherwise examinee will be treated as absent.",
    ];

    let dirY = BOTTOM_Y + 45;
    directions.forEach((line) => {
      pdf.text(line, 105, dirY);
      dirY += 18;
    });

    // COLUMN 2: QR Code
    try {
      const qrData = `ID:${student.studentId}|Roll:${student.roll}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`;
      const qrImg = await loadImage(qrUrl);

      const QR_SIZE = 100;
      const QR_X = COL1_END + (COL2_END - COL1_END - QR_SIZE) / 2;
      const QR_Y = BOTTOM_Y + (BOTTOM_H - QR_SIZE) / 2;

      pdf.addImage(qrImg, "PNG", QR_X, QR_Y, QR_SIZE, QR_SIZE);
    } catch {
      // skip
    }

    // COLUMN 3: Signature
    const SIG_X = COL2_END + 35;

    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(18);
    pdf.setTextColor(30, 30, 100);
    pdf.text("Saiful", SIG_X + 45, BOTTOM_Y + 48);

    pdf.setDrawColor(30, 30, 100);
    pdf.setLineWidth(0.8);
    pdf.line(SIG_X + 15, BOTTOM_Y + 54, SIG_X + 185, BOTTOM_Y + 54);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Controller of Examinations", SIG_X + 8, BOTTOM_Y + 78);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Bangladesh Technical", SIG_X + 8, BOTTOM_Y + 96);
    pdf.text("Education Technology", SIG_X + 8, BOTTOM_Y + 112);

    // ===================================
    // 9. SAVE
    // ===================================
    pdf.save(`Admit_${student.roll || "Card"}.pdf`);
  } catch (err) {
    console.error("Admit card generation failed:", err);
  }
}