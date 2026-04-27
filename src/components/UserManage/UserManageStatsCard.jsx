import React from 'react';
import { ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';

export function UserManageStatsCard({ title, value, delta, trend, variant = 'default' }) {
  const isFilled = variant === 'filled';
  const containerClassName = isFilled
    ? 'relative flex flex-col justify-between rounded-[20px] bg-[#097186] p-6 text-white shadow-sm'
    : 'relative flex flex-col justify-between rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm';

  const titleClassName = isFilled ? 'text-[15px] font-medium text-white/90' : 'text-[15px] font-medium text-slate-700';
  const valueClassName = isFilled ? 'text-4xl font-semibold leading-none' : 'text-4xl font-semibold leading-none text-[#097186]';
  const arrowClassName = isFilled ? 'h-4 w-4 text-white/70' : 'h-4 w-4 text-slate-400';
  const deltaClassName = trend === 'down' ? 'flex items-center text-sm font-semibold text-[#ff4b4b]' : 'flex items-center text-sm font-semibold text-green-500';
  const deltaIcon = trend === 'down' ? <TrendingDown className="mr-1 h-3.5 w-3.5" /> : <TrendingUp className="mr-1 h-3.5 w-3.5" />;
  const deltaLabelClassName = isFilled ? 'text-[11px] text-white/70 font-medium tracking-wide' : 'text-[11px] text-slate-400 font-medium tracking-wide';

  return (
    <div className={containerClassName}>
      <div className="flex items-center justify-between">
        <span className={titleClassName}>{title}</span>
        <ArrowUpRight className={arrowClassName} />
      </div>
      <div className="mt-8 flex items-end justify-between">
        <span className={valueClassName}>{value}</span>
        <div className="flex flex-col items-end">
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