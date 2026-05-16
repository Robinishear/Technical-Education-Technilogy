import { httpClient } from "@/core/axios/httpClient";
import { ApiResponse } from "@/core/axios/api.types";
import { AboutSection } from "./AboutSection.types";

const ABOUT_SECTION_ENDPOINT = "/about-section";

export const aboutSectionService = {
  getAll: async (): Promise<ApiResponse<AboutSection[]>> => {
    return await httpClient.get<AboutSection[]>(
      `${ABOUT_SECTION_ENDPOINT}/get-about-sections`
    );
  },

  create: async (data: {
    image: string;
    text?: string;
  }): Promise<ApiResponse<AboutSection>> => {
    return await httpClient.post<AboutSection>(
      `${ABOUT_SECTION_ENDPOINT}/add-about-section`,
      data
    );
  },

  update: async (
    id: string,
    data: { image?: string; text?: string }
  ): Promise<ApiResponse<AboutSection>> => {
    return await httpClient.patch<AboutSection>(
      `${ABOUT_SECTION_ENDPOINT}/${id}`,
      data
    );
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    return await httpClient.delete<null>(
      `${ABOUT_SECTION_ENDPOINT}/${id}`
    );
  },
};