"use client";

import React from "react";

const enrollment = {
  id: "clx123abc456",
  courseId: "course_001",
  course: {
    id: "course_001",
    title: "Full Stack Web Development",
    price: 4999,
  },
  studentName: "Robin Islam",
  email: "robin@gmail.com",
  phone: "01700000000",
  courseTitle: "Full Stack Web Development",
  coursePrice: 4999,
  paymentStatus: "SUCCESS",
  paymentMethod: "BKASH",
  transactionId: "TXN123456789",
  status: "ACTIVE",
  enrolledAt: "2026-04-01T10:00:00.000Z",
  updatedAt: "2026-04-01T10:05:00.000Z",
};

export default function EnrollmentPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enrollment Details</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium {
            enrollment.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200"
          }`}>
            {enrollment.status}
          </span>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-xl">
            <h2 className="font-semibold mb-2">Student Info</h2>
            <p><strong>Name:</strong> {enrollment.studentName}</p>
            <p><strong>Email:</strong> {enrollment.email}</p>
            <p><strong>Phone:</strong> {enrollment.phone}</p>
          </div>

          {/* Course Info */}
          <div className="p-4 border rounded-xl">
            <h2 className="font-semibold mb-2">Course Info</h2>
            <p><strong>Title:</strong> {enrollment.courseTitle}</p>
            <p><strong>Price:</strong> ৳{enrollment.coursePrice}</p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="p-4 border rounded-xl">
          <h2 className="font-semibold mb-2">Payment Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p><strong>Status:</strong> {enrollment.paymentStatus}</p>
            <p><strong>Method:</strong> {enrollment.paymentMethod}</p>
            <p><strong>Transaction ID:</strong> {enrollment.transactionId}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="p-4 border rounded-xl">
          <h2 className="font-semibold mb-2">Timeline</h2>
          <p><strong>Enrolled At:</strong> {new Date(enrollment.enrolledAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(enrollment.updatedAt).toLocaleString()}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Download Receipt
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
