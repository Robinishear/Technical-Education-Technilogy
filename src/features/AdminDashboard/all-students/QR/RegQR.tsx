import { Student } from "../type-utils";
import QRCode from 'react-qr-code';

export const buildRegQRData = (student: Student): string => {
  return JSON.stringify({
    name: student.name,
    regNumber: student.regNumber,
    institute: student.institute,
    fatherName: student.fatherName,
    motherName: student.motherName,
    gender: student.gender,
    thana: student.thana,
    district: student.district,
    subject: student.educationQualification,
    session: `${student.month1}-${student.month2} ${student.year1}`,
    duration: student.duration,
    instituteCode: student.studentId?.slice(0, 6),
  });
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