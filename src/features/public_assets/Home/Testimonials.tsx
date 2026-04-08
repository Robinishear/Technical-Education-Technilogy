"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Testimonial {
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

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<Testimonial | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`);
        const data = await res.json();
        setTestimonials(data?.data || []);
      } catch (err) {
        console.error(" Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-24  dark:bg-[#020617] font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#678E1A]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ✨ Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-[#678E1A] font-bold tracking-[0.2em] uppercase text-sm mb-3">Our Success Stories</h4>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1]">
              What Our <span className="text-transparent bg-clip-text bg-linear-to-r from-[#678E1A] to-emerald-500">Students</span> Say
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm text-lg font-medium leading-relaxed">
A story of thousands of students achieving their dreams and a reflection of their trust in us.          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-125 rounded-[2.5rem] bg-slate-200 dark:bg-slate-800" />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={testimonials.length > 1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-24 pt-4 testimonial-swiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none hover:border-[#678E1A]/50 transition-all duration-500 flex flex-col h-130">
                  
                  <div className="relative h-[60%] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    {/* Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#678E1A] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                        Success
                      </span>
                    </div>
                  </div>

                  {/* 📝 Content Section */}
                  <div className="p-8 flex flex-col flex-1 relative -mt-12 z-20 bg-white dark:bg-slate-900 rounded-t-[2.5rem]">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-[#678E1A] font-semibold text-sm">
                        {item.position?.role || "Successful Graduate"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.items?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                          #{tag.title || "Skill"}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveItem(item)}
                      className="mt-auto group/btn flex items-center justify-center gap-3 w-full bg-slate-900 dark:bg-[#678E1A] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-[#678E1A] dark:hover:bg-gray-800 dark:hover:text-white  shadow-lg"
                    >
                      Read Success Story
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {activeItem && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl flex justify-center items-center z-999 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-0 max-w-4xl w-full max-h-[85vh] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row">
            
            <button
              className="absolute top-6 right-6 bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white text-slate-800 dark:text-white w-12 h-12 rounded-full z-30 transition-all flex items-center justify-center text-xl shadow-xl"
              onClick={() => setActiveItem(null)}
            >
              ✕
            </button>

            <div className="md:w-1/2 relative h-80 md:h-auto">
              <Image
                src={activeItem.image || "/placeholder.png"}
                alt={activeItem.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-white dark:to-slate-900 hidden md:block" />
            </div>

            <div className="md:w-1/2 p-12 overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-12 bg-[#678E1A] rounded-full"></div>
                <span className="text-[#678E1A] font-black text-xs uppercase tracking-[0.3em]">Profile</span>
              </div>
              
              <h3 className="text-4xl font-black text-slate-800 dark:text-white mb-2 leading-tight">
                {activeItem.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg mb-8 italic">
 {activeItem.position?.role ||
                activeItem.position?.title ||
                "Testimonials"}              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">The Journey</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
                    {activeItem.bio || "আমাদের কোর্সটি সম্পন্ন করার পর শিক্ষার্থীর জীবনে আসা ইতিবাচক পরিবর্তন এবং সাফল্যের গল্প এখানে তুলে ধরা হয়েছে।"}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {activeItem.items?.map((tag, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="w-2 h-2 rounded-full bg-[#678E1A]"></div>
                      <span className="text-slate-700 dark:text-slate-300 text-xs font-bold">{tag.title || tag.feedback}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #E2E8F0;
          opacity: 1;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #678E1A !important;
          width: 45px !important;
          border-radius: 20px;
        }
      `}</style>
    </section>
  );
}