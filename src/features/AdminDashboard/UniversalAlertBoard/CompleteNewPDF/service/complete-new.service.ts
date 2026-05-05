import { httpClient } from "@/core/axios/httpClient";
import { ApiResponse } from "@/core/axios/api.types";

const ENDPOINT = "/complete-new";

export interface CompleteNewData {
  id: string;
  title: string;
  text: string;
  date: string;
  pdfUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const CompleteNewService = {
  getAll: async (): Promise<ApiResponse<CompleteNewData[]>> => {
    return await httpClient.get<CompleteNewData[]>(ENDPOINT);
  },

  create: async (payload: {
    title: string;
    text: string;
    date: string;
    pdfUrl: string;
  }): Promise<ApiResponse<CompleteNewData>> => {
    return await httpClient.post<CompleteNewData>(ENDPOINT, payload);
  },

  update: async (id: string, payload: {
    text?: string;
    date?: string;
    pdfUrl?: string;
  }): Promise<ApiResponse<CompleteNewData>> => {
    return await httpClient.patch<CompleteNewData>(`${ENDPOINT}/${id}`, payload);
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    return await httpClient.delete<null>(`${ENDPOINT}/${id}`);
  },
};