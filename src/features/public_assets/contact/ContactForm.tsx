/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { sendContactMessageAction } from "./contact.actions";
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  BookOpen, 
  Loader2,
  Zap,
  Shield,
  Headphones,
  Globe
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
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
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
      <div className="max-w-2xl mx-auto py-15 p-6">
        <div className="border rounded-2xl p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-gray-500 mt-1 text-sm">আমাদের সাথে যোগাযোগ করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Subject */}
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Sending...</>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}