import React from 'react';
import { X } from 'lucide-react';
import { RoleBadge, SubscriptionBadge, UserTypeBadge } from './UserManageBadges';

export function UserDetailModal({ user, onClose }) {
  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 backdrop-blur-sm sm:items-center sm:p-4 transition-opacity">
      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl rounded-b-none bg-white p-4 shadow-xl sm:rounded-2xl sm:p-6 md:p-7">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:right-5 sm:top-5">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-5 pr-8 sm:mb-6">
          <h2 className="text-lg font-bold capitalize text-slate-900 sm:text-xl">{user.name}</h2>
          <p className="mt-1 text-[12px] font-medium text-slate-400 sm:text-[13px]">- Complete user information</p>
        </div>

        <div className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
          <h3 className="mb-5 text-[14px] font-semibold text-slate-800 sm:mb-6 sm:text-[15px]">Basic Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 md:gap-y-7">
            <div>
              <p className="mb-1.5 text-[11px] font-semibold text-slate-400 sm:text-[12px]">Name</p>
              <p className="text-[13px] font-medium capitalize text-slate-800 sm:text-[14px]">{user.name}</p>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold text-slate-400 sm:text-[12px]">User Type</p>
              <UserTypeBadge userType={user.userType} />
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold text-slate-400 sm:text-[12px]">Role</p>
              <RoleBadge role={user.role} />
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold text-slate-400 sm:text-[12px]">Email</p>
              <p className="break-all text-[13px] font-medium text-slate-800 sm:text-[14px]">{user.email}</p>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold text-slate-400 sm:text-[12px]">Subscription Tier</p>
              <SubscriptionBadge subscription={user.subscriptionStatus} />
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold text-slate-400 sm:text-[12px]">Joined Date</p>
              <p className="text-[13px] font-medium text-slate-800 sm:text-[14px]">{user.joinedDate}</p>
              <div className="mt-2.5">
                <span className="inline-flex items-center rounded-md bg-black px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">{user.status}</span>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold text-slate-400 sm:text-[12px]">Location</p>
              <p className="text-[13px] font-medium uppercase text-slate-800 sm:text-[14px]">{user.location || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}