"use server";

import { revalidatePath } from "next/cache";
import { MarksPayload } from "./types";
import { markStudentService } from "./markStudent.Service";

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