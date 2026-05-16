"use client";

import { useState } from "react";
import { X, ImagePlus, Loader2 } from "lucide-react";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";

import { showError, showSuccess } from "@/core/utils/swal.utils";
import { AboutSectionModalProps } from "../AboutSection.types";
import { addAboutSectionAction } from "../AboutSection.actions";

export default function HeroImageTextForm({ isOpen, onClose, onSuccess }: AboutSectionModalProps) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      await showError("Please select an image!");
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadToCloudinary(imageFile);
      if (!imageUrl) {
        await showError("Image upload failed!");
        return;
      }

      setUploading(false);
      setLoading(true);

      const result = await addAboutSectionAction({
        image: imageUrl,
        text: text || undefined,
        title: title || undefined,
        name: name || undefined,
      });

      if (result.success) {
        await showSuccess(result.message);
        onSuccess();
        onClose();
        setText("");
        setTitle("");
        setName("");
        setImageFile(null);
        setPreview(null);
      } else {
        await showError(result.message);
      }
    } catch {
      await showError("Something went wrong!");
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 uppercase tracking-widest">
            Add About Section
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Image *</label>
            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:border-slate-500 transition overflow-hidden">
              {preview
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                : <div className="flex flex-col items-center gap-2 text-gray-400"><ImagePlus size={32} /><span className="text-xs font-semibold">Click to upload image</span></div>
              }
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Text (optional)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="Enter hero text..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 outline-none focus:border-slate-500 transition resize-none"
            />
          </div>
         <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Enter hero title..."
  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 outline-none focus:border-slate-500 transition"
/>
         <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter hero name..."
  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 outline-none focus:border-slate-500 transition"
/>
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <button onClick={onClose} className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading || loading}
            className="flex-1 h-11 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-xl text-sm tracking-widest uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {(uploading || loading) && <Loader2 size={16} className="animate-spin" />}
            {uploading ? "Uploading..." : loading ? "Saving..." : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
}