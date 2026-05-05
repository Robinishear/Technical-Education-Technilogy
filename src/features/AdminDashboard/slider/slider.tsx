/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useEffect, useState } from "react";
import { Slider } from "./slider.types";
import SliderModal from "./SliderModal";
import { getSlidersAction, deleteSliderAction } from "./slider.actions";
import { confirmDelete, showError, showSuccess } from "@/core/utils/swal.utils";

export default function AdminSliderPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSliders = async () => {
    try {
      const response = await getSlidersAction();
      setSliders(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      setSliders([]);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);
  
const handleDelete = async (id: string) => {
  const confirmed = await confirmDelete();
  if (!confirmed) return;

  const res = await deleteSliderAction(id);
  if (res.success) {
    await showSuccess("Slider deleted successfully!");
    fetchSliders();
  } else {
    await showError(res.message || "Delete failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
        
        {/* ── HEADER (Responsive Flex) ── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
              Slider <span className="text-indigo-600 dark:text-indigo-400">Admin</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Manage your homepage hero sliders</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <span>➕</span> Add New
          </button>
        </div>

        {/* ── MODAL ── */}
        <SliderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchSliders}
        />

        {/* ── TABLE CONTAINER (Responsive Scroll) ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto"> 
            <table className="w-full text-left min-w-150"> 
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="p-4 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Preview</th>
                  <th className="p-4 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Caption</th>
                  <th className="p-4 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest">Order</th>
                  <th className="p-4 font-bold text-gray-600 dark:text-gray-400 uppercase text-[10px] tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {sliders.length > 0 ? (
                  sliders.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4">
                        <img
                          src={item.image}
                          className="w-20 h-12 sm:w-24 sm:h-14 object-cover rounded-lg border dark:border-gray-700 shadow-sm"
                        />
                      </td>
                      <td className="p-4 text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium truncate max-w-37.5 sm:max-w-xs">
                        {item.caption || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md text-[11px] font-black border border-indigo-100 dark:border-indigo-800">
                          #{item.order}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Slider"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center p-16 text-gray-400 dark:text-gray-600 italic">
                      <p className="text-2xl mb-2">🏜️</p>
                      <p className="text-sm">No sliders found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}