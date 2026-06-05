"use client";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Student } from "../admin-students/types/admin-students.types";

export const buildTranscriptQRData = (student: Student): string => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL || "");
  return `${baseUrl}/student-result-page?roll=${student.roll || ""}`;
};

export const TranscriptQR = ({
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

  const url = buildTranscriptQRData(student);

  return (
    <QRCode
      value={url}
      size={size}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  );
};

export const TranscriptQRHidden = ({ student }: { student: Student }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const url = buildTranscriptQRData(student);

  return (
    <div style={{ display: "none" }}>
      <QRCode
        id="transcript-qr-code"
        value={url}
        size={80}
        bgColor="#ffffff"
        fgColor="#000000"
      />
    </div>
  );
};


