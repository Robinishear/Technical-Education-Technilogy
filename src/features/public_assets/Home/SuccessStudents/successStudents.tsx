/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Student } from "./types";

export default function Testimonials() {
  const [gallery, setGallery] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<Student | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/successStudents`,
        );
        const data = await res.json();
        setGallery(data?.data || []);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (!loading && !gallery.length) return null;

  return (
    <section className="py-3 font-sans overflow-hidden shadow-sm bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0066cc] dark:text-blue-400 uppercase tracking-tight">
            TESTIMONIAL{" "}
            <span className="text-gray-800 dark:text-white">
              OUR STUDENTS SAY
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={gallery.length > 1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-24 pt-16 Students-swiper"
          >
            {gallery.map((item) => (
              <SwiperSlide key={item.id} className="pt-12">
                <div className="relative bg-[#f8f9fa] dark:bg-gray-900 rounded-xl p-8 pt-16 text-center border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 shadow-md overflow-hidden bg-white">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name || "Student"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">
                      {item.name}
                    </h3>
                    <p className="text-[#678E1A] text-xs font-semibold uppercase mt-1">
                      {item.position?.role ||
                        item.position?.title ||
                        "Success Student"}
                    </p>
                    {item.bio && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 leading-relaxed line-clamp-3">
                        {item.bio}
                      </p>
                    )}
                    <button
                      onClick={() => setActiveItem(item)}
                      className="mt-auto pt-6 text-[#678E1A] font-bold border-b-2 border-[#678E1A] hover:text-[#567a16] hover:border-[#567a16] transition-colors text-sm uppercase inline-block pb-1"
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

      {activeItem && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-100 p-4 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 max-w-xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
              onClick={() => setActiveItem(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#678E1A] mb-4 shadow-inner">
                <Image
                  src={activeItem.image || "/placeholder.png"}
                  alt={activeItem.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {activeItem.name}
              </h3>
              <p className="text-[#678E1A] font-bold uppercase text-xs tracking-widest mt-1">
                {activeItem.position?.role ||
                  activeItem.position?.title ||
                  "Success Student"}
              </p>

              <div className="h-0.5 w-16 bg-gray-200 dark:bg-gray-700 my-4 rounded-full" />

             {activeItem.items && activeItem.items.length > 0 && (
  <div className="mt-6 w-full text-left">
    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-1">
      📋 Detailed Achievements & Feedback
    </h4>
    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
      {activeItem.items.map((entry, index) => {
        // 🌟 যদি ডাটাবেজের মতো সরাসরি string হয়
        if (typeof entry === "string") {
          return (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#678E1A] shrink-0" />
                {entry}
              </p>
            </div>
          );
        }

        // 🌟 যদি ডাটাটি object ফরম্যাটে হয় (title এবং feedback সহ)
        return (
          <div 
            key={index} 
            className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30"
          >
            {entry.title && (
              <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#678E1A]" />
                {entry.title}
              </h5>
            )}
            {entry.feedback && (
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-3">
                {entry.feedback}
              </p>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}
             
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
