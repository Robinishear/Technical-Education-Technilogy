/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { StudentsService } from "./students.service";

export const getStudentsAction = async () => {
  try {
    const res = await StudentsService.getAll() as any;
    return { success: true, data: res?.data || [] };
  } catch (error: any) {
    return { success: false, data: [], message: error.message };
  }
};

export const createStudentAction = async (payload: object) => {
  try {
    const res = await StudentsService.create(payload) as any;
    if (res.success) {
      revalidatePath("/admin/successStudents");
      return { success: true, message: res.message || "Created!" };
    }
    return { success: false, message: res.message || "Failed to create" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};

export const updateStudentAction = async (id: string, payload: object) => {
  try {
    const res = await StudentsService.update(id, payload) as any;
    if (res.success) {
      revalidatePath("/admin/successStudents");
      return { success: true, message: res.message || "Updated!" };
    }
    return { success: false, message: res.message || "Failed to update" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};

export const deleteStudentAction = async (id: string) => {
  try {
    await StudentsService.delete(id);
    revalidatePath("/admin/successStudents");
    return { success: true, message: "Deleted!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};