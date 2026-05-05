"use client";

import { useState } from "react";
import { X, Upload, FileText, Loader2 } from "lucide-react";

import { showSuccess, showError } from "@/core/utils/swal.utils";
import { createCompleteNewAction } from "../actions/complete-new.actions";
import { uploadPDFToCloudinary } from "../service/upload.service";
import { FormModalProps } from "../Types/complete-new.types";

export default function CompleteNewFormModal({ isOpen, onClose, title }: FormModalProps) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        showError("Please select a valid PDF file.");
        e.target.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !text || !date) {
      await showError("সব field পূরণ করুন!");
      return;
    }

    setLoading(true);
    try {
      const pdfUrl = await uploadPDFToCloudinary(selectedFile);
      if (!pdfUrl) {
        await showError("PDF upload failed!");
        return;
      }

      const result = await createCompleteNewAction({
        title,
        text,
        date,
        pdfUrl,
      });

      if (result.success) {
        await showSuccess("সফলভাবে সংরক্ষণ হয়েছে! ✅");
        setText("");
        setDate("");
        setSelectedFile(null);
        onClose();
      } else {
        await showError(result.message || "Failed!");
      }
    } catch {
      await showError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {title} — Upload Form
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Text</label>
            <textarea
              placeholder="কিছু লিখুন..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              disabled={loading}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          {/* PDF Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Attach PDF</label>
            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {selectedFile ? (
                  <>
                    <FileText className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload PDF</p>
                  </>
                )}
              </div>
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} disabled={loading} />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile || loading}
              className="flex-1 py-2.5 text-sm rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading ? "Uploading..." : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}