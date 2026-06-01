/* eslint-disable react/no-unescaped-entities */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
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

const labelClass =
  "text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide";

export function StepTwo({ form }: { form: UseFormReturn<RegisterValues> }) {
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
            Parent Information
          </h2>
          <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">
            Guardian details and current residential address
          </p>
        </div>
      </motion.div>

      {/* Row 1: Father + Mother */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item} >
          <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Father's Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter father's name"
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
            name="motherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Mother's Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter mother's name"
                    className={inputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Row 2: Full Address — full width */}
      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="fullAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                Full Address <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="House no, Road, Area..."
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Row 3: Village + Post Office */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="village"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Village <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter village name"
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
            name="postOffice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Post Office <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter post office"
                    className={inputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Row 4: Thana/Upazila — full width */}
      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="thanaUpazila"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                Thana / Upazila <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter thana or upazila"
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
