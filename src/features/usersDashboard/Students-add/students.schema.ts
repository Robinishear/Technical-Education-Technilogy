import { z } from "zod";

export const studentValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  picture: z.string().min(1, "Picture is required"),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  guardianPhone: z.string().optional(),
  studentAddress: z.string().optional(),
  district: z.string().optional(),
  thana: z.string().optional(),
  educationQualification: z.string().optional(),
  institute: z.string().optional(),
  directorName: z.string().optional(),
  issueDate: z.string().optional(),
  expireDate: z.string().optional(),
});