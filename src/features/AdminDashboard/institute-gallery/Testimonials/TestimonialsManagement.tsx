/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquareQuote, Plus, Pencil, Trash2, Quote, BadgeCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        await showError(res.message || "Failed to create! ❌");
      }
    },
    onError: async () => showError("Error creating! ❌"),
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
        await showError(res.message || "Failed to update! ❌");
      }
    },
    onError: async () => showError("Error updating! ❌"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTestimonialAction(id),
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        await showSuccess("Deleted! 🗑️");
      } else {
        await showError(res.message || "Failed to delete! ❌");
      }
    },
    onError: async () => showError("Error deleting! ❌"),
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
        await showError("Image upload failed! ❌");
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
      {/* ── 🏷️ Top Header Section ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 rounded-2xl hidden sm:block">
            <MessageSquareQuote className="text-cyan-600 dark:text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight uppercase">
              Testimonials <span className="text-cyan-600 dark:text-cyan-400">Review</span> 🗣️
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Moderate, manage, and feature top feedback from your system users.</p>
          </div>
        </div>
        
        <Button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider h-11 shadow-xs active:scale-95 transition-all"
        >
          <Plus size={16} className="mr-1" /> Add Testimonial
        </Button>
      </div>

      {/* ── 🪟 Modal ── */}
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

      {/* ── 🔄 State Handlers (Loading / Error) ── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          <p className="text-sm font-medium text-cyan-500/70 animate-pulse tracking-wider uppercase">Loading Testimonials...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 border border-red-100 dark:border-red-950/40 rounded-3xl text-red-500">
          <p className="text-sm font-bold uppercase tracking-wide">⚠️ Failed to load testimonials data!</p>
        </div>
      ) : (
        <>
          {/* ── 📱 Mobile Card List (Hidden on Desktop) ── */}
          <div className="block md:hidden space-y-4">
            {testimonials.length === 0 ? (
              <EmptyStateView />
            ) : (
              testimonials.map((inst, index) => (
                <div 
                  key={inst.id || `testimonial-card-${index}`}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl shadow-xs flex flex-col gap-4"
                >
                  <div className="flex gap-4 items-center">
                    {inst.image ? (
                      <img src={inst.image} alt={inst.name} className="w-14 h-14 rounded-2xl object-cover border border-gray-100 dark:border-gray-800 shadow-xs shrink-0" />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900/50 flex items-center justify-center text-lg font-black text-cyan-600 dark:text-cyan-400 uppercase shrink-0">
                        {inst.name?.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base leading-tight truncate">
                        {inst.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1">
                        <Quote size={12} className="text-gray-400 rotate-180" /> {inst.position?.title || "Reviewer"}
                      </p>
                    </div>
                  </div>

                  {/* Skills / Key Highlights Tags */}
                  {inst.items && inst.items.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                      {inst.items.slice(0, 4).map((item, i) => (
                        <span key={`testimonial-skill-mob-${i}`} className="bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900/30 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                          {item}
                        </span>
                      ))}
                      {inst.items.length > 4 && (
                        <span className="text-[10px] text-gray-400 font-bold self-center">+{inst.items.length - 4} More</span>
                      )}
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="flex gap-2 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                    <Button
                      variant="ghost"
                      onClick={() => handleEdit(inst)}
                      className="flex-1 h-9 rounded-xl bg-yellow-500/5 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <Pencil size={13} className="mr-1.5" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      disabled={deleteMutation.isPending}
                      onClick={() => handleDelete(inst.id)}
                      className="flex-1 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <Trash2 size={13} className="mr-1.5" /> Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── 🖥️ Desktop Modern Grid Table (Hidden on Mobile) ── */}
          <div className="hidden md:block bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800 font-bold">
                  <tr>
                    <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">User Profile</th>
                    <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">Name</th>
                    <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">Position / Bio</th>
                    <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">Highlights</th>
                    <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {testimonials.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <EmptyStateView />
                      </td>
                    </tr>
                  ) : (
                    testimonials.map((inst, index) => (
                      <tr key={inst.id || `testimonial-row-${index}`} className="hover:bg-gray-50/40 dark:hover:bg-gray-800/20 transition-all group">
                        <td className="p-5">
                          {inst.image ? (
                            <img src={inst.image} alt={inst.name} className="w-11 h-11 rounded-xl object-cover border border-gray-100 dark:border-gray-800 shadow-xs group-hover:scale-105 transition-transform" />
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-900/50 flex items-center justify-center text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase">
                              {inst.name?.charAt(0)}
                            </div>
                          )}
                        </td>
                        <td className="p-5">
                          <p className="font-bold text-gray-800 dark:text-gray-100 tracking-tight flex items-center gap-1">
                            {inst.name} <BadgeCheck size={14} className="text-cyan-500 fill-cyan-500/10" />
                          </p>
                        </td>
                        <td className="p-5 text-gray-600 dark:text-gray-400 font-semibold">
                          {inst.position?.title || "N/A"}
                        </td>
                        <td className="p-5">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {inst.items?.slice(0, 3).map((item, i) => (
                              <span key={`testimonial-skill-dsktp-${i}`} className="bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900/30 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                {item}
                              </span>
                            ))}
                            {inst.items?.length > 3 && (
                              <span className="text-[10px] text-gray-400 font-bold self-center">+{inst.items.length - 3} more</span>
                            )}
                          </div>
                        </td>
                        <td className="p-5 text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEdit(inst)}
                              className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
                              title="Edit Testimonial"
                            >
                              <Pencil size={15} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              disabled={deleteMutation.isPending}
                              onClick={() => handleDelete(inst.id)}
                              className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all hover:scale-110"
                              title="Delete Testimonial"
                            >
                              <Trash2 size={15} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function EmptyStateView() {
  return (
    <div className="text-center py-20 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl text-gray-400 dark:text-gray-600 italic shadow-xs w-full">
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl">📭</span>
        <p className="text-sm font-semibold tracking-wide uppercase mt-2">No testimonials found</p>
        <p className="text-xs text-gray-400 not-italic">Click "Add Testimonial" to showcase real-time user experiences.</p>
      </div>
    </div>
  );
}
