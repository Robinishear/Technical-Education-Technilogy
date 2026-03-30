/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { AdminStudentService } from "./admin-students.service";
import { ApiErrorResponse } from "@/core/axios/api.types";

export const getAdminStudentsAction = async (page = 1, limit = 10) => {
    try {
        const res = await AdminStudentService.getAllStudents(page, limit) as any;
        return { 
            success: true, 
            data: res?.data || [],
            meta: res?.meta || { total: 0, totalPages: 1, page, limit }
        };
    } catch (error: any) {
        const errorRes = error?.response?.data as ApiErrorResponse;
        return { 
            success: false, 
            message: errorRes?.message || error.message || "Server Error", 
            data: [],
            meta: { total: 0, totalPages: 1, page, limit }
        };
    }
};

export const adminDeleteStudentAction = async (id: string) => {
    try {
        await AdminStudentService.deleteStudent(id);
        revalidatePath("/admin-dashboard/students");
        return { success: true, message: "Student deleted!" };
    } catch (error: any) {
        const errorRes = error?.response?.data as ApiErrorResponse;
        return { success: false, message: errorRes?.message || error.message || "Server Error" };
    }
};

export const adminUpdateStudentAction = async (id: string, data: any) => {
    try {
        const res = await AdminStudentService.updateStudent(id, data) as any;
        revalidatePath("/admin-dashboard/students");
        return { success: true, message: res?.message || "Student updated!" };
    } catch (error: any) {
        const errorRes = error?.response?.data as ApiErrorResponse;
        return { success: false, message: errorRes?.message || error.message || "Server Error" };
    }
};


// export const getSemestersAction = async (studentId: string) => {
//   try {
//     const res = await AdminStudentService.getSemesters(studentId) as any;
//     return { success: true, data: res?.data || [] };
//   } catch (error: any) {
//     return { success: false, data: [], message: error.message };
//   }
// };

// export const createSemesterAction = async (studentId: string, data: any) => {
//   try {
//     const res = await AdminStudentService.createSemester(studentId, data) as any;
//     return { success: true, data: res?.data };
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// export const updateSubjectAction = async (subjectId: string, data: any) => {
//   try {
//     const res = await AdminStudentService.updateSubject(subjectId, data) as any;
//     return { success: true, data: res?.data };
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// export const deleteSubjectAction = async (subjectId: string) => {
//   try {
//     await AdminStudentService.deleteSubject(subjectId);
//     return { success: true };
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };