import { httpClient } from "@/core/axios/httpClient";
import { IStudentFormInput } from "./students.type";

export const StudentService = {
    setupStudentProfile: async (data: IStudentFormInput) => {
        const payload = {
            ...data,
            dob: data.dob ? new Date(data.dob).toISOString() : null,
            issueDate: data.issueDate ? new Date(data.issueDate).toISOString() : null,
            expireDate: data.expireDate ? new Date(data.expireDate).toISOString() : null,
        };
        
        const res = await httpClient.post("/students", payload);
        return res.data;
    }
};