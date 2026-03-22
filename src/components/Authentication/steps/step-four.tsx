import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";

export function StepFour({ form }: { form: UseFormReturn<RegisterValues> }) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-blue-600 border-b pb-1">ID Card Upload</h2>

      {["directorPhoto", "institutePhoto", "nationalIDPhoto", "signaturePhoto"].map((name, idx) => (
        <FormField
          key={name}
          control={form.control}
          name={name as keyof RegisterValues}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{`${idx + 19}. ${name.replace("Photo"," Photo").replace("ID","ID")}`} *</FormLabel>
              <FormControl>
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="w-full rounded-md border border-gray-300 px-2 py-1 transition-all focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </motion.div>
  );
}