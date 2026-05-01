"use client";

import { X } from "lucide-react";
import { DataModalProps } from "./type";


export default function DataModal({ isOpen, onClose, title }: DataModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title} — Data
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Link</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">https://example.com</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Text</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet...</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Time</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">2026-04-30 · 11:00 AM</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}