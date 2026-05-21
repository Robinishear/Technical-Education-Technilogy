
"use client";

import { CompleteNewData } from "@/features/AdminDashboard/UniversalAlertBoard/CompleteNewPDF/Types/complete-new.types";
import { FileText, Calendar, Download, AlertCircle } from "lucide-react";

interface Props {
  data: CompleteNewData[];
}

const handleDownload = async (pdfUrl: string, fileName: string) => {
  try {
    const response = await fetch(`/api/download-pdf?url=${encodeURIComponent(pdfUrl)}`);
    if (!response.ok) throw new Error("Failed");
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
  } catch {
    alert("PDF download করা যাচ্ছে না। Admin কে জানান। ⚠️"); 
  }
};

export default function PDFResourceTable({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xs border border-gray-100 dark:border-gray-800 overflow-hidden">
      
      {/* 📂 Card/Table Header */}
      <div className="p-5 border-b border-gray-50 dark:border-gray-800 flex items-center gap-2">
        <div className="p-1.5 bg-rose-500/10 rounded-lg">
          <FileText className="text-rose-600 dark:text-rose-400" size={20} />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-white">রিসোর্স ফাইল (PDF) 📄</h3>
      </div>

      {data.length > 0 ? (
        <>
          {/* 📱 Mobile Responsive Cards Layout (Visible only on Mobile) */}
          <div className="block md:hidden divide-y divide-gray-100 dark:divide-gray-800">
            {data.map((item) => (
              <div 
                key={item.id} 
                className="p-4 flex flex-col gap-3 hover:bg-rose-50/10 dark:hover:bg-rose-950/10 transition-colors"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">
                    {item.text}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                    <Calendar size={13} className="text-gray-400" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(item.pdfUrl, item.text)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs active:scale-98"
                >
                  Download <Download size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* 🖥️ Desktop Classic Table Layout (Visible from Medium screens up) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 text-[10px] uppercase tracking-widest font-black">
                <tr>
                  <th className="px-6 py-4">ফাইল নাম</th>
                  <th className="px-6 py-4">তারিখ</th>
                  <th className="px-6 py-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/10 transition-colors">
                    <td className="px-6 py-5 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.text}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" /> 
                        {item.date}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleDownload(item.pdfUrl, item.text)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition shadow-xs hover:scale-105 active:scale-95"
                      >
                        Download <Download size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* 📭 Empty State */
        <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
          <div className="p-3 bg-gray-100 dark:bg-gray-800/50 rounded-full text-gray-400">
            <AlertCircle size={24} />
          </div>
          <p className="text-sm font-medium text-gray-400 italic">No PDFs found 🔍</p>
        </div>
      )}
    </div>
  );
}

