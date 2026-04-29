export type StudentFormFieldType = 
  "text" | "email" | "date" | "select" |"file";

export type StudentField = {
  name: string;
  label: string;
  type: StudentFormFieldType;
  placeholder?: string;
  options?: string[];
  icon?: string;
};


export const PICTURE_FIELD: StudentField = { 
  name: "picture", 
  label: "Student Photo", 
  type: "file", 
  icon: "📸"
};

export const STUDENT_FORM_FIELDS: StudentField[] = [
  PICTURE_FIELD,
  { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
  { name: "email", label: "Email", type: "email", placeholder: "example@mail.com" },
  // { name: "picture", label: "Picture URL", type: "text", placeholder: "https://example.com/photo.jpg" },
  { name: "fatherName", label: "Father Name", type: "text", placeholder: "Father Name" },
  { name: "motherName", label: "Mother Name", type: "text", placeholder: "Mother Name" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { 
    name: "gender", 
    label: "Gender", 
    type: "select",
    options: ["Male", "Female", "Other"]
  },
  { name: "passport", label: "Passport No", type: "text", placeholder: "AB1234567" },
  { name: "guardianPhone", label: "Guardian Phone", type: "text", placeholder: "+8801XXXXXXXXX" },
  { name: "studentAddress", label: "Address", type: "text", placeholder: "House, Road, Area" },
  { name: "district", label: "District", type: "text", placeholder: "Dhaka" },
  { name: "thana", label: "Thana", type: "text", placeholder: "Mirpur" },
  { name: "duration", label: "Course Duration", type: "text", placeholder: "6 months" },
  { name: "year1", label: "Start Year", type: "text", placeholder: "2024" },
  { name: "month1", label: "Start Month", type: "text", placeholder: "January" },
  { name: "year2", label: "End Year", type: "text", placeholder: "2025" },
  { name: "month2", label: "End Month", type: "text", placeholder: "June" },
  { name: "educationQualification", label: "Education Qualification", type: "text", placeholder: "SSC/HSC/BSc" },
  { name: "institute", label: "Institute", type: "text", placeholder: "Institute Name" },
  { name: "directorName", label: "Director Name", type: "text", placeholder: "Director Name" },
  { name: "issueDate", label: "Issue Date", type: "date" },
  { name: "expireDate", label: "Expire Date", type: "date" },
];