export async function downloadAdmitCard(student: {
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
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Template image load
  const templateImg = new Image();
  templateImg.src = "/admit.png";

  await new Promise<void>((resolve) => {
    templateImg.onload = () => resolve();
    templateImg.onerror = () => resolve(); 
  });

  canvas.width = templateImg.width || 794;
  canvas.height = templateImg.height || 1123;
  ctx.drawImage(templateImg, 0, 0);

  const sx = (x: number) => (x / 794) * canvas.width;
  const sy = (y: number) => (y / 1123) * canvas.height;

  ctx.fillStyle = "#000000";
ctx.font = `${sx(14)}px "Times New Roman", serif`;

  const fields: [string, number, number][] = [
    [student.studentId ?? "",          370, 295],
    [student.institute ?? "",          340, 335],
    [student.name ?? "",               310, 375],
    [student.fatherName ?? "",         310, 415],
    [student.motherName ?? "",         310, 455],
    [student.dob ?? "",                310, 495],
    [`${student.month1 ?? ""} ${student.year1 ?? ""} - ${student.month2 ?? ""} ${student.year2 ?? ""}`, 310, 535],
    [student.roll ?? "",               310, 575],
    [student.regNumber ?? "",          310, 615],
    [student.gender ?? "",             310, 655],
    [student.educationQualification ?? "", 310, 695],
  ];

  for (const [text, x, y] of fields) {
    ctx.fillText(text, sx(x), sy(y));
  }

  if (student.photoUrl) {
    try {
      const res = await fetch(`/api/proxy-image?url=${encodeURIComponent(student.photoUrl)}`);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      const photo = new Image();
      photo.src = objectUrl;

      await new Promise<void>((resolve) => {
        photo.onload = () => resolve();
        photo.onerror = () => resolve();
      });

      ctx.drawImage(photo, sx(650), sy(320), sx(100), sy(120));
      URL.revokeObjectURL(objectUrl);
    } catch {
    }
  }

  const link = document.createElement("a");
  link.download = `admit_${student.name ?? "student"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}