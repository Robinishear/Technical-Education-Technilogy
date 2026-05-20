import { httpClient } from "@/core/axios/httpClient";
import { CreateQuestionPayload, ExamAnswer, ExamResult, Question } from "./types";


export const examService = {
  createQuestion: async (payload: CreateQuestionPayload) => {
    return await httpClient.post<Question>("/exam/questions", payload);
  },

  getAllQuestions: async () => {
    return await httpClient.get<Question[]>("/exam/questions");
  },

  getQuestionsForStudent: async (studentId: string) => {
    return await httpClient.get<Question[]>(`/exam/questions/${studentId}`);
  },

  submitExam: async (studentId: string, answers: ExamAnswer[]) => {
    return await httpClient.post<ExamResult>(`/exam/submit/${studentId}`, {
      answers,
    });
  },

  getStudentResult: async (studentId: string) => {
    return await httpClient.get<ExamResult[]>(`/exam/result/${studentId}`);
  },
};
