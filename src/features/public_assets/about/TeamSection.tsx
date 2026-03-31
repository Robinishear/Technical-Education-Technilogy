/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Robin Ahmed",
    role: "Lead Full-Stack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Suzi Islam",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Ariful Islam",
    role: "Cybersecurity Analyst",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=400&h=400",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Zelivo Nexa",
    role: "Backend Architect",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=400&h=400",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
];

export default function TeamSection() {
  return (
    <section className="relative py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-100 h-100 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-500 font-semibold tracking-[0.2em] uppercase text-sm mb-3"
          >
            Our Team
          </motion.h4>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
          >
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-blue-600">
              Creative Experts
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl p-5 transition-all duration-500 hover:shadow-xl hover:border-cyan-500/40">

                <div className="relative h-60 w-full mb-5 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-5 gap-3">
                    <a href={member.socials.github} className="p-2 bg-white/10 rounded-full hover:bg-cyan-500 text-white transition">
                      <Github size={16} />
                    </a>
                    <a href={member.socials.linkedin} className="p-2 bg-white/10 rounded-full hover:bg-blue-600 text-white transition">
                      <Linkedin size={16} />
                    </a>
                    <a href={member.socials.twitter} className="p-2 bg-white/10 rounded-full hover:bg-sky-400 text-white transition">
                      <Twitter size={16} />
                    </a>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-cyan-500 text-xs md:text-sm font-medium uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}