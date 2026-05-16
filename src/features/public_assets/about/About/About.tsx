/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getAboutSectionsAction } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.actions";
import { AboutSection } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.types";

export default function About() {
  const [items, setItems] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const result = await getAboutSectionsAction();
      if (!ignore) {
        setItems(result.data ?? []);
        setLoading(false);
      }
    };
    fetchData();
    return () => { ignore = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="animate-spin text-[#678E1A]" size={32} />
      </div>
    );
  }

  if (!items.length) return null;

  return (
    <section className="container mx-auto px-6 py-4 space-y-8 bg-white dark:bg-gray-900">
      {items.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={item.id ?? index}
            className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <div className="relative w-full h-87.5 rounded shadow overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title ?? "Section Image"}
                    className="w-full h-full object-cover brightness-100 dark:brightness-75 contrast-100 dark:contrast-110"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 dark:bg-black/20" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8"
            >
              {item.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                  {item.title}
                </h2>
              )}
              {item.name && (
                <p className="text-sm font-semibold text-[#678E1A] uppercase tracking-widest">
                  {item.name}
                </p>
              )}
              <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600" />
              {item.text && (
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.text}
                </p>
              )}
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}