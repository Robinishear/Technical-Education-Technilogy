/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const MissionSection = () => {
  const features = [
    {
      icon: "👤",
      title: "Expert Instructor",
      desc: "Learn from industry experts with years of practical experience."
    },
    {
      icon: "🔒",
      title: "Lifetime Access",
      desc: "Enjoy lifetime access to all course materials and future updates."
    },
    {
      icon: "💡",
      title: "Complex Solution",
      desc: "Master complex tech concepts with simplified step-by-step solutions."
    },
    {
      icon: "💼",
      title: "Professional Certification",
      desc: "Earn a globally recognized certificate to boost your career prospects."
    }
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto bg-slate-50 rounded-2xl my-10 font-sans">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Large Visual Image */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img 
            src="/images/classroom.jpg" 
            alt="Students in a tech computer lab" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right Side: Features Content */}
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">E-Learn Always Ensured</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-8">
            High-Quality Learning Experience
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl font-semibold">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};