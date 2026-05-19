import QRCode from 'react-qr-code';
import { Student } from '../admin-students/types/admin-students.types';

export const buildRegQRData = (student: Student): string => {
  const name = student.name || "Student";
  const org = student.institute || "BTET";
  const phone = student.guardianPhone || "";
  const roll = student.roll || "N/A";
  const reg = student.regNumber || "N/A";
  const session = `${student.month1}-${student.month2} ${student.year1}`;
  const course = student.educationQualification || "N/A";
  
  return `MECARD:N:${name};ORG:${org};TEL:${phone};NOTE:Roll: ${roll} | Reg: ${reg} | Session: ${session} | Course: ${course};;`;
};

export const RegQR = ({ student, size = 60 }: { student: Student; size?: number }) => (
  <QRCode
  
    value={buildRegQRData(student)}
    size={size}
    bgColor="#ffffff"
    fgColor="#000000"
  />
);

export const RegQRHidden = ({ student }: { student: Student }) => (
  <div className="hidden">
    <QRCode
      id="reg-qr-code"
      value={buildRegQRData(student)}
      size={80}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  </div>
);