/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { NoticeService } from "./notice.service";
import { ApiErrorResponse } from "@/core/axios/api.types";

export const getAllNoticesAction = async () => {
  try {
    const res = await NoticeService.getAll();
    return { success: true, data: res.data || [] };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, data: [], message: err?.message || error.message };
  }
};

export const createNoticeAction = async (payload: { text: string }) => {
  try {
    const res = await NoticeService.create(payload);
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

export const updateNoticeAction = async (id: string, payload: { text: string }) => {
  try {
    const res = await NoticeService.update(id, payload);
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

export const deleteNoticeAction = async (id: string) => {
  try {
    await NoticeService.delete(id);
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Deleted!" };
  } catch (error: any) {
    const err = error?.response?.data as ApiErrorResponse;
    return { success: false, message: err?.message || error.message };
  }
};