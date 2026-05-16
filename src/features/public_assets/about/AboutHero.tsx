import React from 'react';

export const AboutHero = () => {
  return (
    <section className="py-4 px-6 font-sans container mx-auto">
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💡</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-gray-100">Vision</h4>
          </div>
          <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed">
            To be a leading technical education provider recognized for empowering future-ready professionals and setting new benchmarks in skill-based learning and technological advancement.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎯</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-gray-100">Mission</h4>
          </div>
          <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed">
            To deliver industry-aligned technical education powered by expert faculty, hands-on training, and cutting-edge resources, making world-class technical skills accessible to everyone.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">👤</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-gray-100">Our Values</h4>
          </div>
          <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed">
            Bangladesh Technical Education Technology values guide every focus and our mission—building professional integrity, fostering accuracy, and driving excellence in technical expertise.
          </p>
        </div>

      </div>
    </section>
  );
};