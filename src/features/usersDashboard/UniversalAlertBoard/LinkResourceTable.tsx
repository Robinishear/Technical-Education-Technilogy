"use client";

import { TaskData } from "@/features/AdminDashboard/UniversalAlertBoard/Team-meeting-task-data/types/task-data.types";
import { Link2, Clock, ExternalLink, AlertCircle } from "lucide-react";

interface Props {
  data: TaskData[];
}

export default function LinkResourceTable({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xs border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* 🔗 Header Section */}
      <div className="p-5 border-b border-gray-50 dark:border-gray-800 flex items-center gap-2">
        <div className="p-1.5 bg-blue-500/10 rounded-lg">
          <Link2 className="text-blue-600 dark:text-blue-400" size={20} />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-white">
          গুরুত্বপূর্ণ লিঙ্ক সমূহ 🔗
        </h3>
      </div>

      {data.length > 0 ? (
        <>
          {/* 📱 Mobile View: Card-based responsive list (Hidden on desktop) */}
          <div className="block md:hidden divide-y divide-gray-100 dark:divide-gray-800">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-4 flex flex-col gap-3 hover:bg-blue-50/10 dark:hover:bg-blue-950/10 transition-colors"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-snug wrap-break-word">
                    {item.text}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1.5">
                    <Clock size={13} className="text-gray-400" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs active:scale-98"
                >
                  Open Link <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>

          {/* 🖥️ Desktop View: Standard tabular layout (Hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 text-[10px] uppercase tracking-widest font-black">
                <tr>
                  <th className="px-6 py-4">মেসেজ</th>
                  <th className="px-6 py-4">সময়</th>
                  <th className="px-6 py-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/30 dark:hover:bg-blue-950/10 transition-colors"
                  >
                    <td className="px-6 py-5 text-sm font-medium text-gray-700 dark:text-gray-300 max-w-md wrap-break-word">
                      {item.text}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-gray-400" />
                        {item.time}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition shadow-xs hover:scale-105 active:scale-95"
                      >
                        Open <ExternalLink size={13} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* 📭 Empty State View */
        <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
          <div className="p-3 bg-gray-100 dark:bg-gray-800/50 rounded-full text-gray-400">
            <AlertCircle size={24} />
          </div>
          <p className="text-sm font-medium text-gray-400 italic">
            No links found 🔍
          </p>
        </div>
      )}
    </div>
  );
}
