/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CloudUpload, CheckCircle2 } from "lucide-react";

import { createStudentSchema } from "./students.schema";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { IStudentFormInput } from "./students.type";
import { addStudentSelfAction } from "./-actions";
import { STUDENT_FORM_FIELDS } from "./student-form";

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

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploadedImageUrl(null);
    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setUploadedImageUrl(imageUrl);
        setValue("picture", imageUrl);
        toast.success("Image uploaded!", { id: toastId });
      } else {
        toast.error("Image upload failed!", { id: toastId });
        setPreview(null);
      }
    } catch {
      toast.error("Image upload error!", { id: toastId });
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: IStudentFormInput) => {
    try {
      if (!uploadedImageUrl) return toast.error("Please upload a photo!");

      const loadingId = toast.loading("Processing...");
      const result = await addStudentSelfAction({ ...data, picture: uploadedImageUrl });

      toast.dismiss(loadingId);
      if (result.success) {
        toast.success(result.message);
        reset();
        setPreview(null);
        setUploadedImageUrl(null);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("An error occurred during submission.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-10 bg-card/30 backdrop-blur-3xl border border-white/10 routed shadow-sm mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative h-44 w-44 rounded-full border-4 border-dashed border-primary/40 flex items-center justify-center bg-zinc-100 overflow-hidden group hover:border-primary transition-all shadow-inner">
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-cover shadow-2xl" />
            ) : (
              <CloudUpload size={50} className="text-zinc-400 group-hover:scale-110 transition-transform" />
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                <Loader2 className="animate-spin text-white" size={36} />
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
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDENT_FORM_FIELDS.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-2">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  {...register(field.name as keyof IStudentFormInput)}
                  className="w-full rounded-[1.2rem] h-14 bg-white/5 border border-white/10 shadow-inner focus:border-primary transition-all px-4"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <Input
                  type={field.type}
                  {...register(field.name as keyof IStudentFormInput)}
                  placeholder={field.placeholder ?? ""}
                  className="rounded-[1.2rem] h-14 bg-white/5 border-white/10 shadow-inner focus:border-primary transition-all"
                />
              )}

              {errors[field.name as keyof IStudentFormInput] && (
                <p className="text-red-500 text-[10px] ml-2 font-bold uppercase italic">
                  {errors[field.name as keyof IStudentFormInput]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <Button
          disabled={isSubmitting || isUploading || !uploadedImageUrl}
          className="w-full py-10 rounded-[2.5rem] text-2xl font-black bg-primary shadow-2xl shadow-primary/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {isSubmitting
            ? <Loader2 className="animate-spin mr-3" size={28} />
            : <CheckCircle2 className="mr-3" size={28} />
          }
          {isSubmitting ? "UPDATING SYSTEM..." : "SUBMIT STUDENT PROFILE"}
        </Button>

      </form>
    </div>
  );
}