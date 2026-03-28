// student-form.ts
export type StudentField = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
};

export const STUDENT_FORM_FIELDS: StudentField[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
  { name: "email", label: "Email", type: "email", placeholder: "example@mail.com" },
  { name: "fatherName", label: "Father Name", type: "text", placeholder: "Father Name" },
  { name: "motherName", label: "Mother Name", type: "text", placeholder: "Mother Name" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "gender", label: "Gender", type: "text", placeholder: "Male/Female" },
  { name: "passport", label: "Passport No", type: "text" },
  { name: "guardianPhone", label: "Guardian Phone", type: "text", placeholder: "+8801XXXXXXXXX" },
  { name: "studentAddress", label: "Address", type: "text" },
  { name: "district", label: "District", type: "text" },
  { name: "thana", label: "Thana", type: "text" },
  { name: "duration", label: "Course Duration", type: "text" },
  { name: "year1", label: "Start Year", type: "text" },
  { name: "month1", label: "Start Month", type: "text" },
  { name: "year2", label: "End Year", type: "text" },
  { name: "month2", label: "End Month", type: "text" },
  { name: "educationQualification", label: "Education Qualification", type: "text" },
  { name: "institute", label: "Institute", type: "text" },
  { name: "directorName", label: "Director Name", type: "text" },
  { name: "issueDate", label: "Issue Date", type: "date" },
  { name: "expireDate", label: "Expire Date", type: "date" },
];