export interface IStudentFormInput {
  name: string;
  email: string;
  picture: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  passport: string;
  guardianPhone: string;
  studentAddress: string;
  district: string;
  thana: string;
  duration: string;
  year1: string;
  month1: string;
  year2: string;
  month2: string;
  educationQualification: string;
  institute: string;
  directorName: string;
  issueDate: string;
  expireDate: string;

  studentId: string;   
  roll: string;      
  regNumber: string; 
}


export interface Student {
  id: string; name: string; email: string; picture: string; fatherName: string;
  motherName: string; dob: string; gender: string; passport: string;
  guardianPhone: string; studentAddress: string; district: string;
  thana: string; duration: string; year1: string; month1: string;
  year2: string; month2: string; educationQualification: string;
  institute: string; directorName: string; issueDate: string;
  expireDate: string; studentId: string; roll: string; regNumber: string;
}

export interface Props {
  student: Student;
  onClose: () => void;
  onUpdated: (updated: Student) => void;
}