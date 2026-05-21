/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2, Award, Clock } from "lucide-react";
import { getExamQuestionsAction, submitExamAction } from "../exam.actions";
import { ExamAnswer, ExamQuestion } from "../types";

interface Props {
  studentId: string;
  onSubmit: (result: any) => void;
}

const ExamQuestions = ({ studentId, onSubmit }: Props) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const res = await getExamQuestionsAction(studentId);
      if (res.success) {
        setQuestions(res.data || []);
      } else {
        setError(res.message || "❌ প্রশ্ন লোড করা সম্ভব হয়নি!");
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [studentId]);

  const handleSelect = (questionId: string, selectedOptionId: string) => {
    setError(""); 
    setAnswers((prev) => {
      const exists = prev.find((a) => a.questionId === questionId);
      if (exists) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, selectedOptionId } : a,
        );
      }
      return [...prev, { questionId, selectedOptionId }];
    });
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError("⚠️ দয়া করে সবকটি প্রশ্নের উত্তর দাও!");
      return;
    }

    setSubmitting(true);
    const res = await submitExamAction(studentId, answers);
    setSubmitting(false);

    if (res.success) {
      onSubmit(res.data);
    } else {
      setError(res.message || "❌ সাবমিট ব্যর্থ হয়েছে! আবার চেষ্টা করো।");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <div className="relative flex items-center justify-center">
          <Loader2
            className="animate-spin text-amber-500 dark:text-amber-400"
            size={48}
          />
          <Clock
            className="absolute text-stone-400 dark:text-stone-500"
            size={20}
          />
        </div>
        <p className="text-stone-600 dark:text-stone-400 font-medium text-base animate-pulse">
          📝 প্রশ্নপত্র লোড হচ্ছে, একটু অপেক্ষা করো...
        </p>
      </div>
    );

  if (error && questions.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 max-w-md mx-auto text-center">
        <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-full text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50">
          <AlertCircle size={40} />
        </div>
        <p className="text-red-600 dark:text-red-400 font-bold text-lg">
          {error}
        </p>
      </div>
    );

  const completionPercentage =
    questions.length > 0 ? (answers.length / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden mb-8 transition-all">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">📝</span>
                <h2 className="text-2xl md:text-3xl font-black text-stone-800 dark:text-stone-100 tracking-tight">
                  Exam শুরু করো
                </h2>
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-sm flex items-center gap-1.5">
                <Award size={16} className="text-amber-500" />
                মোট{" "}
                <span className="font-bold text-stone-700 dark:text-stone-300">
                  {questions.length}টি
                </span>{" "}
                প্রশ্ন রয়েছে
              </p>
            </div>

            {/* Real-time Counter Badge */}
            <div className="self-start sm:self-center bg-stone-100 dark:bg-stone-800 px-4 py-2 rounded-2xl text-xs font-bold text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
              ✅ উত্তর দেওয়া হয়েছে: {answers.length}/{questions.length}
            </div>
          </div>

          {/* 📊 Smooth Floating Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2.5 overflow-hidden border border-stone-200/50 dark:border-stone-700/50">
              <div
                className="bg-linear-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 📋 Questions List */}
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 md:p-7 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              {/* Question Text & Mark */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <h3 className="font-bold text-stone-800 dark:text-stone-200 text-base md:text-lg leading-relaxed flex-1">
                  <span className="text-amber-500 mr-1.5 inline-block text-sm font-black bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200/40 dark:border-amber-900/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {q.questionText}
                </h3>
                <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40 px-3 py-1 rounded-full text-xs font-black tracking-wide whitespace-nowrap shadow-sm">
                  🎯 {q.mark} Marks
                </span>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt) => {
                  const isSelected = answers.some(
                    (a) =>
                      a.questionId === q.id && a.selectedOptionId === opt.id,
                  );
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`w-full text-left px-5 py-4 rounded-2xl text-sm md:text-base border transition-all duration-200 flex items-center justify-between group/btn ${
                        isSelected
                          ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-500 text-amber-800 dark:text-amber-300 font-bold ring-2 ring-amber-500/10"
                          : "bg-stone-50 dark:bg-stone-900/50 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100/70 dark:hover:bg-stone-800/70 hover:border-amber-400 dark:hover:border-amber-500 hover:text-stone-900 dark:hover:text-stone-200"
                      }`}
                    >
                      <span className="flex-1 pr-4">{opt.text}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? "border-amber-500 bg-amber-500 text-white"
                            : "border-stone-300 dark:border-stone-700 group-hover/btn:border-amber-400"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 size={12} strokeWidth={4} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 🚨 Dynamic Error Flash Box */}
        {error && (
          <div className="mt-6 flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold animate-headShake">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 🚀 Sticky-Ready Action Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-black text-base uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5"
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Submit হচ্ছে...</span>
              </>
            ) : (
              <>
                <span>🚀 Exam Submit করো</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestions;
