/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Loader2, Eye, Phone, Hash, User,
  MapPin, BookOpen, Calendar, ShieldCheck, X,
  Trash2, Pencil, ChevronLeft, ChevronRight,
  Download,
  SquarePen,
  Fullscreen,
} from "lucide-react";
import { getAdminStudentsAction, adminDeleteStudentAction } from "./-actions";
import AdminStudentUpdateModal from "./AdminStudentUpdateModal";

import { downloadAdmitCard } from "./student-utils/downloadAdmitCard";
import { downloadRegistrationCard } from "./student-utils/downloadRegistrationCard";
import { Certificate } from "./student-utils/Certificate";
import { Meta, Student } from "./type-utils";
import MarkStudent from "./markStudent/MarkStudent";
import ViewMarks from "./markStudent/ViewMarks";


//  Mobile Card Component
const StudentMobileCard = ({ student, onView, onEdit, onDelete, isDeleting }: {
  student: Student;
  onView: (s: Student) => void;
  onEdit: (s: Student) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) => (
  <div className="bg-white border border-stone-200 p-5 rounded-2xl mb-4 md:hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      <img src={student.picture} alt="" className="h-14 w-14 rounded-xl border-2 border-stone-100 object-cover shadow" />
      <div className="flex-1">
        <h3 className="font-bold text-stone-800 leading-tight text-base">{student.name}</h3>
        <p className="text-xs text-amber-600 font-mono mt-0.5">{student.studentId}</p>
      </div>
      <div className="flex gap-1.5">
        <button className="h-9 w-9 rounded-lg bg-stone-50 hover:bg-amber-50 border border-stone-200 flex items-center justify-center transition-colors" onClick={() => onView(student)}>
          <Eye size={15} className="text-stone-600" />
        </button>
        <button className="h-9 w-9 rounded-lg bg-stone-50 hover:bg-blue-50 border border-stone-200 flex items-center justify-center transition-colors" onClick={() => onEdit(student)}>
          <Pencil size={14} className="text-blue-500" />
        </button>
        <button className="h-9 w-9 rounded-lg bg-stone-50 hover:bg-red-50 border border-stone-200 flex items-center justify-center transition-colors" onClick={() => onDelete(student.id)} disabled={isDeleting}>
          {isDeleting ? <Loader2 size={13} className="animate-spin text-red-400" /> : <Trash2 size={14} className="text-red-400" />}
        </button>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-100">
      <div className="flex items-center gap-1.5"><Hash size={11} className="text-amber-500" /> Roll: {student.roll}</div>
      <div className="flex items-center gap-1.5"><Phone size={11} className="text-amber-500" /> {student.guardianPhone}</div>
    </div>
  </div>
);

//  Full Detailed View Modal
const DetailsModal = ({ student, onClose }: { student: Student; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar relative">
      <button onClick={onClose} className="absolute top-5 right-5 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-10 text-stone-500">
        <X size={18} />
      </button>
      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-7 items-center md:items-start border-b border-stone-100 pb-8 mb-8">
          <div className="relative">
            <img src={student.picture} className="h-28 w-28 rounded-2xl object-cover ring-4 ring-amber-100 shadow-lg" alt="" />
            <div className="absolute -bottom-2 -right-2 bg-amber-500 p-1.5 rounded-lg shadow">
              <ShieldCheck className="text-white h-4 w-4" />
            </div>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-black text-stone-800 tracking-tight uppercase leading-none">{student.name}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold font-mono">ID: {student.studentId}</span>
              <span className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold font-mono">Roll: {student.roll}</span>
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold font-mono">Reg: {student.regNumber}</span>
            </div>
            <p className="text-stone-400 text-sm pt-1">{student.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-amber-600 font-black uppercase text-[10px] tracking-widest border-b border-amber-100 pb-2"><BookOpen size={13} /> Academic Profile</h4>
            <DataRow label="Institute" value={student.institute} />
            <DataRow label="Qualification" value={student.educationQualification} />
            <DataRow label="Director" value={student.directorName} />
            <DataRow label="Duration" value={student.duration} />
            <DataRow label="Session" value={`${student.month1}/${student.year1} - ${student.month2}/${student.year2}`} />
          </div>
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-blue-500 font-black uppercase text-[10px] tracking-widest border-b border-blue-100 pb-2"><User size={13} /> Personal & Family</h4>
            <DataRow label="Father's Name" value={student.fatherName} />
            <DataRow label="Mother's Name" value={student.motherName} />
            <DataRow label="Date of Birth" value={student.dob} />
            <DataRow label="Gender" value={student.gender} />
            <DataRow label="Passport/NID" value={student.passport} />
          </div>
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest border-b border-rose-100 pb-2"><MapPin size={13} /> Location & Contact</h4>
            <DataRow label="Phone" value={student.guardianPhone} highlight />
            <DataRow label="District" value={student.district} />
            <DataRow label="Thana" value={student.thana} />
            <DataRow label="Address" value={student.studentAddress} />
          </div>
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-emerald-600 font-black uppercase text-[10px] tracking-widest border-b border-emerald-100 pb-2"><Calendar size={13} /> Validity Dates</h4>
            <DataRow label="Issue Date" value={student.issueDate} />
            <DataRow label="Expire Date" value={student.expireDate} />
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">Status Note</p>
              <p className="text-xs text-stone-500 leading-relaxed mt-1">The student identity is verified for the current session.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
          {/*1 downloadAdmitCard */}
          <button
            onClick={() => downloadAdmitCard({
              studentId: student.studentId,
              name: student.name,
              fatherName: student.fatherName,
              motherName: student.motherName,
              dob: student.dob,
              month1: student.month1,
              year1: student.year1,
              month2: student.month2,
              year2: student.year2,
              roll: student.roll,
              regNumber: student.regNumber,
              gender: student.gender,
              educationQualification: student.educationQualification,
              institute: student.institute,
              photoUrl: student.picture,
            })}
            className="flex-1 h-11 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
          >
            <Download size={15} /> Download Admit Card
          </button>

          <button
            onClick={() => downloadRegistrationCard({
              studentId: student.studentId,
              name: student.name,
              fatherName: student.fatherName,
              motherName: student.motherName,
              dob: student.dob,
              month1: student.month1,
              year1: student.year1,
              month2: student.month2,
              year2: student.year2,
              roll: student.roll,
              regNumber: student.regNumber,
              gender: student.gender,
              educationQualification: student.educationQualification,
              institute: student.institute,
              photoUrl: student.picture,
            })}
            className="flex-1 h-11 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
          >
            <Download size={15} /> download Reg Card
          </button>

          <button
            onClick={() => Certificate({
              studentId: student.studentId,
              name: student.name,
              fatherName: student.fatherName,
              motherName: student.motherName,
              dob: student.dob,
              month1: student.month1,
              year1: student.year1,
              month2: student.month2,
              year2: student.year2,
              roll: student.roll,
              regNumber: student.regNumber,
              gender: student.gender,
              educationQualification: student.educationQualification,
              institute: student.institute,
            })}
            className="flex-1 h-11 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
          >
            <Download size={15} /> Certificate
          </button>
          <button
            className="flex-1 h-11 rounded-xl font-bold text-sm bg-stone-800 text-white hover:bg-stone-900 transition-colors uppercase tracking-wider"
            onClick={onClose}
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

const DataRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] text-stone-400 uppercase font-semibold tracking-wider">{label}</span>
    <span className={`text-[13px] font-medium leading-tight ${highlight ? "text-amber-600 font-bold" : "text-stone-700"}`}>
      {value || "Not Provided"}
    </span>
  </div>
);

export default function AdminStudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [markStudent, setMarkStudent] = useState<Student | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta>({ total: 0, totalPages: 1, page: 1, limit: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchRoll, setSearchRoll] = useState("");
  const [viewingStudent, setViewingStudent] = useState<any>(null);


  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      const result = await getAdminStudentsAction(currentPage, 10);
      if (result.success) {
        setStudents(Array.isArray(result.data) ? result.data : []);
        setMeta(result.meta);
      } else {
        toast.error("Failed to load students!");
      }
      setIsLoading(false);
    };
    fetchStudents();
  }, [currentPage]);

  const filteredStudents = students.filter((s) =>
    s.roll.toLowerCase().includes(searchRoll.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    setDeletingId(id);
    const result = await adminDeleteStudentAction(id);
    if (!result) {
      toast.error("Something went wrong!");
      setDeletingId(null);
      return;
    }
    if (result.success) {
      toast.success(result.message);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } else {
      toast.error(result.message);
    }
    setDeletingId(null);
  };

  const handleUpdated = (updated: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };
  const handleMarkUpdated = () => {
    setMarkStudent(null);
  };
  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
      <Loader2 className="animate-spin text-amber-500" size={44} />
      <p className="text-stone-400 font-semibold text-xs uppercase tracking-widest">Loading Records...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-stone-50 dark:bg-gray-900 min-h-screen">

      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-5">

        {/* LEFT SIDE (TITLE + COUNT) */}
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight dark:text-white text-stone-800">
            Student Directory
          </h2>

          <p className="text-stone-400 text-sm font-medium mt-2">
            {meta.total} records found
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by Roll No..."
          value={searchRoll}
          onChange={(e) => setSearchRoll(e.target.value)}
          className="border border-stone-200 rounded-xl px-4 py-2 text-sm 
    focus:outline-none focus:ring-1 focus:ring-amber-400 
    transition-all w-full md:w-64"
        />

        <div className="bg-white border dark:bg-gray-800 border-stone-200 shadow-sm px-5 py-2 rounded-xl 
  text-emerald-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
          Database Online
        </div>

      </header>

      {/* 📱 Mobile View */}
      <div className="md:hidden space-y-3">
        {filteredStudents.map((student) => (
          <StudentMobileCard
            key={student.id}
            student={student}
            onView={setSelectedStudent}
            onEdit={setEditingStudent}
            onDelete={handleDelete}
            isDeleting={deletingId === student.id}
          />
        ))}
      </div>

      {/* 🖥️ Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded border  border-gray-300 dark:bg-gray-900 shadow-sm">
        <div className="">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b dark:bg-gray-900 ">
              <tr className="text-left">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">#</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">Student</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">IDs</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">Gender</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">Phone</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-stone-400">Education</th>
                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-black text-stone-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="hover:bg-amber-50/40 transition-colors group">
                  <td className="px-6 py-4 text-stone-400 text-xs font-mono">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="px-1 py-4">
                    <div className="flex items-center gap-2">
                      <img src={student.picture} className="h-10 w-10 rounded-xl border border-gray-600 object-cover shadow-sm" alt="" />
                      <div>
                        <p className="font-bold text-stone-800 dark:text-white group-hover:text-amber-600 transition-colors text-sm">{student.name}</p>
                        <p className="text-[11px] text-stone-400 truncate w-32">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    <p className="text-amber-600 font-bold text-xs">{student.studentId}</p>
                    <p className="text-[11px] text-stone-400">Roll: {student.roll}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-stone-100 text-stone-600 border border-stone-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">
                      {student.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-600 text-xs">
                    <div className="flex items-center gap-1">
                      <Phone size={11} className="text-amber-500" /> {student.guardianPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-stone-700 text-xs truncate w-36">{student.educationQualification}</p>
                    <p className="text-[10px] text-emerald-500 font-mono uppercase mt-0.5">{student.duration}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1.5">
                      <button
                        className="h-8 w-8 rounded-lg bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-200 flex items-center justify-center transition-colors"
                        onClick={() => setSelectedStudent(student)}
                        title="View"
                      >
                        <Eye size={14} className="text-stone-500 group-hover:text-amber-500" />
                      </button>
                      {/* Edit data */}
                      <button
                        className="h-8 w-8 rounded-lg bg-stone-50 hover:bg-blue-50 border border-stone-200 hover:border-blue-200 flex items-center justify-center transition-colors"
                        onClick={() => setEditingStudent(student)}
                        title="Edit"
                      >
                        <Pencil size={13} className="text-blue-400" />
                      </button>
                      {/* Edit Mark */}
                      <button
                        className="h-8 w-8 rounded-lg bg-stone-50 hover:bg-blue-50 border border-stone-200 hover:border-blue-200 flex items-center justify-center transition-colors"
                        onClick={() => setMarkStudent(student)}
                        title="Edit"
                      >
                        <SquarePen size={13} className="text-blue-400" />
                      </button>
                      <button className="h-8 w-8 rounded-lg bg-stone-50 hover:bg-blue-50 border border-stone-200 hover:border-blue-200 flex items-center justify-center transition-colors"
                        onClick={() => setViewingStudent(student)}>
                        <Fullscreen size={13} />
                      </button>
                      <button
                        className="h-8 w-8 rounded-lg bg-stone-50 hover:bg-red-50 border border-stone-200 hover:border-red-200 flex items-center justify-center transition-colors"
                        onClick={() => handleDelete(student.id)}
                        disabled={deletingId === student.id}
                        title="Delete"
                      >
                        {deletingId === student.id
                          ? <Loader2 size={13} className="animate-spin text-red-400" />
                          : <Trash2 size={13} className="text-red-400" />
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-xs text-stone-400 font-medium">
          Page {meta.page} of {meta.totalPages}
        </p>
        <div className="flex gap-1.5">
          <button
            className="h-8 w-8 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:bg-stone-50 disabled:opacity-40 transition-colors"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={15} />
          </button>
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`h-8 w-8 rounded-lg text-xs font-bold border transition-colors ${currentPage === page
                  ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                  : "bg-white text-stone-500 border-stone-200 hover:bg-stone-50"
                }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="h-8 w-8 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:bg-stone-50 disabled:opacity-40 transition-colors"
            onClick={() => setCurrentPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={currentPage === meta.totalPages}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* View Modal */}
      {selectedStudent && <DetailsModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}

      {/* Update Modal */}
      {editingStudent && (
        <AdminStudentUpdateModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdated={handleUpdated}
        />
      )};

      {markStudent && (
        <MarkStudent
          student={markStudent}
          studentId={markStudent.id}

          onClose={() => setMarkStudent(null)}
          onUpdated={handleMarkUpdated}
        />
      )};
      {viewingStudent && (
        <ViewMarks
          studentId={viewingStudent.id}
          student={viewingStudent}
          onClose={() => setViewingStudent(null)}
        />
      )}
    </div>
  );
}