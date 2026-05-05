import { httpClient } from "@/core/axios/httpClient";
import { Mark, MarksPayload } from "../types/markStudent.types";

export const markStudentService = {
  saveResult: async (studentId: string, payload: MarksPayload): Promise<void> => {
    await httpClient.post<Mark>(`/marks/${studentId}`, payload);
  },

  getResults: async (studentId: string): Promise<Mark[]> => {
    const res = await httpClient.get<Mark[]>(`/marks/${studentId}`);
    return res.data ?? [];
  },

  deleteMark: async (markId: string): Promise<void> => {
  await httpClient.delete(`/marks/${markId}`);
},

updateMark: async (markId: string, payload: MarksPayload): Promise<void> => {
  await httpClient.put(`/marks/${markId}`, payload);
},
};
