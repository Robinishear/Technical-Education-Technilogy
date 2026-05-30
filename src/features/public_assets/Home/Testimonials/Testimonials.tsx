"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GalleryItem } from "./types";

export default function Testimonials() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`);
        const data = await res.json();
        setGallery(data?.data || []);
      } catch (err) {
        console.error("❌ Error fetching gallery data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (!loading && !gallery.length) return null;

  return (
    <section className="py-3 bg-white shadow-sm dark:bg-black font-sans">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            INSTITUTE <span className="text-[#678E1A]">GALLERY</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative aspect-4/3 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name || "Gallery Image"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-1">
                    View Details
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-999 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl">
            <button
              className="absolute top-4 right-4 bg-white/20 hover:bg-red-500 text-white w-10 h-10 rounded-full z-30 transition-all flex items-center justify-center backdrop-blur-md"
              onClick={() => setActiveItem(null)}
            >
              ✕
            </button>
            <div className="relative w-[90vw] max-w-2xl h-[80vh]">
              <Image
                src={activeItem.image || "/placeholder.png"}
                alt={activeItem.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}