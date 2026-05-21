/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
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
        setError(res.message || "প্রশ্ন লোড হয়নি!");
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [studentId]);

  const handleSelect = (questionId: string, selectedOptionId: string) => {
    setAnswers((prev) => {
      const exists = prev.find((a) => a.questionId === questionId);
      if (exists) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, selectedOptionId } : a
        );
      }
      return [...prev, { questionId, selectedOptionId }];
    });
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError("সব প্রশ্নের উত্তর দাও!");
      return;
    }

    setSubmitting(true);
    const res = await submitExamAction(studentId, answers);
    setSubmitting(false);

    if (res.success) {
      onSubmit(res.data);
    } else {
      setError(res.message || "Submit failed!");
    }
  };
  // UI States

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 className="animate-spin text-amber-500" size={36} />
      <p className="text-stone-400 text-sm">প্রশ্ন লোড হচ্ছে...</p>
    </div>
  );

  if (error && questions.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <AlertCircle size={36} className="text-red-400" />
      <p className="text-red-500 font-semibold text-sm">{error}</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-stone-800 uppercase tracking-tight">
          Exam শুরু করো
        </h2>
        <p className="text-stone-400 text-sm mt-1">
          মোট {questions.length}টি প্রশ্ন
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <p className="font-bold text-stone-800 text-sm flex-1">
                {i + 1}. {q.questionText}
              </p>
              <span className="bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-bold ml-3 whitespace-nowrap">
                {q.mark} marks
              </span>
            </div>

            <div className="space-y-2">
              {q.options.map((opt) => {
                const isSelected = answers.find(
                  (a) => a.questionId === q.id && a.selectedOptionId === opt.id
                );
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(q.id, opt.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                      isSelected
                        ? "bg-amber-50 border-amber-400 text-amber-700 font-semibold"
                        : "bg-stone-50 border-stone-200 text-stone-600 hover:border-amber-300"
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm font-semibold mt-4">{error}</p>
      )}

      {/* Progress */}
      <div className="my-6 bg-stone-100 rounded-full h-2">
        <div
          className="bg-amber-500 h-2 rounded-full transition-all"
          style={{ width: `${(answers.length / questions.length) * 100}%` }}
        />
      </div>
      <p className="text-xs text-stone-400 text-center mb-6">
        {answers.length}/{questions.length} টি উত্তর দেওয়া হয়েছে
      </p>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <><Loader2 size={16} className="animate-spin" /> Submit হচ্ছে...</>
        ) : (
          "Exam Submit করো"
        )}
      </button>

    </div>
  );
};

export default ExamQuestions;