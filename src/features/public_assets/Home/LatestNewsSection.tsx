/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  CalendarDays, ArrowRight, Rss } from 'lucide-react';

const LatestNewsSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const newsData = [
    { category: "INSIGHTS", date: "JUNE 15, 2023", title: "Navigating the Future of Digital Marketing with AI & SEO." },
    { category: "TRENDS", date: "JUNE 10, 2023", title: "Decoding Data: The Key to Higher Organic Traffic in 2024." },
    { category: "SUCCESS STORY", date: "JUNE 05, 2023", title: "Case Study: From 0 to 1M Visitors Using Long-Tail Keywords." }
  ];

  return (
    <section className=" dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans py-24 px-6 md:px-24 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-100 h-100 bg-cyan-100 dark:bg-cyan-900/10 blur-[120px] rounded-full -z-10" />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,2fr] gap-20 items-start max-w-7xl mx-auto">
        
        {/* Left Side: Title & Description */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-20 space-y-8"
        >
          <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400 font-extrabold text-xs uppercase tracking-[0.2em]">
            <Rss size={18} className="animate-pulse" />
            <span>Stay Updated</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tighter text-slate-950 dark:text-white">
            Our Latest <br /> 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-rose-500 italic font-serif">Insights</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
            Explore industry trends, success stories, and actionable advice to boost your digital presence.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center space-x-3 bg-linear-to-r from-orange-500 to-rose-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-rose-200 dark:shadow-none"
          >
            <span>View All News</span>
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Right Side: News Cards */}
        <div className="space-y-6">
          <AnimatePresence>
            {newsData.map((news, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[32px] cursor-pointer overflow-hidden transition-all duration-500"
              >
                {/* Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-lg">
                        {news.category}
                      </span>
                      <span className="flex items-center gap-2 text-slate-400">
                        <CalendarDays size={14} />
                        {news.date}
                      </span>
                    </div>

                    <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {news.title}
                    </h4>
                  </div>

                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white group-hover:border-transparent transition-all duration-500 group-hover:rotate-45">
                      <ArrowRight size={28} className="text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default LatestNewsSection;