import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "সঠিক ইমেইল অ্যাড্রেস দিন" }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "পাসওয়ার্ড দুটি মিলছে না",
  path: ["confirmPassword"],
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;