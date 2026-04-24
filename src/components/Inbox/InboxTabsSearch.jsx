import React from 'react';
import { Search } from 'lucide-react';

export default function InboxTabsSearch({
  tabs,
  activeTab,
  onTabChange,
  getTabCount,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="flex gap-5 md:gap-8 border-b border-[#F5F5F5] w-full md:w-auto overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.internalName}
            onClick={() => onTabChange(tab.internalName)}
            className={`pb-3 md:pb-4 px-1 text-sm md:text-base font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.internalName
                ? 'text-[#2563EB] border-b-4 border-[#2563EB]'
                : 'text-[#6B7280] hover:text-[#2563EB]'
            }`}
          >
            {tab.label} <span className="ml-0.5">{getTabCount(tab.internalName)}</span>
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-[380px] lg:w-[420px]">
        <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name, service, ..."
          className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3.5 bg-[#F9FBFC] border border-[#E7E7E7] rounded-xl md:rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7E8A]/20 transition-all font-medium"
        />
      </div>
    </div>
  );
}
