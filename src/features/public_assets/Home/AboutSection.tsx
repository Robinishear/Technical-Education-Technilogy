/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className=" dark:bg-slate-950 py-20 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-300">
      {/* Top Features Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { 
            icon: <Globe className="text-teal-600 dark:text-teal-400" size={24} />, 
            title: "Global Competition", 
            desc: "Empowering students to excel in the international arena." 
          },
          { 
            icon: <BookOpen className="text-teal-600 dark:text-teal-400" size={24} />, 
            title: "Online Courses", 
            desc: "Flexible learning modules designed for the modern world." 
          },
          { 
            icon: <GraduationCap className="text-teal-600 dark:text-teal-400" size={24} />, 
            title: "Best Institution", 
            desc: "Recognized excellence in academic and moral growth." 
          }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="flex items-start space-x-4 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all"
          >
            <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl shrink-0">{item.icon}</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Creative Image Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400&h=550" 
                alt="Students studying" 
                className="rounded-3xl shadow-xl w-full h-100 object-cover border-4 border-white dark:border-slate-800" 
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 pt-12"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400&h=450" 
                alt="Library learning" 
                className="rounded-3xl shadow-xl w-full h-80 object-cover border-4 border-white dark:border-slate-800" 
              />
              <div className="bg-teal-600 dark:bg-teal-500 p-6 rounded-3xl text-white shadow-lg shadow-teal-200 dark:shadow-none flex flex-col justify-center items-center text-center">
                <p className="text-4xl font-black italic">10k+</p>
                <p className="text-xs uppercase tracking-widest font-medium opacity-90">Success Stories</p>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-100 dark:bg-teal-900 rounded-full -z-10 blur-3xl opacity-60 dark:opacity-20" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100 dark:bg-orange-900 rounded-full -z-10 blur-3xl opacity-60 dark:opacity-20" />
        </div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full shadow-sm">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
            <span className="text-xs font-bold uppercase tracking-wider">About Our Institution</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1]">
            Leading the way for a <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-300 font-serif italic">sustainable</span> future
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-lg">
            We are the leading academic institution offering diverse programs and higher education diplomas designed with global requirements in mind. Each year, over 1000+ students graduate from our institution.
          </p>

          <div className="relative p-6 bg-white dark:bg-slate-900 border-l-4 border-teal-500 rounded-r-2xl shadow-sm italic text-slate-700 dark:text-slate-300 font-medium">
            &quot;We are the number 1 institution in the country, providing quality education for more than 10 years.&quot;
            <div className="absolute top-0 right-0 p-2 text-teal-100 dark:text-teal-900 opacity-20">
               <GraduationCap size={60} />
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center space-x-3 bg-linear-to-r from-orange-600 to-orange-500 text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-orange-200/50 dark:shadow-none transition-all"
          >
            <span className="text-lg">More About Us</span>
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;