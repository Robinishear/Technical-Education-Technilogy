import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const inputClass = `
  h-10 rounded-lg text-sm
  bg-slate-50 dark:bg-[#0f1623]
  border-slate-200 dark:border-[#1e2a3a]
  text-slate-900 dark:text-slate-100
  placeholder:text-slate-400 dark:placeholder:text-slate-600
  focus:border-blue-400 dark:focus:border-blue-500
  focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
  transition-all duration-200
`;

const selectTriggerClass = `
  h-10 rounded-lg text-sm
  bg-slate-50 dark:bg-[#0f1623]
  border-slate-200 dark:border-[#1e2a3a]
  text-slate-900 dark:text-slate-100
  focus:border-blue-400 dark:focus:border-blue-500
  focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
  transition-all duration-200
`;

const labelClass =
  "text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide";

const RELIGIONS = ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"];

export function StepFive({ form }: { form: UseFormReturn<RegisterValues> }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      {/* Section header */}
      <motion.div variants={item} className="flex items-center gap-3 mb-1">
        <div className="w-7 h-7 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
            Login Information
          </h2>
          <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">
            Set up your account credentials and additional details
          </p>
        </div>
      </motion.div>

      {/* Row 1: Username + Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Username <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Choose a username"
                    className={inputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Password <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter strong password"
                      className={`${inputClass} pr-10`}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div variants={item} className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200 dark:bg-[#1e2a3a]" />
        <span className="text-[11px] text-slate-400 dark:text-slate-600 uppercase tracking-wider">
          Extra Details
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-[#1e2a3a]" />
      </motion.div>

      {/* Row 2: Institute Age + Religion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="instituteAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Institute Age <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 10 years"
                    className={inputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Religion <span className="text-red-400">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-[#141d2b] border-slate-200 dark:border-[#1e2a3a]">
                    {RELIGIONS.map((r) => (
                      <SelectItem
                        key={r}
                        value={r.toLowerCase()}
                        className="text-sm text-slate-800 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-[#1a2535]"
                      >
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Row 3: District — full width */}
      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                District <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Dhaka"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </motion.div>
    </motion.div>
  );
}
