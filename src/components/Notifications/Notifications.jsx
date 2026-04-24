import React, { useState } from 'react';
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

export default function Notifications() {
    const [activeTab, setActiveTab] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'job-assigned',
            title: 'Job assigned',
            description: 'Job #11 assigned to James Wilson - Windshield Replacement.',
            time: '2h ago',
            unread: false,
            iconType: 'user'
        },
        {
            id: 2,
            type: 'service-request',
            title: 'New service request',
            description: 'John Smith submitted a new request for Windshield Replacement.',
            time: '3h ago',
            unread: true,
            iconType: 'briefcase'
        },
        {
            id: 3,
            type: 'service-request',
            title: 'New service request',
            description: 'Daniel Garcia submitted a new request for Chip Repair.',
            time: '4h ago',
            unread: false,
            iconType: 'briefcase'
        },
        {
            id: 4,
            type: 'follow-up',
            title: 'Follow-up reminder',
            description: 'Oliver White - Detailing. Customer did not answer phone.',
            time: '20h ago',
            unread: true,
            iconType: 'clock'
        },
        {
            id: 5,
            type: 'signed-off',
            title: 'Customer signed off',
            description: 'Lucy Anderson signed off on job #12.',
            time: '22h ago',
            unread: false,
            iconType: 'clipboard'
        },
        {
            id: 6,
            type: 'declined',
            title: 'Job declined',
            description: 'David Chen declined job #3. Needs reassignment.',
            time: 'Yesterday',
            unread: false,
            iconType: 'error'
        },
        {
            id: 7,
            type: 'completed',
            title: 'Job completed',
            description: 'Job #8 completed - Window Tinting for John Smith.',
            time: 'Yesterday',
            unread: false,
            iconType: 'check'
        }
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;
    const allCount = 15; // To match image exactly

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter(n => n.unread)
        : notifications;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
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

    return (
        <div className="min-h-screen bg-[#F8FAFB] px-8 py-2">
            {/* Header */}
            <div className=" mx-auto mb-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl text-[#2A2A2A]">Notifications</h1>
                        <span className="bg-[#FF4D4D] text-white px-4 py-1 rounded-full">
                            5 new
                        </span>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className="text-[#1A9C9C] flex items-center gap-3 text-xl hover:opacity-80 transition-opacity"
                    >
                        <Check size={24} strokeWidth={3} />
                        Mark all as read
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-12 border-b border-[#E0E0E0] relative">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-4 px-2 flex items-center gap-3 text-xl transition-all relative ${activeTab === 'all' ? 'text-[#1A9C9C]' : 'text-gray-400'
                            }`}
                    >
                        All
                        <span className={`px-3 py-0.5 rounded-full text-sm ${activeTab === 'all' ? 'bg-[#D1EAEA] text-[#1A9C9C]' : 'bg-gray-100 text-gray-400'
                            }`}>
                            {allCount}
                        </span>
                        {activeTab === 'all' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A9C9C] rounded-t-full"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('unread')}
                        className={`pb-4 px-2 flex items-center gap-3 text-xl transition-all relative ${activeTab === 'unread' ? 'text-[#1A9C9C]' : 'text-gray-400'
                            }`}
                    >
                        Unread
                        <span className={`px-3 py-0.5 rounded-full text-sm ${activeTab === 'unread' ? 'bg-[#D1EAEA] text-[#1A9C9C]' : 'bg-gray-100 text-gray-400'
                            }`}>
                            5
                        </span>
                        {activeTab === 'unread' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A9C9C] rounded-t-full"></div>
                        )}
                    </button>
                </div>
            </div>

            {/* Notifications List Container */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden shadow-sm">
                <div className="divide-y divide-[#F0F0F0]">
                    {filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-center gap-6 px-10 py-6 transition-colors ${notification.unread ? 'bg-[#F9FBFC]' : 'bg-white'
                                }`}
                        >
                            <div className="flex-shrink-0">
                                {getIcon(notification.iconType)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl text-[#2A2A2A]">{notification.title}</h3>
                                <p className="text-[#666666] mt-1">{notification.description}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-[#999999] text-base whitespace-nowrap">{notification.time}</span>
                                <div className="flex items-center justify-center w-6">
                                    {notification.unread && (
                                        <div className="w-3 h-3 rounded-full bg-[#00B4D8] shadow-sm shadow-[#00B4D8]/30"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
