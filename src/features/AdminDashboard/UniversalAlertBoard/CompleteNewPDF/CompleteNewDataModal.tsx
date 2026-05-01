"use client";

import { X, Download } from "lucide-react";
import jsPDF from "jspdf";
import { DataModalProps } from "./type";



export default function CompleteNewDataModal({ isOpen, onClose, title }: DataModalProps) {
  if (!isOpen) return null;

  const data = {
    link: "https://example.com",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    time: "2026-04-30 · 11:00 AM",
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${title} — Data`, 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("Link:", 14, 40);
    doc.setTextColor(0, 0, 255);
    doc.text(data.link, 14, 48);

    doc.setTextColor(100);
    doc.text("Text:", 14, 62);
    doc.setTextColor(0);
    const splitText = doc.splitTextToSize(data.text, 180);
    doc.text(splitText, 14, 70);

    doc.setTextColor(100);
    doc.text("Time:", 14, 100);
    doc.setTextColor(0);
    doc.text(data.time, 14, 108);

    doc.save(`${title || "data"}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {title} — Data
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Data Display */}
        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Link</p>
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {data.link}
            </a>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Text</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{data.text}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Time</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{data.time}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Close
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90 transition font-medium"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}