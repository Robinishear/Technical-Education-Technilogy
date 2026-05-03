"use client";

import React, { useState } from "react";
import { CheckCircle2, MessageSquare, Mail, BarChart3 } from "lucide-react";

import DataModal from "./Team-meeting-task-data/components/DataModal";
import FormModal from "./Team-meeting-task-data/components/FormModal";
import CompleteNewDataModal from "./CompleteNewPDF/components/CompleteNewDataModal";
import CompleteNewFormModal from "./CompleteNewPDF/components/CompleteNewFormModal";


function StatCard({ label, value, delta, up, neutral }: { label: string; value: string; delta: string; up?: boolean; neutral?: boolean }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">{value}</p>
      <p className={`text-xs mt-1 ${neutral ? "text-gray-400" : up ? "text-green-600" : "text-red-500"}`}>{delta}</p>
    </div>
  );
}

function TaskCard({
  accent, iconBg, Icon, iconColor, title, meta, badge, badgeClass, desc, progress, fillClass,
  onDataClick, onFormClick, 
}: {
  accent: string; iconBg: string; Icon: React.ElementType; iconColor: string;
  title: string; meta: string; badge: string; badgeClass: string;
  desc: string; progress: number; fillClass: string;
  onDataClick: () => void;
  onFormClick: () => void;
}) {
  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-t-4 ${accent} rounded-xl p-5 flex flex-col gap-3`}>
      <div className="flex items-center gap-3">
        <div className={`${iconBg} p-2 rounded-lg`}>
          <Icon size={18} className={iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{meta}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${badgeClass}`}>{badge}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Progress</span><span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${fillClass}`} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onDataClick}
          className="flex-1 text-xs font-medium py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90 transition"
        >
          See Data
        </button>
        <button
          onClick={onFormClick}
          className="flex-1 text-xs font-medium py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Form Modal
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [dataModal, setDataModal] = useState<string | null>(null);
  const [formModal, setFormModal] = useState<string | null>(null);
   const [completeNewDataModal, setCompleteNewDataModal] = useState<string | null>(null); 
  const [completeNewFormModal, setCompleteNewFormModal] = useState<string | null>(null); 

  return (
    <div className="p-6 space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Task dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">8 active tasks today</p>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
          Thu, Apr 30 2026
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total tasks"  value="24" delta="+3 this week" up />
        <StatCard label="Completed"    value="17" delta="71% done"     up />
        <StatCard label="In progress"  value="4"  delta="Active now"   neutral />
        <StatCard label="Overdue"      value="3"  delta="Needs attention" />
      </div>

      {/* Cards Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaskCard
          accent="border-t-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/30"
          Icon={CheckCircle2} iconColor="text-blue-600"
          title="Complete new PDF, Branch " meta="Due today · Alpha project"
          badge="High" badgeClass="bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          desc="Add final details and submit the 'Alpha' project for client review."
          progress={75} fillClass="bg-blue-500"
          onDataClick={() => setCompleteNewDataModal("project")}  
          onFormClick={() => setCompleteNewFormModal("project")}  
        />
        <TaskCard
          accent="border-t-green-500" iconBg="bg-green-50 dark:bg-green-900/30"
          Icon={MessageSquare} iconColor="text-green-600"
          title="Team meeting Branch " meta="In 2 hours · Daily stand-up"
          badge="Soon" badgeClass="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          desc="Prepare updates and join the daily stand-up call with the team."
          progress={40} fillClass="bg-green-500"
          onDataClick={() => setDataModal("meeting")}  
          onFormClick={() => setFormModal("meeting")}  
        />
        <TaskCard
          accent="border-t-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/30"
          Icon={Mail} iconColor="text-purple-600"
          title="Send Public Student add PDF" meta="Due tomorrow · Finance"
          badge="Medium" badgeClass="bg-purple-50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
          desc="Review and dispatch invoices for all completed work this month."
          progress={50} fillClass="bg-purple-500"
          onDataClick={() => setDataModal("invoice")}   
          onFormClick={() => setFormModal("invoice")}   
        />
        <TaskCard
          accent="border-t-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30"
          Icon={BarChart3} iconColor="text-amber-600"
          title="Update progress report Demu optional" meta="End of week · Weekly review"
          badge="Low" badgeClass="bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
          desc="Add metrics and notes for the weekly review meeting on Friday."
          progress={20} fillClass="bg-amber-500"
          onDataClick={() => setDataModal("report")}  
          onFormClick={() => setFormModal("report")}  
        />
      </div>

      <DataModal
        isOpen={!!dataModal}
        onClose={() => setDataModal(null)}
        title={dataModal ?? ""}
      />
      <FormModal
        isOpen={!!formModal}
        onClose={() => setFormModal(null)}
        title={formModal ?? ""}
      />

   <CompleteNewDataModal
  isOpen={!!completeNewDataModal}
  onClose={() => setCompleteNewDataModal(null)}
  title={completeNewDataModal ?? ""}
/>
<CompleteNewFormModal
  isOpen={!!completeNewFormModal}
  onClose={() => setCompleteNewFormModal(null)}
  title={completeNewFormModal ?? ""}
/>
    </div>
  );
}