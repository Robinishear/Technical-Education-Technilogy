import QRCode from "react-qr-code";
import { Student } from "../admin-students/types/admin-students.types";

export const buildRegQRData = (student: Student): string => {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://btetbd.com");
  const sess =
    student.month1 && student.year1 ? `${student.month1}-${student.year1}` : "";
  return `${baseUrl}/verify-student/reg?roll=${student.roll || ""}${sess ? `&sess=${encodeURIComponent(sess)}` : ""}`;
};

export const RegQR = ({
  student,
  size = 60,
}: {
  student: Student;
  size?: number;
}) => (
  <QRCode
    value={buildRegQRData(student)}
    size={size}
    bgColor="#ffffff"
    fgColor="#000000"
  />
);

export const RegQRHidden = ({ student }: { student: Student }) => (
  <div style={{ display: "none" }}>
    <QRCode
      id="reg-qr-code"
      value={buildRegQRData(student)}
      size={80}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  </div>
);
