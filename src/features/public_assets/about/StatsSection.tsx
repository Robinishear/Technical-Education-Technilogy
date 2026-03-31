"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { label: "Active Students", value: 25000, suffix: "+" },
  { label: "Expert Mentors", value: 150, suffix: "+" },
  { label: "Courses Published", value: 400, suffix: "+" },
  { label: "Success Rate", value: 98, suffix: "%" },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-100 h-100 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Our Impact in Numbers
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Trusted by thousands of students and educators worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 backdrop-blur-md text-center hover:scale-105 hover:border-cyan-500/40 transition-all"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
      {count}
      {suffix}
    </h3>
  );
}