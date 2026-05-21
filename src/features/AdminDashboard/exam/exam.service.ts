/* eslint-disable @typescript-eslint/no-explicit-any */
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

  getAllResults: async () => {
    return await httpClient.get<any[]>("/exam/results");
  },

  giveRetry: async (studentId: string) => {
    return await httpClient.post(`/exam/retry/${studentId}`, {});
  },

  deleteQuestion: async (id: string) => {
    return await httpClient.delete(`/exam/questions/${id}`);
  },

  updateQuestion: async (id: string, payload: CreateQuestionPayload) => {
    return await httpClient.patch(`/exam/questions/${id}`, payload);
  },
};
