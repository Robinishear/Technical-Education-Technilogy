"use client";

import Lottie from "lottie-react";
import animationData from "@/animations/about-us.json";

export default function LoadingScreen() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white dark:bg-[#090d16] flex items-center justify-center">
      
    
      <div className="absolute -top-40 -left-20 w-150 h-150 bg-cyan-400/15 blur-[140px] rounded-full pointer-events-none" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-87.5 bg-white/6 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="absolute -bottom-45 -right-20 w-150 h-150 bg-pink-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-8">
          
          <div className="text-center lg:text-left space-y-6 md:space-y-8 max-w-2xl mx-auto lg:mx-0">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-cyan-300 text-xs md:text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Modern Digital Experience
            </div>

            {/* Premium Contrast Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none">
              <span className="text-white drop-shadow-sm">Building Creative</span> <br />
              <span className="bg-linear-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
                Web Experiences
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Please wait while we prepare something beautiful for you.
              Our system is loading animations, content, and interactive
              experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black hover:bg-cyan-400 hover:text-black transition-all duration-300 font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-cyan-400/30 hover:scale-105 active:scale-95 cursor-pointer">
                🚀 Get Started
              </button>

              <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 bg-white/2 hover:bg-white/10 backdrop-blur-md transition-all duration-300 text-white font-semibold hover:scale-105 active:scale-95 cursor-pointer">
                ✨ Explore More
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center lg:mt-0 mt-8">
            <div className="relative w-full max-w-[320px] sm:max-w-112.5 md:max-w-137.5 lg:max-w-none transform hover:scale-102 transition-transform duration-500">
              {/* Soft Ambient Light behind the animation */}
              <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl opacity-40 -z-10" />
              
              <Lottie
                animationData={animationData}
                loop={true}
                className="w-full h-auto filter drop-shadow-[0_0_25px_rgba(255,255,255,0.05)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}