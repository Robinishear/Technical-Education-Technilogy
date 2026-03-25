/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

export default function Student() {
  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    picture: null, // file
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    passport: "",
    guardianPhone: "",
    studentAddress: "",
    district: "",
    thana: "",
    duration: "",
    year1: "",
    month1: "",
    year2: "",
    month2: "",
    educationQualification: "",
    institute: "",
    directorName: "",
    issueDate: "",
    expireDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, picture: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key] !== null) formData.append(key, form[key]);
      }

      const res = await fetch("http://localhost:5000/api/v1/students", {
        method: "POST",
        body: formData, // multipart/form-data
      });

      const data = await res.json();
      console.log(data);
      alert("✅ Student Added Successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="name" placeholder="Name" required onChange={handleChange} className="input" />
        <input name="email" placeholder="Email" required onChange={handleChange} className="input" />
        <input type="file" accept="image/*" onChange={handleFileChange} className="input" />

        <input name="fatherName" placeholder="Father Name" onChange={handleChange} className="input" />
        <input name="motherName" placeholder="Mother Name" onChange={handleChange} className="input" />

        <input type="date" name="dob" onChange={handleChange} className="input" />
        <select name="gender" onChange={handleChange} className="input">
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input name="passport" placeholder="Passport" onChange={handleChange} className="input" />
        <input name="guardianPhone" placeholder="Guardian Phone" onChange={handleChange} className="input" />

        <input name="studentAddress" placeholder="Address" onChange={handleChange} className="input" />
        <input name="district" placeholder="District" onChange={handleChange} className="input" />
        <input name="thana" placeholder="Thana" onChange={handleChange} className="input" />

        <input name="duration" placeholder="Duration" onChange={handleChange} className="input" />
        <input name="year1" placeholder="Year 1" onChange={handleChange} className="input" />
        <input name="month1" placeholder="Month 1" onChange={handleChange} className="input" />
        <input name="year2" placeholder="Year 2" onChange={handleChange} className="input" />
        <input name="month2" placeholder="Month 2" onChange={handleChange} className="input" />

        <input name="educationQualification" placeholder="Qualification" onChange={handleChange} className="input" />
        <input name="institute" placeholder="Institute" onChange={handleChange} className="input" />
        <input name="directorName" placeholder="Director Name" onChange={handleChange} className="input" />

        <input type="date" name="issueDate" onChange={handleChange} className="input" />
        <input type="date" name="expireDate" onChange={handleChange} className="input" />

        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}