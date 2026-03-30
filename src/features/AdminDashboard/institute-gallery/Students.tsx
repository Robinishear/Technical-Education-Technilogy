/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadToCloudinary } from '@/core/upload-image-function/upload.service';

interface Instructor {
  id: string;
  name: string;
  image: string;
  position: { title: string };
  items: string[];
}

interface FormData {
  name: string;
  image: string;
  positionTitle: string;
  itemsRaw: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/successStudents`;

// API functions
const fetchsuccessStudents = async (): Promise<Instructor[]> => {
  const res = await axios.get(API_URL);
  return res.data.data || [];
};

const createInstructor = async (payload: object) => {
  return axios.post(`${API_URL}/create`, payload);
};

const updateInstructor = async ({ id, payload }: { id: string; payload: object }) => {
  return axios.put(`${API_URL}/${id}`, payload);
};

const deleteInstructor = async (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};

const InstructorManagement: React.FC = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    image: '',
    positionTitle: '',
    itemsRaw: ''
  });
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  //  React Query - Fetch
  const { data: successStudents = [], isLoading, isError } = useQuery({
    queryKey: ['successStudents'],
    queryFn: fetchsuccessStudents,
  });

  //  React Query - Create
  const createMutation = useMutation({
    mutationFn: createInstructor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['successStudents'] });
      resetForm();
    },
    onError: () => alert("Error creating instructor!"),
  });

  //  React Query - Update
  const updateMutation = useMutation({
    mutationFn: updateInstructor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['successStudents'] });
      resetForm();
    },
    onError: () => alert("Error updating instructor!"),
  });

  //  React Query - Delete
  const deleteMutation = useMutation({
    mutationFn: deleteInstructor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['successStudents'] });
    },
    onError: () => alert("Error deleting instructor!"),
  });

  const resetForm = useCallback(() => {
    setFormData({ name: '', image: '', positionTitle: '', itemsRaw: '' });
    setImageFile(null);
    setImagePreview('');
    setIsEditing(null);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image;

    if (imageFile) {
      setUploading(true);
      const uploadedUrl = await uploadToCloudinary(imageFile);
      setUploading(false);

      if (!uploadedUrl) {
        alert("Image upload failed! Please try again.");
        return;
      }
      imageUrl = uploadedUrl;
    }

    const payload = {
      name: formData.name,
      image: imageUrl,
      position: { title: formData.positionTitle },
      items: formData.itemsRaw.split(',').map(item => item.trim()).filter(Boolean)
    };

    if (isEditing) {
      updateMutation.mutate({ id: isEditing, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this instructor?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (inst: Instructor) => {
    setIsEditing(inst.id);
    setFormData({
      name: inst.name,
      image: inst.image,
      positionTitle: inst.position?.title || '',
      itemsRaw: inst.items?.join(', ') || ''
    });
    setImagePreview(inst.image);
    setImageFile(null);
  };

  const isMutating = createMutation.isPending || updateMutation.isPending || uploading;

  return (
    <div className="p-8 shadow-sm rounded-2xl min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-cyan-400">Student Success Hub
</h1>

      {/* Form */}
      <div className="border border-gray-300 dark:border-gray-600 p-6 rounded-xl mb-8 space-y-4">
  {/* Name */}
  <input
    className="w-full p-2 border rounded text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    placeholder="Name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  />

  {/* Image Upload */}
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Profile Image
    </label>

    {imagePreview && (
      <img
        src={imagePreview}
        alt="Preview"
        className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400"
      />
    )}

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="w-full p-2 border rounded cursor-pointer text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    />

    {uploading && (
      <p className="text-cyan-400 text-sm animate-pulse">
        ⏳ Uploading image to Cloudinary...
      </p>
    )}
  </div>

  {/* Designation */}
  <input
    className="w-full p-2 border rounded text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    placeholder="Designation"
    value={formData.positionTitle}
    onChange={(e) => setFormData({ ...formData, positionTitle: e.target.value })}
  />

  {/* Skills */}
  <textarea
    className="w-full p-2 border rounded text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    placeholder="Skills (comma separated)"
    value={formData.itemsRaw}
    onChange={(e) => setFormData({ ...formData, itemsRaw: e.target.value })}
  />

  {/* Buttons */}
  <div className="flex gap-4">
    <button
      onClick={handleSubmit}
      disabled={isMutating}
      className="bg-cyan-600 px-6 py-2 rounded font-bold text-white disabled:opacity-50 hover:bg-cyan-500 transition-colors"
    >
      {uploading ? 'Uploading...' : isMutating ? 'Saving...' : isEditing ? 'UPDATE' : 'ADD'}
    </button>

    {isEditing && (
      <button
        onClick={resetForm}
        className="bg-gray-600 px-6 py-2 rounded font-bold text-white hover:bg-gray-500 transition-colors"
      >
        CANCEL
      </button>
    )}
  </div>
</div>

      {/* Table */}
      {isLoading ? (
        <p className="text-center text-cyan-400 animate-pulse">Loading successStudents...</p>
      ) : isError ? (
        <p className="text-center text-red-400">Failed to load successStudents.</p>
      ) : (
      <table className="w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
  <thead>
    <tr className="border-b border-gray-300 dark:border-gray-700">
      <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">Image</th>
      <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">Name</th>
      <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">Position</th>
      <th className="p-4 text-left font-medium text-gray-800 dark:text-gray-200">Actions</th>
    </tr>
  </thead>

  <tbody>
    {successStudents.length === 0 ? (
      <tr>
        <td colSpan={4} className="p-6 text-center text-gray-600 dark:text-gray-400">
          No success students found.
        </td>
      </tr>
    ) : (
      successStudents.map((inst) => (
        <tr
          key={inst.id}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          {/* Image */}
          <td className="p-4">
            {inst.image ? (
              <img
                src={inst.image}
                alt={inst.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs border border-gray-400 text-gray-500 dark:text-gray-400">
                N/A
              </div>
            )}
          </td>

          {/* Name */}
          <td className="p-4 text-gray-700 dark:text-gray-300">
            {inst.name}
          </td>

          {/* Position */}
          <td className="p-4 text-gray-600 dark:text-gray-400">
            {inst.position?.title || "N/A"}
          </td>

          {/* Actions */}
          <td className="p-4">
            <button
              onClick={() => handleEdit(inst)}
              className="text-yellow-500 mr-4 font-medium hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(inst.id)}
              disabled={deleteMutation.isPending}
              className="text-red-500 font-medium hover:underline disabled:opacity-50"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
     </table>
      )}
    </div>
  );
};

export default InstructorManagement;