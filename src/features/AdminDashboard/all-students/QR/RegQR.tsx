import QRCode from 'react-qr-code';
import { Student } from '../admin-students/types/admin-students.types';

export const buildRegQRData = (student: Student): string => {
  return `STUDENT ID:
------------------
Name: ${student.name || "N/A"}
Roll: ${student.roll || "N/A"}
Reg: ${student.regNumber || "N/A"}
Session: ${student.month1}-${student.month2} ${student.year1}
Course: ${student.educationQualification || "N/A"}
Institute: ${student.institute || "N/A"}`;
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