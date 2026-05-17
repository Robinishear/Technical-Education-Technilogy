// PDFResourceTable.tsx
"use client";

import { CompleteNewData } from "@/features/AdminDashboard/UniversalAlertBoard/CompleteNewPDF/Types/complete-new.types";
import { FileText, Calendar, Download } from "lucide-react";

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
    alert("PDF download করা যাচ্ছে না। Admin কে জানান।"); 
  }
};

export default function PDFResourceTable({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-5 border-b border-gray-50 dark:border-gray-800 flex items-center gap-2">
        <FileText className="text-rose-600" size={20} />
        <h3 className="font-bold text-gray-800 dark:text-white">রিসোর্স ফাইল (PDF)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">ফাইল নাম</th>
              <th className="px-6 py-4">তারিখ</th>
              <th className="px-6 py-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.length > 0 ? data.map((item) => (
              <tr key={item.id} className="hover:bg-rose-50/30 transition-colors">
                <td className="px-6 py-5 text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</td>
                <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                  <div className="flex items-center gap-1.5"><Calendar size={14} /> {item.date}</div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => handleDownload(item.pdfUrl, item.text)}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition"
                  >
                    Download <Download size={12} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="text-center py-10 text-gray-400 italic">No PDFs found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}