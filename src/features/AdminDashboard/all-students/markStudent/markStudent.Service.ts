import { httpClient } from "@/core/axios/httpClient";
import { Mark, MarksPayload } from "./types";

export const markStudentService = {
  saveResult: async (studentId: string, payload: MarksPayload): Promise<void> => {
    await httpClient.post<Mark>(`/marks/${studentId}`, payload);
  },

  getResults: async (studentId: string): Promise<Mark[]> => {
    const res = await httpClient.get<Mark[]>(`/marks/${studentId}`);
    return res.data ?? [];
  },
};