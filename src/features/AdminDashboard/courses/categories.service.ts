import { httpClient } from "@/core/axios/httpClient";
import { Category } from "./types";

export const categoriesService = {
  getAll: async () => {
    return await httpClient.get<Category[]>("/categories");
  },

  create: async (payload: { name: string }) => {
    return await httpClient.post<Category>("/categories", payload);
  },
};