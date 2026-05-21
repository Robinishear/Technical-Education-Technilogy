/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/core/axios/httpClient";

export const AdminStudentService = {
  getAllStudents: async (page = 1, limit = 10) => {
    const res = await httpClient.get("/students/all", {
      params: { page, limit },
    });
    return res.data;
  },

  deleteStudent: async (id: string) => {
    const res = await httpClient.delete(`/students/${id}`);
    return res.data;
  },

  updateStudent: async (id: string, data: any) => {
    const res = await httpClient.patch(`/students/${id}`, data);
    return res.data;
  },

  //  Admin: Student exam allow/disallow
  toggleExamAllowed: async (id: string) => {
    return await httpClient.patch(`/students/exam-allowed/${id}`, {});
  },
};