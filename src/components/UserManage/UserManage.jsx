import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Swal from 'sweetalert2';
import { UserManageStatsCard } from './UserManageStatsCard';
import { UserManageTable } from './UserManageTable';
import { UserDetailModal } from './UserDetailModal';
import {
  useDeleteDashboardUserMutation,
  useDashboardUsersQuery,
  useDashboardUsersStatisticsQuery,
} from '../../Api/dashboardApi';

const toDisplayDate = (value) => {
  if (!value) {
    return 'N/A';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

const getSubscriptionBadge = (subscriptionPlan, role) => {
  const normalizedPlan = (subscriptionPlan || '').trim().toLowerCase();
  const normalizedRole = (role || '').trim().toLowerCase();

  if (!subscriptionPlan) {
    return { label: 'N/A', type: 'guest' };
  }

  if (normalizedPlan.includes('free')) {
    return { label: subscriptionPlan, type: 'free' };
  }

  if (normalizedRole === 'technician') {
    return { label: subscriptionPlan, type: 'available' };
  }

  return { label: subscriptionPlan, type: 'basic' };
};

const mapUsers = (users) => {
  return users.map((user) => ({
    id: user.id,
    name: user.full_name,
    email: user.email,
    location: user.location,
    role: user.role,
    subscriptionStatus: getSubscriptionBadge(user.subscription_plan, user.role),
    userType: user.user_type,
    status: user.status,
    joinedDate: toDisplayDate(user.joined_date),
  }));
};

export default function UserManage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: usersResponse, isLoading: isUsersLoading, isError: isUsersError } = useDashboardUsersQuery();
  const { data: usersStats, isLoading: isStatsLoading, isError: isStatsError } = useDashboardUsersStatisticsQuery();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteDashboardUserMutation();

  const users = useMemo(() => {
    const list = Array.isArray(usersResponse)
      ? usersResponse
      : usersResponse?.results || usersResponse?.data || usersResponse?.users || [];

    return mapUsers(list);
  }, [usersResponse]);

  const safeStats = usersStats || {};

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      return [user.name, user.email, user.location, user.role, user.userType, user.status]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [searchTerm, users]);

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteUser(user.id);

      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
      }

      await Swal.fire({
        title: 'Deleted!',
        text: 'The user has been deleted.',
        icon: 'success',
      });
    } catch {
      await Swal.fire({
        title: 'Delete failed',
        text: 'Unable to delete this user right now.',
        icon: 'error',
      });
    }
  };

  if (isUsersLoading || isStatsLoading) {
    return <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-6 text-slate-500">Loading users...</div>;
  }

  if (isUsersError || isStatsError) {
    return <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-6 text-red-500">Failed to load users data.</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto space-y-4 sm:space-y-5">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-medium text-slate-800 sm:text-3xl">
            User Management
          </h1>
          
          <div className="relative w-full max-w-none md:max-w-[360px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-xl border-0 bg-slate-100 py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 ring-1 ring-inset ring-slate-100 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-blue-500"
              placeholder="Search by name, email, location, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UserManageStatsCard
            title="Total Users"
            value={safeStats.total_users ?? 'N/A'}
            delta={`${safeStats.total_users_growth_percent_last_week ?? 0}%`}
            trend={Number(safeStats.total_users_growth_percent_last_week) < 0 ? 'down' : 'up'}
            variant="filled"
          />
          <UserManageStatsCard
            title="Technicians"
            value={safeStats.total_technicians ?? 'N/A'}
            delta={`${safeStats.total_technicians_growth_percent_last_week ?? 0}%`}
            trend={Number(safeStats.total_technicians_growth_percent_last_week) < 0 ? 'down' : 'up'}
          />
          <UserManageStatsCard
            title="Customers"
            value={safeStats.total_customers ?? 'N/A'}
            delta={`${safeStats.total_customers_growth_percent_last_week ?? 0}%`}
            trend={Number(safeStats.total_customers_growth_percent_last_week) < 0 ? 'down' : 'up'}
          />
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100/50 p-4 sm:p-6 pb-4 sm:pb-4">
            <h2 className="text-[16px] font-semibold text-slate-800 sm:text-[18px]">
              All Users ({filteredUsers.length})
            </h2>
          </div>

          <UserManageTable
            users={filteredUsers}
            onViewUser={setSelectedUser}
            onDeleteUser={handleDelete}
            isDeletingUser={isDeletingUser}
          />
        </div>
      </div>

      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
