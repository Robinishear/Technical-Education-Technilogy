/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Briefcase,
  Calendar,
  ShieldCheck,
  Layout,
  Users,
  Monitor,
  Infinity,
  ChevronDown,
} from "lucide-react";

const UpskillLanding = () => {
  const benefits = [
    { title: "More Affordable", icon: <Wallet className="text-orange-500" /> },
    { title: "Job Connector", icon: <Briefcase className="text-slate-400" /> },
    { title: "Flexible and Short", icon: <Calendar className="text-blue-500" /> },
    { title: "Credible Certificate", icon: <ShieldCheck className="text-indigo-500" /> },
    { title: "Build a Portfolio", icon: <Layout className="text-cyan-500" /> },
    { title: "Group Learning", icon: <Users className="text-blue-500" /> },
    { title: "Live Mentoring", icon: <Monitor className="text-purple-500" /> },
    { title: "Lifelong Access", icon: <Infinity className="text-green-500" /> },
  ];

  const faqs = [
    "Can I access course materials offline?",
    "Is there any prerequisite for courses?",
    "How long do I have access to a course?",
    "How can I make a payment for a course?",
    "How can I contact the course instructor?",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ================= Benefits Section ================= */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 bg-cyan-500/20 blur-[140px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-16"
          >
            Why Learn With <span className="text-cyan-500">Upskill</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all"
              >
                {/* <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-2xl bg-gray-100 dark:bg-white/10">
                    {React.cloneElement(item.icon as React.ReactElement, {
                      size: 28,
                    })}
                  </div>
                </div> */}
                <div className="mb-4 flex justify-center">
  <div className="p-4 rounded-2xl bg-gray-100 dark:bg-white/10">
    {React.isValidElement(item.icon) ? (
      React.cloneElement(item.icon as React.ReactElement<any>, {
        size: 28,
      })
    ) : (
      item.icon
    )}
  </div>
</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Learn industry ready skills with guided mentorship.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ Section ================= */}
      <section className="py-24 px-6 border-y border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden  border border-gray-200 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop"
                alt="Instructor"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/30 blur-3xl -z-10" />
          </motion.div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  className="p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex justify-between items-center cursor-pointer hover:shadow-lg transition-all"
                >
                  <span className="font-medium text-sm">{faq}</span>
                  <ChevronDown
                    size={18}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA Section ================= */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Learning Bootcamp & Program",
              color: "from-cyan-500/20 to-blue-500/20",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format",
            },
            {
              title: "Professional Development",
              color: "from-purple-500/20 to-indigo-500/20",
              img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&auto=format",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden p-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-linear-to-br ${card.color} backdrop-blur-xl flex justify-between items-center group`}
            >
              <div className="z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 max-w-60">
                  {card.title}
                </h3>
                <button className="text-sm font-semibold text-cyan-500 hover:underline">
                  Explore Now →
                </button>
              </div>

              <img
                src={card.img}
                alt="card"
                className="w-40 h-40 object-cover rounded-2xl shadow-xl transform group-hover:rotate-3 transition"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UpskillLanding;