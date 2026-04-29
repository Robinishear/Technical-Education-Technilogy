import { Student } from "../type-utils";

export const buildQRData = (student: Student): string => {
  return JSON.stringify({
    name: student.name,
    studentId: student.studentId,
    roll: student.roll,
    regNumber: student.regNumber,
    institute: student.institute,
    fatherName: student.fatherName,
    motherName: student.motherName,
    dob: student.dob,
    gender: student.gender,
    session: `${student.month1}-${student.month2} ${student.year1}`,
    subject: student.educationQualification,
  });
};

export const StudentQR = ({ student, size = 60 }: { student: Student; size?: number }) => (
  <QRCode
    value={buildQRData(student)}
    size={size}
    bgColor="#ffffff"
    fgColor="#000000"
  />
);

export const StudentQRHidden = ({ student }: { student: Student }) => (
  <div className="hidden">
    <QRCode
      id="admit-qr-code"
      value={buildQRData(student)}
      size={80}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  </div>
);