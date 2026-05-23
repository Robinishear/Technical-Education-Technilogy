import React from "react";
import { Eye, Globe, ShieldCheck } from "lucide-react";

export default function VisionMission() {
  const cards = [
    {
      title: "Vision",
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      text: "To be a leading technical education provider recognized for empowering future-ready professionals and setting new benchmarks in skill-based learning and technological advancement.",
    },
    {
      title: "Mission",
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      text: "To provide industry-aligned technical education powered by expert faculty, hands-on training, and cutting-edge innovation—making world-class technical skills accessible to everyone.",
    },
    {
      title: "Our Values",
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      text: "Bangladesh Technical Education Technology, our values guide every lesson and lab session—building professional integrity, fostering curiosity, and driving excellence in technical expertise.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 dark:bg-black gap-6 p-6 max-w-7xl mx-auto">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="border-2 border-dashed dark:bg-black border-gray-300 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group hover:border-blue-400"
        >
          <div className="bg-blue-50 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform duration-200">
            {card.icon}
          </div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">{card.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{card.text}</p>
        </div>
      ))}
    </div>
  );
}
