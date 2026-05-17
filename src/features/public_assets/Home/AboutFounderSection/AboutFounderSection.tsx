/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { AboutSection } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.types";
import { getHeroImageTextsAction } from "@/features/AdminDashboard/Our-Story/HeroImageText/HeroImageText.actions";

const TEXT_LIMIT = 500;

export default function About() {
  const [items, setItems] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<{ title?: string; name?: string; text?: string } | null>(null);

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

  const renderText = (
    text: string | undefined,
    item: { title?: string; name?: string; text?: string }
  ) => {
    if (!text) return null;
    const isLong = text.length > TEXT_LIMIT;
    return (
      <>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {isLong ? text.slice(0, TEXT_LIMIT).trimEnd() + "…" : text}
        </p>
        {isLong && (
          <button
            onClick={() => setModalItem(item)}
            className="mt-2 text-sm font-medium text-[#678E1A] border border-[#678E1A] rounded-lg px-4 py-1.5 hover:bg-[#678E1A]/10 transition-colors"
          >
            Read More
          </button>
        )}
      </>
    );
  };

  return (
    <section className="container space-y-2 max-w-7xl">

      {about && (
        <div className="flex flex-col lg:flex-row items-center gap-16 bg-white dark:bg-black rounded-lg shadow-sm p-6">
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
            className="w-full lg:w-1/2 space-y-5"
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
            {renderText(about.text, about)}
          </motion.div>
        </div>
      )}

      {founder && (
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 bg-white dark:bg-black rounded-lg shadow-sm p-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-5"
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
            {renderText(founder.text, founder)}
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

      {/* Modal */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => setModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-lg w-full max-h-[75vh] overflow-y-auto p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  {modalItem.title && (
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {modalItem.title}
                    </h3>
                  )}
                  {modalItem.name && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {modalItem.name}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setModalItem(null)}
                  className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700 mb-4" />
              {modalItem.text && (
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {modalItem.text}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}