import QRCode from "react-qr-code";
import { Student } from "../admin-students/types/admin-students.types";

export const buildCertQRData = (student: Student): string => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL || "");
  return `${baseUrl}/verify-student/certificate?roll=${student.roll || ""}`;
};

export const CertificateQR = ({
  student,
  size = 60,
}: {
  student: Student;
  size?: number;
}) => (
  <QRCode
    value={buildCertQRData(student)}
    size={size}
    bgColor="#ffffff"
    fgColor="#000000"
  />
);

export const CertificateQRHidden = ({ student }: { student: Student }) => (
  <div style={{ display: "none" }}>
    <QRCode
      id="certificate-qr-code"
      value={buildCertQRData(student)}
      size={80}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  </div>
);
