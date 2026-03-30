/* eslint-disable @next/next/no-img-element */
import { Phone, Mail, Facebook, Twitter, Youtube, Linkedin, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
<footer className="dark:bg-gray-900 text-slate-900 dark:text-slate-300 pt-20">      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <img
                  src="https://i.ibb.co/r2dVnpdh/Screenshot-from-2026-03-04-16-25-16-removebg-preview.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-red-500 font-bold text-lg md:text-xl leading-tight">
                  BANGLADESH <span className="text-blue-700">TECHNICAL</span>
                </h1>
                <p className="text-green-500 text-[10px] md:text-[11px] font-semibold uppercase">
                  EDUCATION TECHNOLOGY
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 dark:text-gray-400">
              Empowering the next generation of technical experts through innovative education and digital excellence. Join our journey to build a smarter Bangladesh.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#e11d48] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className=" text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#e11d48]"></span> SERVICES
            </h3>
            <ul className="space-y-4">
              {['Digital Literacy', 'Skill Development', 'Technical Support', 'Online Certification', 'E-Learning Portal'].map((item) => (
                <li key={item}>
                  <a className="text-sm hover:text-[#e11d48] flex items-center gap-2 group transition-colors" href="#">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className=" text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-blue-500"></span> QUICK LINKS
            </h3>
            <ul className="space-y-4">
              {['About BTEB', 'Academic Calendar', 'Exam Results', 'Latest Notices', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a className="text-sm hover:text-blue-500 flex items-center gap-2 group transition-colors" href="#">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className=" text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-green-500"></span> CONTACT US
            </h3>
            <div className="space-y-6">

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-green-500 transition-colors">
                  <MapPin size={20} className="text-green-500" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-semibold">Our Location</p>
                  <p className="text-slate-400 dark:text-gray-400">Agargaon, Sher-e-Bangla Nagar, Dhaka</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#e11d48] transition-colors">
                  <Phone size={20} className="text-[#e11d48]" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-semibold">Call Support</p>
                  <p className="text-slate-400 dark:text-gray-400">+880 1234 567 890</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                  <Mail size={20} className="text-blue-500" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-semibold">Email Us</p>
                  <p className="text-slate-400 dark:text-gray-400">info@bteb.gov.bd</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/5 py-8 shadow-sm dark:bg-gray-950">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            © 2026 Bangladesh Technical Education Board. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Terms', 'Support', 'FAQ'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-bold hover:text-white transition-colors uppercase tracking-wider">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};