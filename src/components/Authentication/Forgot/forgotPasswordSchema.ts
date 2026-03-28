import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "The two passwords do not match.",
  path: ["confirmPassword"],
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;