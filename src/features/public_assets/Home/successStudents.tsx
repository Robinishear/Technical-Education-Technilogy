/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
    <section className="py-20 font-sans overflow-hidden bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6">
        {/* 📢 Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0066cc] dark:text-blue-400 uppercase tracking-tight">
            TESTIMONIAL <span className="text-gray-800 dark:text-white">OUR STUDENTS SAY</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-500 dark:text-gray-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-gray-100 dark:bg-gray-800" />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={students.length > 1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-24 pt-16 Students-swiper"
          >
            {students.map((student) => (
              <SwiperSlide key={student.id} className="pt-12">
                <div className="relative bg-[#f8f9fa] dark:bg-gray-900 rounded-xl p-8 pt-16 text-center border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                  
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 shadow-md overflow-hidden bg-white">
                    <Image
                      src={student.image || "/placeholder.png"}
                      alt={student.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">
                      {student.position?.role || student.position?.title || "WEB DESIGN"}
                    </h3>
                    
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 leading-relaxed line-clamp-3">
                      {student.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod."}
                    </p>

                    <button
                      onClick={() => setActiveStudent(student)}
                      className="mt-6 text-[#678E1A] font-bold border-b-2 border-[#678E1A] hover:text-[#567a16] hover:border-[#567a16] transition-colors text-sm uppercase inline-block pb-1"
                    >
                      read more
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {activeStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => setActiveStudent(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#678E1A] mb-4">
                <Image src={activeStudent.image} alt={activeStudent.name} fill className="object-cover" unoptimized />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{activeStudent.name}</h3>
              <p className="text-[#678E1A] font-semibold uppercase text-xs tracking-widest mt-1">
                {activeStudent.position?.role || "Success Student"}
              </p>
              <div className="h-1 w-12 bg-gray-200 my-4 rounded-full" />
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">
                "{activeStudent.bio || "No bio available for this student."}"
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .Students-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
        }
        .Students-swiper .swiper-pagination-bullet-active {
          background: #678E1A !important;
          width: 25px !important;
          border-radius: 5px;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}