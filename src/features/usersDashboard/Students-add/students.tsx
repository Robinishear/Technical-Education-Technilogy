/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, UploadCloud, CheckCircle2, User, Mail, Phone, MapPin, GraduationCap } from "lucide-react";

import { uploadToCloudinary } from "@/core/services/upload.service";
import { studentValidationSchema } from "./students.schema";
import { IStudentFormInput } from "./students.type";

export default function Students() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<IStudentFormInput>({
    resolver: zodResolver(studentValidationSchema as any),
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadToCloudinary(file);
    if (url) {
      setImageUrl(url);
      setValue("picture", url);
      toast.success("Image uploaded successfully! 📸");
    } else {
      toast.error("Upload failed!");
    }
    setUploading(false);
  };

  const onSubmit = async (data: IStudentFormInput) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
      
      const response = await fetch(`${baseUrl}/students`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(data),
        credentials: "include", 
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Student added successfully! 🎉");
        reset();
        setImageUrl("");
      } else {
        toast.error(result.message || "Failed to save student data.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Server error, please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-background border border-primary/10 rounded-[2.5rem] shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* 📸 Image Upload Section */}
        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-primary/20 rounded-[2rem] bg-primary/5 group hover:border-primary/40 transition-all">
          {imageUrl ? (
            <div className="relative group">
              <img src={imageUrl} alt="Profile" className="h-40 w-40 rounded-3xl object-cover border-4 border-primary/20 shadow-xl" />
              <div className="absolute -bottom-3 -right-3 bg-green-500 text-white p-2 rounded-xl shadow-lg animate-bounce">
                <CheckCircle2 size={24}/>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <UploadCloud size={60} className="mx-auto text-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-muted-foreground">Upload Student Photo</p>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            className="mt-6 text-sm file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary/80 cursor-pointer"
          />
          {uploading && <Loader2 className="animate-spin mt-4 text-primary" />}
          {errors.picture && <p className="text-destructive text-[10px] font-bold mt-2">{errors.picture.message}</p>}
        </div>

        {/* 📝 Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-3 border-b pb-2 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
            <User size={18}/> Basic Information
          </div>
          <InputGroup label="Full Name" name="name" register={register} error={errors.name} />
          <InputGroup label="Email Address" name="email" type="email" register={register} error={errors.email} />
          <InputGroup label="Guardian Phone" name="guardianPhone" register={register} error={errors.guardianPhone} />
          <InputGroup label="Father's Name" name="fatherName" register={register} />
          <InputGroup label="Mother's Name" name="motherName" register={register} />
          <InputGroup label="Date of Birth" name="dob" type="date" register={register} />

          <div className="md:col-span-3 border-b pb-2 mt-4 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
            <MapPin size={18}/> Address Details
          </div>
          <InputGroup label="District" name="district" register={register} />
          <InputGroup label="Thana" name="thana" register={register} />
          <InputGroup label="Full Address" name="studentAddress" register={register} />

          <div className="md:col-span-3 border-b pb-2 mt-4 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
            <GraduationCap size={18}/> Academic Details
          </div>
          <InputGroup label="Institute Name" name="institute" register={register} />
          <InputGroup label="Qualification" name="educationQualification" register={register} />
          <InputGroup label="Duration" name="duration" register={register} />
          <InputGroup label="Issue Date" name="issueDate" type="date" register={register} />
          <InputGroup label="Expire Date" name="expireDate" type="date" register={register} />
        </div>

        <button 
          disabled={isSubmitting || uploading}
          type="submit" 
          className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black text-xl hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.97] transition-all flex justify-center items-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>Saving Data... <Loader2 className="animate-spin" /></>
          ) : (
            "REGISTER STUDENT 🎓"
          )}
        </button>
      </form>
    </div>
  );
}

const InputGroup = ({ label, name, register, error, type = "text" }: any) => (
  <div className="space-y-2 group">
    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors ml-1">
      {label}
    </label>
    <input 
      type={type}
      {...register(name)}
      className="w-full p-4 rounded-2xl border bg-primary/5 focus:bg-transparent focus:ring-4 ring-primary/10 border-primary/5 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/40 text-sm md:text-base"
      placeholder={`Enter ${label}`}
    />
    {error && <p className="text-destructive text-[10px] font-bold ml-1 animate-pulse">{error.message}</p>}
  </div>
);