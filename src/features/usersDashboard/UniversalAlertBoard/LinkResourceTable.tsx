"use client";

import { TaskData } from "@/features/AdminDashboard/UniversalAlertBoard/Team-meeting-task-data/types/task-data.types";
import { Link2, Clock, ExternalLink } from "lucide-react";

interface Props {
  data: TaskData[];
}

export default function LinkResourceTable({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-5 border-b border-gray-50 dark:border-gray-800 flex items-center gap-2">
        <Link2 className="text-blue-600" size={20} />
        <h3 className="font-bold text-gray-800 dark:text-white">গুরুত্বপূর্ণ লিঙ্ক সমূহ</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">মেসেজ</th>
              <th className="px-6 py-4">সময়</th>
              <th className="px-6 py-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.length > 0 ? data.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-5 text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</td>
                <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                  <div className="flex items-center gap-1.5"><Clock size={14} /> {item.time}</div>
                </td>
                <td className="px-6 py-5 text-right">
                  <a href={item.link} target="_blank" className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition">
                    Open <ExternalLink size={12} />
                  </a>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="text-center py-10 text-gray-400 italic">No links found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}