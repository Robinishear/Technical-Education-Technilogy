"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// 📘 Interface naming (Singular is better practice)
interface Student {
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

export default function SuccessStudents() {
  // tate variables fixed
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/successStudents`);
        const data = await res.json();
        setStudents(data?.data || []);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <section className="py-20 font-sans overflow-hidden">
      <div className="container mx-auto px-6">
        {/* 📢 Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 uppercase">
            Success <span className="text-[#678E1A]">Students</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={25}
            slidesPerView={1}
            loop={students.length > 1} // 💡 Only loop if multiple students exist
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-20 pt-10 Students-swiper"
          >
            {students.map((student) => (
              <SwiperSlide
                key={student.id}
                className="border border-gray-200 dark:border-gray-700 rounded-md p-3 flex flex-col min-h-95"
              >
                <div className="flex flex-col flex-1">
                  <div className="relative aspect-4/3 overflow-hidden rounded-md">
                    <Image
                      src={student.image || "/placeholder.png"}
                      alt={student.name || "Student"}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      unoptimized
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-md font-bold text-gray-800 dark:text-gray-200">
                      {student.name}
                    </h3>

                    <p className="text-[#678E1A] text-[10px] font-bold uppercase mb-3 line-clamp-2">
                      {student.position?.role ||
                        student.position?.title ||
                        "Instructor"}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3 overflow-hidden flex-1">
                      {student.items?.map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded italic text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        >
                          {item.title || item.feedback || "Skill"}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveStudent(student)}
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

      {activeStudent && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-500 text-xl"
              onClick={() => setActiveStudent(null)}
            >
              ✕
            </button>

            <div className="mb-4 relative aspect-4/3">
              <Image
                src={activeStudent.image || "/placeholder.png"}
                alt={activeStudent.name}
                fill
                className="object-cover rounded-md"
                unoptimized
              />
            </div>

            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
              {activeStudent.name}
            </h3>
            <p className="text-[#678E1A] text-[10px] font-bold uppercase mb-3">
              {activeStudent.position?.role ||
                activeStudent.position?.title ||
                "successStudents"}
            </p>

            {activeStudent.items && (
              <div className="flex flex-wrap gap-2 mb-3">
                {activeStudent.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded italic text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  >
                    {item.title || item.feedback || "Skill"}
                  </span>
                ))}
              </div>
            )}

            {activeStudent.bio && (
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {activeStudent.bio}
              </p>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .Students-swiper .swiper-pagination-bullet {
          background: #9ca3af;
        }
        .Students-swiper .swiper-pagination-bullet-active {
          background: #678e1a !important;
          width: 30px !important;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}