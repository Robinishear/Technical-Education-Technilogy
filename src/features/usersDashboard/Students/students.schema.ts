import { z } from "zod";

// reusable
const requiredString = (field: string) =>
  z.string().min(1, `${field} is required`);

const optionalString = z.string().optional();

// CREATE (strict)
export const createStudentSchema = z.object({
  name: requiredString("Name"),
  email: z.string().email("Valid email is required"),
  picture: requiredString("Picture"),

  fatherName: requiredString("Father name"),
  motherName: requiredString("Mother name"),
  dob: requiredString("Date of birth"),
  gender: requiredString("Gender"),
  passport: requiredString("Passport"),
  guardianPhone: requiredString("Guardian phone"),

  studentAddress: requiredString("Address"),
  district: requiredString("District"),
  thana: requiredString("Thana"),

  duration: requiredString("Duration"),
  year1: requiredString("Start year"),
  month1: requiredString("Start month"),
  year2: requiredString("End year"),
  month2: requiredString("End month"),

  educationQualification: requiredString("Education"),
  institute: requiredString("Institute"),
  directorName: requiredString("Director"),

  issueDate: requiredString("Issue date"),
  expireDate: requiredString("Expire date"),
});

export const updateStudentSchema = z.object({
  name: optionalString,
  email: z.string().email().optional(),
  picture: optionalString,

  fatherName: optionalString,
  motherName: optionalString,
  dob: optionalString,
  gender: optionalString,
  passport: optionalString,
  guardianPhone: optionalString,

  studentAddress: optionalString,
  district: optionalString,
  thana: optionalString,

  duration: optionalString,
  year1: optionalString,
  month1: optionalString,
  year2: optionalString,
  month2: optionalString,

  educationQualification: optionalString,
  institute: optionalString,
  directorName: optionalString,

  issueDate: optionalString,
  expireDate: optionalString,
});