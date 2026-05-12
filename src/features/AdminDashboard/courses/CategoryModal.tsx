"use client";

import { useState } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "./actions";
import { CategoryModalProps } from "./types";
import { confirmDelete, showSuccess, showError } from "@/core/utils/swal.utils";

export default function CategoryModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
}: CategoryModalProps) {
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [updating, setUpdating] = useState(false);

  if (!isOpen) return null;

  // ── Add ──
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

  // ── Update ──
  const handleUpdate = async (id: string) => {
    if (!editName.trim()) {
      await showError("Category নাম লিখুন!");
      return;
    }
    setUpdating(true);
    try {
      const res = await updateCategoryAction(id, { name: editName.trim() });
      if (res?.success) {
        await showSuccess("Updated! ✅");
        setEditingId(null);
        onSuccess();
      } else {
        await showError(res?.message || "Update failed!");
      }
    } catch {
      await showError("Something went wrong.");
    } finally {
      setUpdating(false);
    }
  };

  // ── Delete ──
  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;
    try {
      const res = await deleteCategoryAction(id);
      if (res.success) {
        await showSuccess("Deleted! 🗑️");
        onSuccess();
      } else {
        await showError(res.message || "Delete failed!");
      }
    } catch {
      await showError("Something went wrong.");
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

        {/* ── Add Input ── */}
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

        {/* ── Category List ── */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Current Categories:
          </p>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between gap-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 px-3 py-2 rounded-xl"
                >
                  {editingId === cat.id ? (
                    // ── Edit mode ──
                    <>
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        className="flex-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        disabled={updating}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition"
                      >
                        {updating && <Loader2 size={12} className="animate-spin" />}
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    // ── View mode ──
                    <>
                      <span className="text-sm text-green-700 dark:text-green-400 font-medium flex-1">
                        {cat.name}
                      </span>
                      <button
                        onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                        aria-label="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                        aria-label="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="w-full py-4 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
                <p className="text-gray-400 dark:text-gray-600 text-sm italic">No categories found.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Close ── */}
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