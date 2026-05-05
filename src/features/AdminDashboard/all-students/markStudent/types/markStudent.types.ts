/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SubjectPayload {
  subjectCode: string;
  subjectName: string;
  credit: number;
  written: number;
  practical: number;
  viva: number;
  totalMarks: number;
  fullMark: number;
  gradePoint: number;
  grade: string;
}

export interface MarksPayload {
  semesterTitle: string;
  totalCredit: number;
  totalPoints: number;
  cgpa: number;
  grade: string;
  status: string;
  subjects: SubjectPayload[];
}

export interface Mark {
  id: string;
  semesterTitle: string;
  totalCredit: number;
  totalPoints: number;
  cgpa: number;
  grade: string;
  status: string;
  studentId: string;
  subjects: Subject[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  subjectCode: string;
  subjectName: string;
  credit: number;
  written: number;
  practical: number;
  viva: number;
  totalMarks: number;
  fullMark: number;
  gradePoint: number;
  grade: string;
  markId: string;
  createdAt: Date;
  updatedAt: Date;
}



export const calculateGrade = (marks: number) => {
  if (marks >= 80) return { gp: 4.00, grade: "A+" };
  if (marks >= 75) return { gp: 3.75, grade: "A" };
  if (marks >= 70) return { gp: 3.50, grade: "A-" };
  if (marks >= 65) return { gp: 3.25, grade: "B+" };
  if (marks >= 60) return { gp: 3.00, grade: "B" };
  if (marks >= 55) return { gp: 2.75, grade: "B-" };
  if (marks >= 50) return { gp: 2.50, grade: "C+" };
  if (marks >= 45) return { gp: 2.25, grade: "C" };
  if (marks >= 40) return { gp: 2.00, grade: "D" };
  return { gp: 0.00, grade: "F" };
};

export const getSemesterGrade = (cgpa: number) => {
  if (cgpa === 4.00) return "A+";
  if (cgpa >= 3.75) return "A";
  if (cgpa >= 3.50) return "A-";
  if (cgpa >= 3.25) return "B+";
  if (cgpa >= 3.00) return "B";
  if (cgpa >= 2.75) return "B-";
  if (cgpa >= 2.50) return "C+";
  if (cgpa >= 2.25) return "C";
  if (cgpa >= 2.00) return "D";
  return "F";
};

export interface SemesterFormProps {
  sem: any;
  semIdx: number;
  summary: any;
  onTitleChange: (semIdx: number, value: string) => void;
  onSubjectChange: (semId: number, subIdx: number, field: string, value: string) => void;
  onRemove: (id: number) => void;
}


export interface Props {
  studentId: string;
  student: any;
  onClose: () => void;
}