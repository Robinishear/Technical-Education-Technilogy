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
import { useWatch } from "react-hook-form";

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

const labelClass =
  "text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide";

function SummaryRow({ label, value }: { label: string; value?: string }) {
  const display = value?.trim() || "—";
  const isEmpty = !value?.trim();
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[#1a2535] last:border-0">
      <span className="text-[12px] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span
        className={`text-[12px] font-medium max-w-[55%] text-right truncate ${
          isEmpty
            ? "text-slate-300 dark:text-slate-600"
            : "text-slate-700 dark:text-slate-200"
        }`}
      >
        {display}
      </span>
    </div>
  );
}

export function StepSix({ form }: { form: UseFormReturn<RegisterValues> }) {
  const values = useWatch({ control: form.control });

  const STEPS_SUMMARY = [
    {
      title: "Personal Info",
      icon: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      rows: [
        { label: "Name", value: values.name },
        { label: "Institute", value: values.instituteName },
        { label: "Director", value: values.directorName },
        { label: "Email", value: values.email },
        { label: "Phone", value: values.phone },
        { label: "Gender", value: values.gender },
        { label: "Nationality", value: values.nationality },
      ],
    },
    {
      title: "Family & Address",
      icon: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      rows: [
        { label: "Father", value: values.fatherName },
        { label: "Mother", value: values.motherName },
        { label: "Address", value: values.fullAddress },
        { label: "Village", value: values.village },
        { label: "Post Office", value: values.postOffice },
        { label: "Thana", value: values.thanaUpazila },
      ],
    },
    {
      title: "Course Details",
      icon: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      rows: [
        { label: "Course", value: values.courseName },
        { label: "Duration", value: values.duration },
        {
          label: "Start",
          value:
            values.startMonth && values.startYear
              ? `${values.startMonth} ${values.startYear}`
              : values.startYear,
        },
        {
          label: "End",
          value:
            values.endMonth && values.endYear
              ? `${values.endMonth} ${values.endYear}`
              : values.endYear,
        },
        { label: "Qualification", value: values.educationQualification },
      ],
    },
    {
      title: "Account",
      icon: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      rows: [
        { label: "Username", value: values.username },
        { label: "Password", value: values.password ? "••••••••" : "" },
        { label: "Institute Age", value: values.instituteAge },
        { label: "Religion", value: values.religion },
        { label: "District", value: values.district },
      ],
    },
  ];

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
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
            Confirmation
          </h2>
          <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">
            Review your information and complete the final field
          </p>
        </div>
      </motion.div>

      {/* Education Qualification — final field */}
      <motion.div variants={item}>
        <FormField
          control={form.control}
          name="educationQualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                Educational Qualification{" "}
                <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. HSC, Bachelor's, Master's"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </motion.div>

      {/* Divider */}
      <motion.div variants={item} className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200 dark:bg-[#1e2a3a]" />
        <span className="text-[11px] text-slate-400 dark:text-slate-600 uppercase tracking-wider">
          Application Summary
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-[#1e2a3a]" />
      </motion.div>

      {/* Summary cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STEPS_SUMMARY.map((section) => (
          <motion.div
            key={section.title}
            variants={item}
            className="rounded-xl border border-slate-200 dark:border-[#1e2a3a] bg-slate-50 dark:bg-[#141d2b] p-4"
          >
            {/* Card header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500">
                {section.icon}
              </div>
              <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                {section.title}
              </span>
            </div>
            {/* Rows */}
            {section.rows.map((row) => (
              <SummaryRow key={row.label} label={row.label} value={row.value} />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Documents row */}
      <motion.div
        variants={item}
        className="rounded-xl border border-slate-200 dark:border-[#1e2a3a] bg-slate-50 dark:bg-[#141d2b] p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Documents
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Director Photo", val: values.directorPhoto },
            { label: "Institute Photo", val: values.institutePhoto },
            { label: "National ID", val: values.nationalIDPhoto },
            { label: "Signature", val: values.signaturePhoto },
          ].map(({ label, val }) => {
            const uploaded = val && (val as FileList)?.length > 0;
            return (
              <div key={label} className="flex items-center gap-2 py-1.5">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    uploaded
                      ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                      : "bg-slate-200 dark:bg-[#1a2535] text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {uploaded ? (
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-[12px] ${
                    uploaded
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Consent note */}
      <motion.div
        variants={item}
        className="flex gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-400 shrink-0 mt-0.5"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
          By submitting this application, you confirm that all provided
          information is accurate and complete. A verification email will be
          sent to your registered address after submission.
        </p>
      </motion.div>
    </motion.div>
  );
}
