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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function StepThree({ form }: { form: UseFormReturn<RegisterValues> }) {
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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
            Course Information
          </h2>
          <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">
            Details about your academic program and duration
          </p>
        </div>
      </motion.div>

      {/* Row 1: Course Name + Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Course Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Computer Science"
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
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Duration <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 2 Years"
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

      {/* Divider label */}
      <motion.div variants={item} className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200 dark:bg-[#1e2a3a]" />
        <span className="text-[11px] text-slate-400 dark:text-slate-600 uppercase tracking-wider">
          Course Period
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-[#1e2a3a]" />
      </motion.div>

      {/* Row 2: Start Year + Start Month */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="startYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Start Year <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 2023"
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
            name="startMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  Start Month <span className="text-red-400">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-[#141d2b] border-slate-200 dark:border-[#1e2a3a]">
                    {MONTHS.map((m) => (
                      <SelectItem
                        key={m}
                        value={m.toLowerCase()}
                        className="text-sm text-slate-800 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-[#1a2535]"
                      >
                        {m}
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

      {/* Row 3: End Year + End Month */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="endYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  End Year <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 2025"
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
            name="endMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  End Month <span className="text-red-400">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-[#141d2b] border-slate-200 dark:border-[#1e2a3a]">
                    {MONTHS.map((m) => (
                      <SelectItem
                        key={m}
                        value={m.toLowerCase()}
                        className="text-sm text-slate-800 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-[#1a2535]"
                      >
                        {m}
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
    </motion.div>
  );
}
