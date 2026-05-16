
import React from 'react';

export const AboutHero = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto font-sans">
   

  
      <div className="grid md:grid-cols-3 gap-6">
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