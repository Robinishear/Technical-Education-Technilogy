"use client";

import { useState } from "react";
import { Plus, Images, FileText } from "lucide-react";
import HeroImageTextList from "../HeroImageText/components/HeroImageTextList";
import HeroImageTextForm from "../HeroImageText/components/HeroImageTextForm";
import AboutSectionForm from "../AboutSection/components/AboutSectionForm";
import AboutSectionList from "../AboutSection/components/AboutSectionList";

type TabId = "hero" | "about";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: "hero",  label: "Hero Images",   icon: Images   },
  { id: "about", label: "About Section", icon: FileText },
];

const Our = () => {
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setRefresh((prev) => prev + 1);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-gray-800 dark:text-gray-100">
            Our Story
          </h1>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">
            Manage your website sections
          </p>
        </div>

        {/* Single Add New button — shown for all tabs */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "hero" && (
        <>
          <HeroImageTextList refresh={refresh} />
          <HeroImageTextForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess}
          />
        </>
      )}

      {activeTab === "about" && (
        <>
          <AboutSectionList refresh={refresh} />
          <AboutSectionForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess}
          />
        </>
      )}

    </div>
  );
};

export default Our;