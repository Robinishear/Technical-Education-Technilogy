"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Pencil, Trash2, Download, FileText } from "lucide-react";

import { confirmDelete, showSuccess, showError } from "@/core/utils/swal.utils";
import { CompleteNewData } from "../service/complete-new.service";
import { DataModalProps } from "../Types/complete-new.types";
import { deleteCompleteNewAction, getAllCompleteNewAction, updateCompleteNewAction } from "../actions/complete-new.actions";
import { uploadPDFToCloudinary } from "../service/upload.service";


export default function CompleteNewDataModal({ isOpen, onClose, title }: DataModalProps) {
  const [items, setItems] = useState<CompleteNewData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ text: "", date: "", pdfUrl: "" });
  const [newPdfFile, setNewPdfFile] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);


// const getDownloadUrl = (url: string) => {
//   return url.replace('/upload/', '/upload/fl_attachment/');
// };

  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllCompleteNewAction();
    console.log("🔵 res:", res);
    if (res.success) setItems(res.data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;
    const res = await deleteCompleteNewAction(id);
    if (res.success) {
      await showSuccess("Deleted! 🗑️");
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      await showError(res.message || "Delete failed!");
    }
  };

  const handleEditStart = (item: CompleteNewData) => {
    setEditingId(item.id);
    setEditForm({ text: item.text, date: item.date, pdfUrl: item.pdfUrl });
    setNewPdfFile(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({ text: "", date: "", pdfUrl: "" });
    setNewPdfFile(null);
  };

  const handleUpdate = async (id: string) => {
    setUpdating(true);
    try {
      let pdfUrl = editForm.pdfUrl;

      if (newPdfFile) {
        const uploaded = await uploadPDFToCloudinary(newPdfFile);
        if (!uploaded) {
          await showError("PDF upload failed!");
          return;
        }
        pdfUrl = uploaded;
      }

      const res = await updateCompleteNewAction(id, { text: editForm.text, date: editForm.date, pdfUrl });
      if (res.success) {
        await showSuccess("Updated! ");
        setItems((prev) => prev.map((item) => item.id === id ? { ...item, text: editForm.text, date: editForm.date, pdfUrl } : item));
        setEditingId(null);
        setNewPdfFile(null);
      } else {
        await showError(res.message || "Update failed!");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (!isOpen) return null;

const handleDownload = (pdfUrl: string) => {
  window.open(pdfUrl, "_blank");
};
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {title} — Data
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 size={24} className="animate-spin text-gray-400" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-sm text-gray-400 italic py-10">কোনো data নেই।</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
                {editingId === item.id ? (
                  // ── Edit Mode ──
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Text</label>
                      <textarea
                        value={editForm.text}
                        onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Date</label>
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* PDF replace */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Replace PDF (optional)</label>
                      <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <FileText size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{newPdfFile ? newPdfFile.name : "Click to select new PDF"}</span>
                        <input type="file" accept=".pdf" className="hidden" onChange={(e) => setNewPdfFile(e.target.files?.[0] || null)} />
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleEditCancel} className="flex-1 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdate(item.id)}
                        disabled={updating}
                        className="flex-1 py-2 text-xs rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90 transition font-medium flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        {updating && <Loader2 size={12} className="animate-spin" />}
                        {updating ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  // ── View Mode ──
                  <>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Text</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">PDF</p>
 {/* <button
  onClick={() => handleDownload(item.pdfUrl, item.date)}
  className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
>
  <Download size={14} /> Download PDF
</button> */}<button
  onClick={() => handleDownload(item.pdfUrl, )}
  className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
>
  <Download size={14} /> Download PDF
</button>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleEditStart(item)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-lg bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white border border-blue-200 transition font-medium"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-lg bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 transition font-medium"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <button onClick={onClose} className="w-full py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          Close
        </button>
      </div>
    </div>

  );


};