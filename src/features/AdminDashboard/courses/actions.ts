"use server";

import { revalidatePath } from "next/cache";
import { CreateCoursePayload } from "./types";
import { coursesService } from "./courses.service";
import { categoriesService } from "./categories.service";

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
  payload: Partial<CreateCoursePayload>
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