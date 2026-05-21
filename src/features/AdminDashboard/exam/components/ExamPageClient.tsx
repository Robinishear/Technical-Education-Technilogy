/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Trash2,
  Pencil,
  X,
  Loader2,
  PlusCircle,
  HelpCircle,
  CheckCircle2,
  ListTodo,
  FileEdit,
} from "lucide-react";
import { Question, CreateQuestionPayload } from "../types";
import {
  createQuestionAction,
  deleteQuestionAction,
  updateQuestionAction,
} from "../exam.actions";
import { toast } from "sonner";

interface Props {
  questions: Question[];
}

const emptyOptions = [
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
];

const ExamPageClient = ({ questions: initialQuestions }: Props) => {
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions ?? [],
  );
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(emptyOptions);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index].text = value;
    setOptions(updated);
  };

  const handleCorrectChange = (index: number) => {
    setOptions(options.map((opt, i) => ({ ...opt, isCorrect: i === index })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!questionText.trim()) {
      toast.error("⚠️ Question টেক্সট ফাঁকা রাখা যাবে না!");
      return;
    }
    if (!options.some((o) => o.isCorrect)) {
      toast.error("🎯 অন্তত একটা সঠিক উত্তর সিলেক্ট করো!");
      return;
    }
    if (options.some((o) => !o.text.trim())) {
      toast.error("📝 সবকটি অপশনের টেক্সট পূরণ করো!");
      return;
    }

    setLoading(true);
    const payload: CreateQuestionPayload = { questionText, options };

    if (editingQuestion) {
      const res = await updateQuestionAction(editingQuestion.id, payload);
      if (res.success) {
        toast.success("✨ Question সফলভাবে আপডেট হয়েছে!");
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === editingQuestion.id ? (res.data as Question) : q,
          ),
        );
        setEditingQuestion(null);
        setQuestionText("");
        setOptions(emptyOptions);
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await createQuestionAction(payload);
      if (res.success) {
        toast.success("🚀 নতুন Question তৈরি করা হয়েছে!");
        setQuestions((prev) => [res.data as Question, ...prev]);
        setQuestionText("");
        setOptions(emptyOptions);
      } else {
        toast.error(res.message);
      }
    }
    setLoading(false);
  };

  const handleEdit = (q: Question) => {
    setEditingQuestion(q);
    setQuestionText(q.questionText);
    setOptions(
      q.options.map((o: any) => ({
        text: o.text,
        isCorrect: o.isCorrect ?? false,
      })),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("💥 তুমি কি নিশ্চিতভাবে এই প্রশ্নটি ডিলিট করতে চাও?")) return;
    setDeletingId(id);
    const res = await deleteQuestionAction(id);
    if (res.success) {
      toast.success("🗑️ Question ডিলিট করা হয়েছে!");
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } else {
      toast.error(res.message);
    }
    setDeletingId(null);
  };

  const handleCancel = () => {
    setEditingQuestion(null);
    setQuestionText("");
    setOptions(emptyOptions);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 p-4 sm:p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden mb-10 transition-all"
        >
          <div
            className={`absolute top-0 left-0 right-0 h-1.5 ${editingQuestion ? "bg-blue-500" : "bg-amber-500"}`}
          />

          <h2 className="text-xl font-black text-stone-800 dark:text-stone-100 uppercase tracking-tight flex items-center gap-2 mb-6">
            {editingQuestion ? (
              <>
                <FileEdit className="text-blue-500" size={22} />
                <span>Question Update করো ✨</span>
              </>
            ) : (
              <>
                <PlusCircle className="text-amber-500" size={22} />
                <span>নতুন Question যোগ করো 🚀</span>
              </>
            )}
          </h2>

          {/* Question Text Area */}
          <div className="mb-5">
            <label className="block text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 items-center gap-1">
              <HelpCircle size={12} /> Question Title
            </label>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="এখানে তোমার মূল প্রশ্নটি লিখো..."
              className="w-full bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-2xl px-4 py-3.5 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:focus:border-amber-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-600"
            />
          </div>

          {/* Options Grid Input */}
          <div className="mb-6 space-y-3">
            <label className="block text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1 items-center gap-1">
              <ListTodo size={12} /> Options Input (সঠিক বিলে টিক দাও)
            </label>

            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="correct"
                    checked={opt.isCorrect}
                    onChange={() => handleCorrectChange(i)}
                    className="sr-only peer"
                  />
                  <div className="w-6 h-6 rounded-xl border-2 border-stone-300 dark:border-stone-700 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 flex items-center justify-center text-transparent peer-checked:text-white transition-all shadow-sm">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                </label>

                <input
                  type="text"
                  value={opt.text}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className={`flex-1 bg-stone-50 dark:bg-stone-950/50 border rounded-2xl px-4 py-3 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-600 ${
                    opt.isCorrect
                      ? "border-emerald-500/50 ring-2 ring-emerald-500/10 focus:ring-emerald-500/50"
                      : "border-stone-200 dark:border-stone-800 focus:ring-amber-500/50"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 h-13 rounded-2xl text-white font-black text-sm uppercase tracking-wider transition-all duration-200 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg ${
                editingQuestion
                  ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/10"
                  : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10"
              }`}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              <span>
                {editingQuestion ? "Update করো ✨" : "Question সেভ করো 🚀"}
              </span>
            </button>

            {editingQuestion && (
              <button
                type="button"
                onClick={handleCancel}
                className="h-13 px-6 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 font-bold text-sm transition-all flex items-center justify-center gap-1 border border-stone-200 dark:border-stone-700"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </form>

        {/* 📋 Live Questions Display List */}
        <div>
          <div className="flex items-center justify-between mb-5 border-b border-stone-200 dark:border-stone-800 pb-3">
            <h2 className="text-lg md:text-xl font-black text-stone-800 dark:text-stone-100 uppercase tracking-tight flex items-center gap-2">
              <span>সব Question Dashboard 📊</span>
            </h2>
            <span className="bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-black text-xs px-3 py-1.5 rounded-xl border border-stone-300/30 dark:border-stone-700">
              মোট: {questions.length} টি প্রশ্ন
            </span>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8">
              <span className="text-4xl block mb-2">📭</span>
              <p className="text-stone-400 dark:text-stone-500 text-sm font-medium">
                এখনো কোনো প্রশ্ন তৈরি করা হয়নি। উপরে ফরম থেকে অ্যাড করো!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-stone-800 dark:text-stone-200 text-sm md:text-base leading-relaxed flex-1">
                      <span className="text-amber-500 mr-1.5 inline-block text-xs font-black bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200/40 dark:border-amber-900/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>{" "}
                      {q.questionText}
                    </h3>

                    {/* Operation Action Controls 🛠️ */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(q)}
                        className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center text-blue-500 dark:text-blue-400 transition-all shadow-sm"
                        title="Edit Question"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        disabled={deletingId === q.id}
                        className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 border border-red-200/60 dark:border-red-900/40 flex items-center justify-center text-red-500 dark:text-red-400 transition-all shadow-sm disabled:opacity-50"
                        title="Delete Question"
                      >
                        {deletingId === q.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Badged Options Render Section */}
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const isCorrect = (opt as any).isCorrect;
                      return (
                        <li
                          key={opt.id}
                          className={`text-xs px-3.5 py-2.5 rounded-xl border flex items-center justify-between ${
                            isCorrect
                              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-bold border-emerald-200 dark:border-emerald-900/40 shadow-sm"
                              : "text-stone-600 dark:text-stone-400 bg-stone-50/60 dark:bg-stone-900/40 border-stone-100 dark:border-stone-800/60"
                          }`}
                        >
                          <span className="truncate pr-2">• {opt.text}</span>
                          {isCorrect && (
                            <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shrink-0 tracking-wide">
                              Correct
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamPageClient;
