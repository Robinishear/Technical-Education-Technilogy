/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { X, Save, PlusCircle, Trash2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MultiSemesterManager({ onClose }: any) {
  const [semesters, setSemesters] = useState([
    { id: Date.now (), title: "First Year First Semester", subjects: createInitialSubjects() }
  ]);

  function createInitialSubjects() {
    return Array(8).fill(null).map((_, i) => ({
      id: i,
      code: "",
      name: "",
      credit: "",
      w: "",
      p: "",
      v: "",
      marks: "",
      fm: "100",
      gp: "",
      cgp: "",
      grade: "",
    }));
  }

  const addNewSemester = () => {
    setSemesters([...semesters, { id: Date.now(), title: "New Semester Page", subjects: createInitialSubjects() }]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(sem => sem.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a]/90 backdrop-blur-md overflow-y-auto p-4 custom-scrollbar">
      <div className="max-w-[98%] mx-auto space-y-8 pb-10">
        
        {/* Top Navigation Bar 🚀 */}
        <div className="sticky top-0 z-50 bg-[#1e3a8a] p-4 rounded-xl shadow-2xl flex justify-between items-center border-b-4 border-blue-400">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-lg">
               <GraduationCap size={28} />
            </div>
            <div>
               <h2 className="text-xl font-black italic uppercase tracking-tight">Academic Panel</h2>
               <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Active Pages: {semesters.length}</p>
            </div>
          </div>

          {/* Action Buttons Grouped Together 🛠️ */}
          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/10">
            <Button 
              onClick={addNewSemester} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-6 shadow-lg border-b-4 border-emerald-800 active:border-b-0 transition-all"
            >
              <PlusCircle size={18} className="mr-2" /> Add Semester
            </Button>
            
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-11 px-6 shadow-lg border-b-4 border-blue-800 active:border-b-0 transition-all"
            >
              <Save size={18} className="mr-2" /> Save All Data
            </Button>

            <div className="w-0.5 h-8 bg-white/20 mx-1"></div>

            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="text-white hover:bg-red-500 hover:text-white transition-colors h-11 w-11 p-0 rounded-full"
            >
              <X size={24} />
            </Button>
          </div>
        </div>

        {/* Semesters Rendering 🔄 */}
        {semesters.map((sem, semIdx) => (
          <div key={sem.id} className="bg-white shadow-2xl border-2 border-zinc-300 rounded-sm animate-in slide-in-from-bottom-4 duration-500">
            
            {/* Table Header */}
            <div className="bg-[#1e3a8a] text-white flex justify-between items-center px-6 py-4">
              <div className="flex gap-10 items-center">
                <h2 className="text-lg font-bold uppercase opacity-80">Subject Name:</h2>
                <h2 className="text-2xl font-black italic tracking-wider">Diploma In Computer Science</h2>
              </div>
              {semIdx > 0 && (
                <button 
                  onClick={() => removeSemester(sem.id)} 
                  className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md font-bold text-xs flex items-center gap-2 transition-all border border-red-200"
                >
                  <Trash2 size={16} /> Delete Page
                </button>
              )}
            </div>

            {/* Editable Title */}
            <div className="bg-slate-50 border-y border-zinc-800 text-center py-2">
              <input 
                type="text" 
                defaultValue={sem.title}
                className="bg-transparent text-black font-black uppercase text-sm tracking-[0.4em] text-center w-full outline-none focus:text-blue-700"
                placeholder="CLICK TO EDIT SEMESTER NAME"
              />
            </div>

            {/* Table 📊 */}
            <div className="overflow-x-auto p-4 bg-white">
              <table className="w-full border-collapse border-2 border-zinc-800 text-center text-[12px]">
                <thead className="bg-[#4a90e2] text-white">
                  <tr className="divide-x divide-zinc-800">
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">Course Code</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase min-w-37.5">Subject</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">Credit</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">Written</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">Practical</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">Viva</th>
                    <th className="p-2 font-black border-b-2 border-zinc-800 uppercase bg-blue-700 italic">Marks</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">Full Marks</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">Grade Point</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">Credit x GPA</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase">GPA Grade</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase bg-zinc-800">Written (T)</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase bg-zinc-800">Practical (T)</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase bg-zinc-800">Viva (T)</th>
                    <th className="p-2 font-black border-b-2 border-zinc-800 uppercase bg-blue-900 italic">Total Marks</th>
                    <th className="p-2 font-bold border-b-2 border-zinc-800 uppercase bg-zinc-800">Full Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {sem.subjects.map((sub, idx) => (
                    <tr key={idx} className="divide-x divide-zinc-400 border-b border-zinc-300 hover:bg-blue-50/30 transition-colors">
                      <td className="p-0"><input type="text" className="w-full h-10 text-center outline-none bg-transparent" placeholder="750XXX"/></td>
                      <td className="p-0 text-left px-2"><input type="text" className="w-full h-10 outline-none bg-transparent" placeholder="Enter Subject Name..."/></td>
                      <td className="p-0"><input type="text" className="w-full h-10 text-center outline-none bg-transparent" /></td>
                      <td className="p-0"><input type="text" className="w-full h-10 text-center outline-none bg-transparent" /></td>
                      <td className="p-0"><input type="text" className="w-full h-10 text-center outline-none bg-transparent" /></td>
                      <td className="p-0"><input type="text" className="w-full h-10 text-center outline-none bg-transparent" /></td>
                      <td className="p-0 bg-blue-50 font-bold"><input type="text" className="w-full h-10 text-center outline-none bg-transparent" /></td>
                      <td className="p-0"><input type="text" defaultValue="100" className="w-full h-10 text-center outline-none bg-transparent" /></td>
                      <td className="p-0"><input type="text" className="w-full h-10 text-center outline-none bg-transparent font-semibold" placeholder="0.00"/></td>
                      <td className="p-0"><input type="text" className="w-full h-10 text-center outline-none bg-transparent" /></td>
                      <td className="p-0"><input type="text" className="w-full h-10 text-center outline-none font-black text-blue-800 uppercase" placeholder="A+"/></td>
                      
                      {idx === 0 && (
                        <>
                          <td rowSpan={8} className="bg-zinc-50 border-l border-zinc-800"><input type="text" className="w-full h-full text-center font-bold outline-none bg-transparent" placeholder="389"/></td>
                          <td rowSpan={8} className="bg-zinc-50 border-l border-zinc-800"><input type="text" className="w-full h-full text-center font-bold outline-none bg-transparent" placeholder="140"/></td>
                          <td rowSpan={8} className="bg-zinc-50 border-l border-zinc-800"><input type="text" className="w-full h-full text-center font-bold outline-none bg-transparent" placeholder="78"/></td>
                          <td rowSpan={8} className="bg-blue-100 border-l border-zinc-800"><input type="text" className="w-full h-full text-center text-xl font-black text-blue-900 outline-none bg-transparent" placeholder="607"/></td>
                          <td rowSpan={8} className="bg-zinc-50 border-l border-zinc-800"><input type="text" className="w-full h-full text-center font-bold outline-none bg-transparent" placeholder="800"/></td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Badges */}
            <div className="p-6 bg-zinc-100 flex flex-wrap justify-center gap-6 border-t border-zinc-300">
               <StatBox label="Total Credit" placeholder="21" color="bg-[#1e3a8a]" />
               <StatBox label="Total Point" placeholder="79" color="bg-[#4a90e2]" />
               <StatBox label="Semester CGPA" placeholder="3.74" color="bg-[#1e3a8a]" />
               <StatBox label="Semester Grade" placeholder="A" color="bg-[#4a90e2]" />
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4a90e2; border-radius: 10px; }
      `}</style>
    </div>
  );
}

function StatBox({ label, placeholder, color }: any) {
  return (
    <div className="flex items-stretch border-2 border-zinc-800 shadow-md transform hover:-translate-y-1 transition-transform">
      <div className={`${color} text-white px-4 py-2 text-[10px] font-bold flex items-center flex-1 uppercase italic tracking-tighter leading-tight`}>
        {label}
      </div>
      <input type="text" placeholder={placeholder} className="w-20 bg-white text-black text-center font-black text-xl border-l-2 border-zinc-800 outline-none" />
    </div>
  );
}












