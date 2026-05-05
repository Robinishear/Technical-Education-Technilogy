/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CloudUpload, CheckCircle2, UserPlus } from "lucide-react";
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

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
    setUploadedImageUrl(null);
    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setUploadedImageUrl(imageUrl);
        setValue("picture", imageUrl);
      } else {
        showError("Image upload failed! Please try again.");
        setPreview(null);
      }
    } catch {
      showError("An error occurred during image upload.");
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: IStudentFormInput) => {
    try {
      if (!uploadedImageUrl) return showError("Please upload a student photo first!");

      const result = await addStudentSelfAction({ ...data, picture: uploadedImageUrl });

      if (result.success) {
        await showSuccess(result.message || "Student profile created successfully! 🎓");
        reset();
        setPreview(null);
        setUploadedImageUrl(null);
      } else {
        showError(result.message || "Failed to add student.");
      }
    } catch (err) {
      showError("Something went wrong on the server.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 transition-all duration-300">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-white/10 rounded-[2.5rem] shadow-sm p-6 md:p-12 overflow-hidden relative group">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />

        <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
          <div className="p-4 bg-blue-500/10 rounded-2xl">
             <UserPlus className="text-blue-500" size={32} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
              New Student Registration
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Please fill out all the required information below.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative h-48 w-48 rounded-[3rem] border-4 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center bg-gray-50 dark:bg-white/5 overflow-hidden group hover:border-blue-500 transition-all shadow-xl">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500">
                  <CloudUpload size={48} className="animate-bounce" />
                  <span className="text-[10px] font-bold uppercase mt-2">Upload Photo</span>
                </div>
              )}

              {isUploading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Loader2 className="animate-spin text-white mb-2" size={32} />
                  <span className="text-[10px] text-white font-bold animate-pulse">UPLOADING...</span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
            {uploadedImageUrl && (
               <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-1 rounded-full border border-green-500/20">
                 <CheckCircle2 size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Image Verified</span>
               </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {STUDENT_FORM_FIELDS.filter(f => f.name !== "picture").map((field) => (
              <div key={field.name} className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 ml-2 group-focus-within:text-blue-500 transition-colors">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    {...register(field.name as keyof IStudentFormInput)}
                    className="w-full rounded-2xl h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 text-sm font-semibold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none dark:text-white"
                  >
                    <option value="" className="dark:bg-gray-900 font-bold">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt} className="dark:bg-gray-900">{opt}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    {...register(field.name as keyof IStudentFormInput)}
                    placeholder={field.placeholder ?? ""}
                    className="rounded-2xl h-14 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 px-5 font-semibold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:placeholder:text-gray-600"
                  />
                )}

                {errors[field.name as keyof IStudentFormInput] && (
                  <p className="text-red-500 text-[10px] ml-2 font-black flex items-center gap-1 uppercase italic animate-pulse">
                    <span className="h-1 w-1 bg-red-500 rounded-full" />
                    {errors[field.name as keyof IStudentFormInput]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Button
              disabled={isSubmitting || isUploading || !uploadedImageUrl}
              className="w-full py-10 rounded-[2rem] text-xl font-black bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-2xl shadow-blue-500/30 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" size={24} />
                  <span>INITIALIZING DATABASE...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} />
                  <span>SUBMIT STUDENT PROFILE</span>
                </div>
              )}
            </Button>
            <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest opacity-50 italic">
              All data will be processed and saved securely
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}