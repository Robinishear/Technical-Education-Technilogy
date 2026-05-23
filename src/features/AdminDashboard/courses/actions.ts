/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { CreateCoursePayload } from "./types";
import { coursesService } from "./courses.service";
import { categoriesService } from "./categories.service";
import { ApiErrorResponse } from "@/core/axios/api.types";

export const getCoursesAction = async () => {
  const res = await coursesService.getAll();
  return res.data;
};

export const createCourseAction = async (payload: CreateCoursePayload) => {
  const res = await coursesService.create(payload);
  revalidatePath("/admin/courses");
  return res.data;
};

export const updateCourseAction = async (
  id: string,
  payload: Partial<CreateCoursePayload>,
) => {
  const res = await coursesService.update(id, payload);
  revalidatePath("/admin/courses");
  return res.data;
};

export const deleteCourseAction = async (id: string) => {
  await coursesService.delete(id);
  revalidatePath("/admin/courses");
};


export const getCategoriesAction = async () => {
  const res = await categoriesService.getAll();
  return res.data;
};

export const createCategoryAction = async (payload: { name: string }) => {
  const res = await categoriesService.create(payload);
  revalidatePath("/admin/courses");
  return res.data;
};

export const updateCategoryAction = async (
  id: string,
  payload: { name: string },
) => {
  try {
    const res = await categoriesService.update(id, payload);
    if (res.success) {
      revalidatePath("/admin/courses");
      return {
        success: true,
        message: res.message || "Updated!",
        data: res.data,
      };
    }
    return { success: false, message: res.message || "Failed" };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const deleteCategoryAction = async (id: string) => {
  try {
    await categoriesService.delete(id);
    revalidatePath("/admin/courses");
    return { success: true, message: "Deleted!" };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};
