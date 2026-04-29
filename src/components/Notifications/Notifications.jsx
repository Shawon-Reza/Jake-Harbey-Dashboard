import React, { useMemo, useState } from 'react';
import {
    Users,
    Briefcase,
    Clock,
    ClipboardList,
    XCircle,
    CheckCircle,
    Check,
    UserPlus,
    Mail
} from 'lucide-react';
import { toast } from 'sonner';
import {
    useMarkAllNotificationsReadMutation,
    useMarkNotificationReadMutation,
    useNotificationsQuery,
} from '../../Api/notificationApi';
import { useNavigate } from 'react-router-dom';

const formatNotificationTime = (createdAt) => {
    if (!createdAt) {
        return 'N/A';
    }

    const createdDate = new Date(createdAt);
    if (Number.isNaN(createdDate.getTime())) {
        return 'N/A';
    }

    const diffInMs = Date.now() - createdDate.getTime();
    const diffInMinutes = Math.max(0, Math.floor(diffInMs / 60000));

    if (diffInMinutes < 60) {
        return `${Math.max(1, diffInMinutes)}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? 'Yesterday' : `${diffInDays}d ago`;
};

export default function Notifications() {
    const [activeTab, setActiveTab] = useState('all');
    const { data, isLoading, isError } = useNotificationsQuery();
    console.log(data)
    console.log(data)
    const { mutateAsync: markAllNotificationsRead, isPending: isMarkingAllRead } = useMarkAllNotificationsReadMutation();
    const { mutateAsync: markNotificationRead, isPending: isMarkingRead } = useMarkNotificationReadMutation();
    const navigate = useNavigate();

    const notifications = useMemo(() => {
        const items = Array.isArray(data?.notifications) ? data.notifications : [];

        return items.map((notification) => ({
            id: notification.id,
            title: notification.message,
            description: notification.message,
            time: formatNotificationTime(notification.created_at),
            unread: !notification.is_read,
            iconType: 'briefcase',
            jobId: notification.job_id,
            type: notification.type,
        }));
    }, [data]);

    const unreadCount = data?.unread_count ?? notifications.filter((notification) => notification.unread).length;
    const allCount = notifications.length;

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter((notification) => notification.unread)
        : notifications;

    const markAllAsRead = async () => {
        try {
            await markAllNotificationsRead();
            toast.success('All notifications marked as read.');
            setActiveTab('all');
        } catch (error) {
            const message = error?.response?.data?.message || error?.response?.data?.detail || 'Unable to mark all notifications as read.';
            toast.error(message);
        }
    };

    const handleMarkAsRead = async (notification) => {
        if (!notification.unread || isMarkingRead) {
            return;
        }

        try {
            await markNotificationRead(notification.id);
        } catch (error) {
            const message = error?.response?.data?.message || error?.response?.data?.detail || 'Unable to mark this notification as read.';
            toast.error(message);
        }
    };

    const getIcon = (iconType) => {
        const iconSize = 20;
        switch (iconType) {
            case 'user':
                return (
                    <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#6366F1]">
                        <UserPlus size={iconSize} />
                    </div>
                );
            case 'briefcase':
                return (
                    <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#3B82F6]">
                        <Briefcase size={iconSize} />
                    </div>
                );
            case 'clock':
                return (
                    <div className="w-10 h-10 rounded-full bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6]">
                        <Clock size={iconSize} />
                    </div>
                );
            case 'clipboard':
                return (
                    <div className="w-10 h-10 rounded-full bg-[#ECFEFF] flex items-center justify-center text-[#06B6D4]">
                        <ClipboardList size={iconSize} />
                    </div>
                );
            case 'error':
                return (
                    <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
                        <XCircle size={iconSize} />
                    </div>
                );
            case 'check':
                return (
                    <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#22C55E]">
                        <CheckCircle size={iconSize} />
                    </div>
                );
            default:
                return null;
        }
    };

    const handleNotificationClick = (notification) => {
        console.log("Click notification:", notification)
        if (notification.type === "job_assigned") {
            // window.location.href = `/jobs/${notification.jobId}`;
            navigate(`/jobs/${notification.jobId}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFB] px-4 py-4 sm:px-8 sm:py-2">
            {/* Header */}
            <div className="mx-auto mb-4">
                <div className="flex flex-col gap-4 mb-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-semibold text-[#2A2A2A] sm:text-3xl">Notifications</h1>
                        <span className="rounded-full bg-[#FF4D4D] px-4 py-1 text-sm font-medium text-white">
                            {unreadCount} new
                        </span>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        disabled={isMarkingAllRead}
                        className="flex items-center gap-3 text-base text-[#1A9C9C] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xl"
                    >
                        <Check size={22} strokeWidth={3} />
                        Mark all as read
                    </button>
                </div>

                {/* Tabs */}
                <div className="relative flex gap-8 overflow-x-auto border-b border-[#E0E0E0] sm:gap-12">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`relative flex items-center gap-3 px-2 pb-4 text-base transition-all sm:text-xl ${activeTab === 'all' ? 'text-[#1A9C9C]' : 'text-gray-400'
                            }`}
                    >
                        All
                        <span className={`rounded-full px-3 py-0.5 text-sm ${activeTab === 'all' ? 'bg-[#D1EAEA] text-[#1A9C9C]' : 'bg-gray-100 text-gray-400'
                            }`}>
                            {allCount}
                        </span>
                        {activeTab === 'all' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A9C9C] rounded-t-full"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('unread')}
                        className={`relative flex items-center gap-3 px-2 pb-4 text-base transition-all sm:text-xl ${activeTab === 'unread' ? 'text-[#1A9C9C]' : 'text-gray-400'
                            }`}
                    >
                        Unread
                        <span className={`rounded-full px-3 py-0.5 text-sm ${activeTab === 'unread' ? 'bg-[#D1EAEA] text-[#1A9C9C]' : 'bg-gray-100 text-gray-400'
                            }`}>
                            {unreadCount}
                        </span>
                        {activeTab === 'unread' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A9C9C] rounded-t-full"></div>
                        )}
                    </button>
                </div>
            </div>

            {/* Notifications List Container */}
            <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[#E0E0E0] bg-white shadow-sm">
                {isLoading ? (
                    <div className="p-8 text-sm text-gray-500">Loading notifications...</div>
                ) : isError ? (
                    <div className="p-8 text-sm text-red-500">Failed to load notifications.</div>
                ) : (
                    <div className="divide-y divide-[#F0F0F0]">
                        {filteredNotifications.map((notification) => (
                            <button
                                key={notification.id}
                                type="button"
                                onClick={async () => {
                                    await handleMarkAsRead(notification)
                                    handleNotificationClick(notification)
                                }}
                                // disabled={!notification.unread || isMarkingRead}
                                className={`cursor-pointer flex w-full items-start gap-4 px-4 py-5 text-left transition-colors sm:items-center sm:gap-6 sm:px-10 sm:py-6 disabled:cursor-default ${notification.unread ? 'cursor-pointer hover:bg-[#F4FAFD] bg-[#F9FBFC]' : 'bg-white'}`}
                            >
                                <div className="flex-shrink-0">
                                    {getIcon(notification.iconType)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-medium text-[#2A2A2A] sm:text-xl">{notification.title}</h3>
                                    <p className="mt-1 text-sm text-[#666666] sm:text-base">{notification.description}</p>
                                </div>

                                <div className="flex items-center gap-4 sm:gap-6">
                                    <span className="whitespace-nowrap text-sm text-[#999999] sm:text-base">{notification.time}</span>
                                    <div className="flex items-center justify-center w-6">
                                        {notification.unread && (
                                            <div className="w-3 h-3 rounded-full bg-[#00B4D8] shadow-sm shadow-[#00B4D8]/30"></div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
