import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { StatusBadge, SubscriptionBadge, UserTypeBadge } from './UserManageBadges';

export function UserManageTable({ users, onViewUser, onDeleteUser }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-white text-xs font-semibold text-slate-800">
          <tr>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 font-medium">Name</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 font-medium">Email</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 font-medium">Location</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">Subscription/Status</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">User Type</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">Status</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/80 bg-white">
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-500">
                No users found.
              </td>
            </tr>
          ) : null}
          {users.map((user) => (
            <tr key={user.id} className="transition-colors hover:bg-slate-50">
              <td className="whitespace-nowrap px-6 py-4 text-[13px] text-slate-700">{user.name}</td>
              <td className="whitespace-nowrap px-6 py-4 text-[13px]">{user.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-[13px]">{user.location || 'N/A'}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                <div className="flex justify-center">
                  <SubscriptionBadge subscription={user.subscriptionStatus} />
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                <div className="flex justify-center">
                  <UserTypeBadge userType={user.userType} />
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                <div className="flex justify-center">
                  <StatusBadge status={user.status} />
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => onViewUser(user)} className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900" title="View">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => onDeleteUser(user)} className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 text-red-500 transition-all hover:bg-red-50 hover:text-red-700" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}