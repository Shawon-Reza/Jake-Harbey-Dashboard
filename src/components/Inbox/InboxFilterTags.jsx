import React from 'react';

export default function InboxFilterTags({ tags }) {
  return (
    <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
      {tags.map((tag) => (
        <div
          key={tag.label}
          className="flex items-center gap-3 px-5 py-2.5 rounded-lg border border-[#E7E7E7] bg-white shadow-sm whitespace-nowrap cursor-pointer hover:border-gray-300"
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tag.color }}></div>
          <span className="text-[#454545] font-semibold text-sm">{tag.label}</span>
          <span className="text-[#2A2A2A] font-bold text-sm ml-1">{tag.count}</span>
        </div>
      ))}
    </div>
  );
}
