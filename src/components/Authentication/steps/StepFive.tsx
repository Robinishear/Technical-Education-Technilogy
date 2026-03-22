import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterValues } from "../stepper/register-schema";
import { motion } from "framer-motion";

export function StepFive({ form }: { form: UseFormReturn<RegisterValues> }) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-blue-600 border-b pb-1">Login Information</h2>

      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>23. Username *</FormLabel>
            <FormControl>
              <Input placeholder="Enter username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>24. Password *</FormLabel>
            <FormControl>
              <Input placeholder="Enter password" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

       <FormField
        control={form.control}
        name="instituteAge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>25. InstituteAge *</FormLabel>
            <FormControl>
              <Input placeholder="Enter institute age"  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="religion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>26. Religion *</FormLabel>
            <FormControl>
              <Input placeholder="Enter religion" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel>27. District *</FormLabel>
            <FormControl>
              <Input placeholder="Enter district" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}