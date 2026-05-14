import { httpClient } from "@/core/axios/httpClient";
import { ApiResponse } from "@/core/axios/api.types";
import { HeroImageText } from "./HeroImageText.types";

const HERO_IMAGE_TEXT_ENDPOINT = "/hero-image-text";

export const heroImageTextService = {
  getAll: async (): Promise<ApiResponse<HeroImageText[]>> => {
    return await httpClient.get<HeroImageText[]>(
      `${HERO_IMAGE_TEXT_ENDPOINT}/get-hero-image-texts`
    );
  },

  create: async (data: {
    image: string;
    text?: string;
  }): Promise<ApiResponse<HeroImageText>> => {
    return await httpClient.post<HeroImageText>(
      `${HERO_IMAGE_TEXT_ENDPOINT}/add-hero-image-text`,
      data
    );
  },

  update: async (
    id: string,
    data: { image?: string; text?: string }
  ): Promise<ApiResponse<HeroImageText>> => {
    return await httpClient.patch<HeroImageText>(
      `${HERO_IMAGE_TEXT_ENDPOINT}/${id}`,
      data
    );
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    return await httpClient.delete<null>(
      `${HERO_IMAGE_TEXT_ENDPOINT}/${id}`
    );
  },
};