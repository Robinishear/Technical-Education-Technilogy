"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IUserProfile } from "./profile.types";
import { updateMyProfileAction } from "./-actions";

export const ProfileUpdateForm = ({ user, onClose }: { user: IUserProfile; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user.name ?? "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await updateMyProfileAction(form);
      if (result.success) {
        toast.success("Profile updated successfully!");
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong");
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
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" disabled={loading} className="flex-1">
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