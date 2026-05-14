import { httpClient } from "@/core/axios/httpClient";
import { ApiResponse } from "@/core/axios/api.types";
import { Notice } from "./types/notice.types";

const ENDPOINT = "/notices";

export const NoticeService = {
  getAll: async (): Promise<ApiResponse<Notice[]>> => {
    return await httpClient.get<Notice[]>(`${ENDPOINT}/get-notices`);
  },

  create: async (payload: { text: string }): Promise<ApiResponse<Notice>> => {
    return await httpClient.post<Notice>(`${ENDPOINT}/add-notice`, payload);
  },

  update: async (id: string, payload: { text: string }): Promise<ApiResponse<Notice>> => {
    return await httpClient.patch<Notice>(`${ENDPOINT}/${id}`, payload);
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    return await httpClient.delete<null>(`${ENDPOINT}/${id}`);
  },
};