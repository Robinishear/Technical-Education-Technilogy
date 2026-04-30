/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {  TestimonialModalProps } from "./type";



export default function InstructorModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  imagePreview,
  handleImageChange,
  handleSubmit,
  uploading,
  isMutating,
  isEditing,
}: TestimonialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {isEditing ? "✏️ Update Instructor" : "➕ Add Instructor"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-2xl transition"
          >
            &times;
          </button>
        </div>

        {/* Name */}
        <input
          className="w-full p-2.5 border rounded-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Profile Image
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-xl cursor-pointer text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {uploading && (
            <p className="text-cyan-400 text-sm animate-pulse">⏳ Uploading image...</p>
          )}
        </div>

        {/* Designation */}
        <input
          className="w-full p-2.5 border rounded-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Designation"
          value={formData.positionTitle}
          onChange={(e) => setFormData({ ...formData, positionTitle: e.target.value })}
        />

        {/* Skills */}
        <textarea
          className="w-full p-2.5 border rounded-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Skills (comma separated)"
          rows={3}
          value={formData.itemsRaw}
          onChange={(e) => setFormData({ ...formData, itemsRaw: e.target.value })}
        />

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isMutating}
            className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl font-bold transition"
          >
            {uploading ? "Uploading..." : isMutating ? "Saving..." : isEditing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}