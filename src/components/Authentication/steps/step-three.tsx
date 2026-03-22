import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";

export function StepThree({ form }: { form: UseFormReturn<RegisterValues> }) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-blue-600 border-b pb-1">Course Information</h2>

      <FormField
        control={form.control}
        name="courseName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>13. Course Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter course name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>14. Duration *</FormLabel>
            <FormControl>
              <Input placeholder="Enter duration" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="startYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>15. Start Year *</FormLabel>
            <FormControl>
              <Input placeholder="Enter start year" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="startMonth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>16. Start Month *</FormLabel>
            <FormControl>
              <Input placeholder="Enter start month" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="endYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>17. End Year *</FormLabel>
            <FormControl>
              <Input placeholder="Enter end year" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="endMonth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>18. End Month *</FormLabel>
            <FormControl>
              <Input placeholder="Enter end month" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}