/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Pencil, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteStudentAction, getStudentsAction } from "../-actions";
import { Student } from "../students.type";
import ViewDetailsModal from "./ViewDetailsModal";
import StudentUpdateModal from "./StudentUpdateModal";
import { confirmDelete, showSuccess, showError } from "@/core/utils/swal.utils";

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      const result = await getStudentsAction();
      if (result.success) {
        setStudents(Array.isArray(result.data) ? result.data : []);
      } else {
        showError("Failed to load student records.");
      }
      setIsLoading(false);
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) return;

    setDeletingId(id);
    const result = await deleteStudentAction(id);

    if (result?.success) {
      await showSuccess("Student has been deleted successfully! 🗑️");
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } else {
      showError(result?.message || "Could not delete student.");
    }
    setDeletingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 animate-pulse">
          Loading Roster...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-10 py-4 md:py-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-blue-500/10 rounded-xl sm:rounded-2xl">
            <Users className="text-blue-500" size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-800 dark:text-white">
              Student Roster
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">
              Manage your academic database
            </p>
          </div>
        </div>

        <div className="bg-blue-500/5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-blue-500/10">
          <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
            Total: {students.length} Students
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl md:rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-950 shadow-sm overflow-hidden">

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-150 text-xs sm:text-sm text-left border-collapse">

            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 uppercase text-[9px] sm:text-[10px] font-black tracking-wider">
                <th className="p-4 sm:p-6">Student Info</th>
                <th className="p-4 sm:p-6">Gender / ID</th>
                <th className="p-4 sm:p-6 hidden lg:table-cell">Location</th>
                <th className="p-4 sm:p-6 hidden md:table-cell">Phone</th>
                <th className="p-4 sm:p-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all">

                  <td className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">

                      <div className="relative">
                        {student.picture ? (
                          <img
                            src={student.picture}
                            alt=""
                            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-white/10"
                          />
                        ) : (
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            {student.name?.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="font-semibold sm:font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base truncate max-w-30 sm:max-w-none">
                          {student.name}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-bold text-blue-500 uppercase opacity-70">
                          Enrolled Student
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 sm:p-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                        {student.gender}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 truncate max-w-25">
                        ID: {student.studentId}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 sm:p-6 hidden lg:table-cell text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    {student.district}
                  </td>

                  <td className="p-4 sm:p-6 hidden md:table-cell font-mono text-[10px] sm:text-xs text-gray-500">
                    {student.guardianPhone}
                  </td>

                  <td className="p-4 sm:p-6">
                    <div className="flex justify-end gap-2 sm:gap-3">
                      <ActionBtn icon={<Eye size={16} />} color="text-blue-500 bg-blue-50 dark:bg-blue-500/10" onClick={() => setViewingStudent(student)} />
                      <ActionBtn icon={<Pencil size={16} />} color="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" onClick={() => setEditingStudent(student)} />
                      <ActionBtn
                        icon={deletingId === student.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        color="text-red-500 bg-red-50 dark:bg-red-500/10"
                        onClick={() => handleDelete(student.id)}
                        disabled={deletingId === student.id}
                      />
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {students.length === 0 && (
          <div className="py-16 sm:py-20 text-center flex flex-col items-center space-y-3">
            <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400">
              <Users size={28} />
            </div>
            <p className="font-bold text-gray-500 uppercase tracking-widest text-[10px] sm:text-xs">
              No students found
            </p>
          </div>
        )}
      </div>

      {viewingStudent && <ViewDetailsModal student={viewingStudent} onClose={() => setViewingStudent(null)} />}

      {editingStudent && (
        <StudentUpdateModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdated={(updated) => {
            setStudents((prev) =>
              prev.map((s) => (s.id === updated.id ? updated : s))
            );
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
}

function ActionBtn({ icon, color, onClick, disabled = false }: any) {
  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={disabled}
      className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 active:scale-90 ${color}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}