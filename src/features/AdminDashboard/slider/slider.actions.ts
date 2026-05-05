/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { sliderService } from "./slider.service";

export const addSliderAction = async (payload: {
  image: string;
  caption: string;
  order: number;
}) => {
  try {
    const response = await sliderService.createSlider(payload);
    if (response.success) {
      revalidatePath("/admin/slider");
      return { success: true, message: "Slider added successfully! ✨" };
    }
    return { success: false, message: response.message || "Failed to add" };
  } catch (error: any) {
    return { success: false, message: error.message || "Internal Error" };
  }
};

export const deleteSliderAction = async (id: string) => {
  try {
    const response = await sliderService.deleteSlider(id);
    if (response.success) {
      revalidatePath("/admin/slider");
      return { success: true, message: "Deleted!" };
    }
    return { success: false, message: "Delete failed" };
  } catch (error: any) {
    return { success: false, message: "Something went wrong" };
  }
};

export const getSlidersAction = async () => {
  try {
    const response = await sliderService.getSliders();
    return { success: true, data: response.data || [] };
  } catch (error: any) {
    return { success: false, data: [] };
  }
};