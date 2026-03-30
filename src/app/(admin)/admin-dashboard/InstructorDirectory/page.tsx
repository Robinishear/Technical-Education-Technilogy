"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Instructor from "@/features/AdminDashboard/institute-gallery/Instructor";
import Students from "@/features/AdminDashboard/institute-gallery/Students";
import Testimonials from "@/features/AdminDashboard/institute-gallery/Testimonials";
import { motion } from "framer-motion";
import { Users, Trophy, MessageSquare } from "lucide-react";

export default function InstructorDirectory() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-6 shadow-sm backdrop-blur-xl rounded-2xl  border">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground text-sm">
          Manage instructors, student success, and testimonials
        </p>
      </div>

      <Tabs defaultValue="instructors" className="w-full">
        
        {/* Tabs List */}
        <TabsList className="grid grid-cols-3 bg-muted p-1 rounded-xl">
          
          <TabsTrigger value="instructors" className="flex gap-2 items-center">
            <Users size={16} /> Instructor
          </TabsTrigger>

          <TabsTrigger value="students" className="flex gap-2 items-center">
            <Trophy size={16} /> Students
          </TabsTrigger>

          <TabsTrigger value="testimonials" className="flex gap-2 items-center">
            <MessageSquare size={16} /> Testimonials
          </TabsTrigger>

        </TabsList>

        {/* Content */}
        <div className="mt-6">
          
          <TabsContent value="instructors">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border shadow-sm"
            >
            
            <Instructor />
            </motion.div>
          </TabsContent>

          <TabsContent value="students">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border  shadow-sm"
            >
             <Students/>
            </motion.div>
          </TabsContent>

          <TabsContent value="testimonials">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border  shadow-sm"
            >
             <Testimonials/>
            </motion.div>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}