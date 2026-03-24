"use client";

import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa"; 

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t  mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold text-primary mb-4">Vexio Platform</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              আপনার শেখার যাত্রাকে সহজ এবং আনন্দময় করতে আমরা আছি আপনার পাশে। 
              সেরা সব কোর্স এবং রিয়েল-টাইম সাপোর্ট নিয়ে আমাদের এই প্ল্যাটফর্ম।
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/courses" className="hover:text-primary transition">All Courses</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition">Terms & Conditions</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-xl text-muted-foreground hover:text-blue-600 transition"><FaFacebook /></Link>
              <Link href="#" className="text-xl text-muted-foreground hover:text-black transition"><FaGithub /></Link>
              <Link href="#" className="text-xl text-muted-foreground hover:text-blue-500 transition"><FaLinkedin /></Link>
              <Link href="#" className="text-xl text-muted-foreground hover:text-red-600 transition"><FaYoutube /></Link>
            </div>
          </div>

        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Mr Robin Ahmed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};