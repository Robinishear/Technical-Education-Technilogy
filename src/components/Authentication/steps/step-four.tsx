import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const labelClass =
  "text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide";

const UPLOAD_FIELDS: {
  name: keyof RegisterValues;
  label: string;
  hint: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "directorPhoto",
    label: "Director Photo",
    hint: "Clear passport-size photo of the director",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: "institutePhoto",
    label: "Institute Photo",
    hint: "Front view of the institute building",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "nationalIDPhoto",
    label: "National ID Photo",
    hint: "Both sides of your national identity card",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M14 9h4M14 12h4M14 15h2" />
      </svg>
    ),
  },
  {
    name: "signaturePhoto",
    label: "Signature Photo",
    hint: "Clear photo of your handwritten signature",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17c3-3 5-5 7-3s3 3 5 0 3-5 4-6" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
];

function UploadCard({
  fieldLabel,
  hint,
  icon,
  onChange,
}: {
  fieldLabel: string;
  hint: string;
  icon: React.ReactNode;
  onChange: (files: FileList | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (files: FileList | null) => {
    if (files && files[0]) {
      setFileName(files[0].name);
      onChange(files);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files);
      }}
      className={`
        relative cursor-pointer rounded-xl border-[1.5px] border-dashed p-5
        transition-all duration-200 select-none
        ${
          fileName
            ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30"
            : isDragging
              ? "border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30"
              : "border-slate-200 dark:border-[#2d3f55] bg-slate-50 dark:bg-[#141d2b] hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />

      <div className="flex items-center gap-4">
        {/* Icon circle */}
        <div
          className={`
          w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200
          ${
            fileName
              ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
              : "bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400"
          }
        `}
        >
          {icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">
            {fieldLabel}
          </p>
          {fileName ? (
            <p className="text-[12px] text-green-600 dark:text-green-400 mt-0.5 truncate">
              ✓ {fileName}
            </p>
          ) : (
            <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">
              {hint}
            </p>
          )}
        </div>

        {/* Upload arrow */}
        <div
          className={`
          shrink-0 transition-colors duration-200
          ${fileName ? "text-green-500 dark:text-green-400" : "text-slate-300 dark:text-slate-600"}
        `}
        >
          {fileName ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export function StepFour({ form }: { form: UseFormReturn<RegisterValues> }) {
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
            ID Card Upload
          </h2>
          <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">
            Upload clear, readable images — JPG or PNG preferred
          </p>
        </div>
      </motion.div>

      {/* Upload cards */}
      {UPLOAD_FIELDS.map(({ name, label, hint, icon }) => (
        <motion.div key={name} variants={item}>
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  {label} <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <UploadCard
                    fieldLabel={label}
                    hint={hint}
                    icon={icon}
                    onChange={(files) => field.onChange(files)}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
