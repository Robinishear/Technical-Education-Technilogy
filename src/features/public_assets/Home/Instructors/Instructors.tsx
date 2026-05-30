"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { Teacher } from "./types";

export default function Instructors() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/instructors`,
        );
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

  if (!loading && !teachers.length) return null;

  return (
    <section className="py-12 font-sans overflow-hidden dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 uppercase">
            OUR <span className="text-[#678E1A]">TEACHERS</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-lg border border-gray-200 dark:border-gray-700"
              />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="teachers-swiper items-stretch!"
          >
            {teachers.map((teacher) => (
              <SwiperSlide key={teacher.id} className="h-auto!">
                <div className="h-full bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 overflow-hidden flex flex-col">
                  <div className="w-full h-80 overflow-hidden">
                    <Image
                      src={teacher.image || "/placeholder.png"}
                      alt={teacher.name || "Teacher"}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover object-top"
                      unoptimized
                    />
                  </div>

                  <div className="px-4 py-3 flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
                      {teacher.name}
                    </h3>
                    <p className="text-[#678E1A] text-[10px] font-bold uppercase line-clamp-1">
                      {teacher.position?.role ||
                        teacher.position?.title ||
                        "Instructor"}
                    </p>
                    <button
                      onClick={() => setActiveTeacher(teacher)}
                      className="mt-2 w-full bg-[#678E1A] hover:bg-[#678E1A]/90 text-white py-1.5 rounded text-[10px] font-bold uppercase tracking-wide transition"
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

      {activeTeacher && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
          onClick={() => setActiveTeacher(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full max-h-[85vh] overflow-y-auto relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black dark:hover:text-white transition text-lg"
              onClick={() => setActiveTeacher(null)}
            >
              ✕
            </button>

            <div className="w-full h-80 overflow-hidden rounded-lg mb-4">
              <Image
                src={activeTeacher.image || "/placeholder.png"}
                alt={activeTeacher.name}
                width={400}
                height={320}
                className="w-full h-full object-cover object-top"
                unoptimized
              />
            </div>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
              {activeTeacher.name}
            </h3>
            <p className="text-[#678E1A] text-[10px] font-bold uppercase mb-3">
              {activeTeacher.position?.role ||
                activeTeacher.position?.title ||
                "Instructor"}
            </p>
            {activeTeacher.items && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {activeTeacher.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded italic text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600"
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            )}
            {activeTeacher.bio && (
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {activeTeacher.bio}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
