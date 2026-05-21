/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { publicExamService } from "./exam.service";
import { ExamAnswer } from "./types";
import { ApiErrorResponse } from "@/core/axios/api.types";

export const studentLoginAction = async (
  email: string,
  guardianPhone: string,
) => {
  try {
    const res = await publicExamService.studentLogin(email, guardianPhone);
    return { success: true, data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const getExamQuestionsAction = async (studentId: string) => {
  try {
    const res = await publicExamService.getQuestions(studentId);
    return { success: true, data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const submitExamAction = async (
  studentId: string,
  answers: ExamAnswer[],
) => {
  try {
    const res = await publicExamService.submitExam(studentId, answers);
    return { success: true, data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const getExamResultAction = async (studentId: string) => {
  try {
    const res = await publicExamService.getResult(studentId);
    return { success: true, data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};
