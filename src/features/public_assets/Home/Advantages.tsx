"use client";

import { Lightbulb, ThumbsUp, Clock, Users, MessageCircle } from "lucide-react";

const advantages = [
  {
    icon: Lightbulb,
    title: "INNOVATION",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eimod.",
  },
  {
    icon: ThumbsUp,
    title: "QUALITY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eimod.",
  },
  {
    icon: Clock,
    title: "EXPERIENCE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eimod.",
  },
  {
    icon: Users,
    title: "HAPPY CLIENTS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eimod.",
  },
  {
    icon: MessageCircle,
    title: "SUPPORT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eimod.",
  },
];

export const Advantages = () => {
  return (
    <div className="w-full px-4 py-10 bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          OUR <span className="text-[#7ab61a]">ADVANTAGES</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
          nonummy eimod tempor invidunt ut labore in dolore magna aliquyam erat.
        </p>
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {advantages.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group flex flex-col items-center text-center px-3 py-4"
            >
              {/* Circle icon */}
              <div
                className="w-22 h-22 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 transition-all duration-200 group-hover:border-[#7ab61a] group-hover:bg-[#f2f8e6] dark:group-hover:bg-[#1a2e05]"
                style={{ width: 88, height: 88 }}
              >
                <Icon size={30} className="text-[#7ab61a]" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <p className="text-[11px] font-bold tracking-widest uppercase text-gray-800 dark:text-gray-200 mb-2">
                {item.title}
              </p>

              {/* Description */}
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
