"use client";

import { useState } from "react";
import { Question } from "../types";
import { createQuestionAction } from "../exam.actions";


interface Props {
  questions: Question[];
}

const ExamPageClient = ({ questions }: Props) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Option text change
  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index].text = value;
    setOptions(updated);
  };

  // Correct option select
  const handleCorrectChange = (index: number) => {
    const updated = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(updated);
  };

  // Submit
  const handleSubmit = async () => {
    if (!questionText.trim()) {
      setMessage("Question লিখো!");
      return;
    }

    const hasCorrect = options.some((o) => o.isCorrect);
    if (!hasCorrect) {
      setMessage("একটা সঠিক উত্তর select করো!");
      return;
    }

    const emptyOption = options.some((o) => !o.text.trim());
    if (emptyOption) {
      setMessage("সব option লিখো!");
      return;
    }

    setLoading(true);
    const res = await createQuestionAction({ questionText, options });
    setLoading(false);

    if (res.success) {
      setMessage("✅ Question তৈরি হয়েছে!");
      setQuestionText("");
      setOptions([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]);
    } else {
      setMessage(`❌ ${res.message}`);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Exam Question তৈরি করো</h1>

      {/* Question Input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Question</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="প্রশ্ন লিখো..."
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Options */}
      <div className="mb-4 space-y-2">
        <label className="block font-medium mb-1">
          Options (সঠিক উত্তরে টিক দাও)
        </label>
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="radio"
              name="correct"
              checked={opt.isCorrect}
              onChange={() => handleCorrectChange(i)}
            />
            <input
              type="text"
              value={opt.text}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="flex-1 border rounded px-3 py-2"
            />
          </div>
        ))}
      </div>

      {/* Message */}
      {message && <p className="mb-3 text-sm text-blue-600">{message}</p>}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "তৈরি হচ্ছে..." : "Question যোগ করো"}
      </button>

      {/* Question List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          সব Question ({questions.length}টা)
        </h2>
        {questions.length === 0 ? (
          <p className="text-gray-500">কোনো question নেই</p>
        ) : (
          <ul className="space-y-3">
            {questions.map((q, i) => (
              <li key={q.id} className="border rounded p-3">
                <p className="font-medium">
                  {i + 1}. {q.questionText}
                </p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt) => (
                    <li key={opt.id} className="text-sm text-gray-600">
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
