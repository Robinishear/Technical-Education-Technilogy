/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function ProjectSpecialty() {
  const innerText =
    "We believe in skills gained through practical projects. A great number of people struggle to start their career in the tech field for only having conceptual knowledge. Creative IT makes sure to provide hands-on training to prepare you for job markets. Our course module contains projects that are designed to track your progress. During the course, you will be able to make a portfolio yourself to showcase your practical skills to the potential employers.";

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 dark:bg-black lg:grid-cols-2 gap-8 my-8 border-b pb-12">
      <div>
        <h2 className="text-3xl font-bold text-blue-800 mb-6 leading-snug">
          Providing project-based
          <br />
          classes is our specialty
        </h2>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed text-justify">
          <p>{innerText}</p>
          <p>{innerText}</p>
        </div>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-2 gap-3">
        {[
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
        ].map((src, i) => (
          <div
            key={i}
            className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:scale-[1.02] transition-transform"
          >
            <img
              src={src}
              alt="Lab work"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
