import { httpClient } from "@/core/axios/httpClient";
import { Category } from "./types";
import { ApiResponse } from "@/core/axios/api.types";

export const categoriesService = {
  getAll: async () => {
    return await httpClient.get<Category[]>("/categories");
  },

  create: async (payload: { name: string }) => {
    return await httpClient.post<Category>("/categories", payload);
  },

  update: async (id: string, payload: { name: string }): Promise<ApiResponse<Category>> => {
  return await httpClient.patch<Category>(`/categories/${id}`, payload);
},

delete: async (id: string): Promise<ApiResponse<null>> => {
  return await httpClient.delete<null>(`/categories/${id}`);
},
};