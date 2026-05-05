/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { Instructor, FormData } from "./type";
import { confirmDelete, showSuccess, showError } from "@/core/utils/swal.utils";
import {
  getTestimonialsAction,
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
} from "./testimonials.actions";
import TestimonialModal from "./TestimonialModal";

export default function TestimonialsManagement() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormData>({
    name: "", image: "", positionTitle: "", itemsRaw: "",
  });
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: testimonials = [], isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await getTestimonialsAction();
      return (res.data ?? []) as Instructor[];
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: object) => createTestimonialAction(payload),
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        await showSuccess("Testimonial added! ✅");
        resetForm();
      } else {
        await showError(res.message || "Failed to create!");
      }
    },
    onError: async () => showError("Error creating!"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: object }) =>
      updateTestimonialAction(id, payload),
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        await showSuccess("Updated! ✅");
        resetForm();
      } else {
        await showError(res.message || "Failed to update!");
      }
    },
    onError: async () => showError("Error updating!"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTestimonialAction(id),
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        await showSuccess("Deleted! 🗑️");
      } else {
        await showError(res.message || "Failed to delete!");
      }
    },
    onError: async () => showError("Error deleting!"),
  });

  const resetForm = useCallback(() => {
    setFormData({ name: "", image: "", positionTitle: "", itemsRaw: "" });
    setImageFile(null);
    setImagePreview("");
    setIsEditing(null);
    setIsModalOpen(false);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = formData.image;
    if (imageFile) {
      setUploading(true);
      const uploadedUrl = await uploadToCloudinary(imageFile);
      setUploading(false);
      if (!uploadedUrl) {
        await showError("Image upload failed!");
        return;
      }
      imageUrl = uploadedUrl;
    }
    const payload = {
      name: formData.name,
      image: imageUrl,
      position: { title: formData.positionTitle },
      items: formData.itemsRaw.split(",").map((i) => i.trim()).filter(Boolean),
    };
    if (isEditing) {
      updateMutation.mutate({ id: isEditing, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  const handleEdit = (inst: Instructor) => {
    setIsEditing(inst.id);
    setFormData({
      name: inst.name,
      image: inst.image,
      positionTitle: inst.position?.title || "",
      itemsRaw: inst.items?.join(", ") || "",
    });
    setImagePreview(inst.image);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const isMutating = createMutation.isPending || updateMutation.isPending || uploading;

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">🗣️ Testimonials</h2>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-md flex items-center gap-2 text-sm"
        >
          ➕ Add Testimonial
        </button>
      </div>

      {/* ── Modal ── */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={resetForm}
        formData={formData}
        setFormData={setFormData}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        uploading={uploading}
        isMutating={isMutating}
        isEditing={isEditing}
      />

      {/* ── Table ── */}
      {isLoading ? (
        <p className="text-center text-cyan-400 animate-pulse py-12">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-400 py-12">Failed to load testimonials.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 uppercase text-xs">Image</th>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 uppercase text-xs">Name</th>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 uppercase text-xs">Position</th>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 uppercase text-xs">Skills</th>
                <th className="p-4 font-bold text-gray-600 dark:text-gray-300 uppercase text-xs text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-12 text-gray-400 italic">
                    No testimonials found. Click "Add Testimonial" to start. ✨
                  </td>
                </tr>
              ) : (
                testimonials.map((inst, index) => (
                  <tr key={inst.id || `testimonial-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="p-4">
                      {inst.image ? (
                        <img src={inst.image} alt={inst.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                          {inst.name?.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{inst.name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{inst.position?.title || "N/A"}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {inst.items?.slice(0, 3).map((item, i) => (
                          <span key={`${inst.id}-${i}`} className="bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 text-xs px-2 py-0.5 rounded-full">
                            {item}
                          </span>
                        ))}
                        {inst.items?.length > 3 && (
                          <span className="text-xs text-gray-400">+{inst.items.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(inst)}
                        className="bg-yellow-50 hover:bg-yellow-500 text-yellow-600 hover:text-white border border-yellow-200 px-3 py-1.5 rounded-lg transition text-xs font-medium"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(inst.id)}
                        disabled={deleteMutation.isPending}
                        className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 px-3 py-1.5 rounded-lg transition text-xs font-medium disabled:opacity-50"
                      >
                        🗑️ Delete
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}