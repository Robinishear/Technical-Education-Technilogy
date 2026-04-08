"use client";

import { useEffect, useRef, useState } from "react";

const impactData = [
  { label: "CODING", percentage: 45, stroke: "#f59e0b" },
  { label: "SEO & ADS", percentage: 60, stroke: "#ef4444" },
  { label: "BRANDING", percentage: 75, stroke: "#769c24" },
  { label: "WEB DESIGN", percentage: 80, stroke: "#1f2937" },
];

interface CircularProgressProps {
  percentage: number;
  stroke: string;
  label: string;
  start: boolean;
}

function CircularProgress({ percentage, stroke, label, start }: CircularProgressProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= percentage) {
        current = percentage;
        clearInterval(interval);
      }
      setProgress(current);
    }, 15);

    return () => clearInterval(interval);
  }, [start, percentage]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={stroke}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 drop-shadow-sm"
          />
        </svg>
        <span className="absolute text-3xl font-bold text-gray-800 dark:text-gray-200">
          {progress}%
        </span>
      </div>
      <h3 className="mt-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">{label}</h3>
    </div>
  );
}

export default function ImpactSection() {
  const [loading, setLoading] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStartAnimation(true);
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className=" dark:bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase">
            OUR GLOBAL <span className="text-[#769c24]">IMPACT</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            We deliver measurable results through coding, branding, and design excellence.
          </p>
        </div>

        {/* Progress Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center animate-pulse">
                <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="w-24 h-4 mt-6 bg-gray-200 dark:bg-gray-600 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {impactData.map((item) => (
              <CircularProgress
                key={item.label}
                percentage={item.percentage}
                stroke={item.stroke}
                label={item.label}
                start={startAnimation}
              />
            ))}
          </div>
        )}

        {/* Banner */}
        <div className="bg-linear-to-r from-[#769c24]/90 to-[#567313] rounded-lg text-white p-8 lg:p-12 text-center relative overflow-hidden shadow-lg">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4">Apply now for your Branch Registration</h2>
          <p className="text-sm lg:text-xl font-light mb-6 opacity-90">
            Subscribe & get the latest news and growth opportunities!
          </p>
          <button className="bg-white/20 hover:bg-white/10 text-white px-12 py-3 rounded font-bold text-lg transition shadow-sm">

            Apply Now

  </button>
        </div>
      </div>
    </section>
  );
}