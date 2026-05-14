"use client";

import React, { useState, useEffect, useRef } from "react";

// --- Types ---
interface NewsItem {
  id: number;
  date: string;
  monthYear: string;
  title: string;
  description: string;
}

interface ImpactStat {
  value: number;
  label: string;
  color: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    date: "26",
    monthYear: "JAN 2023",
    title: "Applications now open for ACTIMS Women in Trades Awards/Bursaries Program",
    description: "The ACTIMS Women in Trades Awards/Bursaries Program was created to recognize women who are members of the Canadian Building Trades...",
  },
  {
    id: 2,
    date: "18",
    monthYear: "JAN 2023",
    title: "LU2103 meeting on Jan. 20 is cancelled",
    description: "The regularly scheduled meeting this Thursday January 20 for members of LU2103 hosted in Calgary and Red Deer has been cancelled...",
  },
  {
    id: 3,
    date: "15",
    monthYear: "JAN 2023",
    title: "LU1325 member meeting for January cancelled",
    description: "Members, The LU1325 monthly member meeting scheduled for Wednesday, January 5 has been cancelled...",
  },
];

const impactData: ImpactStat[] = [
  { value: 45, label: "CODING", color: "#ffbb33" },
  { value: 60, label: "SEO & ADS", color: "#f87171" },
  { value: 75, label: "BRANDING", color: "#84cc16" },
  { value: 80, label: "WEB DESIGN", color: "#1f2937" },
];

const AnimatedRing = ({ value, color, label }: ImpactStat) => {
  const [count, setCount] = useState(0);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef(null);

  // Intersection Observer to start animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ringRef.current) observer.observe(ringRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <div ref={ringRef} className="flex flex-col items-center group">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset: isVisible ? strokeDashoffset : circumference,
              transition: "stroke-dashoffset 0.1s linear" 
            }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-4xl font-black text-gray-800">{count}%</span>
      </div>
      <p className="mt-4 font-bold text-gray-600 tracking-widest text-sm uppercase">{label}</p>
    </div>
  );
};

export default function FullLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      <section className="py-20 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            Recent <span className="text-[#0066cc]">Union News</span>
          </h2>
          <a href="#" className="text-[#0066cc] font-bold text-sm hover:underline">View All →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#0066cc] p-10 flex items-center justify-center shadow-2xl rounded-sm">
            <h3 className="text-5xl font-black text-white leading-tight text-center">
              Recent<br />Union<br />News
            </h3>
          </div>

          {newsData.map((news) => (
            <div key={news.id} className="bg-white border border-gray-100 p-8 flex flex-col gap-4 shadow-sm group">
              <div className="flex gap-4 items-center">
                <div className="bg-[#0066cc] text-white min-w-15 h-15 flex flex-col items-center justify-center rounded">
                  <span className="text-2xl font-bold">{news.date}</span>
                  <span className="text-[9px] font-medium uppercase">JAN 2023</span>
                </div>
                <h4 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">{news.title}</h4>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{news.description}</p>
              <button className="text-[#0066cc] text-[11px] font-extrabold uppercase mt-auto text-left">Read More →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0a192f] py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black text-white uppercase mb-12">Start Your New Project</h2>
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 mb-8">
            <input type="text" placeholder="YOUR NAME" className="bg-white px-6 py-4 rounded-md w-full md:w-64 text-sm outline-none" />
            <input type="email" placeholder="YOUR EMAIL" className="bg-white px-6 py-4 rounded-md w-full md:w-64 text-sm outline-none" />
            <input type="tel" placeholder="YOUR PHONE" className="bg-white px-6 py-4 rounded-md w-full md:w-64 text-sm outline-none" />
            <button className="bg-[#ffbb33] hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-md font-black uppercase text-sm transition-all">Send Request</button>
          </div>
          <p className="text-gray-400 text-xs max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-1.5 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#ffbb33]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbb33] opacity-60" />
            <span className="w-3 h-3 rounded-full bg-[#ffbb33] opacity-30" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
            Our Global <span className="text-[#0066cc]">Impact</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm mb-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {impactData.map((stat, idx) => (
              <AnimatedRing key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a192f] py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-white mb-2">Apply now for your Branch Registration</h3>
            <p className="text-blue-200/60 text-sm">Subscribe & get latest news and growth opportunities!</p>
          </div>
          <button className="bg-white text-[#0a192f] px-12 py-4 rounded-md font-black text-lg hover:bg-gray-100 transition-all">Apply Now</button>
        </div>
      </section>

    </div>
  );
}