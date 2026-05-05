/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { ApiErrorResponse } from "@/core/axios/api.types";
import { TaskDataService } from "../service/task-data.service";

export const getAllTaskDataAction = async () => {
  try {
    const res = await TaskDataService.getAll();
    return { success: true, data: res.data || [] };
  } catch (error: any) {
    const errorRes = error?.response?.data as ApiErrorResponse;
    return { success: false, data: [], message: errorRes?.message || error.message };
  }
};

export const getTaskDataByIdAction = async (id: string) => {
  try {
    const res = await TaskDataService.getById(id);
    return { success: true, data: res.data };
  } catch (error: any) {
    const errorRes = error?.response?.data as ApiErrorResponse;
    return { success: false, data: null, message: errorRes?.message || error.message };
  }
};

export const createTaskDataAction = async (payload: {
  title: string;
  link: string;
  text: string;
  time: string;
}) => {
  try {
    const res = await TaskDataService.create(payload);
    if (res.success) {
      revalidatePath("/admin/dashboard");
      return { success: true, message: res.message || "Created!" };
    }
    return { success: false, message: res.message || "Failed" };
  } catch (error: any) {
    const errorRes = error?.response?.data as ApiErrorResponse;
    return { success: false, message: errorRes?.message || error.message };
  }
};

export const updateTaskDataAction = async (id: string, payload: {
  link?: string;
  text?: string;
  time?: string;
}) => {
  try {
    const res = await TaskDataService.update(id, payload);
    if (res.success) {
      revalidatePath("/admin/dashboard");
      return { success: true, message: res.message || "Updated!", data: res.data };
    }
    return { success: false, message: res.message || "Failed" };
  } catch (error: any) {
    const errorRes = error?.response?.data as ApiErrorResponse;
    return { success: false, message: errorRes?.message || error.message };
  }
};

export const deleteTaskDataAction = async (id: string) => {
  try {
    await TaskDataService.delete(id);
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Deleted!" };
  } catch (error: any) {
    const errorRes = error?.response?.data as ApiErrorResponse;
    return { success: false, message: errorRes?.message || error.message };
  }
};