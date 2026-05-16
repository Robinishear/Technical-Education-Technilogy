/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AboutSection } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.types";
import { getHeroImageTextsAction } from "@/features/AdminDashboard/Our-Story/HeroImageText/HeroImageText.actions";

export default function About() {
  const [items, setItems] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const result = await getHeroImageTextsAction();
      if (!ignore) {
        setItems(result.data ?? []);
        setLoading(false);
      }
    };
    fetchData();
    return () => { ignore = true; };
  }, []);

  const about = items[0];
  const founder = items[1];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="animate-spin text-[#678E1A]" size={32} />
      </div>
    );
  }

  if (!about && !founder) return null;

  return (
    <section className="container  space-y-2 max-w-7xl">

      {about && (
        <div className="flex flex-col lg:flex-row items-center gap-16 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full h-87.5 rounded shadow overflow-hidden">
              {about.image && (
                <img
                  src={about.image}
                  alt="About Us"
                  className="w-full h-full object-cover brightness-100 dark:brightness-75 contrast-100 dark:contrast-110"
                />
              )}
              <div className="absolute inset-0 bg-black/0 dark:bg-black/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {about.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                {about.title}
              </h2>
            )}
            {about.name && (
              <p className="text-sm font-semibold text-[#678E1A] uppercase tracking-widest">
                {about.name}
              </p>
            )}
            <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600" />
            {about.text && (
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {about.text}
              </p>
            )}
          </motion.div>
        </div>
      )}

      {founder && (
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {founder.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                {founder.title}
              </h2>
            )}
            {founder.name && (
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {founder.name}
              </p>
            )}
            <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600" />
            {founder.text && (
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {founder.text}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className="relative w-full h-105 rounded shadow overflow-hidden">
              {founder.image && (
                <img
                  src={founder.image}
                  alt="Founder"
                  className="w-full h-full object-cover brightness-100 dark:brightness-75 contrast-100 dark:contrast-110"
                />
              )}
            </div>
          </motion.div>
        </div>
      )}

    </section>
  );
}