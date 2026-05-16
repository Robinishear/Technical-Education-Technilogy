/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Loader2, X, Save, ImagePlus } from "lucide-react";

import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { confirmDelete, showError, showSuccess } from "@/core/utils/swal.utils";
import { deleteAboutSectionAction,  getAboutSectionsAction, updateAboutSectionAction } from "../AboutSection.actions";
import { AboutSection } from "../AboutSection.types";

export default function HeroImageTextList({ refresh }: { refresh: number }) {
  const [items, setItems] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);


  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editName, setEditName] = useState("");  
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const result = await getAboutSectionsAction();
    setItems(result.data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [refresh]);

  const handleEditStart = (item: AboutSection) => {
    setEditId(item.id);
    setEditText(item.text ?? "");
    setEditTitle(item.title ?? ""); 
    setEditName(item.name ?? "");   
    setEditPreview(item.image);
    setEditImageFile(null);
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImageFile(file);
    setEditPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (!editId) return;
    try {
      setSaving(true);
      let imageUrl: string | undefined;

      if (editImageFile) {
        const uploaded = await uploadToCloudinary(editImageFile);
        if (!uploaded) { await showError("Image upload failed!"); return; }
        imageUrl = uploaded;
      }

      const result = await updateAboutSectionAction(editId, {
        ...(imageUrl && { image: imageUrl }),
        text: editText || undefined,
        title: editTitle || undefined, 
        name: editName || undefined,   
      });

      if (result.success) {
        await showSuccess(result.message);
        setEditId(null);
        fetchData();
      } else {
        await showError(result.message);
      }
    } catch {
      await showError("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;
    try {
      setDeletingId(id);
      const result = await deleteAboutSectionAction(id);
      if (result.success) {
        await showSuccess(result.message);
        fetchData();
      } else {
        await showError(result.message);
      }
    } catch {
      await showError("Delete failed!");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
        <ImagePlus size={40} />
        <p className="text-sm font-bold uppercase tracking-widest">No hero images yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-100 dark:border-gray-800 overflow-hidden">

          {/* Image */}
          <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
            <img
              src={editId === item.id && editPreview ? editPreview : item.image}
              alt="hero"
              className="w-full h-full object-cover"
            />
            {editId === item.id && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer hover:bg-black/50 transition">
                <div className="text-white flex flex-col items-center gap-1">
                  <ImagePlus size={24} />
                  <span className="text-xs font-bold">Change Image</span>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} />
              </label>
            )}
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            {editId === item.id ? (
              <>
                {/* Text */}
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  placeholder="Enter text..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-slate-500 transition resize-none"
                />

                {/* Title ✅ */}
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Enter title..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-slate-500 transition"
                />

                {/* Name ✅ */}
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-slate-500 transition"
                />
              </>
            ) : (
              <div className="space-y-1">
                {item.title && (
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.title}</p>
                )}
                {item.name && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.name}</p>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300 min-h-10">
                  {item.text || <span className="text-gray-300 italic">No text</span>}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {editId === item.id ? (
                <>
                  <button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="flex-1 h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg uppercase tracking-widest transition disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="h-9 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-lg transition"
                  >
                    <X size={16} className="text-gray-500" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditStart(item)}
                    className="flex-1 h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg uppercase tracking-widest transition flex items-center justify-center gap-1"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="flex-1 h-9 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg uppercase tracking-widest transition disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    {deletingId === item.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    {deletingId === item.id ? "..." : "Delete"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}