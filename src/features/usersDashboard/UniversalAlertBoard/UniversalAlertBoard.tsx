"use client";

import { useState, useEffect } from "react";
import { Loader2, LayoutGrid, BellRing } from "lucide-react";

import LinkResourceTable from "./LinkResourceTable"; 
import PDFResourceTable from "./PDFResourceTable";   
import { getAllTaskDataAction } from "@/features/AdminDashboard/UniversalAlertBoard/Team-meeting-task-data/actions/task-data.actions";
import { getAllCompleteNewAction } from "@/features/AdminDashboard/UniversalAlertBoard/CompleteNewPDF/actions/complete-new.actions";
import { CompleteNewData } from "@/features/AdminDashboard/UniversalAlertBoard/CompleteNewPDF/Types/complete-new.types";
import { TaskData } from "@/features/AdminDashboard/UniversalAlertBoard/Team-meeting-task-data/types/task-data.types";



export default function UniversalAlertBoard() {
  const [linksData, setLinksData] = useState<TaskData[]>([]);
  const [pdfsData, setPdfsData] = useState<CompleteNewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [linkRes, pdfRes] = await Promise.all([
          getAllTaskDataAction(),
          getAllCompleteNewAction()
        ]);

        if (linkRes?.success) setLinksData(linkRes.data);
        if (pdfRes?.success) setPdfsData(pdfRes.data);
      } catch (error) {
        console.error("Data fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 bg-gray-50/50 dark:bg-transparent rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Loader2 className="animate-spin text-indigo-600" size={40} strokeWidth={2} />
          <div className="absolute inset-0 blur-xl bg-indigo-500/20 rounded-full animate-pulse"></div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">ম্যাজিক বোর্ড সাজানো হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-350 mx-auto p-4 md:p-10 space-y-10 animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
            <BellRing size={16} />
            <span>Live Updates</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Universal <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Alert Board</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <LayoutGrid size={20} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">স্মার্ট ভিউ অ্যাক্টিভ</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <div className="group transition-all duration-300 hover:-translate-y-1">
          <LinkResourceTable data={linksData} />
        </div>

        <div className="group transition-all duration-300 hover:-translate-y-1">
          <PDFResourceTable data={pdfsData} />
        </div>

      </div>

      <div className="pt-6 text-center">
        <p className="text-[11px] font-medium text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
          All data is synced with real-time database
        </p>
      </div>

    </div>
  );
}