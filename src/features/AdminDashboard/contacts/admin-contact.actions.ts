"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/core/axios/httpClient";

export const getContactMessagesAction = async () => {
  try {
    const result = await httpClient.get("/contact");
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getUnreadCountAction = async () => {
  try {
    const result = await httpClient.get("/contact/unread-count");
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const deleteContactMessageAction = async (id: string) => {
  try {
    const result = await httpClient.delete(`/contact/${id}`);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};