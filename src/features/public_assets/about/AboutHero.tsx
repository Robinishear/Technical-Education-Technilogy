"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors">

      {/* 🌈 Gradient Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[150px]" />

      {/* ✨ Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="container mx-auto px-6 z-10 text-center">

        {/* 🔥 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight"
        >
          Empowering Education <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500">
            Through Smart Innovation
          </span>
        </motion.h1>

        {/* 📄 Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
        >
          Our School Management System simplifies academic and administrative workflows, 
          connecting students, teachers, and parents in one powerful digital ecosystem.
        </motion.p>

        {/* 🚀 Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition">
            Get Started
          </button>

          <button className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition">
            Learn More
          </button>
        </motion.div>

      </div>
    </section>
  );
}