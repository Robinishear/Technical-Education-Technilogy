"use client";

import React, { useState, useEffect, useRef } from "react";
import { ImpactStat } from "./types";
import { impactData, newsData } from "./data";
import Link from "next/dist/client/link";

const AnimatedRing = ({ value, color, label }: ImpactStat) => {
  const [count, setCount] = useState(0);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ringRef.current) observer.observe(ringRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const incrementTime = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <div ref={ringRef} className="flex flex-col items-center group">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="80" cy="80" r={radius} stroke="#e5e7eb" strokeWidth="12" fill="transparent" />
          <circle
            cx="80" cy="80" r={radius} stroke={color} strokeWidth="12" fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: isVisible ? strokeDashoffset : circumference, transition: "stroke-dashoffset 0.1s linear" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-3xl font-black text-gray-800 dark:text-gray-100">{count}%</span>
      </div>
      <p className="mt-4 font-bold text-gray-500 dark:text-gray-400 tracking-widest text-sm uppercase">{label}</p>
    </div>
  );
};

export default function CircularProgress() {
  return (
    <div className="bg-white shadow-sm dark:bg-black font-sans">
      {/* ── Recent News ── */}
      <section className="py-12 container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            Recent <span className="text-[#678E1A]">News</span>
          </h2>
          <a
            href="#"
            className="text-[#678E1A] font-bold text-sm hover:underline"
          >
            View All →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Highlight Card */}
          <div className="bg-[#678E1A] p-10 flex items-center justify-center rounded-lg shadow-lg">
            <h3 className="text-4xl font-black text-white leading-tight text-center">
              Recent
              <br />
              News
            </h3>
          </div>

          {newsData.map((news) => (
            <div
              key={news.id}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-[#678E1A] text-white min-w-14 h-14 flex flex-col items-center justify-center rounded-md shrink-0">
                  <span className="text-xl font-black">{news.date}</span>
                  <span className="text-[8px] font-semibold uppercase leading-none">
                    {news.monthYear}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug line-clamp-3">
                  {news.title}
                </h4>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-3">
                {news.description}
              </p>
              <button className="text-[#678E1A] text-[11px] font-extrabold uppercase mt-auto text-left hover:underline">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Start Project ── */}
      <section className="bg-[#0a192f] dark:bg-gray-950 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-10 tracking-tight">
            Start Your <span className="text-[#678E1A]">New Project</span>
          </h2>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            <input
              type="text"
              placeholder="YOUR NAME"
              className="bg-white dark:bg-gray-800 dark:text-white px-6 py-3.5 rounded-lg w-full md:w-56 text-sm outline-none focus:ring-2 focus:ring-[#678E1A]"
            />
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-white dark:bg-gray-800 dark:text-white px-6 py-3.5 rounded-lg w-full md:w-56 text-sm outline-none focus:ring-2 focus:ring-[#678E1A]"
            />
            <input
              type="tel"
              placeholder="YOUR PHONE"
              className="bg-white dark:bg-gray-800 dark:text-white px-6 py-3.5 rounded-lg w-full md:w-56 text-sm outline-none focus:ring-2 focus:ring-[#678E1A]"
            />
            <button className="bg-[#678E1A] hover:bg-[#567a16] text-white px-10 py-3.5 rounded-lg font-black uppercase text-sm transition-all shadow-lg shadow-[#678E1A]/30">
              Send Request
            </button>
          </div>
        </div>
      </section>

      {/* ── Impact Rings ── */}
      <section className="py-12 bg-white dark:bg-black">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-[#678E1A]" />
            <span className="w-3 h-3 rounded-full bg-[#678E1A] opacity-60" />
            <span className="w-3 h-3 rounded-full bg-[#678E1A] opacity-30" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">
            Our Global <span className="text-[#678E1A]">Impact</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
            {impactData.map((stat, idx) => (
              <AnimatedRing key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply Now ── */}
      <section className="bg-[#0a192f] dark:bg-gray-950 py-10 border-t border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">
              Apply now for your Branch Registration
            </h3>
            <p className="text-blue-200/50 text-sm">
              Subscribe & get latest news and growth opportunities!
            </p>
          </div>
          <Link
            href="/register"
            className="bg-[#678E1A] hover:bg-[#567a16] text-white px-12 py-4 rounded-lg font-black text-base transition-all shadow-lg shadow-[#678E1A]/30 shrink-0"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}