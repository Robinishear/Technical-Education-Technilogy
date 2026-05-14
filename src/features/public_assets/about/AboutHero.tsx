/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const AboutHero = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto font-sans">
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-8">
        About <span className="text-red-500">Us</span>
      </h2>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-100">
          <img 
            src="/images/about-team.jpg" 
            alt="Team collaboration at Training Institute" 
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800">Welcome to Training Institute</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            We provide quality education and training to empower our students. The institute has been at the forefront of providing quality education and training to students from all walks of life. With a team of experienced instructors and state-of-the-art facilities, we ensure that every student receives personalized attention and the best possible learning experience.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm">
            At our core, we don't just develop technology; we engineer solutions that transform industries and enrich lives. Our rigorously tested designs promote seamless interaction with a commitment to human-centered design.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded shadow transition-all duration-200 text-sm">
            Read More
          </button>
        </div>
      </div>

      {/* Cards Grid (Vision, Mission, Values) */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Vision Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl text-blue-600">💡</span>
            <h4 className="text-xl font-bold text-slate-800">Vision</h4>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            To be a leading technical education provider recognized for empowering future-ready professionals and setting new benchmarks in skill-based learning and technological advancement.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl text-blue-600">🎯</span>
            <h4 className="text-xl font-bold text-slate-800">Mission</h4>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            To deliver industry-aligned technical education powered by expert faculty, hands-on training, and cutting-edge resources, making world-class technical skills accessible to everyone.
          </p>
        </div>

        {/* Our Values Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl text-blue-600">👤</span>
            <h4 className="text-xl font-bold text-slate-800">Our Values</h4>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Bangladesh Technical Education Technology values guide every focus and our mission—building professional integrity, fostering accuracy, and driving excellence in technical expertise.
          </p>
        </div>
      </div>
    </section>
  );
};