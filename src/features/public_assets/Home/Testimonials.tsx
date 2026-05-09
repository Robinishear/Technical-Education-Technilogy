"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  name: string;
  image: string;
  position?: {
    role?: string;
    title?: string;
  };
  items?: {
    title?: string;
    feedback?: string;
  }[];
  bio?: string;
}

export default function InstituteGallery() {
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

  return (
    <section className="py-20 bg-white dark:bg-slate-950 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            INSTITUTE <span className="text-[#0066cc]">GALLERY</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400 dark:text-slate-500 text-xs leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-sm" />
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
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 text-center">
                    <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-1">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-999 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-0 max-w-4xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row">
            
            <button
              className="absolute top-4 right-4 bg-white/20 hover:bg-red-500 text-white w-10 h-10 rounded-full z-30 transition-all flex items-center justify-center backdrop-blur-md"
              onClick={() => setActiveItem(null)}
            >
              ✕
            </button>

            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={activeItem.image || "/placeholder.png"}
                alt={activeItem.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="md:w-1/2 p-10 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-10 bg-[#0066cc] rounded-full"></div>
                <span className="text-[#0066cc] font-black text-[10px] uppercase tracking-widest">Success Story</span>
              </div>
              
              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2 leading-tight">
                {activeItem.name}
              </h3>
              <p className="text-[#678E1A] font-bold text-sm mb-6 uppercase">
                {activeItem.position?.role || "Successful Graduate"}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {activeItem.bio || "আমাদের এই কোর্সের মাধ্যমে অর্জিত দক্ষতা কীভাবে শিক্ষার্থীর ক্যারিয়ারে পরিবর্তন এনেছে তার একটি সংক্ষিপ্ত বিবরণ এখানে দেওয়া হলো।"}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {activeItem.items?.map((tag, i) => (
                    <span 
                      key={i} 
                      className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-100 dark:border-slate-800"
                    >
                      #{tag.title || tag.feedback}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}