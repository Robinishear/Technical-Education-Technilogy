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

export function StepOne({ form }: { form: UseFormReturn<RegisterValues> }) {
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
            About the Applicant
          </h2>
          <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">
            Fill in your personal and institute information
          </p>
        </div>
      </motion.div>

      {/* Row 1: Name + Institute Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Full Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="
                      h-10 rounded-lg text-sm
                      bg-slate-50 dark:bg-[#0f1623]
                      border-slate-200 dark:border-[#1e2a3a]
                      text-slate-900 dark:text-slate-100
                      placeholder:text-slate-400 dark:placeholder:text-slate-600
                      focus:border-blue-400 dark:focus:border-blue-500
                      focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
                      transition-all duration-200
                    "
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
            name="instituteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Institute Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter institute name"
                    className="
                      h-10 rounded-lg text-sm
                      bg-slate-50 dark:bg-[#0f1623]
                      border-slate-200 dark:border-[#1e2a3a]
                      text-slate-900 dark:text-slate-100
                      placeholder:text-slate-400 dark:placeholder:text-slate-600
                      focus:border-blue-400 dark:focus:border-blue-500
                      focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
                      transition-all duration-200
                    "
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Row 2: Director Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="directorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Director Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter director name"
                    className="
                      h-10 rounded-lg text-sm
                      bg-slate-50 dark:bg-[#0f1623]
                      border-slate-200 dark:border-[#1e2a3a]
                      text-slate-900 dark:text-slate-100
                      placeholder:text-slate-400 dark:placeholder:text-slate-600
                      focus:border-blue-400 dark:focus:border-blue-500
                      focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
                      transition-all duration-200
                    "
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Email Address <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="
                      h-10 rounded-lg text-sm
                      bg-slate-50 dark:bg-[#0f1623]
                      border-slate-200 dark:border-[#1e2a3a]
                      text-slate-900 dark:text-slate-100
                      placeholder:text-slate-400 dark:placeholder:text-slate-600
                      focus:border-blue-400 dark:focus:border-blue-500
                      focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
                      transition-all duration-200
                    "
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Row 3: Phone + Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Phone Number <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+880 XXXXXXXXXX"
                    className="
                      h-10 rounded-lg text-sm
                      bg-slate-50 dark:bg-[#0f1623]
                      border-slate-200 dark:border-[#1e2a3a]
                      text-slate-900 dark:text-slate-100
                      placeholder:text-slate-400 dark:placeholder:text-slate-600
                      focus:border-blue-400 dark:focus:border-blue-500
                      focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
                      transition-all duration-200
                    "
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Gender <span className="text-red-400">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className="
                        h-10 rounded-lg text-sm
                        bg-slate-50 dark:bg-[#0f1623]
                        border-slate-200 dark:border-[#1e2a3a]
                        text-slate-900 dark:text-slate-100
                        focus:border-blue-400 dark:focus:border-blue-500
                        focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
                        transition-all duration-200
                      "
                    >
                      <SelectValue
                        placeholder="Select gender"
                        className="text-slate-400 dark:text-slate-600"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-[#141d2b] border-slate-200 dark:border-[#1e2a3a]">
                    <SelectItem
                      value="male"
                      className="text-sm text-slate-800 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-[#1a2535]"
                    >
                      Male
                    </SelectItem>
                    <SelectItem
                      value="female"
                      className="text-sm text-slate-800 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-[#1a2535]"
                    >
                      Female
                    </SelectItem>
                    <SelectItem
                      value="other"
                      className="text-sm text-slate-800 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-[#1a2535]"
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Row 4: Nationality — full width */}
      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Nationality <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Bangladeshi"
                  className="
                    h-10 rounded-lg text-sm
                    bg-slate-50 dark:bg-[#0f1623]
                    border-slate-200 dark:border-[#1e2a3a]
                    text-slate-900 dark:text-slate-100
                    placeholder:text-slate-400 dark:placeholder:text-slate-600
                    focus:border-blue-400 dark:focus:border-blue-500
                    focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20
                    transition-all duration-200
                  "
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
