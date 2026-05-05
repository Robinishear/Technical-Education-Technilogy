/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateStudentSchema } from "@/features/usersDashboard/Students/students.schema";
import { STUDENT_FORM_FIELDS } from "@/features/usersDashboard/Students/student-form";
import { adminUpdateStudentAction } from "../actions/admin-students.actions";
import { Props } from "../types/admin-students.types";




export default function AdminStudentUpdateModal({ student, onClose, onUpdated }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateStudentSchema as any),
    defaultValues: student,
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const result = await adminUpdateStudentAction(student.id, data);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message);
      onUpdated({ ...student, ...data });
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-white/10 rounded-3xl shadow-2xl p-8 mx-4">

        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition">
          <X size={20} />
        </button>

        <h2 className="text-xl font-black uppercase tracking-widest mb-6">
          Update Student — {student.name}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDENT_FORM_FIELDS.map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="text-[11px] font-black  uppercase tracking-widest text-muted-foreground ml-1">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    {...register(field.name)}
                    className="w-full rounded-xl h-12 bg-white/5 border border-white/10 px-3"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    {...register(field.name)}
                    placeholder={field.placeholder ?? ""}
                    className="rounded-xl h-12 bg-white/5  border-gray-100"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-xl bg-primary">
              {isSubmitting && <Loader2 className="animate-spin mr-2" size={16} />}
              {isSubmitting ? "Updating..." : "Update Student"}
            </Button>
          </div>
         
        </form>
        
      </div>
      
    </div>
    
  );
}