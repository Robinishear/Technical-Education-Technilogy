/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { ExamAnswer, Question } from "../types";
import { getQuestionsForStudentAction, submitExamAction } from "../exam.actions";
import { Student } from "@/features/usersDashboard/Students/students.type";


interface Props {
  student: Student;
  onClose: () => void;
}

const ExamModal = ({ student, onClose }: Props) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  // প্রশ্ন লোড করো
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const res = await getQuestionsForStudentAction(student.id);
      if (res.success) {
        setQuestions(res.data || []);
      } else {
        setError(res.message || "কোনো প্রশ্ন পাওয়া যায়নি");
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [student.id]);

  // Option select করো
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

  // Submit করো
  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError("সব প্রশ্নের উত্তর দাও!");
      return;
    }

    setSubmitting(true);
    const res = await submitExamAction(student.id, answers);
    setSubmitting(false);

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message || "Submit failed!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-black text-stone-800">Online Exam</h2>
            <p className="text-xs text-stone-400 mt-0.5">{student.name} — Roll: {student.roll}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors">
            <X size={18} className="text-stone-500" />
          </button>
        </div>

        <div className="p-6">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="animate-spin text-amber-500" size={36} />
              <p className="text-stone-400 text-sm">প্রশ্ন লোড হচ্ছে...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && !result && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <AlertCircle size={36} className="text-red-400" />
              <p className="text-red-500 font-semibold text-sm">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <CheckCircle size={56} className="text-emerald-500" />
              <h3 className="text-2xl font-black text-stone-800">Exam শেষ!</h3>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 w-full text-center space-y-2">
                <p className="text-4xl font-black text-emerald-600">{result.score}/{result.totalMarks}</p>
                <p className="text-stone-500 text-sm">Percentage: <span className="font-bold text-stone-700">{result.percentage}%</span></p>
                <p className="text-stone-500 text-sm">Attempt: <span className="font-bold text-stone-700">{result.attemptCount}/2</span></p>
                {result.canRetry ? (
                  <p className="text-amber-600 text-xs font-semibold mt-2">আরেকবার দিতে পারবে (২৪ ঘণ্টা পর)</p>
                ) : (
                  <p className="text-red-500 text-xs font-semibold mt-2">সর্বোচ্চ attempt শেষ</p>
                )}
              </div>
              <button onClick={onClose} className="h-11 px-8 rounded-xl bg-stone-800 text-white font-bold text-sm hover:bg-stone-900 transition-colors">
                Close
              </button>
            </div>
          )}

          {/* Questions */}
          {!loading && !error && !result && questions.length > 0 && (
            <>
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <div key={q.id} className="border border-stone-200 rounded-2xl p-5">
                    <p className="font-bold text-stone-800 text-sm mb-4">
                      {i + 1}. {q.questionText}
                    </p>
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

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm font-semibold mt-4">{error}</p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-6 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Submit হচ্ছে...</>
                ) : (
                  "Submit Exam"
                )}
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ExamModal;