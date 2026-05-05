/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
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
      await showError("Failed to delete the course!");
    }
  };

  const handleCourseModalClose = () => {
    setIsCourseModalOpen(false);
    setEditingCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="p-4 sm:p-8 max-w-350 mx-auto space-y-6">

        {/* ── Top Header (Responsive Flex) ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              📚 Course <span className="text-blue-600 dark:text-blue-400">Management</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Create, update and manage your courses easily.</p>
          </div>
          
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex-1 sm:flex-none bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 px-5 py-2.5 rounded-xl font-bold transition-all hover:bg-green-600 hover:text-white dark:hover:bg-green-600 flex items-center justify-center gap-2 text-sm"
            >
              🗂️ Categories
            </button>
            <button
              onClick={() => {
                setEditingCourse(null);
                setIsCourseModalOpen(true);
              }}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 text-sm active:scale-95"
            >
              ➕ Add Course
            </button>
          </div>
        </div>

        {/* ── Modals ── */}
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

        {/* ── Course Table (Responsive Scroll) ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-225">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="p-5 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Thumbnail</th>
                  <th className="p-5 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Course Title</th>
                  <th className="p-5 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Instructor</th>
                  <th className="p-5 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Stats</th>
                  <th className="p-5 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Price</th>
                  <th className="p-5 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Category</th>
                  <th className="p-5 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800 transition-colors">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group">
                      <td className="p-5">
                        <img
                          src={course.thumbnail}
                          alt=""
                          className="w-20 h-12 object-cover rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform"
                        />
                      </td>
                      <td className="p-5">
                        <p className="font-bold text-gray-800 dark:text-gray-100 max-w-50 truncate leading-tight">
                          {course.title}
                        </p>
                      </td>
                      <td className="p-5 text-gray-600 dark:text-gray-400 font-medium">
                        {course.instructor}
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">{course.totalReviews} Reviews</span>
                          <span className="w-fit bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 border border-yellow-200 dark:border-yellow-900/50 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">
                            ⭐ {Number(course.rating).toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="text-gray-900 dark:text-gray-100 font-black">৳{Number(course.price)}</span>
                          {course.oldPrice && (
                            <span className="text-gray-400 dark:text-gray-600 line-through text-[10px]">
                              ৳{Number(course.oldPrice)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-3 py-1 rounded-full text-[11px] font-bold">
                          {course.category?.name ?? "General"}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 dark:hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white border border-blue-100 dark:border-blue-900/50 p-2 rounded-xl transition-all"
                            title="Edit Course"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="bg-red-50 dark:bg-red-900/20 hover:bg-red-600 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white border border-red-100 dark:border-red-900/50 p-2 rounded-xl transition-all"
                            title="Delete Course"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center p-20 text-gray-400 dark:text-gray-600 italic">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">📭</span>
                        <p className="text-sm">No courses found. Click "Add Course" to start.</p>
                      </div>
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