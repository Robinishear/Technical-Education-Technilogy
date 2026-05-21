/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  CheckCircle2,
  Download,
  Award,
  User,
  Mail,
  Hash,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";
import { ExamResult as ExamResultType } from "../types";

interface Props {
  result: ExamResultType;
  student: any;
}

const ExamResult = ({ result, student }: Props) => {
  const handleDownload = () => {
    const content = `
====================================
        EXAM RESULT CARD 🎯
====================================
Name       : ${student.name}
Student ID : ${student.studentId}
Roll       : ${student.roll}
Email      : ${student.email}
------------------------------------
Score      : ${result.score}/${result.totalMarks}
Percentage : ${result.percentage}%
Grade      : ${
      percentage >= 80
        ? "A+"
        : percentage >= 70
          ? "A"
          : percentage >= 60
            ? "B"
            : percentage >= 50
              ? "C"
              : "F"
    }
------------------------------------
Generated on: ${new Date().toLocaleDateString()}
====================================
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exam-result-${student.roll}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const percentage = parseFloat(result.percentage);

  const getColorScheme = () => {
    if (percentage >= 80)
      return {
        text: "text-emerald-500 dark:text-emerald-400",
        bg: "bg-emerald-500",
        lightBg: "bg-emerald-50 dark:bg-emerald-950/30",
        border: "border-emerald-200 dark:border-emerald-900/50",
        badge:
          "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40",
        gradient: "from-emerald-500 to-teal-500",
        emoji: "🎉",
      };
    if (percentage >= 50)
      return {
        text: "text-amber-500 dark:text-amber-400",
        bg: "bg-amber-500",
        lightBg: "bg-amber-50 dark:bg-amber-950/30",
        border: "border-amber-200 dark:border-amber-900/50",
        badge:
          "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/40",
        gradient: "from-amber-500 to-orange-500",
        emoji: "👍",
      };
    return {
      text: "text-red-500 dark:text-red-400",
      bg: "bg-red-500",
      lightBg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-900/50",
      badge:
        "bg-red-50 text-red-500 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/40",
      gradient: "from-red-500 to-rose-500",
      emoji: "📚",
    };
  };

  const colors = getColorScheme();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-xl w-full max-w-md p-6 md:p-8 relative overflow-hidden transition-all">
        {/* Decorative Top Glow 🎆 */}
        <div
          className={`absolute top-0 left-0 right-0 h-2 bg-linear-to-r ${colors.gradient}`}
        />

        <div className="flex flex-col items-center mb-6 text-center">
          <div
            className={`p-4 ${colors.lightBg} rounded-full ${colors.text} border ${colors.border} mb-4 shadow-sm animate-bounce`}
          >
            <CheckCircle2 size={44} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-stone-800 dark:text-stone-100 uppercase tracking-tight flex items-center gap-2">
            Exam শেষ! {colors.emoji}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 font-bold text-base mt-1 flex items-center gap-1.5">
            <User size={16} className="text-amber-500" />
            {student.name}
          </p>
        </div>

        <div className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800/80 rounded-2xl p-5 mb-5 space-y-4">
          {/* Score Text */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Award size={14} /> Score
            </span>
            <span className="text-2xl font-black text-stone-800 dark:text-stone-100">
              {result.score}
              <span className="text-stone-400 dark:text-stone-500 text-lg font-medium">
                /{result.totalMarks}
              </span>
            </span>
          </div>

          {/* Dynamic Percentage Progress Bar */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                Percentage
              </span>
              <span className={`text-xs font-black ${colors.text}`}>
                {result.percentage}%
              </span>
            </div>
            <div className="bg-stone-200 dark:bg-stone-800 rounded-full h-3 overflow-hidden border border-stone-200/20 dark:border-stone-700/30">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out bg-linear-to-r ${colors.gradient}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Grade Badge */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800">
            <span className="text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider">
              Grade
            </span>
            <span
              className={`px-4 py-1 rounded-full text-xs font-black border ${colors.badge} shadow-sm`}
            >
              {percentage >= 80
                ? "A+"
                : percentage >= 70
                  ? "A"
                  : percentage >= 60
                    ? "B"
                    : percentage >= 50
                      ? "C"
                      : "F"}
            </span>
          </div>
        </div>

        {/* 🪪 Student Profile Details Info */}
        <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100/70 dark:border-amber-900/30 rounded-2xl p-4 mb-6 space-y-2.5">
          <p className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-black tracking-wider mb-1 flex items-center gap-1">
            📌 Student Details
          </p>

          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <Hash size={12} /> Student ID
            </span>
            <span className="font-bold text-stone-700 dark:text-stone-300 font-mono bg-white dark:bg-stone-800 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
              {student.studentId}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <Hash size={12} /> Roll
            </span>
            <span className="font-bold text-stone-700 dark:text-stone-300 font-mono bg-white dark:bg-stone-800 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
              {student.roll}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <Mail size={12} /> Email
            </span>
            <span className="font-bold text-stone-700 dark:text-stone-300 truncate max-w-50">
              {student.email}
            </span>
          </div>
        </div>

        {/* 🔄 Retry Status Indicator */}
        <div className="mb-6 flex items-center justify-center">
          {result.canRetry ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 px-3 py-1.5 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-pulse">
              <RefreshCw
                size={13}
                className="animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <span>Admin আবার exam দেওয়ার সুযোগ দিয়েছে!</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl text-stone-500 dark:text-stone-400 text-xs font-medium border border-stone-200 dark:border-stone-700">
              <ShieldAlert size={13} />
              <span>Exam একবারই দেওয়া যাবে</span>
            </div>
          )}
        </div>

        {/* 📥 Action Button */}
        <button
          onClick={handleDownload}
          className="w-full h-13 rounded-2xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Result Download করো
        </button>
      </div>
    </div>
  );
};

export default ExamResult;
