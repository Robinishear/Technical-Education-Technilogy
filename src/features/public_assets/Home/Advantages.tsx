"use client";

import { Lightbulb, ThumbsUp, Clock, Users, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const advantages = [
  {
    icon: <Lightbulb className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />,
    title: "INNOVATION",
    description: "Implementing latest technologies and creative ideas to keep your news portal ahead."
  },
  {
    icon: <ThumbsUp className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />,
    title: "QUALITY",
    description: "Ensuring high-performance, clean code, and bug-free user experience for every visitor."
  },
  {
    icon: <Clock className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />,
    title: "EXPERIENCE",
    description: "Years of expertise in technical education and digital media solutions at your service."
  },
  {
    icon: <Users className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />,
    title: "HAPPY CLIENTS",
    description: "A proven track record of satisfied partners who trust our reliability and approach."
  },
  {
    icon: <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />,
    title: "SUPPORT",
    description: "Dedicated 24/7 technical support to ensure your platform never faces downtime."
  }
];

export const Advantages = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 tracking-tight">
          OUR <span className="text-[#678E1A]">ADVANTAGES</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">
          We combine technical expertise with innovative solutions for your platform.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {advantages.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group p-5 rounded-xl border border-gray-200 dark:border-gray-700 
                       hover:border-[#678E1A] transition-all duration-300 
                       flex flex-col items-center text-center min-h-60 justify-center"
          >
            
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-700 
                            flex items-center justify-center mb-4 text-[#678E1A] 
                            group-hover:bg-[#678E1A]/10 transition-all duration-300">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 tracking-wider uppercase 
                           group-hover:text-[#678E1A] transition-colors duration-300">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug px-2">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};