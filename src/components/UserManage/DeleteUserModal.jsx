import React from 'react';
import { X } from 'lucide-react';

export function DeleteUserModal({ user, onClose, onConfirm }) {
  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-opacity backdrop-blur-sm">
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-2 pt-1">
          <h2 className="text-xl font-bold text-slate-900">Delete User</h2>
          <p className="mt-2.5 pr-4 text-[14.5px] leading-relaxed text-slate-500">
            Are you sure you want to delete <span className="font-semibold capitalize text-slate-800">{user.name}</span>? This action cannot be undone.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-[14px] font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded-xl bg-[#e32149] px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#c91839]">
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}