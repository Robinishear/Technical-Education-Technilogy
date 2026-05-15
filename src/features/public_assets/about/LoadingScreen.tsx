"use client";

import Lottie from "lottie-react";
import animationData from "@/animations/about-us.json";

export default function LoadingScreen() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#050816] via-[#0b1023] to-[#111827] flex items-center justify-center">
      
      {/* Background Blur */}
      <div className="absolute -top-30 -left-30 w-75 h-75 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-30 -right-30 w-75 h-75 bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm mb-6">
              Modern Digital Experience
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Building Creative
              <span className="block text-cyan-400">
                Web Experiences
              </span>
            </h1>

            <p className="mt-6 text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
              Please wait while we prepare something beautiful for you.
              Our system is loading animations, content, and interactive
              experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <button className="px-7 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-white font-semibold shadow-lg shadow-cyan-500/20">
                Get Started
              </button>

              <button className="px-7 py-3 rounded-xl border border-white/20 hover:border-cyan-400 transition-all duration-300 text-white">
                Explore More
              </button>
            </div>
          </div>

          {/* Right Animation */}
          <div className="flex justify-center">
            <div className="w-97.5 h-80 md:w-195 md:h-125">
              <Lottie
                animationData={animationData}
                loop={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}