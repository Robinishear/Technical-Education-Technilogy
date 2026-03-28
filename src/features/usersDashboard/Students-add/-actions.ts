/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { StudentService } from "./students.service";
import { ApiErrorResponse, ApiResponse } from "@/core/axios/api.types";

export const addStudentSelfAction = async (studentData: any) => {
    try {
        const res = await StudentService.setupStudentProfile(studentData) as ApiResponse<any>;
        
        if (res.success) {
            revalidatePath("/profile"); 
            return { 
                success: true, 
                message: res.message || "Profile successfully completed!" 
            };
        }
        
      
        return { 
            success: false, 
            message: res.message || "Failed to save data" 
        };

    } catch (error: any) {
        const errorRes = error?.response?.data as ApiErrorResponse;
        
        return { 
            success: false, 
            message: errorRes?.message || error.message || "Server Error" 
        };
    }
};