import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";

export function StepTwo({ form }: { form: UseFormReturn<RegisterValues> }) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-blue-600 border-b pb-1">Parent Information</h2>

      <FormField
        control={form.control}
        name="fatherName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>7. Father Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter father's name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="motherName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>8. Mother Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter mother's name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fullAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>9. Full Address *</FormLabel>
            <FormControl>
              <Input placeholder="Enter full address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="village"
        render={({ field }) => (
          <FormItem>
            <FormLabel>10. Village *</FormLabel>
            <FormControl>
              <Input placeholder="Enter village" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="postOffice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>11. Post Office *</FormLabel>
            <FormControl>
              <Input placeholder="Enter post office" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="thanaUpazila"
        render={({ field }) => (
          <FormItem>
            <FormLabel>12. Thana/Upazila *</FormLabel>
            <FormControl>
              <Input placeholder="Enter thana/upazila" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}