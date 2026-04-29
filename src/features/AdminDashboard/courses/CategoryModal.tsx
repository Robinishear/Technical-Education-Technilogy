"use client";

import { useState } from "react";
import { createCategoryAction } from "./actions";
import { Category } from "./types";
import { showSuccess, showError } from "@/core/utils/swal.utils";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
}: CategoryModalProps) {
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      await showError("Please enter a category name! 🏷️");
      return;
    }
    setLoading(true);
    try {
      await createCategoryAction({ name: newCategory.trim() });
      setNewCategory("");
      await showSuccess("Category added successfully! ✅");
      onSuccess();
    } catch {
      await showError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        
        {/* ── Header ── */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            🗂️ Category Management
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-3xl leading-none transition"
          >
            &times;
          </button>
        </div>

        {/* ── Input Section ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="New category name..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 border border-gray-200 dark:border-gray-700 p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 dark:disabled:bg-green-900/50 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-green-100 dark:shadow-none active:scale-95"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* ── Existing Categories ── */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Current Categories:
          </p>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <span
                  key={cat.id}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 text-green-700 dark:text-green-400 text-sm px-3 py-1.5 rounded-lg font-medium shadow-sm transition-all hover:scale-105"
                >
                  {cat.name}
                </span>
              ))
            ) : (
              <div className="w-full py-4 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
                <p className="text-gray-400 dark:text-gray-600 text-sm italic">No categories found.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Close Button ── */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-bold transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}