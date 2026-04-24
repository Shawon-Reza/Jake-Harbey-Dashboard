import React from 'react';
import { ChevronRight, MapPin, Wrench } from 'lucide-react';

const toDisplay = (value) => {
  if (value === null || value === undefined || value === '') return 'N/A';
  return value;
};

const mapBadgeToLabel = (badge) => {
  if (!badge) return null;
  return badge
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

function InboxJobRow({ job, onSelect, getAvatarColor, getStatusStyles }) {
  const badges = Array.isArray(job.badge) ? job.badge : [];
  const progressValue = typeof job.progress === 'number' ? Math.max(0, Math.min(100, job.progress)) : 0;

  return (
    <div
      onClick={() => onSelect(job)}
      className="group relative border-y border-transparent border-b-[#F5F5F5] hover:bg-[#F0FAFB] px-3 md:px-4 py-4 md:py-6 transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6"
    >
      <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0 w-full">
        <div className="flex-shrink-0">
          {job.customer_initial ? (
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${getAvatarColor(job.customer_initial)} flex items-center justify-center font-semibold text-[#454545] text-base md:text-lg`}
            >
              {toDisplay(job.customer_initial)}
            </div>
          ) : (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-[#454545] text-base md:text-lg">N/A</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-semibold text-[#2A2A2A] text-base md:text-lg truncate">{toDisplay(job.customer_name)}</span>
            <div className="flex items-center gap-1.5 text-[#9CA3AF] font-medium text-xs">
              <MapPin size={16} strokeWidth={4} /> {toDisplay(job.vehicle)}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#2A2A2A]font-bold text-sm">
              <Wrench className="text-[#9CA3AF]" size={16} strokeWidth={3.5} /> {toDisplay(job.service)}
              <span className="text-gray-400 truncate max-w-[400px]">- {toDisplay(job.description)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between lg:justify-end gap-4 md:gap-6 lg:gap-8 w-full lg:w-auto">
        <div className="flex gap-2 flex-wrap">
          <span
            className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-bold leading-none ${getStatusStyles(job.status)} flex items-center`}
          >
            {toDisplay(job.status)}
          </span>

          {badges.map((badge) => (
            <span
              key={badge}
              className="px-3 md:px-4 py-1.5 rounded-full text-xs font-bold leading-none bg-[#E8EAF6] text-[#3F51B5] flex items-center"
            >
              {toDisplay(mapBadgeToLabel(badge))}
            </span>
          ))}
        </div>

        <div className="w-[90px] md:w-[100px]">
          <div className="h-1.5 w-full bg-[#E7E7E7] rounded-full mb-1.5 overflow-hidden">
            <div
              className="h-full bg-[#22C55E] rounded-full transition-all duration-300"
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-400 font-medium text-center">{progressValue}%</p>
        </div>

        <div className="w-[80px] md:w-[90px] text-right">
          <p className={`font-semibold text-base md:text-lg ${String(job.amount).toUpperCase() === 'TBO' ? 'text-gray-300' : 'text-[#2A2A2A]'}`}>
            {toDisplay(job.amount)}
          </p>
          <p className="text-[11px] text-[#9CA3AF] font-medium">{toDisplay(job.date)}</p>
        </div>

        <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0D7E8A] transition-colors hidden md:block" />
      </div>
    </div>
  );
}

export default function InboxJobsList({ jobs, onSelect, getAvatarColor, getStatusStyles }) {
  if (!jobs.length) {
    return <div className="p-8 text-center text-gray-500">No jobs found matching your criteria.</div>;
  }

  return (
    <div className="space-y-1">
      {jobs.map((job) => (
        <InboxJobRow
          key={job.id}
          job={job}
          onSelect={onSelect}
          getAvatarColor={getAvatarColor}
          getStatusStyles={getStatusStyles}
        />
      ))}
    </div>
  );
}
