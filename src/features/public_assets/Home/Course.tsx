"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle 
} from 'lucide-react';

const Course = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=" dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-12 px-6 md:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-75 h-75 bg-rose-500/10 blur-[100px] rounded-full -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 z-10"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} className="animate-pulse" />
              <span>Next-Gen Analytics Tools</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight text-slate-950 dark:text-white">
              Data Science <br /> 
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300 italic font-serif">for SEO</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-cyan-200 dark:text-cyan-900/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
                </svg>
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-xl max-w-lg leading-relaxed font-medium">
              Master the art of high-impact data analysis. Leverage Google Analytics & Search Console like a pro with our intensive 24-hour masterclass.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl font-bold flex items-center space-x-3 shadow-2xl shadow-indigo-200 dark:shadow-none transition-all"
              >
                <span>Get Started Now</span>
                <ArrowRight size={20} />
              </motion.button>
              <button className="flex items-center space-x-3 px-8 py-5 rounded-2xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600">
                  <Play size={18} fill="currentColor" />
                </div>
                <span>Watch Intro</span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-cyan-500 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="w-80 h-80 md:w-125 md:h-125 bg-slate-100 dark:bg-slate-900 rounded-[60px] overflow-hidden border-12 border-white dark:border-slate-800 shadow-2xl flex items-center justify-center">
                 <motion.img 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src="https://img.freepik.com/free-vector/rocket-space-concept-illustration_114360-1065.jpg" 
                  alt="Rocket" 
                  className="w-4/5 object-contain" 
                />
              </div>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 hidden md:block"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-black">500+</p>
                    <p className="text-xs text-slate-500 uppercase tracking-tighter">Students Enrolled</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="px-6 md:px-24 mb-32 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Date Range", val: "20-22 Sept", sub: "Intensive 3-Day Workshop", icon: <Calendar className="text-rose-500" /> },
            { label: "Duration", val: "24 Hours", sub: "Live Training Sessions", icon: <Clock className="text-indigo-500" /> },
            { label: "Availability", val: "20 Seats", sub: "Small Group Interaction", icon: <Users className="text-emerald-500" /> },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[32px] border border-slate-200/50 dark:border-slate-800/50 shadow-xl"
            >
              <div className="mb-4">{item.icon}</div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">{item.label}</p>
              <h3 className="text-2xl font-black dark:text-white mb-2">{item.val}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-tight">{item.sub}</p>
            </motion.div>
          ))}
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-linear-to-br from-cyan-400 to-blue-600 dark:from-cyan-600 dark:to-blue-800 p-8 rounded-[32px] text-white shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Investment</p>
              <h3 className="text-5xl font-black">$245</h3>
              <p className="text-xs font-bold mt-2 bg-white/20 inline-block px-2 py-1 rounded">LIMITED OFFER</p>
            </div>
            <ArrowRight className="absolute bottom-6 right-6 opacity-30 w-12 h-12" />
          </motion.div>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="py-24 px-6 md:px-24 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              className="bg-indigo-600 dark:bg-indigo-500 p-16 rounded-[60px] text-white shadow-[0_40px_80px_-20px_rgba(79,70,229,0.4)] relative z-10"
            >
              <div className="space-y-6">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center">
                  <Sparkles size={40} className="text-indigo-200" />
                </div>
                <h2 className="text-7xl font-black tracking-tighter">24 <span className="text-3xl font-light block">Full Hours</span></h2>
                <p className="text-lg font-medium leading-relaxed opacity-90 italic">
                  &quot;The most comprehensive SEO data science curriculum designed for modern marketers.&quot;
                </p>
                <div className="pt-10 flex items-center space-x-4">
                  <div className="px-4 py-2 bg-black/20 rounded-full text-xs font-bold">INTERMEDIATE LEVEL</div>
                  <div className="px-4 py-2 bg-white/20 rounded-full text-xs font-bold">CERTIFIED</div>
                </div>
              </div>
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-full h-full border-4 border-dashed border-indigo-200 dark:border-indigo-900/30 rounded-[60px] -z-10" />
          </div>

          <div className="space-y-8">
            <div className="w-12 h-1.5 bg-rose-500 rounded-full" />
            <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              Master the science <br /> behind the search
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
              Stop guessing. Start measuring. Every day, search engines collect billions of data rows. SEO experts often only look at surface-level metrics. It&apos;s time to dive deep into the causes and consequences.
            </p>
            
            <ul className="space-y-4">
              {['Advanced BigQuery Integration', 'Predictive SEO Modeling', 'Automated Traffic Analysis'].map((list, i) => (
                <li key={i} className="flex items-center space-x-3 text-slate-800 dark:text-slate-200 font-bold">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600">
                    <CheckCircle size={16} />
                  </div>
                  <span>{list}</span>
                </li>
              ))}
            </ul>

            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-4 text-rose-500 font-black text-lg group"
            >
              <span>CLAIM YOUR SEAT NOW</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* 4. Tutors Section */}
      <section className="py-32 px-6 md:px-24">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-5xl font-black mb-6 text-slate-900 dark:text-white">Learn from Experts</h2>
          <p className="text-slate-500 font-medium italic">Our instructors bring 15+ years of combined experience from top-tier digital agencies.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {[
            { name: "John Williams", role: "Head of SEO, Market Ltd", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
            { name: "Maggie Sutherland", role: "Founder, SEOBuddy Agency", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" }
          ].map((tutor, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 p-8 rounded-[40px] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <div className="relative group shrink-0">
                <div className="absolute inset-0 bg-indigo-500 rounded-[35px] rotate-6 group-hover:rotate-0 transition-transform" />
                <img src={tutor.img} alt={tutor.name} className="relative w-48 h-48 rounded-[35px] object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">{tutor.name}</h4>
                <p className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs mt-1">{tutor.role}</p>
                <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm leading-relaxed font-medium">Expert in building scalable SEO frameworks and data-driven marketing strategies for Fortune 500 companies.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Venue Section */}
      <section className="py-24 px-6 md:px-24">
        <div className="bg-slate-950 rounded-[60px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl border border-slate-800">
          <div className="relative h-100 lg:h-full group">
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80" alt="Venue" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-10 left-10 z-20">
               <div className="flex items-center space-x-2 text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <MapPin size={16} />
                  <span className="text-sm font-bold tracking-widest">NEW YORK HUB</span>
               </div>
            </div>
          </div>
          <div className="p-12 md:p-20 flex flex-col justify-center space-y-8 bg-white dark:bg-slate-900">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">The Venue</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Experience learning in our state-of-the-art SEO Solutions Education Hub. A premier facility designed to foster collaboration and innovation.
            </p>
            <div className="space-y-2">
              <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />
              <p className="text-rose-500 dark:text-rose-400 font-black text-2xl pt-4">173 West 27th St, Suite 527</p>
              <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-sm">New York, NY 10012</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Course;