"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutFounderSection() {
  return (
    <section className="container mx-auto px-6 py-20 space-y-24">

      {/* ================= ABOUT ================= */}
      <div className="flex flex-col lg:flex-row items-center gap-16">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
        <div className="relative">
  <Image
    src="/happy-teacher-with-students-background.jpg"
    alt="About Us"
    width={800}
    height={500}
    className="rounded shadow w-full object-cover 
               brightness-100 dark:brightness-75 
               contrast-100 dark:contrast-110"
  />

  {/* Dark overlay for better visibility */}
  <div className="absolute inset-0 rounded 
                  bg-black/0 dark:bg-black/20"></div>
</div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
            ABOUT <span className="text-[#678E1A]">US</span>
          </h2>

          <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600"></div>

          <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-5">
            <p>
              Bangladesh Technical Education Technology is at the forefront of driving digital
              transformation in the vocational and technical sector. We are committed to bridging
              the gap between traditional learning and modern industry demands.
            </p>

            <p>
              Our mission is to empower the youth of Bangladesh with technical excellence
              and innovative skill sets, building a workforce ready for global challenges.
            </p>
          </div>

          <button className="mt-6 bg-[#678E1A] hover:bg-[#678E1A]/90 text-white px-8 py-3 rounded font-semibold text-sm transition">
            READ MORE
          </button>
        </motion.div>
      </div>

      {/* ================= FOUNDER ================= */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-16">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
            FOUNDER <span className="text-[#678E1A]">& CEO</span>
          </h2>

          <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600"></div>

          <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-5">
            <p>
              As the Founder and CEO, my vision is to bridge the gap between academic learning
              and the fast-evolving global tech industry.
            </p>

            <p>
              We are building a platform that empowers students with real-world technical skills,
              modern tools, and industry insights.
            </p>

            <p>
              Our mission is aligned with building a Smart Bangladesh through innovation,
              technical education, and digital transformation.
            </p>
          </div>

          <button className="mt-6 bg-[#678E1A] hover:bg-[#678E1A]/90 text-white px-8 py-3 rounded font-semibold text-sm transition">
            READ MORE
          </button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/3 relative"
        >
          <div className="relative">
            <Image
  src="/inspiring-new-boss.jpg"
  alt="Founder"
  width={600}
  height={700}
  className="rounded shadow w-full object-cover aspect-4/5
             brightness-100 dark:brightness-80 
             contrast-100 dark:contrast-110"
/>

            {/* Overlay Card */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 
                            bg-white/80 dark:bg-gray-900/80 backdrop-blur 
                            p-4 rounded shadow w-[80%] text-center">
              
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Mosfiqur Rahman
              </h3>

              <p className="text-sm text-[#678E1A] font-semibold uppercase mt-1">
                Founder & CEO
              </p>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
}