/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { examService } from "./exam.service";
import { CreateQuestionPayload, ExamAnswer } from "./types";
import { ApiErrorResponse } from "@/core/axios/api.types";

export const createQuestionAction = async (payload: CreateQuestionPayload) => {
  try {
    const res = await examService.createQuestion(payload);
    revalidatePath("/admin/exam");
    return { success: true, message: "Question created!", data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const getAllQuestionsAction = async () => {
  const res = await examService.getAllQuestions();
  return res.data;
};

export const getQuestionsForStudentAction = async (studentId: string) => {
  try {
    const res = await examService.getQuestionsForStudent(studentId);
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
    const res = await examService.submitExam(studentId, answers);
    revalidatePath("/admin/students");
    return { success: true, data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const getStudentResultAction = async (studentId: string) => {
  try {
    const res = await examService.getStudentResult(studentId);
    return { success: true, data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const giveRetryAction = async (studentId: string) => {
  try {
    const res = await examService.giveRetry(studentId);
    revalidatePath("/admin/exam");
    return { success: true, message: "Retry granted!", data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};
export const getAllResultsAction = async () => {
  const res = await examService.getAllResults();
  return res.data ?? [];
};

export const deleteQuestionAction = async (id: string) => {
  try {
    const res = await examService.deleteQuestion(id);
    revalidatePath("/admin/exam");
    return { success: true, message: "Question deleted!", data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const updateQuestionAction = async (id: string, payload: CreateQuestionPayload) => {
  try {
    const res = await examService.updateQuestion(id, payload);
    revalidatePath("/admin/exam");
    return { success: true, message: "Question updated!", data: res.data };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};