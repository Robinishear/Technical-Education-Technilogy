"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { getHeroImageTextsAction } from "@/features/AdminDashboard/Our-Story/HeroImageText/HeroImageText.actions";
import { HeroImageText } from "@/features/AdminDashboard/Our-Story/HeroImageText/HeroImageText.types";

export default function AboutFounderSection() {
  const [items, setItems] = useState<HeroImageText[]>([]);
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

  return (
    <section className="container mx-auto px-6 py-20 space-y-24 bg-white dark:bg-gray-900">

      {/* ================= ABOUT ================= */}
      <div className="flex flex-col lg:flex-row items-center gap-16">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="relative w-full h-87.5 rounded shadow overflow-hidden">
            {about?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={about.image}
                alt="About Us"
                className="w-full h-full object-cover brightness-100 dark:brightness-75 contrast-100 dark:contrast-110"
              />
            ) : (
              <Image
                src="/happy-teacher-with-students-background.jpg"
                alt="About Us"
                fill
                className="object-cover brightness-100 dark:brightness-75 contrast-100 dark:contrast-110"
              />
            )}
            <div className="absolute inset-0 bg-black/0 dark:bg-black/20" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
            {about?.title ? (
              <span>{about.title}</span>
            ) : (
              <>ABOUT <span className="text-[#678E1A]">US</span></>
            )}
          </h2>
{about?.name && (
            <p className="text-sm font-semibold text-[#678E1A] uppercase tracking-widest">
              {about.name}
            </p>
          )}
          <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600" />

          <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-5">
            {about?.text ? (
              <p>{about.text}</p>
            ) : (
              <>
                <p>
                  Bangladesh Technical Education Technology is at the forefront of driving digital
                  transformation in the vocational and technical sector. We are committed to bridging
                  the gap between traditional learning and modern industry demands.
                </p>
                <p>
                  Our mission is to empower the youth of Bangladesh with technical excellence
                  and innovative skill sets, building a workforce ready for global challenges.
                </p>
              </>
            )}
          </div>

          

        
        </motion.div>
      </div>

      {/* ================= FOUNDER ================= */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-16">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
            {founder?.title ? (
              <span>{founder.title}</span>
            ) : (
              <>FOUNDER <span className="text-[#678E1A]">& CEO</span></>
            )}
          </h2>
              {founder?.name && (
            <div className="space-y-1">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{founder.name}</p>
              {/* <p className="text-sm text-[#678E1A] font-semibold uppercase tracking-widest">
                Founder & CEO
              </p> */}
            </div>
          )}

          <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600" />

          <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-5">
            {founder?.text ? (
              <p>{founder.text}</p>
            ) : (
              <p>
                Mosfiqur Rahman, the visionary founder and CEO of Bangladesh Technical Education
                Technology, has been a driving force behind the organization&apos;s mission to revolutionize
                technical education in Bangladesh. With a background in engineering and a passion for
                education, Mosfiqur has dedicated his career to empowering the youth of Bangladesh.
              </p>
            )}
          </div>

      

     
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/3"
        >
          <div className="relative w-full h-105 rounded shadow overflow-hidden">
            {founder?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={founder.image}
                alt="Founder"
                className="w-full h-full object-cover brightness-100 dark:brightness-75 contrast-100 dark:contrast-110"
              />
            ) : (
              <Image
                src="/inspiring-new-boss.jpg"
                alt="Founder"
                fill
                className="object-cover brightness-100 dark:brightness-75 contrast-100 dark:contrast-110"
              />
            )}
          </div>
        </motion.div>

      </div>

    </section>
  );
}