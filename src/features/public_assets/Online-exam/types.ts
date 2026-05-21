/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StudentLoginResponse {
  student: {
    id: string;
    name: string;
    email: string;
    roll: string;
    studentId: string;
    guardianPhone: string;
  };
  hasAttempted: boolean;
  canRetry: boolean;
}

export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  questionText: string;
  mark: number;
  options: ExamOption[];
}

export interface ExamAnswer {
  questionId: string;
  selectedOptionId: string;
}

export interface ExamResult {
  score: number;
  totalMarks: number;
  percentage: string;
  canRetry: boolean;
}

export interface Props {
  onLogin: (student: any) => void;
}

// export interface Props {
//   studentId: string;
//   onSubmit: (result: any) => void;
// }