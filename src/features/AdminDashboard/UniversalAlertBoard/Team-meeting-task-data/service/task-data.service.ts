import { httpClient } from "@/core/axios/httpClient";
import { ApiResponse } from "@/core/axios/api.types";
import { TaskData } from "../types/task-data.types";

const ENDPOINT = "/task-data";

export const TaskDataService = {
  getAll: async (): Promise<ApiResponse<TaskData[]>> => {
    return await httpClient.get<TaskData[]>(ENDPOINT);
  },

  getById: async (id: string): Promise<ApiResponse<TaskData>> => {
    return await httpClient.get<TaskData>(`${ENDPOINT}/${id}`);
  },

  create: async (payload: {
    title: string;
    link: string;
    text: string;
    time: string;
  }): Promise<ApiResponse<TaskData>> => {
    return await httpClient.post<TaskData>(ENDPOINT, payload);
  },

  update: async (id: string, payload: {
    link?: string;
    text?: string;
    time?: string;
  }): Promise<ApiResponse<TaskData>> => {
    return await httpClient.patch<TaskData>(`${ENDPOINT}/${id}`, payload);
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    return await httpClient.delete<null>(`${ENDPOINT}/${id}`);
  },
};