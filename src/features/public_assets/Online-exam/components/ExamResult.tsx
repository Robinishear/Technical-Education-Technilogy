/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CheckCircle, Download } from "lucide-react";
import { ExamResult as ExamResultType } from "../types";

interface Props {
  result: ExamResultType;
  student: any;
}

const ExamResult = ({ result, student }: Props) => {
  const handleDownload = () => {
    const content = `
    
====================================
        EXAM RESULT CARD
====================================
Name       : ${student.name}
Student ID : ${student.studentId}
Roll       : ${student.roll}
Email      : ${student.email}
------------------------------------
Score      : ${result.score}/${result.totalMarks}
Percentage : ${result.percentage}%
------------------------------------
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

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-3xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <CheckCircle size={56} className="text-emerald-500 mb-4" />
          <h1 className="text-2xl font-black text-stone-800 uppercase tracking-tight">
            Exam শেষ!
          </h1>
          <p className="text-stone-400 text-sm mt-1">{student.name}</p>
        </div>

        {/* Score Card */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-6 space-y-4">
          {/* Score */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Score
            </span>
            <span className="text-2xl font-black text-stone-800">
              {result.score}
              <span className="text-stone-400 text-lg">
                /{result.totalMarks}
              </span>
            </span>
          </div>

          {/* Percentage Bar */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Percentage
              </span>
              <span className="text-xs font-black text-stone-700">
                {result.percentage}%
              </span>
            </div>
            <div className="bg-stone-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  percentage >= 80
                    ? "bg-emerald-500"
                    : percentage >= 50
                      ? "bg-amber-500"
                      : "bg-red-400"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Grade */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Grade
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-black border ${
                percentage >= 80
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : percentage >= 50
                    ? "bg-amber-50 text-amber-600 border-amber-200"
                    : "bg-red-50 text-red-500 border-red-200"
              }`}
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

        {/* Student Info */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 space-y-2">
          <p className="text-[10px] text-amber-600 uppercase font-bold tracking-wider mb-2">
            Student Info
          </p>
          <div className="flex justify-between text-xs">
            <span className="text-stone-400">Student ID</span>
            <span className="font-bold text-stone-700 font-mono">
              {student.studentId}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-400">Roll</span>
            <span className="font-bold text-stone-700 font-mono">
              {student.roll}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-400">Email</span>
            <span className="font-bold text-stone-700">{student.email}</span>
          </div>
        </div>

        {/* Retry Message */}
        {result.canRetry ? (
          <p className="text-center text-amber-600 text-xs font-semibold mb-4">
            Admin আবার exam দেওয়ার সুযোগ দিয়েছে!
          </p>
        ) : (
          <p className="text-center text-stone-400 text-xs mb-4">
            Exam একবারই দেওয়া যাবে
          </p>
        )}

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Result Download করো
        </button>
      </div>
    </div>
  );
};

export default ExamResult;
