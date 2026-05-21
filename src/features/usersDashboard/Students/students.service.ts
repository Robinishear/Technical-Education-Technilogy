import { httpClient } from "@/core/axios/httpClient";
import { IStudentFormInput } from "./students.type";

export const StudentService = {
  setupStudentProfile: async (data: IStudentFormInput) => {
    const payload = {
      ...data,
      dob: data.dob ? new Date(data.dob).toISOString() : null,
      issueDate: data.issueDate ? new Date(data.issueDate).toISOString() : null,
      expireDate: data.expireDate
        ? new Date(data.expireDate).toISOString()
        : null,
    };
    return await httpClient.post("/students", payload);
    // return res.data;
  },

  // getAllStudents: async () => {
  //     const res = await httpClient.get("/students");
  //     return res.data;
  // },
  getAllStudents: async () => {
    const res = await httpClient.get("/students?limit=1000");
    return res.data;
  },

  getStudentById: async (id: string) => {
    const res = await httpClient.get(`/students/${id}`);
    return res.data;
  },

  updateStudent: async (id: string, data: Partial<IStudentFormInput>) => {
    const payload = {
      ...data,
      dob: data.dob ? new Date(data.dob).toISOString() : null,
      issueDate: data.issueDate ? new Date(data.issueDate).toISOString() : null,
      expireDate: data.expireDate
        ? new Date(data.expireDate).toISOString()
        : null,
    };
    // console.log("service payload:", JSON.stringify(payload, null, 2));

    // const res = await httpClient.patch(`/students/${id}`, payload);
    return await httpClient.patch(`/students/${id}`, payload);
    // console.log(" httpClient res:", JSON.stringify(res, null, 2));
    // return res.data;
  },

  deleteStudent: async (id: string) => {
    const res = await httpClient.delete(`/students/${id}`);
    return res.data;
  },
};
