import React from "react";
import { Award, BookOpen, Layers, Unlock } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      title: "Expert Instructor",
      desc: "Get lifetime access to all course resources and videos after enrollment.",
      icon: <BookOpen />,
    },
    {
      title: "Lifetime Access",
      desc: "Learn directly from mentors with real-world industry experience.",
      icon: <Unlock />,
    },
    {
      title: "Complex Solution",
      desc: "Master complex technical troubleshooting through real-life projects.",
      icon: <Layers />,
    },
    {
      title: "Professional Certification",
      desc: "Earn industry-verified certificates that boost your career prospects.",
      icon: <Award />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center dark:bg-black bg-gray-50 rounded-2xl my-6">
      {/* Left side Image simulation holder placeholder */}
      <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg bg-slate-300 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-90" />
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
        <span className="relative text-white font-medium bg-black/40 px-3 py-1 rounded-full text-xs">
          Lab Session Mockup
        </span>
      </div>

      {/* Right side Info text */}
      <div>
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2">
          E-Learn always ensured
        </h2>
        <p className="text-lg font-semibold text-gray-700 mb-6">
          High-Quality Learning Experience
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="p-2.5 bg-blue-600 text-white rounded-lg shadow-md shrink-0">
                {React.cloneElement(f.icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">{f.title}</h4>
                <p className="text-xs text-gray-600 mt-1 leading-normal">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
