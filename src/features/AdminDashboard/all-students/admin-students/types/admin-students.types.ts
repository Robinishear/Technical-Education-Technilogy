/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Student {
  website: string;
  joinedDate?: string;
  officeAddress?: string;

  id: string;
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
  examAllowed: boolean;
}

export interface Meta {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface Props {
  student: any;
  onClose: () => void;
  onUpdated: (updated: any) => void;
}