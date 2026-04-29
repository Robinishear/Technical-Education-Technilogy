/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { StudentService } from "./students.service";
import { ApiErrorResponse, ApiResponse } from "@/core/axios/api.types";

export const addStudentSelfAction = async (studentData: any) => {
    try {
        const res = await StudentService.setupStudentProfile(studentData) as ApiResponse<any>;
        if (res.success) {
            revalidatePath("/dashboard/students-list");
            return { success: true, message: res.message || "Profile successfully completed!" };
        }
        return { success: false, message: res.message || "Failed to save data" };
    } catch (error: any) {
        const errorRes = error?.response?.data as ApiErrorResponse;
        return { success: false, message: errorRes?.message || error.message || "Server Error" };
    }
};
export const getStudentsAction = async () => {
    try {
        const res = await StudentService.getAllStudents() as any;
        
        const students = res?.data || [];
        
        return { success: true, data: students };
    } catch (error: any) {
        const errorRes = error?.response?.data as ApiErrorResponse;
        return { success: false, message: errorRes?.message || error.message || "Server Error", data: [] };
    }
};

export const updateStudentAction = async (id: string, studentData: any) => {
    try {
                // console.log(" studentData going to backend:", studentData); 

        const res = await StudentService.updateStudent(id, studentData) as ApiResponse<any>;
                            // console.log(" backend response:", res); 

        if (res.success) {
            revalidatePath("/dashboard/students-list");
            return {
              success: true,
              message: res.message || "Student updated!",
              data: res.data
            };

        }
        return { success: false, message: res.message || "Failed to update" };
    } catch (error: any) {
        const errorRes = error?.response?.data as ApiErrorResponse;
        return { success: false, message: errorRes?.message || error.message || "Server Error" };
    }
};

export const deleteStudentAction = async (id: string) => {
    try {
        const res = await StudentService.deleteStudent(id) as any;
        
        revalidatePath("/dashboard/students-list");
        return { 
            success: true, 
            message: res?.message || "Student deleted!" 
        };
        
    } catch (error: any) {
        const errorRes = error?.response?.data as ApiErrorResponse;
        return { 
            success: false, 
            message: errorRes?.message || error.message || "Server Error" 
        };
    }
};