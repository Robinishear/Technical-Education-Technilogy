import * as z from "zod";

export const registerSchema = z.object({ 
  // Step 1: Applicant Info
  name: z.string().min(2, " নাম দিন"),
  instituteName: z.string().min(2, "ইন্সটিটিউট নাম দিন"),
  directorName: z.string().min(2, "ডিরেক্টর নাম দিন"),
  email: z.string().email("সঠিক ইমেইল দিন"),
  phone: z.string().min(11, "১১ ডিজিট নম্বর দিন"),
  gender: z.string().min(1, "লিঙ্গ নির্বাচন করুন"),
  nationality: z.string().min(1, "জাতীয়তা নির্বাচন করুন"),
  instituteAge: z.string().min(1, "ইন্সটিটিউট বয়স দিন"),
  religion: z.string().min(1, "ধর্ম লিখুন"),
  fullAddress: z.string().min(5, "পূর্ণ ঠিকানা লিখুন"),
  village: z.string().min(2, "গ্রামের নাম দিন"),
  postOffice: z.string().min(2, "পোস্ট অফিস লিখুন"),
  thanaUpazila: z.string().min(2, "থানা/উপজেলা লিখুন"),
  district: z.string().min(2, "জেলা লিখুন"),

  fatherName: z.string().min(2, "পিতার নাম দিন"),
  motherName: z.string().min(2, "মাতার নাম দিন"),

  courseName: z.string().min(2, "কোর্সের নাম দিন"),
  duration: z.string().min(1, "মেয়াদ লিখুন"),
  startYear: z.string().min(4, "শুরুর বছর লিখুন"),
  startMonth: z.string().min(1, "শুরুর মাস লিখুন"),
  endYear: z.string().min(4, "শেষের বছর লিখুন"),
  endMonth: z.string().min(1, "শেষের মাস লিখুন"),
  educationQualification: z.string().min(2, "শিক্ষাগত যোগ্যতা লিখুন"),

  directorPhoto: z.any().refine((file) => !!file && file.length > 0, "ফটো আপলোড করুন"),
  institutePhoto: z.any().refine((file) => !!file && file.length > 0, "ফটো আপলোড করুন"),
  nationalIDPhoto: z.any().refine((file) => !!file && file.length > 0, "ফটো আপলোড করুন"),
  signaturePhoto: z.any().refine((file) => !!file && file.length > 0, "ফটো আপলোড করুন"),

  username: z.string().min(4, "ইউজারনেম দিন"),
  password: z.string().min(6, "পাসওয়ার্ড দিন"),
});

export type RegisterValues = z.infer<typeof registerSchema>;