/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { instructorsService } from "./Instructor.service";

export const getInstructorsAction = async () => {
  try {
    const res = await instructorsService.getAll() as any;
    return { success: true, data: res?.data || [] };
  } catch (error: any) {
    return { success: false, data: [], message: error.message };
  }
};

export const createInstructorAction = async (payload: object) => {
  try {
    const res = await instructorsService.create(payload) as any;
    if (res.success) {
      revalidatePath("/admin/instructors");
      return { success: true, message: res.message || "Created!" };
    }
    return { success: false, message: res.message || "Failed to create" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};

export const updateInstructorAction = async (id: string, payload: object) => {
  try {
    const res = await instructorsService.update(id, payload) as any;
    if (res.success) {
      revalidatePath("/admin/instructors");
      return { success: true, message: res.message || "Updated!" };
    }
    return { success: false, message: res.message || "Failed to update" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};

export const deleteInstructorAction = async (id: string) => {
  try {
    await instructorsService.delete(id);
    revalidatePath("/admin/instructors");
    return { success: true, message: "Deleted!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};