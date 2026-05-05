/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { ApiErrorResponse } from "@/core/axios/api.types";
import { CompleteNewService } from "../service/complete-new.service";

export const getAllCompleteNewAction = async () => {
  try {
    const res = await CompleteNewService.getAll();
    return { success: true, data: res.data || [] };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, data: [], message: err?.message || error.message };
  }
};

export const createCompleteNewAction = async (payload: {
  title: string;
  text: string;
  date: string;
  pdfUrl: string;
}) => {
  try {
    const res = await CompleteNewService.create(payload);
    if (res.success) {
      revalidatePath("/admin/dashboard");
      return { success: true, message: res.message || "Created!" };
    }
    return { success: false, message: res.message || "Failed" };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const updateCompleteNewAction = async (id: string, payload: {
  text?: string;
  date?: string;
  pdfUrl?: string;
}) => {
  try {
    const res = await CompleteNewService.update(id, payload);
    if (res.success) {
      revalidatePath("/admin/dashboard");
      return { success: true, message: res.message || "Updated!", data: res.data };
    }
    return { success: false, message: res.message || "Failed" };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};

export const deleteCompleteNewAction = async (id: string) => {
  try {
    await CompleteNewService.delete(id);
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Deleted!" };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};