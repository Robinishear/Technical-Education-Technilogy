/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { createCourseAction, updateCourseAction } from "./actions";
import { CourseModalProps, CreateCoursePayload } from "./types";
import { showSuccess, showError } from "@/core/utils/swal.utils";


const defaultForm: CreateCoursePayload = {
  title: "",
  thumbnail: "",
  instructor: "",
  totalReviews: 0,
  rating: 0,
  // price: 0,
  // oldPrice: null,
  categoryId: "",
};

export default function CourseModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
  editingCourse,
}: CourseModalProps) {
  const [form, setForm] = useState<CreateCoursePayload>(defaultForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCourse) {
      setForm({
        title: editingCourse.title,
        thumbnail: editingCourse.thumbnail,
        instructor: editingCourse.instructor,
        totalReviews: Number(editingCourse.totalReviews),
        rating: Number(editingCourse.rating),
        // price: Number(editingCourse.price),
        // oldPrice: editingCourse.oldPrice ? Number(editingCourse.oldPrice) : null,
        categoryId: editingCourse.categoryId,
      });
    } else {
      setForm(defaultForm);
      setImageFile(null);
    }
  }, [editingCourse, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) {
      await showError("Please select a category! 📂");
      return;
    }
    if (!imageFile && !form.thumbnail) {
      await showError("Thumbnail image is required! 🖼️");
      return;
    }

    setLoading(true);
    try {
      let thumbnailUrl = form.thumbnail;
      if (imageFile) {
        const url = await uploadToCloudinary(imageFile);
        if (!url) throw new Error("Image upload failed");
        thumbnailUrl = url;
      }

      const payload: CreateCoursePayload = { ...form, thumbnail: thumbnailUrl };

      if (editingCourse) {
        await updateCourseAction(editingCourse.id, payload);
        await showSuccess("Course updated successfully! ✅");
      } else {
        await createCourseAction(payload);
        await showSuccess("Course added successfully! 🚀");
      }

      setForm(defaultForm);
      setImageFile(null);
      onSuccess();
      onClose();
    } catch {
      await showError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800 transition-colors duration-300 scrollbar-hide">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            {editingCourse ? "✏️ Update Course" : "🚀 Add New Course"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-3xl leading-none transition"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Title *</label>
            <input
              type="text"
              placeholder="Enter course title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Instructor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Instructor *</label>
            <input
              type="text"
              placeholder="Instructor name"
              value={form.instructor}
              onChange={(e) => setForm({ ...form, instructor: e.target.value })}
              className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Reviews & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Total Reviews</label>
              <input
                type="number"
                min={0}
                value={form.totalReviews}
                onChange={(e) => setForm({ ...form, totalReviews: Number(e.target.value) })}
                className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Rating (0–5)</label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

        

          {/* Category Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Category *</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="border border-gray-200 dark:border-gray-700 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Thumbnail Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Course Thumbnail {editingCourse ? "(Update to replace)" : "*"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 dark:file:bg-gray-700 dark:file:text-blue-400 border border-gray-200 dark:border-gray-700 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-600 transition-all"
            />
            {editingCourse && form.thumbnail && !imageFile && (
              <div className="mt-2 flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <img src={form.thumbnail} alt="current" className="w-20 h-12 object-cover rounded-lg" />
                <span className="text-xs text-gray-500">Current Thumbnail</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white dark:bg-gray-900 pb-2 transition-colors">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900/50 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-100 dark:shadow-none active:scale-95"
            >
              {loading ? "Processing... ⏳" : editingCourse ? "Update Course ✅" : "Add Course 🚀"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}