/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { getAboutSectionsAction } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.actions";
import { AboutSection } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.types";

const TEXT_LIMIT = 250; 

export default function About() {
  const [items, setItems] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<AboutSection | null>(null);

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
    <section className="container mx-auto px-6 py-4 space-y-6 bg-white dark:bg-gray-900">
      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        const isLong = (item.text?.length ?? 0) > TEXT_LIMIT;
        const shortText = isLong
          ? item.text!.slice(0, TEXT_LIMIT).trimEnd() + "…"
          : item.text;

        return (
          <motion.div
            key={item.id ?? index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${
              isEven ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-10 bg-white dark:bg-black rounded-2xl shadow-sm p-6`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-87.5 rounded-xl overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title ?? "Section Image"}
                    className="w-full h-full object-cover brightness-100 dark:brightness-75 contrast-100 dark:contrast-110"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 dark:bg-black/20" />
              </div>
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 space-y-5">
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
              {shortText && (
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {shortText}
                </p>
              )}
              {isLong && (
                <button
                  onClick={() => setModalItem(item)}
                  className="mt-1 text-sm font-medium text-[#678E1A] border border-[#678E1A] rounded-lg px-4 py-1.5 hover:bg-[#678E1A]/10 transition-colors"
                >
                  Read More
                </button>
              )}
            </div>
          </motion.div>
        );
      })}

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
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  {modalItem.name && (
                    <p className="text-xs font-semibold text-[#678E1A] uppercase tracking-widest mb-1">
                      {modalItem.name}
                    </p>
                  )}
                  {modalItem.title && (
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {modalItem.title}
                    </h3>
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