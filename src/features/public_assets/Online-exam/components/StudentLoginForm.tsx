"use client";

import { useState } from "react";
import { Loader2, BookOpen } from "lucide-react";
import { studentLoginAction } from "../exam.actions";
import { Props } from "../types";


const StudentLoginForm = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !guardianPhone) {
      setError("Email এবং Phone নম্বর দাও!");
      return;
    }

    setLoading(true);
    setError("");
    const res = await studentLoginAction(email, guardianPhone);
    setLoading(false);

    if (res.success) {
      onLogin(res.data);
    } else {
      setError(res.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-3xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-4">
            <BookOpen size={32} className="text-amber-500" />
          </div>
          <h1 className="text-2xl font-black text-stone-800 uppercase tracking-tight">
            Online Exam
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Email ও Phone দিয়ে প্রবেশ করো
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="তোমার email লিখো"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={guardianPhone}
              onChange={(e) => setGuardianPhone(e.target.value)}
              placeholder="তোমার phone নম্বর লিখো"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> যাচাই হচ্ছে...
              </>
            ) : (
              "Exam এ প্রবেশ করো"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginForm;
