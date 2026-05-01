"use client";

import { useState } from "react";
import { X, Upload, FileText } from "lucide-react"; // Notun icons
import { FormModalProps } from "./type";

export default function CompleteNewFormModal({ isOpen, onClose, title }: FormModalProps) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  // File handle korar function
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please select a valid PDF file.");
        e.target.value = ""; // Reset input
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PDF download logic delete kora hoyeche
    // Ekhon apni eikhan theke API call ba state update korte parben
    console.log({
      text,
      date,
      file: selectedFile, // Selected PDF file eikhane paben
    });

    // Reset fields after submit
    setText("");
    setDate("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {title} — Upload Form
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Text Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Text
            </label>
            <textarea
              placeholder="কিছু লিখুন..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Date Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PDF File Upload Field (Notun Section) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Attach PDF
            </label>
            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {selectedFile ? (
                  <>
                    <FileText className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {selectedFile.name}
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click to upload PDF
                    </p>
                  </>
                )}
              </div>
              <input 
                type="file" 
                accept=".pdf" 
                className="hidden" 
                onChange={handleFileChange} 
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile}
              className={`flex-1 py-2.5 text-sm rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90 transition font-medium ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}