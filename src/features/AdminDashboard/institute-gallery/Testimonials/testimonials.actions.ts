/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { TestimonialService } from "./testimonials.service";

export const getTestimonialsAction = async () => {
  try {
    const res = await TestimonialService.getAll() as any;
    return { success: true, data: res?.data || [] };
  } catch (error: any) {
    return { success: false, data: [], message: error.message };
  }
};

export const createTestimonialAction = async (payload: object) => {
  try {
    const res = await TestimonialService.create(payload) as any;
    if (res.success) {
      revalidatePath("/admin/testimonials");
      return { success: true, message: res.message || "Created!" };
    }
    return { success: false, message: res.message || "Failed to create" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};

export const updateTestimonialAction = async (id: string, payload: object) => {
  try {
    const res = await TestimonialService.update(id, payload) as any;
    if (res.success) {
      revalidatePath("/admin/testimonials");
      return { success: true, message: res.message || "Updated!" };
    }
    return { success: false, message: res.message || "Failed to update" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};

export const deleteTestimonialAction = async (id: string) => {
  try {
    await TestimonialService.delete(id);
    revalidatePath("/admin/testimonials");
    return { success: true, message: "Deleted!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server Error" };
  }
};