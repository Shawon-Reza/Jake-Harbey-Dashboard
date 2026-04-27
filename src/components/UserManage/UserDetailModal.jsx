import React from 'react';
import { X } from 'lucide-react';
import { RoleBadge, SubscriptionBadge, UserTypeBadge } from './UserManageBadges';

export function UserDetailModal({ user, onClose }) {
  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-opacity backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-2xl bg-white p-7 shadow-xl">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 pr-8">
          <h2 className="text-xl font-bold capitalize text-slate-900">{user.name}</h2>
          <p className="mt-1 text-[13px] font-medium text-slate-400">- Complete user information</p>
        </div>

        <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-[15px] font-semibold text-slate-800">Basic Information</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-7">
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-slate-400">Name</p>
              <p className="text-[14px] font-medium capitalize text-slate-800">{user.name}</p>
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-slate-400">User Type</p>
              <UserTypeBadge userType={user.userType} />
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-slate-400">Role</p>
              <RoleBadge role={user.role} />
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-slate-400">Email</p>
              <p className="text-[14px] font-medium text-slate-800">{user.email}</p>
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-slate-400">Subscription Tier</p>
              <SubscriptionBadge subscription={user.subscriptionStatus} />
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-slate-400">Joined Date</p>
              <p className="text-[14px] font-medium text-slate-800">{user.joinedDate}</p>
              <div className="mt-2.5">
                <span className="inline-flex items-center rounded-md bg-black px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">{user.status}</span>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-slate-400">Location</p>
              <p className="text-[14px] font-medium uppercase text-slate-800">{user.location || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}