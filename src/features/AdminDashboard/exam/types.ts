export interface Option {
  id: string;
  text: string;
}

export interface OptionWithAnswer extends Option {
  isCorrect: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  options: Option[];
}

export interface CreateQuestionPayload {
  questionText: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

export interface ExamAnswer {
  questionId: string;
  selectedOptionId: string;
}

export interface Answer {
  id: string;
  questionId: string;
  isCorrect: boolean;
}

export interface ExamResult {
  id: string;
  score: number;
  totalMarks: number;
  percentage: string;
  attemptCount: number;
  canRetry: boolean;
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
    roll: string;
    studentId: string;
    guardianPhone: string;
  };
  answers: Answer[];
}

export interface Props {
  results: ExamResult[];
}

export interface QuestionProps {
  questions: Question[];
}
