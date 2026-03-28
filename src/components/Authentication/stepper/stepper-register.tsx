/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { registerSchema, type RegisterValues } from "./register-schema";

import { StepFive } from "../steps/StepFive";
import { StepSix } from "../steps/StepSix";
import { StepOne } from "../steps/step-one";
import { StepTwo } from "../steps/step-two";
import { StepThree } from "../steps/step-three";
import { StepFour } from "../steps/step-four";

import { handleFullRegistration } from "./registration.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function StepperRegister() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema as any),
    defaultValues: {
     name: "",
      instituteName: "",
      directorName: "",
      email: "",
      phone: "",
      gender: "",
      nationality: "",

      fatherName: "",
      motherName: "",
      fullAddress: "",
      village: "",
      postOffice: "",
      thanaUpazila: "",

      courseName: "",
      duration: "",
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      educationQualification: "",

      directorPhoto: null,
      institutePhoto: null,
      nationalIDPhoto: null,
      signaturePhoto: null,

      username: "",
      password: "",
      instituteAge: "",
      religion: "",
      district: "",
    },
  });

const onSubmit = async (data: RegisterValues) => {
  const toastId = toast.loading("সব তথ্য এবং ছবি আপলোড হচ্ছে...?");

  try {
    const result = await handleFullRegistration(data);

    if (result.success) {
      toast.success("রেজিস্ট্রেশন সফল! 🎉", { id: toastId }); 
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    }
  } catch (error: any) {
    toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!", { id: toastId }); 
  } finally {
    setIsSubmitting(false);
    // toast.dismiss(toastId); 
  }
};
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg border border-gray-200 relative z-10">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 mx-1 rounded-full ${step >= i ? "bg-blue-600" : "bg-gray-200"}`}
          />
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {step === 1 && <StepOne form={form} />}
            {step === 2 && <StepTwo form={form} />}
            {step === 3 && <StepThree form={form} />}
            {step === 4 && <StepFour form={form} />}
            {step === 5 && <StepFive form={form} />}
            {step === 6 && <StepSix form={form} />}
          </motion.div>

          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Previous
            </Button>

            {step < 6 ? (
              <Button
                type="button"
                className="bg-blue-700 hover:bg-blue-800"
                onClick={async () => {
                  let fields: (keyof RegisterValues)[] = [];

                  if (step === 1)
                    fields = ["name","instituteName","directorName","email","phone","gender","nationality"];

               if (step === 2)
  fields = [
    "fatherName",
    "motherName",
    "fullAddress",
    "village",
    "postOffice",
    "thanaUpazila",
  ];

                  if (step === 3)
                    fields = ["courseName","duration","startYear","startMonth","endYear","endMonth",];
                
                  if (step === 4)
                    fields = ["directorPhoto","institutePhoto","nationalIDPhoto","signaturePhoto"];
                
                  if (step === 5)
                    fields = ["username","password","instituteAge","religion","district"];

                  const isValid = await form.trigger(fields);
                  if (isValid) setStep(step + 1);
                }}
              >
                Next Step
              </Button>
            ) : (
             <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting} 
              >
                {isSubmitting ? "Processing..." : "Submit Application"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}