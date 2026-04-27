import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { RoleBadge, StatusBadge, SubscriptionBadge, UserTypeBadge } from './UserManageBadges';

export function UserManageTable({ users, onViewUser, onDeleteUser, isDeletingUser = false }) {
  return (
    <>
      <div className="divide-y divide-slate-100 md:hidden">
        {users.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-slate-500 sm:px-6">
            No users found.
          </div>
        ) : null}

        {users.map((user) => (
          <div key={user.id} className="space-y-4 px-4 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{user.name}</p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewUser(user)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
                  title="View"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onDeleteUser(user)}
                  disabled={isDeletingUser}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-red-100 text-red-500 transition-all hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-500 sm:grid-cols-3">
              <div>
                <p className="mb-1 font-medium uppercase tracking-wide text-slate-400">Location</p>
                <p className="text-slate-700">{user.location || 'N/A'}</p>
              </div>
              <div>
                <p className="mb-1 font-medium uppercase tracking-wide text-slate-400">Role</p>
                <RoleBadge role={user.role} />
              </div>
              <div>
                <p className="mb-1 font-medium uppercase tracking-wide text-slate-400">Status</p>
                <StatusBadge status={user.status} />
              </div>
              <div>
                <p className="mb-1 font-medium uppercase tracking-wide text-slate-400">User Type</p>
                <UserTypeBadge userType={user.userType} />
              </div>
              <div>
                <p className="mb-1 font-medium uppercase tracking-wide text-slate-400">Subscription</p>
                <SubscriptionBadge subscription={user.subscriptionStatus} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-white text-xs font-semibold text-slate-800">
          <tr>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 font-medium">Name</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 font-medium">Email</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 font-medium">Location</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">Role</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">Subscription/Status</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">User Type</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">Status</th>
            <th scope="col" className="border-b border-slate-100 px-6 py-4 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/80 bg-white">
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-10 text-center text-sm text-slate-500">
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
                  <RoleBadge role={user.role} />
                </div>
              </td>
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
                  <button
                    onClick={() => onDeleteUser(user)}
                    disabled={isDeletingUser}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 text-red-500 transition-all hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}