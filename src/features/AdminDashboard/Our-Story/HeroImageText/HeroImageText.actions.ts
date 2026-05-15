/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { heroImageTextService } from "./HeroImageText.service";

export const addHeroImageTextAction = async (payload: {
  image: string;
  text?: string;
  title?: string;
  name?: string;
}) => {
  try {
    const response = await heroImageTextService.create(payload);
    if (response.success) {
      revalidatePath("/admin/hero-image-text");
      return { success: true, message: "Hero image text added successfully! ✨" };
    }
    return { success: false, message: response.message || "Failed to add" };
  } catch (error: any) {
    return { success: false, message: error.message || "Internal Error" };
  }
};

export const updateHeroImageTextAction = async (
  id: string,
  payload: { image?: string; text?: string; title?: string; name?: string }
) => {
  try {
    const response = await heroImageTextService.update(id, payload);
    if (response.success) {
      revalidatePath("/admin/hero-image-text");
      return { success: true, message: "Updated successfully! ✨" };
    }
    return { success: false, message: response.message || "Failed to update" };
  } catch (error: any) {
    return { success: false, message: error.message || "Internal Error" };
  }
};

export const deleteHeroImageTextAction = async (id: string) => {
  try {
    const response = await heroImageTextService.delete(id);
    if (response.success) {
      revalidatePath("/admin/hero-image-text");
      return { success: true, message: "Deleted successfully!" };
    }
    return { success: false, message: "Delete failed" };
  } catch (error: any) {
    return { success: false, message: "Something went wrong" };
  }
};

export const getHeroImageTextsAction = async () => {
  try {
    const response = await heroImageTextService.getAll();
    return { success: true, data: response.data || [] };
  } catch (error: any) {
    return { success: false, data: [] };
  }
};