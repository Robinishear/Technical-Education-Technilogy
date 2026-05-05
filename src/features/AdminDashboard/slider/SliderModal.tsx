"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { addSliderAction } from "./slider.actions";
import { SliderModalProps } from "./slider.types";
import { showSuccess, showError } from "@/core/utils/swal.utils";

export default function SliderModal({ isOpen, onClose, onSuccess }: SliderModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [order, setOrder] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!file) {
      await showError("Please select an image! 🖼️"); 
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) throw new Error("Image upload failed");

      const result = await addSliderAction({
        image: imageUrl,
        caption,
        order: Number(order),
      });

      if (result.success) {
        setFile(null);
        setCaption("");
        setOrder(1);
        await showSuccess("Slider added successfully! ✨"); 
        onSuccess();
        onClose();
      } else {
        await showError(result.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      await showError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        
        {/* ── Header ── */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            ✨ <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Add New Slider</span>
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="space-y-5">
          {/* Image Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">📸 Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-800 dark:file:text-indigo-400 border border-gray-200 dark:border-gray-700 p-2 rounded-xl w-full bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 transition-all"
            />
          </div>

          {/* Caption Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">📝 Caption</label>
            <input
              type="text"
              placeholder="Enter slider caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border border-gray-200 dark:border-gray-700 p-2.5 rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Order Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">🔢 Order Number</label>
            <input
              type="number"
              min={1}
              placeholder="Display order"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="border border-gray-200 dark:border-gray-700 p-2.5 rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-900/50 transition-all font-bold shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? "Processing... ⏳" : "Add Slider 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}