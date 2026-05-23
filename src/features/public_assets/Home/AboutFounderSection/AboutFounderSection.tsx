/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { AboutSection } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.types";
import { getHeroImageTextsAction } from "@/features/AdminDashboard/Our-Story/HeroImageText/HeroImageText.actions";

const TEXT_LIMIT = 1800;

export default function About() {
  const [items, setItems] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<{
    title?: string;
    name?: string;
    text?: string;
  } | null>(null);

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
    return () => {
      ignore = true;
    };
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
    item: { title?: string; name?: string; text?: string },
    buttonVariant: "black" | "green" = "black",
  ) => {
    if (!text) return null;
    const isLong = text.length > TEXT_LIMIT;
    return (
      <>
        <div className="text-[13px] text-gray-800 dark:text-gray-300 leading-relaxed font-normal space-y-3 whitespace-pre-line">
          {isLong ? text.slice(0, TEXT_LIMIT).trimEnd() + "…" : text}
        </div>
        {isLong && (
          <button
            onClick={() => setModalItem(item)}
            className={`mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all transform hover:scale-[1.02] ${
              buttonVariant === "black"
                ? "bg-black hover:bg-black/90"
                : "bg-[#678E1A] hover:bg-[#678E1A]/90"
            }`}
          >
            Read More
          </button>
        )}
      </>
    );
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 space-y-24 bg-white dark:bg-transparent">
      {/* ── 1. ABOUT US / FIRST SECTION ── */}
      {about && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Side: Image */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col items-center w-full max-w-95 mx-auto">
            <div className="w-full relative border-[1.5px] border-slate-300 dark:border-slate-700 rounded-[20px] overflow-hidden p-0.5 bg-gray-50 dark:bg-slate-900 shadow-md">
              <div className="w-full bg-white dark:bg-slate-950 flex justify-center items-center rounded-t-[18px] p-2">
                {about.image && (
                  <img
                    src={about.image}
                    alt={about.title || "About Image"}
                    className="w-auto h-full max-h-105 object-contain rounded-t-[14px]"
                  />
                )}
              </div>
              <div className="w-full bg-[#0D1E3D] text-center py-4 px-4 rounded-b-[18px] relative z-10">
                <h3 className="text-white font-bold text-xl tracking-wide">
                  {about.name || "MR ROBIN AHMED"}
                </h3>
                <p className="text-gray-300 text-sm font-medium mt-1">
                  {about.title || "Executive Director"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Text */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-start">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
              {about.title || "MR ROBIN AHMED"}
            </h2>
            <div className="flex-1 overflow-y-auto max-h-105 pr-2 custom-scrollbar">
              {renderText(about.text, about, "black")}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 2. FOUNDER & CEO SECTION ── */}
      {founder && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6"
        >
          {/* Left Side: Text */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                FOUNDER <span className="text-[#678E1A]">&</span> CEO
              </h2>
              <div className="flex-1 h-0.75 bg-[#678E1A] ml-2 max-w-30" />
            </div>

            <div className="flex-1 overflow-y-auto max-h-112.5 pr-2 custom-scrollbar">
              {renderText(founder.text, founder, "green")}

              <div className="mt-6 border-t border-gray-100 dark:border-slate-800 pt-4 text-xs text-gray-500">
                <p className="font-bold text-gray-800 dark:text-gray-200">Sincerely,</p>
                <p className="font-extrabold text-sm text-gray-900 dark:text-white mt-1 uppercase">
                  Kosuke Yoshida
                </p>
                <p className="text-gray-500">CEO, SK Japan Export Co. Ltd</p>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="lg:col-span-5 flex flex-col items-center w-full max-w-95 mx-auto">
            <div className="w-full relative border-[1.5px] border-slate-300 dark:border-slate-700 rounded-[20px] overflow-hidden p-0.5 bg-gray-50 dark:bg-slate-900 shadow-md">
              <div className="w-full bg-white dark:bg-slate-950 flex justify-center items-center rounded-t-[18px] p-2">
                {founder.image && (
                  <img
                    src={founder.image}
                    alt={founder.name || "Founder"}
                    className="w-auto h-full max-h-105 object-contain rounded-t-[14px]"
                  />
                )}
              </div>
              <div className="w-full bg-[#0D1E3D] text-center py-4 px-4 rounded-b-[18px] relative z-10">
                <h3 className="text-white font-bold text-xl tracking-wide">
                  {founder.name || "Mosfiqur Rahman"}
                </h3>
                <p className="text-gray-300 text-sm font-medium mt-1">
                  {founder.title || "Founder & CEO"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── MODAL ── */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {modalItem.title || "Details"}
                  </h3>
                  {modalItem.name && (
                    <p className="text-sm font-semibold text-[#678E1A] mt-1">
                      {modalItem.name}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setModalItem(null)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-slate-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="w-full h-px bg-gray-200 dark:bg-slate-800 mb-6" />
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {modalItem.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}