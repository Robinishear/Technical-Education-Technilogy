"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import InstructorManagement from "@/features/AdminDashboard/institute-gallery/Instructor/InstructorManagement";
import StudentsManagement from "@/features/AdminDashboard/institute-gallery/Students/StudentsManagement";
import TestimonialsManagement from "@/features/AdminDashboard/institute-gallery/Testimonials/TestimonialsManagement";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Trophy, MessageSquare, LayoutDashboard } from "lucide-react";

export default function InstructorDirectory() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-1 md:p-6 ">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 px-4 ">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl border border-primary/20 shadow-inner">
            <LayoutDashboard className="text-primary" size={28} />
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
              Institute Hub
            </h2>
            <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-70">
              Gallery & Management System
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="instructors" className="w-full">
        
        <div className="px-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all overflow-hidden">
          <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-gray-100/50 dark:bg-white/5 p-1.5 border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-inner w-full md:w-auto">
            
            <TabsTrigger 
              value="instructors" 
              className="flex gap-2 items-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all
                data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <Users size={18} /> 
              <span className="hidden sm:inline">Instructors</span>
            </TabsTrigger>

            <TabsTrigger 
              value="students" 
              className="flex gap-2 items-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all
                data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <Trophy size={18} /> 
              <span className="hidden sm:inline">Student Success</span>
            </TabsTrigger>

            <TabsTrigger 
              value="testimonials" 
              className="flex gap-2 items-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all
                data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <MessageSquare size={18} /> 
              <span className="hidden sm:inline">Testimonials</span>
            </TabsTrigger>

          </TabsList>
        </div>

        <div className="relative">
        <AnimatePresence mode="wait">
  
  <TabsContent value="instructors" className="outline-none" key="instructors">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white dark:bg-gray-950/40 rounded-[2.5rem] border border-gray-200 dark:border-white/10 p-6 md:p-10 shadow-sm dark:shadow-primary/5"
    >
      <InstructorManagement />
    </motion.div>
  </TabsContent>

  <TabsContent value="students" className="outline-none" key="students">
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-950/40 rounded-[2.5rem] border border-gray-200 dark:border-white/10 p-6 md:p-10 shadow-sm dark:shadow-primary/5"
    >
      <StudentsManagement />
    </motion.div>
  </TabsContent>

  <TabsContent value="testimonials" className="outline-none" key="testimonials">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white dark:bg-gray-950/40 rounded-[2.5rem] border border-gray-200 dark:border-white/10 p-6 md:p-10 shadow-sm dark:shadow-primary/5"
  >
    <TestimonialsManagement /> 
  </motion.div>
</TabsContent>

</AnimatePresence>
        </div>
      </Tabs>

    </div>
  );
}