"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { NoticeData, SliderData } from "./types";
import Link from "next/link";

export default function Slider() {
  const [sliders, setSliders] = useState<SliderData[]>([]);
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/get-slider`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setSliders(Array.isArray(data?.data) ? data.data : []);
        setLoading(false);
      })
      .catch(() => {
        setSliders([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notices/get-notices`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setNotices(Array.isArray(data?.data) ? data.data : []))
      .catch(() => setNotices([]));
  }, []);

  if (loading)
    return (
      <div className="w-full h-[70vh] md:h-[85vh] lg:h-screen bg-stone-200 animate-pulse flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-8 w-64 bg-stone-300 rounded-xl mx-auto animate-pulse" />
          <div className="h-4 w-40 bg-stone-300 rounded-xl mx-auto animate-pulse" />
        </div>
      </div>
    );

  if (!sliders.length)
    return (
      <div className="w-full h-[70vh] md:h-[85vh] lg:h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-400 text-sm">কোনো slider নেই</p>
      </div>
    );

  return (
    <section className="w-full relative group">
      <div className="w-full h-[50vh] md:h-[65vh] lg:h-[75vh] relative">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {sliders.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="relative w-full h-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: activeIndex === index ? 1 : 1.2 }}
                  transition={{ duration: 5, ease: "linear" }}
                  src={item.image}
                  alt="Slider Image"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <div className="max-w-3xl">
                          <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-white text-1xl md:text-3xl lg:text-5xl font-black leading-tight mb-8"
                          >
                            {item.caption}
                          </motion.h1>
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-wrap items-center gap-4"
                          >
                            <Link
                              href="/login"
                              className="group bg-white/10 hover:bg-white hover:text-black text-white backdrop-blur-xl px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] transition-all duration-300 border border-white/20 hover:border-white/60 shadow-lg"
                            >
                              <span className="flex items-center gap-2">
                                Get Started
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                  ↗
                                </span>
                              </span>
                            </Link>
                            <Link
                              href="/contact"
                              className="group bg-white/10 hover:bg-white hover:text-black text-white backdrop-blur-xl px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] transition-all duration-300 border border-white/20 hover:border-white/60 shadow-lg"
                            >
                              <span className="flex items-center gap-2">
                                Contact Us
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                  ↗
                                </span>
                              </span>
                            </Link>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev text-white/50! hover:text-[#678E1A]! hidden! md:flex! after:text-2xl! transition-all" />
          <div className="swiper-button-next text-white/50! hover:text-[#678E1A]! hidden! md:flex! after:text-2xl! transition-all" />
        </Swiper>
      </div>

      {notices.length > 0 && (
        <div className="flex items-center dark:bg-gray-800 bg-white shadow-sm overflow-hidden h-10 border-t border-gray-200">
          <div className="bg-[#678E1A] text-white text-xs font-black uppercase tracking-widest px-5 h-full flex items-center shrink-0">
            Notice
          </div>
          <div className="overflow-hidden w-full">
            <div className="animate-marquee flex gap-16 whitespace-nowrap">
              {[...notices, ...notices].map((notice, i) => (
                <span key={i}>📢 {notice.text}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #678e1a !important;
          width: 35px !important;
          border-radius: 20px !important;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
