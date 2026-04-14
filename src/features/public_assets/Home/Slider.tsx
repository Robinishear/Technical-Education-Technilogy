"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface SliderData {
  id: string;
  image: string;
  caption?: string;
}

export default function Slider() {
  const [sliders, setSliders] = useState<SliderData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/get-slider`)
      .then((res) => res.json())
      .then((data) => {
        setSliders(Array.isArray(data?.data) ? data.data : []);
      })
      .catch(() => setSliders([]));
  }, []);

  return (
    <section className="w-full h-[70vh] md:h-[85vh] lg:h-screen relative group ">
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
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              
             <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: activeIndex === index ? 1 : 1.2 }}
                transition={{ duration: 5, ease: "linear" }}
                src={item.image}
                alt="Slider Image"
                className="w-full h-full object-cover "
              />

              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                   
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <div className="max-w-3xl">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          className="text-[#678E1A] font-bold tracking-[0.3em] uppercase text-sm md:text-base block mb-4"
                        >
                          Welcome to our platform
                        </motion.span>

                        <motion.h1
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="text-white text-4xl md:text-6xl lg:text-8xl font-black leading-tight mb-8"
                        >
                          {item.caption || "Empowering Your Future"}
                        </motion.h1>

                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.8 }}
                          className="flex gap-4"
                        >
                          <button className="bg-[#678E1A] hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#678E1A]/20">
                            Get Started
                          </button>
                          <button className="bg-white/10 hover:bg-white hover:text-black text-white backdrop-blur-md px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all border border-white/20">
                            Explore More
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/*  Custom Navigation Arrows */}
        <div className="swiper-button-prev text-white/50! hover:text-[#678E1A]! hidden! md:flex! after:text-2xl! transition-all" />
        <div className="swiper-button-next text-white/50! hover:text-[#678E1A]! hidden! md:flex! after:text-2xl! transition-all" />
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #678E1A !important;
          width: 35px !important;
          border-radius: 20px !important;
        }
      `}</style>
    </section>
  );
}