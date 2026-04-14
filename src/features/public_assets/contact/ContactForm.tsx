/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { sendContactMessageAction } from "./contact.actions";
import { 
  Mail, 
  Phone, 

  Loader2,
  Zap,
  Shield,
  Headphones,
  Globe,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await sendContactMessageAction(form);
      if (result.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
     <section 
  className="relative bg-slate-950 py-24 md:py-32 px-6 text-white overflow-hidden"
>
  <div className="absolute inset-0 z-0">
    <img 
      src="/Gemini_Generated_Image_yzt6eiyzt6eiyzt6.png"
      alt="Contact Support Background"
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute  inset-0 bg-slate-800/20 dark:bg-slate-950/80 backdrop-blur-sm"></div>
  </div>

  {/* --- Content Container --- */}
  <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    <div className="text-center md:text-left space-y-6 bg-slate-900/60 p-8 md:p-10 rounded-3xl border border-slate-800 backdrop-blur-lg shadow-2xl">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
        Contact Our <br />
        <span className="text-blue-500 relative">
          Support Team
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
        </span>
      </h1>
      <p className="text-slate-300 max-w-2xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed">
We are here to help you. For any needs, please leave a message or call us directly. Our team will get back to you shortly.
      </p>
      
    </div>

    <div className="hidden md:block"></div>

  </div>
</section>

      {/* --- 4 CARDS SECTION --- */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
            <Zap className="h-8 w-8 text-yellow-500 mb-2" />
            <h3 className="font-semibold">Fast Response</h3>
            <p className="text-xs text-gray-500">We respond very quickly.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
            <Headphones className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-xs text-gray-500">We are available 24/7.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
            <Shield className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-semibold">Secure Data</h3>
            <p className="text-xs text-gray-500">Your information is secure.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
            <Globe className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-semibold">Global Help</h3>
            <p className="text-xs text-gray-500">Help available from any country.</p>
        </div>
      </div>

      {/* --- YOUR ORIGINAL FORM (100% UNCHANGED) --- */}
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#E0F2F7] dark:bg-slate-950 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12 space-y-2">
          <div className="flex items-center justify-center space-x-4">
             <div className="h-px w-12 bg-slate-400" />
             <h2 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                Contact Us
             </h2>
             <div className="h-px w-12 bg-slate-400" />
          </div>
          <p className="text-slate-500 font-bold tracking-widest text-sm uppercase">Get in touch with our team</p>
        </div>

        {/* --- Main Creative Container --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[40px]">
          
          {/* LEFT COLUMN: The Form (Dark Slate Part) */}
          <div className="lg:col-span-7 bg-[#547585] dark:bg-slate-900 p-10 md:p-16 relative">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-white text-xs font-bold uppercase ml-1">Name</label>
                  <div className="relative">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white dark:bg-slate-800 px-4 py-3 rounded-none border-0 text-slate-900 dark:text-white focus:ring-4 focus:ring-cyan-400/30 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-white text-xs font-bold uppercase ml-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white dark:bg-slate-800 px-4 py-3 rounded-none border-0 text-slate-900 dark:text-white focus:ring-4 focus:ring-cyan-400/30 outline-none transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-white text-xs font-bold uppercase ml-1">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-slate-800 px-4 py-3 rounded-none border-0 text-slate-900 dark:text-white focus:ring-4 focus:ring-cyan-400/30 outline-none transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-white text-xs font-bold uppercase ml-1">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-slate-800 px-4 py-3 rounded-none border-0 text-slate-900 dark:text-white focus:ring-4 focus:ring-cyan-400/30 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-white text-xs font-bold uppercase ml-1">Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white dark:bg-slate-800 px-4 py-3 rounded-none border-0 text-slate-900 dark:text-white focus:ring-4 focus:ring-cyan-400/30 outline-none transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="bg-cyan-200 hover:bg-cyan-300 text-slate-800 font-black px-10 py-4 uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
              </button>
            </form>

            {/* Wavy Bottom Decoration (Image-er moto) */}
            <div className="absolute bottom-0 left-0 right-0 flex overflow-hidden h-6 translate-y-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="min-w-12.5 h-12.5 bg-[#547585] dark:bg-slate-900 rounded-full -translate-y-1/2" />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Info Panel (White/Paper Part) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-10 md:p-16 flex flex-col justify-between relative">
            <div className="space-y-8">
              <div className="inline-block border-2 border-slate-900 dark:border-white px-6 py-2 rounded-full">
                <p className="font-black text-sm uppercase tracking-tighter italic">Drop in our office</p>
              </div>

              <div className="space-y-6 text-slate-600 dark:text-slate-300">
                <p className="text-sm font-medium leading-relaxed italic border-l-4 border-cyan-400 pl-4">
                  "Building digital experiences that matter. Connect with us to start your next big project."
                </p>

                <div className="space-y-4 pt-4">
                   <div className="flex items-center space-x-4 group">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 flex items-center justify-center rounded-full group-hover:bg-cyan-400 group-hover:text-white transition-all">
                        <Phone size={18} />
                      </div>
                      <span className="font-bold">+880 1334757898</span>
                   </div>
                   <div className="flex items-center space-x-4 group">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 flex items-center justify-center rounded-full group-hover:bg-rose-400 group-hover:text-white transition-all">
                        <Mail size={18} />
                      </div>
                      <span className="font-bold ">mdrobinahmed57898@gmail.com
</span>
                   </div>
                   <div className="flex items-center space-x-4 group">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 flex items-center justify-center rounded-full group-hover:bg-indigo-400 group-hover:text-white transition-all">
                        <MapPin size={18} />
                      </div>
                      <span className="font-bold">Mymensingh, Bangladesh</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="pt-12">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-slate-400">Follow Us</p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <button key={i} className="p-3 border-2 border-slate-100 dark:border-slate-700 rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div> */}

            {/* --- Social Links Section --- */}
<div className="pt-12">
  <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-slate-400">
    Follow Us
  </p>
  
  <div className="flex space-x-4">
    {[
      { Icon: Facebook, url: "https://www.facebook.com/md.robin.ahmed.548869", color: "hover:text-blue-600 hover:border-blue-600" },
      { Icon: Twitter, url: "https://twitter.com/your-profile", color: "hover:text-sky-500 hover:border-sky-500" },
      { Icon: Instagram, url: "https://instagram.com/your-profile", color: "hover:text-pink-500 hover:border-pink-500" },
      { Icon: Linkedin, url: "https://www.linkedin.com/in/md-robin1/", color: "hover:text-indigo-600 hover:border-indigo-600" }
    ].map((social, i) => (
      <a
        key={i}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-3 border-2 border-slate-100 dark:border-slate-700 rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
      >
        <social.Icon size={20} />
      </a>
    ))}
  </div>
</div>

            {/* Bottom Wavy Effect for Right Side */}
            <div className="absolute bottom-0 left-0 right-0 flex overflow-hidden h-6 translate-y-full">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="min-w-15 h-15 bg-white dark:bg-slate-800 rounded-full -translate-y-1/2" />
              ))}
            </div>
          </div>
        </div>

        {/* Background Decorative Text (Optional) */}
        <div className="mt-20 justify-between items-center px-10 opacity-20 hidden md:flex">
           <span className="text-8xl font-black tracking-tighter text-slate-400">CONNECT</span>
           <div className="flex space-x-2">
             <div className="w-3 h-3 bg-slate-400 rounded-full" />
             <div className="w-3 h-3 bg-slate-400 rounded-full" />
             <div className="w-3 h-3 bg-slate-400 rounded-full" />
           </div>
        </div>

      </div>
    </section>
    </div>
  );
}