/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Trash2, Pencil, Eye } from "lucide-react"; // Eye icon added 👁️
import { Button } from "@/components/ui/button";
import { getStudentsAction, deleteStudentAction } from "./-actions";
import StudentUpdateModal from "./StudentUpdateModal";
import { showToast } from "@/core/utils/toast-messages";

const ViewDetailsModal = ({ student, onClose }: { student: Student; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-card border border-white/10 p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-primary">Student Full Profile 👤</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <p><strong>Father&apos;s Name:</strong> {student.fatherName}</p>
          <p><strong>Mother&apos;s Name:</strong> {student.motherName}</p>
          <p><strong>Address:</strong> {student.studentAddress}</p>
          <p><strong>Thana:</strong> {student.thana}</p>
          <p><strong>Roll:</strong> {student.roll}</p>
          <p><strong>Reg Number:</strong> {student.regNumber}</p>
        </div>
        <div className="space-y-2">
          <p><strong>Institute:</strong> {student.institute}</p>
          <p><strong>Director:</strong> {student.directorName}</p>
          <p><strong>Start:</strong> {student.month1}/{student.year1}</p>
          <p><strong>End:</strong> {student.month2}/{student.year2}</p>
          <p><strong>Issue Date:</strong> {student.issueDate}</p>
          <p><strong>Expire Date:</strong> {student.expireDate}</p>
        </div>
      </div>
      <Button className="w-full mt-6" onClick={onClose}>Close</Button>
    </div>
  </div>
);

export interface Student {
  id: string; name: string; email: string; picture: string; fatherName: string;
  motherName: string; dob: string; gender: string; passport: string;
  guardianPhone: string; studentAddress: string; district: string;
  thana: string; duration: string; year1: string; month1: string;
  year2: string; month2: string; educationQualification: string;
  institute: string; directorName: string; issueDate: string;
  expireDate: string; studentId: string; roll: string; regNumber: string;
}

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
        toast.error("Failed to load students!");
      }
      setIsLoading(false);
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    setDeletingId(id);
    const result = await deleteStudentAction(id);
    if (result?.success) {
      showToast.deleted();
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } else {
      showToast.failed();
    }
    setDeletingId(null);
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-6">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
        🎓 Student Roster
      </h2>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/10 backdrop-blur-md">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-muted-foreground uppercase text-xs">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Student ID</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">District</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={student.picture} alt="" className="h-9 w-9 rounded-full ring-2 ring-primary/20" />
                    <span className="font-medium">{student.name}</span>
                  </div>
                </td>
                <td className="p-4 font-mono text-blue-400">{student.studentId}</td>
                <td className="p-4">{student.gender}</td>
                <td className="p-4">{student.district}</td>
                <td className="p-4 italic">{student.guardianPhone}</td>
                <td className="p-4 font-semibold">{student.duration}</td>

                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {/* View Details Button 👁️ */}
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400" onClick={() => setViewingStudent(student)}>
                      <Eye size={16} />
                    </Button>
                    
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-400" onClick={() => setEditingStudent(student)}>
                      <Pencil size={16} />
                    </Button>

                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400" onClick={() => handleDelete(student.id)} disabled={deletingId === student.id}>
                      {deletingId === student.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewingStudent && <ViewDetailsModal student={viewingStudent} onClose={() => setViewingStudent(null)} />}
      
      {editingStudent && (
        <StudentUpdateModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdated={(updated) => setStudents(prev => prev.map(s => s.id === updated.id ? updated : s))}
        />
      )}
    </div>
  );
}