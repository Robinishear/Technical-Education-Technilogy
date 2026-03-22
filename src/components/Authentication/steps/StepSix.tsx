import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";

export function StepSix({ form }: { form: UseFormReturn<RegisterValues> }) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-blue-600 border-b pb-1">Additional Info / Confirmation</h2>

      <FormField
        control={form.control}
        name="educationQualification"
        render={({ field }) => (
          <FormItem>
            <FormLabel>28. Educational Qualification *</FormLabel>
            <FormControl>
              <Input placeholder="Enter qualification" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </motion.div>
  );
}