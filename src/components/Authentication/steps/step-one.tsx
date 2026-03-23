import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";

export function StepOne({ form }: { form: UseFormReturn<RegisterValues> }) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-blue-600 border-b pb-1">About the Applicant</h2>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>1. Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="instituteName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>2. Institute Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter institute name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
       <FormField
        control={form.control}
        name="instituteName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>1. Institute Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter institute name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      

      <FormField
        control={form.control}
        name="directorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>2. Director Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter director name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>3. Email *</FormLabel>
            <FormControl>
              <Input placeholder="Enter email" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>4. Phone *</FormLabel>
            <FormControl>
              <Input placeholder="Enter phone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>5. Gender *</FormLabel>
            <FormControl>
              <Input placeholder="Male / Female / Other" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>6. Nationality *</FormLabel>
            <FormControl>
              <Input placeholder="Enter nationality" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}