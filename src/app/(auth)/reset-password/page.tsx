import ResetPasswordForm from "@/components/Authentication/Forgot/ResetPasswordForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative z-0">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border relative z-10">
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            নতুন পাসওয়ার্ড দিন
          </h1>
          <p className="text-sm text-gray-500">
            ইমেইলে পাঠানো OTP এবং নতুন পাসওয়ার্ড দিন
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
