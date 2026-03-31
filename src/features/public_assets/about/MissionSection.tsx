/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";

export default function MissionSection() {
  return (
    <section className="relative py-24 bg-white dark:bg-[#0a0a0a] text-black dark:text-white overflow-hidden">

      <div className="absolute top-[-10%] right-[-10%] w-100 h-100 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800"
            alt="Collaboration"
            className="rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-800 hover:scale-105 transition duration-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <span className="text-cyan-500 font-semibold tracking-widest uppercase text-sm">
            Our Mission
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Transforming Education <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-blue-600">
              Through Smart Technology
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            Our School Management System is designed to simplify academic and administrative workflows.
            We aim to create a connected environment where students, teachers, and parents can collaborate
            efficiently and effectively.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              "Smart Attendance System",
              "Real-time Results Tracking",
              "Teacher & Student Dashboard",
              "Parent Communication System",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 px-4 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition"
              >
                <span className="flex items-center justify-center w-6 h-6 text-sm bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-full">
                  ✓
                </span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}