import { httpClient } from "@/core/axios/httpClient";
import {
  ExamAnswer,
  ExamQuestion,
  ExamResult,
  StudentLoginResponse,
} from "./types";

export const publicExamService = {
  studentLogin: async (email: string, guardianPhone: string) => {
    return await httpClient.post<StudentLoginResponse>(
      "/students/student-login",
      {
        email,
        guardianPhone,
      },
    );
  },

  getQuestions: async (studentId: string) => {
    return await httpClient.get<ExamQuestion[]>(`/exam/questions/${studentId}`);
  },

  submitExam: async (studentId: string, answers: ExamAnswer[]) => {
    return await httpClient.post<ExamResult>(`/exam/submit/${studentId}`, {
      answers,
    });
  },

  getResult: async (studentId: string) => {
    return await httpClient.get<ExamResult[]>(`/exam/result/${studentId}`);
  },
};
