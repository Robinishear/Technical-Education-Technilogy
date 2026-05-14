/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const TeamSection = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto font-sans">
      <div className="grid md:grid-cols-12 gap-8 items-center">
        
        {/* Left Grid Area: Text Content */}
        <div className="md:col-span-5 space-y-6">
          <h2 className="text-3xl font-extrabold text-blue-900 leading-tight">
            Providing project-based classes is our specialty
          </h2>
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>
              We focus on building practical development expertise. Our project-centric layout allows you to write production-ready code from the start. Throughout the course, you will be able to build a personal portfolio to showcase your practical skills to potential employers.
            </p>
            <p>
              We focus on building practical development expertise. Our project-centric layout allows you to write production-ready code from the start. Throughout the course, you will be able to build a personal portfolio to showcase your practical skills to potential employers.
            </p>
          </div>
        </div>

        {/* Right Grid Area: 4-Box Image Collage */}
        <div className="md:col-span-7 grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden shadow-sm h-40">
            <img src="/images/lab-1.jpg" alt="Lab student session" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm h-40">
            <img src="/images/lab-2.jpg" alt="Practical site work" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm h-40">
            <img src="/images/lab-3.jpg" alt="Electrical workshop" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm h-40">
            <img src="/images/lab-4.jpg" alt="Technical alignment" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
};