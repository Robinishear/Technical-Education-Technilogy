/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const StatsSection = () => {
  const choices = [
    { title: "Trusted Content", text: "Get access to verified and fully updated tech stacks and industry guidelines." },
    { title: "Flexible Courses", text: "Pick schedule models that match your availability and lifestyle flawlessly." },
    { title: "Flexible Hours", text: "Learn at your own pace with options for night-shifts and weekend classes." },
    { title: "24/7 Support", text: "Our dedicated support team is always standing by to clear any development blockers." }
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto font-sans">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Image Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
          <img 
            src="/images/why-choose-us.jpg" 
            alt="Instructor holding Why Choose Us sign" 
            className="w-full h-auto object-cover opacity-90"
          />
        </div>

        {/* Right Side Options List */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-900 mb-2">Why Choose Us?</h2>
          <div className="w-24 h-1 bg-yellow-500 rounded mb-8"></div>

          <div className="space-y-4">
            {choices.map((choice, i) => (
              <div 
                key={i} 
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-200 transition-colors shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mt-0.5">
                  🛡️
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{choice.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{choice.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};