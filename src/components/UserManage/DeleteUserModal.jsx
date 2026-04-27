import React from 'react';
import { X } from 'lucide-react';

export function DeleteUserModal({ user, onClose, onConfirm }) {
  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 backdrop-blur-sm sm:items-center sm:p-4 transition-opacity">
      <div className="relative w-full max-w-[420px] rounded-2xl rounded-b-none bg-white p-4 shadow-xl sm:rounded-2xl sm:p-6 md:p-7">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-2 pt-1 pr-8">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Delete User</h2>
          <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500 sm:text-[14.5px]">
            Are you sure you want to delete <span className="font-semibold capitalize text-slate-800">{user.name}</span>? This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 sm:mt-8">
          <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 sm:px-5 sm:text-[14px]">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded-xl bg-[#e32149] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#c91839] sm:px-5 sm:text-[14px]">
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}