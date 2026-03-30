/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/core/axios/httpClient";

export const AdminStudentService = {
    getAllStudents: async (page = 1, limit = 10) => {
        const res = await httpClient.get("/students/all", {
            params: { page, limit }
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



// getSemesters: async (studentId: string) => {
//   const res = await httpClient.get(`/students/${studentId}/semesters`);
//   return res.data;
// },

// createSemester: async (studentId: string, data: any) => {
//   const res = await httpClient.post(`/students/${studentId}/semesters`, data);
//   return res.data;
// },

// updateSubject: async (subjectId: string, data: any) => {
//   const res = await httpClient.patch(`/students/subjects/${subjectId}`, data);
//   return res.data;
// },

// deleteSubject: async (subjectId: string) => {
//   const res = await httpClient.delete(`/students/subjects/${subjectId}`);
//   return res.data;
// },

};