/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { sendContactMessage } from "./contact.service";

export const sendContactMessageAction = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  try {
    const result = await sendContactMessage(data);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to send message" };
  }
};