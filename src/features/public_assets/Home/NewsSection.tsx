"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const newsItems = [
  {
    day: "26",
    month: "JANUARY, 2023",
    title: "Applications now open for ACTIMS Women in Trades Awards/Bursaries ",
    description:
      "The ACTIMS Women in Trades Awards/Bursaries Program was created to recognize women who are members of the Canadian Building Trades.",
  },
  {
    day: "18",
    month: "JANUARY, 2023",
    title: "LU2103 meeting on Jan. 20 is cancelled",
    description:
      "The regularly scheduled meeting this Thursday (January 20) for members of LU2103 (located in Calgary and Red Deer) has been cancelled. Members are encouraged to attend the next session in February.",
  },
  {
    day: "15",
    month: "JANUARY, 2023",
    title: "LU1325 member meeting for January ",
    description:
      "Members, the LU1325 monthly member meeting scheduled for Wednesday, January 15 has been cancelled due to unforeseen circumstances. The next meeting will be on February 12.",
  },
  {
    day: "12",
    month: "JANUARY, 2023",
    title: "New safety guidelines issued for construction sites",
    description:
      "The provincial safety authority has released updated guidelines for all active construction sites to ensure worker safety during winter months.",
  },
  {
    day: "10",
    month: "JANUARY, 2023",
    title: "Apprenticeship program deadline extended",
    description:
      "Applicants for the upcoming apprenticeship program now have until January 31 to submit their applications. Early submission is still encouraged.",
  },
  {
    day: "08",
    month: "JANUARY, 2023",
    title: "COVID-19 protocols updated for on-site workers",
    description:
      "All on-site workers must adhere to new COVID-19 safety protocols, including mask mandates and health checks before entering sites.",
  },
  {
    day: "05",
    month: "JANUARY, 2023",
    title: "Union newsletter released for January 2023 edition",
    description:
      "The monthly LU newsletter is now available online, highlighting key updates, events, and training opportunities for members.",
  },
  {
    day: "03",
    month: "JANUARY, 2023",
    title: "Training sessions scheduled for new year",
    description:
      "New training sessions on heavy machinery operation and safety protocols have been scheduled throughout January and February.",
  },
  {
    day: "28",
    month: "DECEMBER, 2022",
    title: "Holiday schedule announced for end of year 2022 and start of 2023 ",
    description:
      "Offices and work sites will observe the holiday schedule from December 24 to January 2. Essential services will operate on reduced hours.",
  },
  {
    day: "22",
    month: "DECEMBER, 2022",
    title: "End-of-year awards ceremony postponed",
    description:
      "Due to safety concerns, the annual awards ceremony celebrating outstanding workers has been postponed to March 2023.",
  },
  {
    day: "20",
    month: "DECEMBER, 2022",
    title: "Workshop on mental health in trades scheduled for December 28",
    description:
      "A special workshop focusing on mental health challenges for tradespeople will be held online on December 28. Registration is free.",
  },
  {
    day: "18",
    month: "DECEMBER, 2022",
    title: "LU2103 training program begins January 5 2023 ",
    description:
      "The new training program for LU2103 members kicks off on January 5, covering safety, equipment handling, and professional development.",
  },
  {
    day: "15",
    month: "DECEMBER, 2022",
    title: "Winter weather advisory for job sites issued kicks in",
    description:
      "Workers and site managers are advised to follow the winter weather advisory to prevent accidents and delays on outdoor projects.",
  },
  {
    day: "12",
    month: "DECEMBER, 2022",
    title: "New membership benefits available starting January 2023",
    description:
      "Members can now access new benefits, including online training modules, health coverage options, and discounted safety equipment.",
  },
  {
    day: "10",
    month: "DECEMBER, 2022",
    title: "Safety award nominations open for 2023 cycle ",
    description:
      "Nominations for the annual safety awards are open. Members can nominate colleagues who demonstrate exceptional adherence to safety standards.",
  },
  {
    day: "08",
    month: "DECEMBER, 2022",
    title: "Workshop: Effective communication on construction sites",
    description:
      "An interactive workshop on effective communication among team members on construction sites will be held December 20 online.",
  },
  {
    day: "05",
    month: "DECEMBER, 2022",
    title: "New equipment handling protocols released",
    description:
      "The latest equipment handling and storage protocols are now in effect for all worksites to minimize accidents and equipment damage.",
  },
  {
    day: "03",
    month: "DECEMBER, 2022",
    title: "End-of-year safety audit results published",
    description:
      "The annual safety audit results have been published. Members are encouraged to review findings and implement recommendations.",
  },
  {
    day: "01",
    month: "DECEMBER, 2022",
    title: "Community engagement program launched",
    description:
      "A new initiative to engage with local communities and support youth in trades has been launched by LU1325 and LU2103.",
  },
  {
    day: "30",
    month: "NOVEMBER, 2022",
    title: "Upcoming webinar on sustainable building",
    description:
      "Members are invited to a webinar discussing sustainable building practices, scheduled for December 10. Registration is required.",
  },
];

export const NewsSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20  dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase">
            Recent <span className="text-[#678E1A]">Union News</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest news and announcements.
          </p>
        </div>

        {/* Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-8 animate-pulse shadow-sm">
                <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 mb-4 rounded"></div>
                <div className="w-32 h-3 bg-gray-200 dark:bg-gray-600 mb-6 rounded"></div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 mb-2 rounded"></div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 mb-2 rounded"></div>
                <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-600 mb-6 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            loop
            speed={800}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {newsItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8 shadow-sm hover:shadow-lg transition-all rounded-lg flex flex-col h-full group">
                  {/* Date */}
                  <div className="mb-6">
                    <span className="text-5xl bg-[#678E1A] w-20 text-center py-1 rounded font-bold text-white block mb-1 leading-none">
                      {item.day}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                      {item.month}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex-1 group-hover:text-[#0077c0] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed mb-6 line-clamp-4">
                    {item.description}
                  </p>

                  {/* Read More */}
                  <a
                    href="#"
                    className="text-[#0077c0] font-bold text-sm flex items-center gap-2 hover:underline"
                  >
                    Read More <ChevronRight size={16} />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Pagination */}
        <div className="custom-pagination flex justify-center mt-10"></div>

        {/* View All */}
        <div className="mt-12 flex justify-end">
          <a
            href="#"
            className="text-[#0077c0] font-bold text-sm flex items-center gap-2 hover:underline"
          >
            View All <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};