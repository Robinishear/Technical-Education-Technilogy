/* eslint-disable @next/next/no-img-element */
import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Instagram,
  MapPin,
  Globe,
} from "lucide-react";
import Link from "next/link";

const USEFUL_LINKS = [
  { label: "About", href: "/about" },
  { label: "Academic Calendar", href: "/courses" },
  { label: "Student Results", href: "/student-result-page" },
  { label: "Latest Notices", href: "/notices" },
  { label: "Online Exam", href: "/online-exam-page" },
  { label: "Branches Registration", href: "/register" },
];

export const Footer = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const monthName = today.toLocaleString("default", { month: "long" });
  const yearShort = today.getFullYear().toString().slice(-2);

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  ).getDay();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

  return (
    <footer className="bg-[#0a192f] text-white pt-16 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white p-1 rounded-sm shadow-lg">
                <img
                  src="https://i.ibb.co/r2dVnpdh/Screenshot-from-2026-03-04-16-25-16-removebg-preview.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-black text-xl leading-tight tracking-tighter uppercase">
                  Bangladesh Technical
                </h2>
                <p className="text-[#0066cc] text-[11px] font-bold uppercase tracking-widest">
                  Education Technology
                </p>
              </div>
            </Link>

            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ),
              )}
            </div>

            <p className="text-[11px] leading-relaxed text-gray-400 text-justify">
              Empowering the next generation of technical experts through
              innovative education and digital excellence. Join our journey to
              build a smarter Bangladesh.
            </p>
          </div>

          <div className="lg:pl-10 relative">
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-0.5 bg-[#84cc16]"></div>
            <h3 className="text-lg font-black uppercase mb-8 tracking-widest">
              USEFUL LINKS
            </h3>
            <ul className="space-y-3">
              {USEFUL_LINKS.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-xs font-bold text-gray-300 hover:text-[#84cc16] transition-colors border-b border-gray-600 pb-1 inline-block min-w-30"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-black uppercase mb-8 tracking-widest">
                CONTACTS
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                  <Phone size={16} className="text-gray-400" />
                  <span>+8809696-481628</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                  <Mail size={16} className="text-gray-400" />
                  <span>btetbd@gmail.com</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                  <Globe size={16} className="text-gray-400" />
                  <Link
                    href="https://btetbd.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#84cc16] hover:underline"
                  >
                    www.btetbd.com
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                  <MapPin size={16} className="text-gray-400" />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="bg-[#0d2137] rounded-xl p-4 w-full max-w-65 shadow-2xl border border-white/10">
              <div className="flex justify-between items-center mb-4 px-2">
                <button className="text-gray-400 hover:text-white text-xs">
                  ❮
                </button>
                <span className="text-white font-bold text-sm uppercase">
                  {monthName} {yearShort}
                </span>
                <button className="text-gray-400 hover:text-white text-xs">
                  ❯
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-[10px] mb-2 font-bold text-gray-400">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day}>{day}</div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7 text-center gap-y-1">
                {[...Array(firstDayOfMonth)].map((_, i) => (
                  <div key={`empty-${i}`} className="p-1"></div>
                ))}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const isToday = day === currentDay;
                  return (
                    <div
                      key={day}
                      className={`text-[10px] font-bold p-1 transition-all ${
                        isToday
                          ? "bg-[#0066cc] text-white rounded-full scale-110 shadow-lg"
                          : "text-gray-300 hover:bg-white/10 rounded-full cursor-default"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#071121] py-6 border-t border-white/5">
        <div className="container mx-auto px-6 text-center md:text-left">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            © Copyright 2026 Bangladesh Technical Education Technology. All
            Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
