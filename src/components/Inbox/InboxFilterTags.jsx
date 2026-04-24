import React from 'react';

export default function InboxFilterTags({ tags }) {
  return (
    <div className="flex gap-2 md:gap-4 mb-6 md:mb-10 overflow-x-auto pb- pr-1">
      {tags.map((tag) => (
        <div
          key={tag.label}
          className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 rounded-lg border border-[#E7E7E7] bg-white shadow-sm whitespace-nowrap cursor-pointer hover:border-gray-300"
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tag.color }}></div>
          <span className="text-[#454545] font-semibold text-xs md:text-sm">{tag.label}</span>
          <span className="text-[#2A2A2A] font-bold text-xs md:text-sm ml-1">{tag.count}</span>
        </div>
      ))}
    </div>
  );
}
