import QRCode from "react-qr-code";
import { Student } from "../admin-students/types/admin-students.types";

export const buildQRData = (student: Student): string => {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "");
  const sess =
    student.month1 && student.year1 ? `${student.month1}-${student.year1}` : "";
  return `${baseUrl}/verify-student/admit?roll=${student.roll || ""}${sess ? `&sess=${encodeURIComponent(sess)}` : ""}`;
};

export const StudentQR = ({
  student,
  size = 60,
}: {
  student: Student;
  size?: number;
}) => (
  <QRCode
    value={buildQRData(student)}
    size={size}
    bgColor="#ffffff"
    fgColor="#000000"
  />
);

export const StudentQRHidden = ({ student }: { student: Student }) => (
  <div style={{ display: "none" }}>
    <QRCode
      id="admit-qr-code"
      value={buildQRData(student)}
      size={80}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  </div>
);
