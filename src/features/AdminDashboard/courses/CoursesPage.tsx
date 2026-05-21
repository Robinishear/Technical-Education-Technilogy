/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  Star,
  MessageSquare,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getCoursesAction,
  getCategoriesAction,
  deleteCourseAction,
} from "./actions";
import { Category, Course } from "./types";
import CourseModal from "./CourseModal";
import CategoryModal from "./CategoryModal";
import { confirmDelete, showSuccess, showError } from "@/core/utils/swal.utils";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    const data = await getCoursesAction();
    if (data) setCourses(data);
  };

  const fetchCategories = async () => {
    const data = await getCategoriesAction();
    if (data) setCategories(data);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsCourseModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;
    try {
      await deleteCourseAction(id);
      await showSuccess("Course deleted successfully! ✅");
      await fetchCourses();
    } catch {
      await showError("Failed to delete the course! ❌");
    }
  };

  const handleCourseModalClose = () => {
    setIsCourseModalOpen(false);
    setEditingCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-2xl hidden sm:block">
              <GraduationCap
                className="text-blue-600 dark:text-blue-400"
                size={28}
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight uppercase">
                Course{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Management
                </span>{" "}
                📚
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Create, update and manage your courses easily.
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex-1 sm:flex-none border-green-200 dark:border-green-900/50 bg-green-500/5 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white rounded-xl font-bold text-xs uppercase tracking-wider h-11"
            >
              <FolderKanban size={16} className="mr-2" /> Categories
            </Button>
            <Button
              onClick={() => {
                setEditingCourse(null);
                setIsCourseModalOpen(true);
              }}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider h-11 shadow-xs active:scale-95"
            >
              <Plus size={16} className="mr-1" /> Add Course
            </Button>
          </div>
        </div>

        {/* ── 🪟 Modals ── */}
        <CourseModal
          isOpen={isCourseModalOpen}
          onClose={handleCourseModalClose}
          onSuccess={fetchCourses}
          categories={categories}
          editingCourse={editingCourse}
        />

        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSuccess={fetchCategories}
          categories={categories}
        />

        {/* ── 📱 Mobile Responsive Cards Grid (Hidden on Desktop) ── */}
        <div className="block lg:hidden space-y-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl shadow-xs flex flex-col gap-4"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={course.thumbnail}
                    alt=""
                    className="w-24 h-16 sm:w-28 sm:h-20 object-cover rounded-xl border border-gray-100 dark:border-gray-800 shrink-0 shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                      {course.category?.name ?? "General"}
                    </span>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base leading-tight truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      🧑‍🏫 {course.instructor}
                    </p>
                  </div>
                </div>

                {/* Info and stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800/60 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 w-fit bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 border border-yellow-200 dark:border-yellow-900/50 px-2 py-0.5 rounded-lg text-[10px] font-black">
                      <Star
                        size={12}
                        className="fill-yellow-500 text-yellow-500"
                      />{" "}
                      {Number(course.rating).toFixed(1)}
                    </span>
                    <span className="text-gray-400 font-medium flex items-center gap-1">
                      <MessageSquare size={12} /> {course.totalReviews} Reviews
                    </span>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(course)}
                      className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white"
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(course.id)}
                      className="h-8 w-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyStateView />
          )}
        </div>

        {/* ── 🖥️ Desktop Classic Grid View (Hidden on Mobile) ── */}
        <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800 font-bold">
                <tr>
                  <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">
                    Thumbnail
                  </th>
                  <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">
                    Course Title
                  </th>
                  <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">
                    Instructor
                  </th>
                  <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">
                    Stats
                  </th>
                  <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest">
                    Category
                  </th>
                  <th className="p-5 font-black text-gray-500 uppercase text-[10px] tracking-widest text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-gray-50/40 dark:hover:bg-gray-800/20 transition-all group"
                    >
                      <td className="p-5">
                        <img
                          src={course.thumbnail}
                          alt=""
                          className="w-20 h-12 object-cover rounded-xl shadow-xs border border-gray-100 dark:border-gray-800 group-hover:scale-105 transition-transform"
                        />
                      </td>
                      <td className="p-5">
                        <p className="font-bold text-gray-800 dark:text-gray-100 max-w-xs truncate leading-tight">
                          {course.title}
                        </p>
                      </td>
                      <td className="p-5 text-gray-600 dark:text-gray-400 font-semibold">
                        {course.instructor}
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                            {course.totalReviews} Reviews
                          </span>
                          <span className="w-fit flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 border border-yellow-200 dark:border-yellow-900/50 px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                            <Star
                              size={11}
                              className="fill-yellow-500 text-yellow-500"
                            />{" "}
                            {Number(course.rating).toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                          {course.category?.name ?? "General"}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(course)}
                            className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
                            title="Edit Course"
                          >
                            <Pencil size={15} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(course.id)}
                            className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all hover:scale-110"
                            title="Delete Course"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <EmptyStateView />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* 📭 Reuseable Empty State View */
}
function EmptyStateView() {
  return (
    <div className="text-center py-20 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl text-gray-400 dark:text-gray-600 italic shadow-xs">
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl">📭</span>
        <p className="text-sm font-semibold tracking-wide uppercase mt-2">
          No courses found
        </p>
        <p className="text-xs text-gray-400 not-italic">
          Click "Add Course" to kickstart your inventory.
        </p>
      </div>
    </div>
  );
}
