/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Trash2, Pencil, X, Loader2 } from "lucide-react";
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
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
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

  const handleSubmit = async () => {
    if (!questionText.trim()) {
      toast.error("Question লিখো!");
      return;
    }
    if (!options.some((o) => o.isCorrect)) {
      toast.error("একটা সঠিক উত্তর select করো!");
      return;
    }
    if (options.some((o) => !o.text.trim())) {
      toast.error("সব option লিখো!");
      return;
    }

    setLoading(true);
    const payload: CreateQuestionPayload = { questionText, options };

    if (editingQuestion) {
      const res = await updateQuestionAction(editingQuestion.id, payload);
      if (res.success) {
        toast.success("Question updated!");
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === editingQuestion.id ? (res.data as Question) : q,
          ),
        );
        setEditingQuestion(null);
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await createQuestionAction(payload);
      if (res.success) {
        toast.success("Question তৈরি হয়েছে!");
        setQuestions((prev) => [res.data as Question, ...prev]);
      } else {
        toast.error(res.message);
      }
    }

    setLoading(false);
    setQuestionText("");
    setOptions(emptyOptions);
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
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete করবো?")) return;
    setDeletingId(id);
    const res = await deleteQuestionAction(id);
    if (res.success) {
      toast.success("Question deleted!");
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
    <div className="p-6 max-w-3xl mx-auto">
      {/* Form */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-black text-stone-800 uppercase tracking-wider mb-4">
          {editingQuestion ? "Question Update করো" : "নতুন Question যোগ করো"}
        </h2>

        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
            Question
          </label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="প্রশ্ন লিখো..."
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="mb-4 space-y-2">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
            Options (সঠিক উত্তরে টিক দাও)
          </label>
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="radio"
                name="correct"
                checked={opt.isCorrect}
                onChange={() => handleCorrectChange(i)}
                className="accent-amber-500"
              />
              <input
                type="text"
                value={opt.text}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                className="flex-1 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {editingQuestion ? "Update করো" : "Question যোগ করো"}
          </button>
          {editingQuestion && (
            <button
              onClick={handleCancel}
              className="h-11 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-sm transition-colors flex items-center gap-1"
            >
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* Question List */}
      <div>
        <h2 className="text-lg font-black text-stone-800 uppercase tracking-wider mb-4">
          সব Question ({questions.length}টা)
        </h2>
        {questions.length === 0 ? (
          <p className="text-stone-400 text-sm text-center py-10">
            কোনো question নেই
          </p>
        ) : (
          <ul className="space-y-3">
            {questions.map((q, i) => (
              <li
                key={q.id}
                className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-stone-800 text-sm flex-1">
                    {i + 1}. {q.questionText}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleEdit(q)}
                      className="h-8 w-8 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center justify-center transition-colors"
                    >
                      <Pencil size={13} className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      disabled={deletingId === q.id}
                      className="h-8 w-8 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center transition-colors"
                    >
                      {deletingId === q.id ? (
                        <Loader2
                          size={13}
                          className="animate-spin text-red-400"
                        />
                      ) : (
                        <Trash2 size={13} className="text-red-400" />
                      )}
                    </button>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {q.options.map((opt) => (
                    <li
                      key={opt.id}
                      className={`text-xs px-3 py-1.5 rounded-lg ${(opt as any).isCorrect ? "bg-emerald-50 text-emerald-600 font-bold border border-emerald-200" : "text-stone-500 bg-stone-50"}`}
                    >
                      • {opt.text}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExamPageClient;
