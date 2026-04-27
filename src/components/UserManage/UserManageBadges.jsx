import React from 'react';
import { Star } from 'lucide-react';

export function SubscriptionBadge({ subscription }) {
  if (!subscription) {
    return <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">N/A</span>;
  }

  switch (subscription.type) {
    case 'premium':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#2dc7f5] px-2.5 py-1 text-xs font-medium text-white">
          <Star className="h-3 w-3 fill-current" />
          {subscription.label}
        </span>
      );
    case 'basic':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#407eff] px-2.5 py-1 text-xs font-medium text-white">
          <Star className="h-3 w-3" />
          {subscription.label}
        </span>
      );
    case 'available':
      return <span className="inline-flex items-center rounded-full bg-[#22c55e] px-3 py-1 text-xs font-medium text-white">{subscription.label}</span>;
    case 'free':
      return <span className="inline-flex items-center rounded-full bg-[#8291a5] px-3 py-1 text-xs font-medium text-white">{subscription.label}</span>;
    case 'busy':
      return <span className="inline-flex items-center rounded-full bg-[#ffb982] px-3 py-1 text-xs font-medium text-white">{subscription.label}</span>;
    case 'guest':
      return <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">{subscription.label}</span>;
    default:
      return null;
  }
}

export function UserTypeBadge({ userType }) {
  if (!userType) {
    return <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">N/A</span>;
  }

  switch (userType.toLowerCase()) {
    case 'admin':
      return <span className="inline-flex items-center rounded-full bg-[#25b566] px-3 py-1 text-xs font-medium text-white">{userType}</span>;
    case 'customer':
      return <span className="inline-flex items-center rounded-full bg-[#b58025] px-3 py-1 text-xs font-medium text-white">{userType}</span>;
    case 'technician':
      return <span className="inline-flex items-center rounded-full bg-[#ab4bed] px-3 py-1 text-xs font-medium text-white">{userType}</span>;
    case 'guest':
      return <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">{userType}</span>;
    default:
      return null;
  }
}

export function RoleBadge({ role }) {
  if (!role) {
    return <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">N/A</span>;
  }

  switch (role.toLowerCase()) {
    case 'admin':
      return <span className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1 text-xs font-medium text-white">Admin</span>;
    case 'technician':
      return <span className="inline-flex items-center rounded-full bg-[#7c3aed] px-3 py-1 text-xs font-medium text-white">Technician</span>;
    case 'customer':
      return <span className="inline-flex items-center rounded-full bg-[#b58025] px-3 py-1 text-xs font-medium text-white">Customer</span>;
    case 'guest':
      return <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">Guest</span>;
    default:
      return <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 capitalize">{role}</span>;
  }
}

export function StatusBadge({ status }) {
  return <span className="inline-flex items-center rounded-full bg-[#ecfdf5] px-3 py-1.5 text-[11px] font-medium capitalize text-[#10b981] shadow-[0_0_0_1px_rgba(16,185,129,0.1)]">{status}</span>;
}