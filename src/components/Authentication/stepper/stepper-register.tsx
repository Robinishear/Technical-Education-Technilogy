/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
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
import Link from "next/dist/client/link";

const STEP_META = [
  { label: "Personal" },
  { label: "Family" },
  { label: "Course" },
  { label: "Docs" },
  { label: "Account" },
  { label: "Submit" },
];

const STEP_INFO: Record<number, { title: string; desc: string }> = {
  1: {
    title: "Personal Information",
    desc: "Basic details about you and your institute",
  },
  2: {
    title: "Family & Address",
    desc: "Guardian information and current address",
  },
  3: {
    title: "Course Details",
    desc: "Information about your academic program",
  },
  4: {
    title: "Upload Documents",
    desc: "Upload clear, readable photos of your documents",
  },
  5: {
    title: "Account Setup",
    desc: "Set up login credentials and extra details",
  },
  6: {
    title: "Review & Submit",
    desc: "Confirm everything looks correct before submitting",
  },
};

export function StepperRegister() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
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
    setIsSubmitting(true);
    const toastId = toast.loading("সব তথ্য এবং ছবি আপলোড হচ্ছে...");
    try {
      const result = await handleFullRegistration(data);
      if (result.success) {
        toast.success("রেজিস্ট্রেশন সফল! 🎉", { id: toastId });
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      }
    } catch (error: any) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goNext = async () => {
    let fields: (keyof RegisterValues)[] = [];
    if (step === 1)
      fields = [
        "name",
        "instituteName",
        "directorName",
        "email",
        "phone",
        "gender",
        "nationality",
      ];
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
      fields = [
        "courseName",
        "duration",
        "startYear",
        "startMonth",
        "endYear",
        "endMonth",
      ];
    if (step === 4)
      fields = [
        "directorPhoto",
        "institutePhoto",
        "nationalIDPhoto",
        "signaturePhoto",
      ];
    if (step === 5)
      fields = ["username", "password", "instituteAge", "religion", "district"];
    const isValid = await form.trigger(fields);
    if (isValid) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const goPrev = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -28 : 28 }),
  };

  return (
    /* ── outer card: white in light mode, dark in dark mode ── */
    <div
      className="
        max-w-4xl mx-auto relative z-10 overflow-hidden rounded-2xl
        bg-white dark:bg-[#0f1623]
        border border-slate-200 dark:border-[#1e2a3a]
        shadow-lg dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]
      "
    >
      <Link href="/" className="flex items-center gap-3 px-7 py-5 border-b border-slate-200 dark:border-[#1a2535]">
        <div className="w-11 h-11 rounded-xl bg-linear-to-br flex items-center justify-center shrink-0">
          <img src="/image.png" alt="Logo" className="w-10 h-10" />
        </div>

        <div>
          <p className="text-[17px] font-semibold text-slate-900 dark:text-slate-100 leading-tight">
            EduRegister
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            Institute Registration Portal
          </p>
        </div>
        <span className="ml-auto text-[11px] px-3.5 py-1 rounded-full bg-slate-100 dark:bg-[#1a2535] text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-[#1e2a3a]">
          Step {step} of 6
        </span>
      </Link>

      {/* ── Step Indicators ── */}
      <div className="flex items-start px-7 pt-5">
        {STEP_META.map((s, idx) => {
          const num = idx + 1;
          const isDone = step > num;
          const isActive = step === num;
          return (
            <div
              key={num}
              className="flex items-start"
              style={{ flex: idx < 5 ? 1 : "none" }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    boxShadow: isActive
                      ? "0 0 0 6px rgba(59,130,246,0.15)"
                      : "0 0 0 0px transparent",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center
                    text-[13px] font-semibold border-[1.5px] transition-colors duration-300
                    ${
                      isDone
                        ? "bg-green-50 dark:bg-green-950 border-green-400 dark:border-green-700 text-green-600 dark:text-green-400"
                        : isActive
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-slate-100 dark:bg-[#1a2535] border-slate-200 dark:border-[#1e2a3a] text-slate-400 dark:text-slate-600"
                    }
                  `}
                >
                  {isDone ? "✓" : num}
                </motion.div>
                <span
                  className={`text-[10px] font-medium whitespace-nowrap transition-colors duration-300
                  ${
                    isDone
                      ? "text-green-500 dark:text-green-400"
                      : isActive
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < 5 && (
                <div
                  className="flex-1 h-0.5 rounded-full mt-4.5 mx-1 transition-colors duration-500"
                  style={{
                    background:
                      step > num ? "#16a34a" : "var(--tw-bg-opacity, #e2e8f0)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Step Title ── */}
      <div className="px-7 pt-5 pb-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${step}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-[19px] font-semibold text-slate-900 dark:text-slate-100">
              {STEP_INFO[step].title}
            </h2>
            <p className="text-[13px] text-slate-500 dark:text-[#475569] mt-1">
              {STEP_INFO[step].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Form ── */}
      <div className="px-7 pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                {step === 1 && <StepOne form={form} />}
                {step === 2 && <StepTwo form={form} />}
                {step === 3 && <StepThree form={form} />}
                {step === 4 && <StepFour form={form} />}
                {step === 5 && <StepFive form={form} />}
                {step === 6 && <StepSix form={form} />}
              </motion.div>
            </AnimatePresence>

            {/* ── Footer ── */}
            <div className="flex justify-between items-center pt-4 pb-6 border-t border-slate-200 dark:border-[#1a2535] mt-2">
              <Button
                type="button"
                onClick={goPrev}
                disabled={step === 1}
                className="
                  flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium
                  bg-transparent border border-slate-200 dark:border-[#1e2a3a]
                  text-slate-500 dark:text-slate-600
                  hover:border-slate-300 dark:hover:border-[#2d3f55]
                  hover:text-slate-700 dark:hover:text-slate-400
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                ← Previous
              </Button>

              {step < 6 ? (
                <Button
                  type="button"
                  onClick={goNext}
                  className="
                    flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold
                    bg-blue-500 hover:bg-blue-600 text-white border-none
                    shadow-[0_4px_12px_rgba(59,130,246,0.35)]
                    hover:shadow-[0_6px_16px_rgba(59,130,246,0.45)]
                    hover:-translate-y-px active:translate-y-0
                    transition-all duration-200
                  "
                >
                  Next Step →
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold
                    bg-green-600 hover:bg-green-700 text-white border-none
                    shadow-[0_4px_12px_rgba(22,163,74,0.35)]
                    hover:shadow-[0_6px_16px_rgba(22,163,74,0.45)]
                    hover:-translate-y-px active:translate-y-0
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
                    transition-all duration-200
                  "
                >
                  {isSubmitting ? "⏳ Processing..." : "✅ Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
