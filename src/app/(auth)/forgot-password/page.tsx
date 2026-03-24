import ForgotPasswordForm from "@/components/Authentication/Forgot/ForgotPasswordForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative z-0">
      
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border relative z-10">
        
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            পাসওয়ার্ড পুনরুদ্ধার
          </h1>
          <p className="text-sm text-gray-500">
            আপনার অ্যাকাউন্ট পুনরুদ্ধার করতে ইমেইল দিন
          </p>
        </div>

        <ForgotPasswordForm />

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-primary hover:underline font-medium"
          >
            ← লগইন পেজে ফিরে যান
          </Link>
        </div>

      </div>

    </div>
  );
}