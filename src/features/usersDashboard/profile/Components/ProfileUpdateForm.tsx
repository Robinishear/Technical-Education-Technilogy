/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IUserProfile } from "../profile.types";
import { updateMyProfileAction } from "../-actions";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/core/utils/swal.utils";

export const ProfileUpdateForm = ({ user, onClose }: { user: IUserProfile; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(user.directorPhoto ?? "");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    name: user.name ?? "",
    directorPhoto: user.directorPhoto ?? "", 
    instituteName: user.instituteName ?? "",
    directorName: user.directorName ?? "",
    gender: user.gender ?? "",
    nationality: user.nationality ?? "",
    fatherName: user.fatherName ?? "",
    motherName: user.motherName ?? "",
    fullAddress: user.fullAddress ?? "",
    village: user.village ?? "",
    postOffice: user.postOffice ?? "",
    thanaUpazila: user.thanaUpazila ?? "",
    district: user.district ?? "",
    courseName: user.courseName ?? "",
    duration: user.duration ?? "",
    startYear: user.startYear ?? "",
    startMonth: user.startMonth ?? "",
    endYear: user.endYear ?? "",
    endMonth: user.endMonth ?? "",
    educationQualification: user.educationQualification ?? "",
    instituteAge: user.instituteAge ?? "",
    religion: user.religion ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        setForm((prev) => ({ ...prev, directorPhoto: url }));
        setImagePreview(url);
      } else {
        await showError("Image upload failed!");
      }
    } catch {
      await showError("Image upload failed!");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadingImage) {
      await showError("Please wait, image is uploading...");
      return;
    }
    setLoading(true);
    try {
      const result = await updateMyProfileAction(form);
      if (result.success) {
        await showSuccess("Profile updated successfully!");
        onClose();
      } else {
        await showError(result.message || "Failed to update!");
      }
    } catch {
      await showError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Name" },
    { name: "instituteName", label: "Institute Name" },
    { name: "directorName", label: "Director Name" },
    { name: "gender", label: "Gender" },
    { name: "nationality", label: "Nationality" },
    { name: "religion", label: "Religion" },
    { name: "instituteAge", label: "Institute Age" },
    { name: "fatherName", label: "Father Name" },
    { name: "motherName", label: "Mother Name" },
    { name: "fullAddress", label: "Full Address" },
    { name: "village", label: "Village" },
    { name: "postOffice", label: "Post Office" },
    { name: "thanaUpazila", label: "Thana/Upazila" },
    { name: "district", label: "District" },
    { name: "courseName", label: "Course Name" },
    { name: "duration", label: "Duration" },
    { name: "startYear", label: "Start Year" },
    { name: "startMonth", label: "Start Month" },
    { name: "endYear", label: "End Year" },
    { name: "endMonth", label: "End Month" },
    { name: "educationQualification", label: "Education Qualification" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Profile</h2>

        <form onSubmit={handleSubmit}>

          <div className="flex items-center gap-5 p-4 bg-gray-50 dark:bg-black border border-dashed border-gray-200 rounded-xl mb-5">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-400 uppercase">
                  {user.name?.charAt(0)}
                </div>
              )}
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="text-white animate-spin" size={16} />
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Director Photo</p>
              <label className="cursor-pointer text-sm font-semibold text-primary hover:underline">
                {uploadingImage ? "Uploading..." : "Change Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={uploadingImage}
                />
              </label>
            </div>
          </div>

          {/* Other Fields */}
          <div className="grid grid-cols-2 gap-3">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="text-xs text-gray-400">{field.label}</label>
                <input
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary mt-1"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="submit" disabled={loading || uploadingImage} className="flex-1">
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};