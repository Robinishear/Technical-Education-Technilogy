"use client";

import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="relative py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-100 h-100 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 backdrop-blur-xl  flex flex-col md:flex-row">

          <div className="md:w-1/3 bg-linear-to-br bg-gray-700 dark:bg-gray-800 p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Contact Our School
              </h2>
              <p className="opacity-90 mb-8 text-sm md:text-base">
                Have questions about our School Management System? Reach out for support or information.
              </p>

              <div className="space-y-5 text-sm">
                <div className="flex items-center gap-3">
                  <Mail size={18} /> <span>mdrobinahmed57898@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} /> <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="mt-10 text-xs opacity-80">
              © 2026 School Management System
            </div>
          </div>

          <div className="md:w-2/3 p-10">
            <form className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-400 text-sm">
                    Student / Guardian Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-5 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-cyan-500 outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-400 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-5 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-cyan-500 outline-none transition"
                  />
                </div>

              </div>

              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-400 text-sm">
                  Your Message / Inquiry
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your question..."
                  className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-5 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-cyan-500 outline-none transition"
                />
              </div>

              <button className="flex items-center justify-center gap-3 w-full bg-gray-700 dark:bg-gray-800 text-white py-3 rounded-xl hover:scale-[1.02] transition shadow-lg">
                Submit Inquiry <Send size={18} />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}