"use client";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Student } from "../admin-students/types/admin-students.types";

export const buildRegQRData = (student: Student): string => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL || "");
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
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: size, height: size }} />;
  }

  return (
    <QRCode
      value={buildRegQRData(student)}
      size={size}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  );
};

export const RegQRHidden = ({ student }: { student: Student }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
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
};

