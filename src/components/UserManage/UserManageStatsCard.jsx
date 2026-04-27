import React from 'react';
import { ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';

export function UserManageStatsCard({ title, value, delta, trend, variant = 'default' }) {
  const isFilled = variant === 'filled';
  const containerClassName = isFilled
    ? 'relative flex flex-col justify-between rounded-[20px] bg-[#097186] p-4 text-white shadow-sm sm:p-6'
    : 'relative flex flex-col justify-between rounded-[20px] border border-slate-100 bg-white p-4 shadow-sm sm:p-6';

  const titleClassName = isFilled ? 'text-[14px] font-medium text-white/90 sm:text-[15px]' : 'text-[14px] font-medium text-slate-700 sm:text-[15px]';
  const valueClassName = isFilled ? 'text-3xl font-semibold leading-none sm:text-4xl' : 'text-3xl font-semibold leading-none text-[#097186] sm:text-4xl';
  const arrowClassName = isFilled ? 'h-4 w-4 text-white/70' : 'h-4 w-4 text-slate-400';
  const deltaClassName = trend === 'down' ? 'flex items-center text-xs font-semibold text-[#ff4b4b] sm:text-sm' : 'flex items-center text-xs font-semibold text-green-500 sm:text-sm';
  const deltaIcon = trend === 'down' ? <TrendingDown className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <TrendingUp className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />;
  const deltaLabelClassName = isFilled ? 'text-[10px] font-medium tracking-wide text-white/70 sm:text-[11px]' : 'text-[10px] font-medium tracking-wide text-slate-400 sm:text-[11px]';

  return (
    <div className={containerClassName}>
      <div className="flex items-start justify-between gap-3">
        <span className={titleClassName}>{title}</span>
        <ArrowUpRight className={arrowClassName} />
      </div>
      <div className="mt-6 flex items-end justify-between gap-3 sm:mt-8">
        <span className={valueClassName}>{value}</span>
        <div className="flex shrink-0 flex-col items-end">
          <span className={deltaClassName}>
            {deltaIcon}
            {delta}
          </span>
          <span className={deltaLabelClassName}>From last week</span>
        </div>
      </div>
    </div>
  );
}