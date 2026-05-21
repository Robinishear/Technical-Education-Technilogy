/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Eye,
  Phone,
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  SquarePen,
  Fullscreen,
  MoreHorizontal,
  X,
} from "lucide-react";
import AdminStudentUpdateModal from "./AdminStudentUpdateModal";
import { Meta, Student } from "../types/admin-students.types";
import {
  adminDeleteStudentAction,
  getAdminStudentsAction,
  toggleExamAllowedAction,
} from "../actions/admin-students.actions";
import MarkStudent from "../../markStudent/components/MarkStudent";
import ViewMarks from "../../markStudent/components/ViewMarks";
import DetailsModal from "./DetailsModal";

// ─── Mobile Card ─────────────────────────────────────────────────────────────
const StudentMobileCard = ({
  student,
  onView,
  onEdit,
  onDelete,
  onMark,
  onFullscreen,
  onToggleExam,
  isDeleting,
  isToggling,
}: {
  student: Student;
  onView: (s: Student) => void;
  onEdit: (s: Student) => void;
  onDelete: (id: string) => void;
  onMark: (s: Student) => void;
  onFullscreen: (s: Student) => void;
  onToggleExam: (id: string) => void;
  isDeleting: boolean;
  isToggling: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-black border border-stone-200 dark:border-stone-800 p-4 rounded-2xl mb-3 md:hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Top Row */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={student.picture}
          alt=""
          className="h-12 w-12 rounded-xl border border-stone-100 dark:border-stone-700 object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-stone-800 dark:text-white text-sm leading-tight truncate">
            {student.name}
          </h3>
          <p className="text-[11px] text-amber-600 font-mono mt-0.5">
            {student.studentId}
          </p>
        </div>
        {/* Always visible: View + More */}
        <div className="flex gap-1.5">
          <button
            className="h-8 w-8 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-amber-50 dark:hover:bg-amber-950 border border-stone-200 dark:border-stone-700 flex items-center justify-center transition-colors"
            onClick={() => onView(student)}
          >
            <Eye size={14} className="text-stone-500 dark:text-stone-400" />
          </button>
          <button
            className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-colors ${
              expanded
                ? "bg-stone-200 dark:bg-stone-700 border-stone-300 dark:border-stone-600"
                : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded ? (
              <X size={13} className="text-stone-600 dark:text-stone-300" />
            ) : (
              <MoreHorizontal
                size={14}
                className="text-stone-500 dark:text-stone-400"
              />
            )}
          </button>
        </div>
      </div>

      {/* Meta pills */}
      <div className="flex flex-wrap gap-2 text-[11px] text-stone-500 dark:text-stone-400">
        <span className="flex items-center gap-1 bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 px-2.5 py-1 rounded-full">
          <Phone size={10} className="text-amber-500" /> Roll: {student.roll}
        </span>
        <span className="flex items-center gap-1 bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 px-2.5 py-1 rounded-full">
          <Phone size={10} className="text-amber-500" /> {student.guardianPhone}
        </span>
      </div>

      {/* Expanded actions */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-2">
          <button
            className={`flex items-center gap-1.5 h-8 px-3 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-colors ${
              student.examAllowed
                ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500"
            }`}
            onClick={() => onToggleExam(student.id)}
            disabled={isToggling}
          >
            {isToggling ? (
              <Loader2 size={11} className="animate-spin" />
            ) : student.examAllowed ? (
              "✅ Exam On"
            ) : (
              "❌ Exam Off"
            )}
          </button>

          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-blue-50 dark:hover:bg-blue-950 border border-stone-200 dark:border-stone-700 text-[10px] font-bold uppercase tracking-wider text-blue-500 transition-colors"
            onClick={() => onEdit(student)}
          >
            <Pencil size={11} /> Edit
          </button>

          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-blue-50 dark:hover:bg-blue-950 border border-stone-200 dark:border-stone-700 text-[10px] font-bold uppercase tracking-wider text-blue-500 transition-colors"
            onClick={() => onMark(student)}
          >
            <SquarePen size={11} /> Mark
          </button>

          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-blue-50 dark:hover:bg-blue-950 border border-stone-200 dark:border-stone-700 text-[10px] font-bold uppercase tracking-wider text-blue-500 transition-colors"
            onClick={() => onFullscreen(student)}
          >
            <Fullscreen size={11} /> Marks
          </button>

          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-red-50 dark:hover:bg-red-950 border border-stone-200 dark:border-stone-700 text-[10px] font-bold uppercase tracking-wider text-red-400 transition-colors"
            onClick={() => onDelete(student.id)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 size={11} className="animate-spin" />
            ) : (
              <>
                <Trash2 size={11} /> Delete
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminStudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [markStudent, setMarkStudent] = useState<Student | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    totalPages: 1,
    page: 1,
    limit: 10,
  });
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
    s.roll.toLowerCase().includes(searchRoll.toLowerCase()),
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

  const handleToggleExam = async (id: string) => {
    setTogglingId(id);
    const result = await toggleExamAllowedAction(id);
    if (result.success) {
      toast.success("Updated!");
      setStudents((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, examAllowed: !s.examAllowed } : s,
        ),
      );
    } else {
      toast.error(result.message || "Failed!");
    }
    setTogglingId(null);
  };

  const toggleActions = (id: string) => {
    setOpenActionId((prev) => (prev === id ? null : id));
  };

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-3 bg-white dark:bg-black">
        <Loader2 className="animate-spin text-amber-500" size={40} />
        <p className="text-stone-400 font-semibold text-xs uppercase tracking-widest">
          Loading Records...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-stone-50 dark:bg-black min-h-screen">
      {/* ── Header ── */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-stone-800 dark:text-white">
            Student Directory
          </h2>
          <p className="text-stone-400 text-sm font-medium mt-1">
            {meta.total} records found
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by Roll No..."
          value={searchRoll}
          onChange={(e) => setSearchRoll(e.target.value)}
          className="border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-white placeholder:text-stone-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all w-full md:w-64"
        />

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm px-5 py-2 rounded-xl text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          Database Online
        </div>
      </header>

      {/* ── Mobile Cards ── */}
      <div className="md:hidden">
        {filteredStudents.map((student) => (
          <StudentMobileCard
            key={student.id}
            student={student}
            onView={setSelectedStudent}
            onEdit={setEditingStudent}
            onDelete={handleDelete}
            onMark={setMarkStudent}
            onFullscreen={setViewingStudent}
            onToggleExam={handleToggleExam}
            isDeleting={deletingId === student.id}
            isToggling={togglingId === student.id}
          />
        ))}
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm bg-white dark:bg-black">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 dark:bg-stone-900">
            <tr>
              {["#", "Student", "IDs", "Phone", "Education", "Actions"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-3.5 text-[10px] uppercase tracking-widest font-black text-stone-400 dark:text-stone-500 ${
                      i === 5 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {filteredStudents.map((student, index) => (
              <tr
                key={student.id}
                className="transition-colors group hover:bg-stone-50 dark:hover:bg-stone-900"
              >
                {/* # */}
                <td className="px-5 py-3.5 text-stone-400 dark:text-stone-600 text-xs font-mono">
                  {(currentPage - 1) * 10 + index + 1}
                </td>

                {/* Student */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.picture}
                      className="h-9 w-9 rounded-xl border border-stone-200 dark:border-stone-700 object-cover"
                      alt=""
                    />
                    <div>
                      <p className="font-bold text-stone-800 dark:text-white group-hover:text-amber-600 transition-colors text-sm">
                        {student.name}
                      </p>
                      <p className="text-[11px] text-stone-400 dark:text-stone-500 truncate w-32">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* IDs */}
                <td className="px-5 py-3.5 font-mono">
                  <p className="text-amber-600 font-bold text-xs">
                    {student.studentId}
                  </p>
                  <p className="text-[11px] text-stone-400 dark:text-stone-500">
                    Roll: {student.roll}
                  </p>
                </td>

                {/* Phone */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 text-xs">
                    <Phone size={11} className="text-amber-500" />
                    {student.guardianPhone}
                  </div>
                </td>

                {/* Education */}
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-stone-700 dark:text-stone-300 text-xs truncate w-36">
                    {student.educationQualification}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-mono uppercase mt-0.5">
                    {student.duration}
                  </p>
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Exam toggle — always visible */}
                    <button
                      className={`h-8 px-3 rounded-lg border flex items-center justify-center transition-colors text-[10px] font-bold uppercase tracking-wider ${
                        student.examAllowed
                          ? "bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                          : "bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500"
                      }`}
                      onClick={() => handleToggleExam(student.id)}
                      disabled={togglingId === student.id}
                      title={
                        student.examAllowed
                          ? "Exam Allowed"
                          : "Exam Not Allowed"
                      }
                    >
                      {togglingId === student.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : student.examAllowed ? (
                        "✅"
                      ) : (
                        "❌"
                      )}
                    </button>

                    {/* View — always visible */}
                    <button
                      className="h-8 w-8 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-amber-50 dark:hover:bg-amber-950 border border-stone-200 dark:border-stone-700 hover:border-amber-200 flex items-center justify-center transition-colors"
                      onClick={() => setSelectedStudent(student)}
                      title="View"
                    >
                      <Eye
                        size={14}
                        className="text-stone-500 dark:text-stone-400"
                      />
                    </button>

                    {/* Extra actions — slide in when open */}
                    {openActionId === student.id && (
                      <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2 duration-150">
                        <button
                          className="h-8 w-8 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-blue-50 dark:hover:bg-blue-950 border border-stone-200 dark:border-stone-700 hover:border-blue-200 flex items-center justify-center transition-colors"
                          onClick={() => setEditingStudent(student)}
                          title="Edit"
                        >
                          <Pencil size={13} className="text-blue-400" />
                        </button>

                        <button
                          className="h-8 w-8 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-blue-50 dark:hover:bg-blue-950 border border-stone-200 dark:border-stone-700 hover:border-blue-200 flex items-center justify-center transition-colors"
                          onClick={() => setMarkStudent(student)}
                          title="Mark"
                        >
                          <SquarePen size={13} className="text-blue-400" />
                        </button>

                        <button
                          className="h-8 w-8 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-blue-50 dark:hover:bg-blue-950 border border-stone-200 dark:border-stone-700 hover:border-blue-200 flex items-center justify-center transition-colors"
                          onClick={() => setViewingStudent(student)}
                          title="View Marks"
                        >
                          <Fullscreen size={13} className="text-blue-400" />
                        </button>

                        <button
                          className="h-8 w-8 rounded-lg bg-stone-50 dark:bg-stone-900 hover:bg-red-50 dark:hover:bg-red-950 border border-stone-200 dark:border-stone-700 hover:border-red-200 flex items-center justify-center transition-colors"
                          onClick={() => handleDelete(student.id)}
                          disabled={deletingId === student.id}
                          title="Delete"
                        >
                          {deletingId === student.id ? (
                            <Loader2
                              size={13}
                              className="animate-spin text-red-400"
                            />
                          ) : (
                            <Trash2 size={13} className="text-red-400" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* ••• toggle button — always visible */}
                    <button
                      className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-colors ${
                        openActionId === student.id
                          ? "bg-stone-200 dark:bg-stone-700 border-stone-300 dark:border-stone-600"
                          : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
                      }`}
                      onClick={() => toggleActions(student.id)}
                      title={
                        openActionId === student.id ? "Close" : "More Actions"
                      }
                    >
                      {openActionId === student.id ? (
                        <X
                          size={13}
                          className="text-stone-600 dark:text-stone-300"
                        />
                      ) : (
                        <MoreHorizontal
                          size={14}
                          className="text-stone-500 dark:text-stone-400"
                        />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-stone-400 dark:text-stone-600 text-sm"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex justify-between items-center mt-5">
        <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">
          Page {meta.page} of {meta.totalPages}
        </p>
        <div className="flex gap-1.5">
          <button
            className="h-8 w-8 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={15} />
          </button>

          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                className={`h-8 w-8 rounded-lg text-xs font-bold border transition-colors ${
                  currentPage === page
                    ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                    : "bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ),
          )}

          <button
            className="h-8 w-8 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors"
            onClick={() =>
              setCurrentPage((p) => Math.min(meta.totalPages, p + 1))
            }
            disabled={currentPage === meta.totalPages}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ── Modals ── */}
      {selectedStudent && (
        <DetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
      {editingStudent && (
        <AdminStudentUpdateModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdated={handleUpdated}
        />
      )}
      {markStudent && (
        <MarkStudent
          student={markStudent}
          studentId={markStudent.id}
          onClose={() => setMarkStudent(null)}
          onUpdated={() => setMarkStudent(null)}
        />
      )}
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
