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

export interface ExamResult {
  score: number;
  totalMarks: number;
  percentage: string;
  attemptCount: number;
  canRetry: boolean;
}
