/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useCourseData } from "../../Courses/useCourseData";

const GRID_LIMIT = 8;

export default function Coursess() {
  const { categories, courses, selectedCategory, setSelectedCategory } =
    useCourseData();

  if (courses.isLoading)
    return (
      <div className="text-center py-24 text-gray-600 dark:text-gray-300">
        Loading Courses... ⏳
      </div>
    );

  const allCourses = courses.data ?? [];
  const useSlider = allCourses.length > GRID_LIMIT;

  const CourseCard = ({ course }: { course: any }) => (
    <div className="group flex flex-col rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 overflow-hidden h-full shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-36 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 flex items-start p-3">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Bottom — name + button */}
      <div className="px-3 py-3 flex flex-col gap-2">
        <p className="text-gray-700 dark:text-gray-300 text-xs font-semibold line-clamp-1">
          {course.title}
        </p>
        {/* <Link href={`/courses/${course.id}`}> */}
        <Link href="/login">
          <button className="flex items-center justify-center gap-1.5 w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-[11px] uppercase tracking-wide transition-all duration-300 active:scale-95">
            <span>View Details</span>
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#070707] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white uppercase">
            Our <span className="text-cyan-500">Courses</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-xl mx-auto">
            Learn new skills from top instructors
          </p>
        </div>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedCategory === "All"
                ? "bg-cyan-500 text-white border-cyan-500"
                : "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
            }`}
          >
            All Courses
          </button>
          {categories.data?.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Courses */}
        {allCourses.length === 0 ? (
          <div className="flex flex-col items-center py-24 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
            <div className="text-5xl mb-4">📂</div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No courses found in this category.
            </p>
          </div>
        ) : (
          <>
            <div className="block sm:hidden">
              {/* Phone: always slider */}
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="pb-12 courses-swiper"
              >
                {allCourses.map((course: any) => (
                  <SwiperSlide key={course.id} className="h-auto">
                    <CourseCard course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="hidden sm:block">
              {useSlider ? (
                /* PC: 8+ হলে 2row×4col Grid Slider */
                <Swiper
                  modules={[Autoplay, Pagination, Grid]}
                  spaceBetween={16}
                  slidesPerView={4}
                  slidesPerGroup={4}
                  grid={{ rows: 2, fill: "row" }}
                  loop={false}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  className="pb-12 courses-swiper"
                >
                  {allCourses.map((course: any) => (
                    <SwiperSlide key={course.id} className="h-auto mb-4">
                      <CourseCard course={course} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allCourses.map((course: any) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        .courses-swiper .swiper-pagination-bullet {
          background: #9ca3af;
        }
        .courses-swiper .swiper-pagination-bullet-active {
          background: #06b6d4 !important;
          width: 30px !important;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
