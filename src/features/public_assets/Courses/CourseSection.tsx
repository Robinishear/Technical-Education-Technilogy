/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRight,  } from "lucide-react";
import { useCourseData } from "./useCourseData";
import Link from "next/link";

export default function CourseSection() {
  const { categories, courses, selectedCategory, setSelectedCategory } =
    useCourseData();

  if (courses.isLoading)
    return (
      <div className="text-center py-24 text-gray-600 dark:text-gray-300">
        Loading Courses... ⏳
      </div>
    );

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 dark:bg-[#070707] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Our <span className="text-cyan-500">Courses</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Learn new skills from top instructors
          </p>
        </div>

        {/* Categories */}
        <div className="mb-14 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border
              ${
                selectedCategory === "All"
                  ? "bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20"
                  : "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
          >
            All Courses
          </button>

          {categories.data?.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border
                ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20"
                    : "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
          {courses.data?.length > 0 ? (
            courses.data.map((course: any) => (
              <div
                key={course.id}
                className="group relative flex flex-col rounded-3xl bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col grow">
                  {/* Title */}
                  <h3 className="text-gray-800 dark:text-gray-100 font-bold text-lg leading-tight line-clamp-2 mb-3 group-hover:text-cyan-500 transition-colors">
                    {course.title}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                    {/* <Link href={`/courses/${course.id}`} className="flex-1"> */}
                    <Link href="/login" className="flex-1">
                      <button className="group relative flex items-center justify-center gap-2 w-full py-3 bg-gray-900 dark:bg-gray-800 text-white font-bold rounded-xl hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white transition-all duration-300 active:scale-95 overflow-hidden shadow-sm hover:shadow-cyan-500/25">
                        <span className="text-[12px] uppercase tracking-wider relative z-10">
                          Enrol Now
                        </span>
                        <ArrowRight
                          size={16}
                          className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center py-24 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
              <div className="text-5xl mb-4">📂</div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No courses found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
