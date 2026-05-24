import QRCode from "react-qr-code";
import { Student } from "../admin-students/types/admin-students.types";

export const buildIdQRData = (student: Student): string => {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://btetbd.com");
  const sess =
    student.month1 && student.year1 ? `${student.month1}-${student.year1}` : "";
  return `${baseUrl}/verify-student/id?roll=${student.roll || ""}${sess ? `&sess=${encodeURIComponent(sess)}` : ""}`;
};

export const StudentIdQR = ({
  student,
  size = 60,
}: {
  student: Student;
  size?: number;
}) => (
  <QRCode
    value={buildIdQRData(student)}
    size={size}
    bgColor="#ffffff"
    fgColor="#000000"
  />
);

export const StudentIdQRHidden = ({ student }: { student: Student }) => (
  <div style={{ display: "none" }}>
    <QRCode
      id="id-qr-code"
      value={buildIdQRData(student)}
      size={80}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  </div>
);
