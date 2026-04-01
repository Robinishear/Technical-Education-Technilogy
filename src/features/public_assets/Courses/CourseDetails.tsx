/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Star, 
  User, 
  Share2, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { showToast } from "@/core/utils/toast-messages";

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/courses/${id}`);
      return data.data;
    },
  });

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#070707]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );

  if (error || !course) return (
    <div className="text-center py-20 dark:text-white">Course not found! </div>
  );

  const discount = course.oldPrice && course.price 
    ? Math.round(((Number(course.oldPrice) - Number(course.price)) / Number(course.oldPrice)) * 100) 
    : 0;

const handleShare = async () => {
  const shareData = {
    title: course?.title || "Check out this course!",
    text: `Hey! I found this amazing course: ${course?.title} by ${course?.instructor}. Check it out!`,
    url: typeof window !== "undefined" ? window.location.href : "", 
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showToast.success("Course shared successfully!");
    } else {
      await navigator.clipboard.writeText(shareData.url);
      showToast.copySuccess();
    }
  } catch (err) {
    console.error("Error sharing:", err);
    showToast.failed(); 
  }
};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070707] pb-20 transition-colors duration-300">
      {/* --- Top Navigation --- */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Courses</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Side: Main Content --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-500 text-xs font-bold uppercase tracking-widest">
                {course.isPublished ? "Active Course" : "Upcoming"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {course.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <User size={18} className="text-cyan-500" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-200">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <span className="font-bold text-gray-900 dark:text-white">{course.rating || "0.0"}</span>
                <span>({course.totalReviews || 0} Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={18} />
                <span>Updated: {new Date(course.updatedAt).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Preview */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10  group bg-black">
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
           
          </div>

          
        </div>

        {/* --- Right Side: Sticky Checkout Card --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white dark:bg-[#121212] rounded-3xl border border-gray-100 dark:border-white/5  overflow-hidden">
            <div className="p-8">
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-black text-gray-900 dark:text-white">${course.price}</span>
                {course.oldPrice && (
                  <span className="text-lg text-gray-400 line-through mb-1">${course.oldPrice}</span>
                )}
                {discount > 0 && (
                   <span className="mb-1.5 px-2 py-0.5 bg-green-500/10 text-green-500 rounded-md font-bold text-xs">
                     {discount}% OFF
                   </span>
                )}
              </div>

              <div className="space-y-4">
                <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98]">
                  Enroll in Course
                </button>
                <button className="w-full py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-[0.98]">
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-8 space-y-5">
                <p className="text-sm font-bold dark:text-gray-200 uppercase tracking-wider">Course Details</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <BookOpen size={16} className="text-cyan-500" />
                      <span>Total Lessons</span>
                    </div>
                    <span className="font-bold dark:text-white text-gray-900">24 Lessons</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <ShieldCheck size={16} className="text-cyan-500" />
                      <span>Access Type</span>
                    </div>
                    <span className="font-bold dark:text-white text-gray-900">Lifetime Access</span>
                  </div>
                </div>
              </div>

             <div 
  onClick={handleShare}
  className="flex items-center justify-between p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-500/5 border border-cyan-100 dark:border-cyan-500/20 cursor-pointer hover:bg-cyan-100 dark:hover:bg-cyan-500/10 transition-all active:scale-95 group"
>
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-full bg-white dark:bg-[#1a1a1a] shadow-sm">
      <Share2 size={18} className="text-cyan-500 group-hover:rotate-12 transition-transform" />
    </div>
    <div>
      <p className="text-[13px] font-bold text-gray-900 dark:text-white">Share Course</p>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium text-nowrap">Invite your friends to learn</p>
    </div>
  </div>
  
  <div className="text-cyan-500">
     <ArrowRight size={16} />
  </div>
</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}