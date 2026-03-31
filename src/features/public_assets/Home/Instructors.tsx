"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface Teacher {
  id: string;
  name: string;
  image: string;
  position?: {
    role?: string;
    title?: string;
  };
  items?: {
    title?: string;
    feedback?: string;
  }[];
  bio?: string;
}

export default function Instructors() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/instructors`);
        const data = await res.json();
        setTeachers(data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <section className="py-20 font-sans overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 uppercase">
            OUR <span className="text-[#678E1A]">TEACHERS</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded border border-gray-200 dark:border-gray-700"
              />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={25}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-20 pt-10 teachers-swiper"
          >
            {teachers.map((teacher) => (
              <SwiperSlide
                key={teacher.id}
                className="border border-gray-200 dark:border-gray-700 rounded-md p-3 flex flex-col min-h-95"
              >
                <div className="flex flex-col flex-1">
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden rounded-md">
                    <Image
                      src={teacher.image || "/placeholder.png"}
                      alt={teacher.name || "Teacher"}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-md font-bold text-gray-800 dark:text-gray-200">
                      {teacher.name}
                    </h3>

                    <p className="text-[#678E1A] text-[10px] font-bold uppercase mb-3 line-clamp-2">
                      {teacher.position?.role ||
                        teacher.position?.title ||
                        "Instructor"}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3 overflow-hidden flex-1">
                      {teacher.items?.map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded italic text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        >
                          {item.title || item.feedback || "Skill"}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTeacher(teacher)}
                      className="mt-auto bg-[#678E1A] hover:bg-[#678E1A]/90 text-white px-4 py-2 rounded font-semibold text-xs transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Modal */}
      {activeTeacher && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
              onClick={() => setActiveTeacher(null)}
            >
              ✕
            </button>

            <div className="mb-4 relative aspect-4/3">
              <Image
                src={activeTeacher.image || "/placeholder.png"}
                alt={activeTeacher.name}
                fill
                className="object-cover rounded-md"
                unoptimized
              />
            </div>

            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
              {activeTeacher.name}
            </h3>
            <p className="text-[#678E1A] text-[10px] font-bold uppercase mb-3">
              {activeTeacher.position?.role ||
                activeTeacher.position?.title ||
                "Instructor"}
            </p>

            {activeTeacher.items && (
              <div className="flex flex-wrap gap-2 mb-3">
                {activeTeacher.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded italic text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  >
                    {item.title || item.feedback || "Skill"}
                  </span>
                ))}
              </div>
            )}

            {activeTeacher.bio && (
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {activeTeacher.bio}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Swiper Pagination Styles */}
      <style jsx global>{`
        .teachers-swiper .swiper-pagination-bullet {
          background: #9ca3af;
        }
        .teachers-swiper .swiper-pagination-bullet-active {
          background: #678e1a !important;
          width: 30px !important;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}