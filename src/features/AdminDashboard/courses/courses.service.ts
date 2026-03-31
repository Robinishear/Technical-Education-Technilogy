import { httpClient } from "@/core/axios/httpClient";
import { Course, CreateCoursePayload } from "./types";

export const coursesService = {
  getAll: async () => {
    return await httpClient.get<Course[]>("/courses");
  },

  create: async (payload: CreateCoursePayload) => {
    return await httpClient.post<Course>("/courses", payload);
  },

  update: async (id: string, payload: Partial<CreateCoursePayload>) => {
    return await httpClient.put<Course>(`/courses/${id}`, payload);
  },

  delete: async (id: string) => {
    return await httpClient.delete<Course>(`/courses/${id}`);
  },
};