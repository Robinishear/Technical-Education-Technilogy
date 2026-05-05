import { httpClient } from "@/core/axios/httpClient";
import { ApiResponse } from "@/core/axios/api.types";
import { Slider } from "./slider.types";

const SLIDER_ENDPOINT = "/slider";

export const sliderService = {
  getSliders: async (): Promise<ApiResponse<Slider[]>> => {
    return await httpClient.get<Slider[]>(`${SLIDER_ENDPOINT}/get-slider`);
  },

  createSlider: async (data: {
    image: string;
    caption: string;
    order: number;
  }): Promise<ApiResponse<Slider>> => {
    return await httpClient.post<Slider>(`${SLIDER_ENDPOINT}/add-slider`, data);
  },

  // deleteSlider: async (id: string): Promise<ApiResponse<null>> => {
  //   return await httpClient.delete<null>(`${SLIDER_ENDPOINT}/${id}`);
  // },
  deleteSlider: async (id: string): Promise<ApiResponse<null>> => {
  return await httpClient.delete<null>(`${SLIDER_ENDPOINT}/${id}`);
},
};