/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CloudUpload, CheckCircle2, UserCircle } from "lucide-react";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { IStudentFormInput } from "../students.type";
import { createStudentSchema } from "../students.schema";
import { addStudentSelfAction } from "../-actions";
import { STUDENT_FORM_FIELDS } from "../student-form";
import { showSuccess, showError } from "@/core/utils/swal.utils";

export default function StudentAddForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IStudentFormInput>({
    resolver: zodResolver(createStudentSchema as any),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setUploadedImageUrl(imageUrl);
        setValue("picture", imageUrl); 
      }
    } catch (err) {
      showError("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: IStudentFormInput) => {
    try {
      if (!uploadedImageUrl) return showError("Please upload photo first!");

      const result = await addStudentSelfAction({ ...data, picture: uploadedImageUrl });

      if (result.success) {
        await showSuccess(result.message || "Admission Successful! 🎓");
        reset();
        setPreview(null);
        setUploadedImageUrl(null);
      } else {
        showError(result.message || "Failed to add student.");
      }
    } catch (err) {
      showError("Something went wrong!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-gray-50 dark:bg-slate-950 min-h-screen">
      <div className="bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 rounded-lg">
        
        <div className="text-center py-8 border-b border-gray-100 dark:border-slate-800 px-4">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
            Please fill up the details to apply for admission to
          </p>
          <h1 className="text-xl md:text-2xl font-black text-[#1e40af] uppercase">
            Bangladesh Technical Education Technology
          </h1>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase mt-1">
            Admission Registration
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-10">
          
          <div className="space-y-6">
            <div className="bg-[#1e40af] text-white py-2 px-4 font-bold text-lg">
              Personal Details
            </div>
            
            <div className="border-b-2 border-[#1e40af] pb-1">
              <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase">About the Applicant</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STUDENT_FORM_FIELDS.filter(f => f.name !== "picture").map((field, i) => (
                <div key={field.name} className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                    {i + 1}. {field.label} <span className="text-red-500">*</span>
                  </label>
                  
                  {field.type === "select" ? (
                    <select
                      {...register(field.name as any)}
                      className="w-full h-11 px-3 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <Input
                      {...register(field.name as any)}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="h-11 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-sm focus-visible:ring-2 focus-visible:ring-blue-500/20"
                    />
                  )}

                  {errors[field.name as keyof IStudentFormInput] && (
                    <p className="text-[10px] text-red-500 font-bold italic">
                      {errors[field.name as keyof IStudentFormInput]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1 space-y-4">
              <p className="text-xs font-bold text-blue-600 uppercase border-b border-dashed border-blue-300 pb-1">
                Security & Verification
              </p>
              <p className="text-sm text-gray-500 italic">
                Please double check all information before submitting. Once submitted, some fields might require admin approval to change.
              </p>
            </div>

            <div className="w-full md:w-44">
              <div className="relative w-32 h-40 mx-auto border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-md bg-gray-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden group">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-gray-400">
                    <UserCircle size={40} className="mx-auto" />
                    <span className="text-[8px] font-black uppercase block mt-1">Student Photo</span>
                  </div>
                )}
                
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-600" />
                  </div>
                )}
                
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="bg-[#1e40af] text-white text-[9px] font-black px-4 py-1 rounded-sm uppercase tracking-tighter">
                  {uploadedImageUrl ? "Ready to Submit" : "Upload Picture"}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-100 dark:border-slate-800 text-center">
            <Button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="bg-[#1e40af] hover:bg-blue-800 text-white font-black px-16 py-7 text-xl uppercase rounded-sm shadow-xl transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Submitting...</span>
              ) : "Submit Application"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}