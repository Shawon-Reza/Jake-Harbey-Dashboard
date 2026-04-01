import React, { useState } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  TrendingDown, 
  TrendingUp,
  Eye,
  Edit2,
  Trash2,
  Star,
  Crown,
  X
} from 'lucide-react';

const usersData = [
  {
    id: 1,
    name: 'user 1',
    email: 'john@example.com',
    postCode: 'scbvbxbsgcvj',
    subscriptionStatus: { label: 'Premium', type: 'premium' },
    userType: 'customer',
    status: 'Active'
  },
  {
    id: 2,
    name: 'user 2',
    email: 'john@example.com',
    postCode: 'scbvbxbsgcvj',
    subscriptionStatus: { label: 'Basic', type: 'basic' },
    userType: 'customer',
    status: 'active'
  },
  {
    id: 3,
    name: 'user 3',
    email: 'john@example.com',
    postCode: 'scbvbxbsgcvj',
    subscriptionStatus: { label: 'Available', type: 'available' },
    userType: 'Technician',
    status: 'Active'
  },
  {
    id: 4,
    name: 'user 4',
    email: 'john@example.com',
    postCode: 'scbvbxbsgcvj',
    subscriptionStatus: { label: 'Free', type: 'free' },
    userType: 'customer',
    status: 'Active'
  },
  {
    id: 5,
    name: 'user 5',
    email: 'john@example.com',
    postCode: 'scbvbxbsgcvj',
    subscriptionStatus: { label: 'Busy', type: 'busy' },
    userType: 'Technician',
    status: 'Active'
  },
  {
    id: 6,
    name: 'user 6',
    email: 'john@example.com',
    postCode: 'scbvbxbsgcvj',
    subscriptionStatus: { label: 'Guest', type: 'guest' },
    userType: 'Guest',
    status: 'Active'
  }
].map(u => ({ ...u, joinedDate: '2024-01-15' }));

export default function UserManage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(usersData);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  const renderSubscriptionBadge = (sub) => {
    switch (sub.type) {
      case 'premium':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#2dc7f5] px-2.5 py-1 text-xs font-medium text-white">
            <Star className="h-3 w-3 fill-current" />
            {sub.label}
          </span>
        );
      case 'basic':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#407eff] px-2.5 py-1 text-xs font-medium text-white">
            <Star className="h-3 w-3" />
            {sub.label}
          </span>
        );
      case 'available':
        return (
          <span className="inline-flex items-center rounded-full bg-[#22c55e] px-3 py-1 text-xs font-medium text-white">
            {sub.label}
          </span>
        );
      case 'free':
        return (
          <span className="inline-flex items-center rounded-full bg-[#8291a5] px-3 py-1 text-xs font-medium text-white">
            {sub.label}
          </span>
        );
      case 'busy':
        return (
          <span className="inline-flex items-center rounded-full bg-[#ffb982] px-3 py-1 text-xs font-medium text-white">
            {sub.label}
          </span>
        );
      case 'guest':
        return (
          <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            {sub.label}
          </span>
        );
      default:
        return null;
    }
  };

  const renderUserTypeBadge = (type) => {
    switch (type.toLowerCase()) {
      case 'customer':
        return (
          <span className="inline-flex items-center rounded-full bg-[#b58025] px-3 py-1 text-xs font-medium text-white">
            {type}
          </span>
        );
      case 'technician':
        return (
          <span className="inline-flex items-center rounded-full bg-[#ab4bed] px-3 py-1 text-xs font-medium text-white">
            {type}
          </span>
        );
      case 'guest':
        return (
          <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            {type}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-medium text-slate-800">User Management</h1>
          
          <div className="relative w-full max-w-[320px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-xl border-0 bg-slate-100 py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 ring-1 ring-inset ring-slate-100 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none transition-all"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="relative flex flex-col justify-between rounded-[20px] bg-[#097186] p-6 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-white/90">Total Users</span>
              <ArrowUpRight className="h-4 w-4 text-white/70" />
            </div>
            <div className="mt-8 flex items-end justify-between">
              <span className="text-4xl font-semibold leading-none">25</span>
              <div className="flex flex-col items-end">
                <span className="flex items-center text-sm font-semibold text-[#ff4b4b]">
                  <TrendingDown className="mr-1 h-3.5 w-3.5" />
                  1.5%
                </span>
                <span className="text-[11px] text-white/70 font-medium tracking-wide">From last week</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative flex flex-col justify-between rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-slate-700">Technicians</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-8 flex items-end justify-between">
              <span className="text-4xl font-semibold leading-none text-[#097186]">10</span>
              <div className="flex flex-col items-end">
                <span className="flex items-center text-sm font-semibold text-green-500">
                  <TrendingUp className="mr-1 h-3.5 w-3.5" />
                  10.6%
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">From last week</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex flex-col justify-between rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-slate-700">Customers</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-8 flex items-end justify-between">
              <span className="text-4xl font-semibold leading-none text-[#097186]">15</span>
              <div className="flex flex-col items-end">
                <span className="flex items-center text-sm font-semibold text-green-500">
                  <TrendingUp className="mr-1 h-3.5 w-3.5" />
                  10.6%
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">From last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-[20px] border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 pb-4 border-b border-slate-100/50">
            <h2 className="text-[18px] font-semibold text-slate-800">All Users (17)</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-white text-xs font-semibold text-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4 border-b border-slate-100 font-medium">Name</th>
                  <th scope="col" className="px-6 py-4 border-b border-slate-100 font-medium">Email</th>
                  <th scope="col" className="px-6 py-4 border-b border-slate-100 font-medium">Post Code</th>
                  <th scope="col" className="px-6 py-4 border-b border-slate-100 font-medium text-center">Subscription/Status</th>
                  <th scope="col" className="px-6 py-4 border-b border-slate-100 font-medium text-center">User Type</th>
                  <th scope="col" className="px-6 py-4 border-b border-slate-100 font-medium text-center">Status</th>
                  <th scope="col" className="px-6 py-4 border-b border-slate-100 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="whitespace-nowrap px-6 py-4 text-[13px] text-slate-700">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-[13px]">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-[13px]">
                      {user.postCode}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {renderSubscriptionBadge(user.subscriptionStatus)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {renderUserTypeBadge(user.userType)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center rounded-full bg-[#ecfdf5] px-3 py-1.5 text-[11px] font-medium text-[#10b981] capitalize shadow-[0_0_0_1px_rgba(16,185,129,0.1)]">
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900" 
                          title="View"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      
                        <button 
                          onClick={() => setUserToDelete(user)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 text-red-500 transition-all hover:bg-red-50 hover:text-red-700" 
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
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-opacity backdrop-blur-sm">
          <div className="relative w-full max-w-[480px] rounded-2xl bg-white p-7 shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute right-5 top-5 text-slate-400 hover:bg-slate-100 p-1.5 rounded-full hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="mb-6 pr-8">
              <h2 className="text-xl font-bold text-slate-900 capitalize">{selectedUser.name}</h2>
              <p className="text-[13px] text-slate-400 mt-1 font-medium">- Complete user information</p>
            </div>

            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-[15px] font-semibold text-slate-800">Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-y-7 gap-x-4">
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-1.5">Name</p>
                  <p className="text-[14px] font-medium text-slate-800 capitalize">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-1.5">User Type</p>
                  <div>{renderUserTypeBadge(selectedUser.userType)}</div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-1.5">Email</p>
                  <p className="text-[14px] font-medium text-slate-800">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-1.5">Subscription Tier</p>
                  <div>{renderSubscriptionBadge(selectedUser.subscriptionStatus)}</div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-1.5">Joined Date</p>
                  <p className="text-[14px] font-medium text-slate-800">{selectedUser.joinedDate}</p>
                  <div className="mt-2.5">
                    <span className="inline-flex items-center rounded-md bg-black px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-1.5">Post code</p>
                  <p className="text-[14px] font-medium text-slate-800 uppercase">{selectedUser.postCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 transition-opacity backdrop-blur-sm">
          <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-xl">
            {/* Close Button */}
            <button 
              onClick={() => setUserToDelete(null)}
              className="absolute right-4 top-4 text-slate-400 hover:bg-slate-100 p-1.5 rounded-full hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="mb-2 pt-1">
              <h2 className="text-xl font-bold text-slate-900">Delete User</h2>
              <p className="text-[14.5px] text-slate-500 mt-2.5 leading-relaxed pr-4">
                Are you sure you want to delete <span className="font-semibold text-slate-800 capitalize">{userToDelete.name}</span>? This action cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <button 
                onClick={() => setUserToDelete(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-[#e32149] text-[14px] font-semibold text-white hover:bg-[#c91839] transition-colors shadow-sm"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
