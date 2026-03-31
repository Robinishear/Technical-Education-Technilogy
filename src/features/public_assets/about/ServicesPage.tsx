"use client";

import { Cpu, Globe, Lock, Rocket } from "lucide-react";
import { motion } from "framer-motion";
const services = [
  {
    title: "Student Management System",
    desc: "Efficiently manage student records, admissions, profiles, and academic information in a centralized platform.",
    icon: <Globe size={28} />,
    color: "from-blue-500/10 to-cyan-500/10",
    iconBg: "bg-cyan-500/10 text-cyan-500",
  },
  {
    title: "Attendance & Result Tracking",
    desc: "Track daily attendance and manage exam results with real-time updates and performance insights.",
    icon: <Lock size={28} />,
    color: "from-red-500/10 to-orange-500/10",
    iconBg: "bg-red-500/10 text-red-500",
  },
  {
    title: "Teacher & Class Management",
    desc: "Organize teachers, class schedules, and subject assignments with an easy-to-use dashboard.",
    icon: <Cpu size={28} />,
    color: "from-purple-500/10 to-pink-500/10",
    iconBg: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Parent Communication System",
    desc: "Enable seamless communication between school and parents through notifications and updates.",
    icon: <Rocket size={28} />,
    color: "from-green-500/10 to-emerald-500/10",
    iconBg: "bg-green-500/10 text-green-500",
  }
];
export default function ServicesSection() {
  return (
    <section className="relative py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-100 h-100 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-blue-600">
              Services
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            We deliver high-performance digital solutions with modern technologies and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 backdrop-blur-md transition-all hover:shadow-xl hover:border-cyan-500/40`}
            >
              {/* Icon */}
              <div className={`mb-5 p-4 w-fit rounded-2xl ${service.iconBg}`}>
                {service.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                {service.desc}
              </p>

              <div className="mt-6 h-0.5 w-0 bg-linear-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}