/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { aboutSectionService } from "./AboutSection.service";

export const addAboutSectionAction = async (payload: {
  image: string;
  text?: string;
  title?: string;
  name?: string;
}) => {
  try {
    const response = await aboutSectionService.create(payload);
    if (response.success) {
      revalidatePath("/admin/about-section");
      return { success: true, message: "About section added successfully! ✨" };
    }
    return { success: false, message: response.message || "Failed to add" };
  } catch (error: any) {
    return { success: false, message: error.message || "Internal Error" };
  }
};

export const updateAboutSectionAction = async (
  id: string,
  payload: { image?: string; text?: string; title?: string; name?: string }
) => {
  try {
    const response = await aboutSectionService.update(id, payload);
    if (response.success) {
      revalidatePath("/admin/about-section");
      return { success: true, message: "Updated successfully! ✨" };
    }
    return { success: false, message: response.message || "Failed to update" };
  } catch (error: any) {
    return { success: false, message: error.message || "Internal Error" };
  }
};

export const deleteAboutSectionAction = async (id: string) => {
  try {
    const response = await aboutSectionService.delete(id);
    if (response.success) {
      revalidatePath("/admin/about-section");
      return { success: true, message: "Deleted successfully!" };
    }
    return { success: false, message: "Delete failed" };
  } catch (error: any) {
    return { success: false, message: "Something went wrong" };
  }
};

export const getAboutSectionsAction = async () => {
  try {
    const response = await aboutSectionService.getAll();
    return { success: true, data: response.data || [] };
  } catch (error: any) {
    return { success: false, data: [] };
  }
};