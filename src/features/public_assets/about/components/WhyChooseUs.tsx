import React from "react";
import { ShieldCheck, Layers, HelpCircle, FileText } from "lucide-react";

export default function WhyChooseUs() {
  const genericText =
    '"Our mission is to provide rigorous, research-backed information. Every guide we publish undergoes a multi-step editor process to ensure technical accuracy and practical relevance. We don\'t just curate data; we provide solutions based on real-world experience."';

  const reasons = [
    {
      title: "Trusted Content",
      desc: genericText,
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
    },
    {
      title: "Flexible Courses",
      desc: genericText,
      icon: <FileText className="w-5 h-5 text-white" />,
    },
    {
      title: "Flexible Courses",
      desc: genericText,
      icon: <Layers className="w-5 h-5 text-white" />,
    },
    {
      title: "24/7 Support",
      desc: "We provide 24/7 online support to all our students. Our expert team is always ready to help you solve any problems in your career path.",
      icon: <HelpCircle className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 dark:bg-black grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white my-10">
      {/* Left Banner Section */}
      <div className="lg:col-span-5 relative bg-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center min-h-105 shadow-sm border overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center opacity-25 grayscale" />
        <div className="relative bg-white/90 backdrop-blur-sm border-2 border-slate-800 p-8 rounded-xl shadow-xl max-w-xs text-center">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
            WHY CHOOSE US?
          </h3>
        </div>
      </div>

      {/* Right List Accents */}
      <div className="lg:col-span-7 space-y-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-blue-900">Why Choose Us?</h2>
          <p className="text-xs text-gray-500 mt-1">
            Here are some reasons why students choose our institute.
          </p>
        </div>

        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-200"
          >
            <div className="bg-blue-800 p-2.5 rounded-full shrink-0 shadow-sm">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
