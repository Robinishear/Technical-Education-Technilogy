/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Loader2,
  BookOpen,
  Mail,
  Phone,
  ShieldAlert,
  LogIn,
} from "lucide-react";
import { studentLoginAction } from "../exam.actions";

// types ফাইল থেকে Props ইমপোর্ট করা না থাকলে ইন্টারফেস ডিফাইন করে দেওয়া ভালো
interface Props {
  onLogin: (studentData: any) => void;
}

const StudentLoginForm = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // রিলোড প্রিভেন্ট করার জন্য বেস্ট প্র্যাকটিস

    if (!email || !guardianPhone) {
      setError("⚠️ Email এবং Phone নম্বর সঠিকভাবে দাও!");
      return;
    }

    setLoading(true);
    setError("");
    const res = await studentLoginAction(email, guardianPhone);
    setLoading(false);

    if (res.success) {
      onLogin(res.data);
    } else {
      setError(res.message || "❌ প্রবেশ ব্যর্থ হয়েছে! আবার চেষ্টা করো।");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 relative overflow-hidden transition-all">
        {/* Decorative Neon Blur Effect 🎇 */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />

        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/40 mb-4 shadow-sm animate-pulse">
            <BookOpen
              size={36}
              className="text-amber-500 dark:text-amber-400"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-stone-800 dark:text-stone-100 uppercase tracking-tight flex items-center gap-2">
            Online Exam 📝
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 font-medium">
            তোমার Email ও Phone নম্বর দিয়ে ড্যাশবোর্ডে প্রবেশ করো
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input Box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider items-center gap-1">
              <Mail size={12} /> Email Address
            </label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-2xl pl-4 pr-4 py-3.5 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:focus:border-amber-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-600"
              />
            </div>
          </div>

          {/* Phone Input Box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider items-center gap-1">
              <Phone size={12} /> Phone Number
            </label>
            <div className="relative group">
              <input
                type="text"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-2xl pl-4 pr-4 py-3.5 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:focus:border-amber-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-600"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-3.5 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold animate-headShake">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 rounded-2xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-black text-base uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>যাচাই হচ্ছে... ⏱️</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Exam এ প্রবেশ করো</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginForm;
