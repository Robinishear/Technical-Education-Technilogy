"use server";

import { revalidatePath } from "next/cache";
import { markStudentService } from "../service/markStudent.Service";
import { MarksPayload } from "../types/markStudent.types";


export const saveMarksAction = async (
  studentId: string,
  payload: MarksPayload
) => {
  await markStudentService.saveResult(studentId, payload);
  revalidatePath("/admin/students");
};

export const getMarksAction = async (studentId: string) => {
  const data = await markStudentService.getResults(studentId);
  return data;
};

export const deleteMarkAction = async (markId: string) => {
  await markStudentService.deleteMark(markId);
  revalidatePath("/admin/students");
};

export const updateMarkAction = async (markId: string, payload: MarksPayload) => {
  await markStudentService.updateMark(markId, payload);
  revalidatePath("/admin/students");
};