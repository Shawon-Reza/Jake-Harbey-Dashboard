import { useState } from 'react';
import JobDetails from '../Shared/JobDetails';
import InboxFilterTags from './InboxFilterTags';
import InboxTabsSearch from './InboxTabsSearch';
import InboxJobsList from './InboxJobsList';
import { useDashboardInboxQuery } from '../../Api/dashboardApi';

const Inbox = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const { data, isLoading, isError } = useDashboardInboxQuery();
    console.log(data)

    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleStatusChange = (status) => {
        if (selectedJob) {
            setSelectedJob(prev => ({ ...prev, status }));
        }
    };

    const updateJobProgress = (newProgress) => {
        if (selectedJob) {
            setSelectedJob(prev => ({ ...prev, progress: newProgress }));
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'To Assign': return 'bg-[#E3F2FD] text-[#1976D2]';
            case 'New Lead': return 'bg-[#E8EAF6] text-[#3F51B5]';
            case 'Active': return 'bg-[#E8F5E9] text-[#2E7D32]';
            case 'Requires Attention': return 'bg-[#FFF3E0] text-[#E65100]';
            case 'To Follow Up': return 'bg-[#F3E5F5] text-[#7B1FA2]';
            case 'Awaiting Confirmation': return 'bg-[#FEF3C7] text-[#92400E]';
            case 'Inactive': return 'bg-[#F5F5F5] text-[#616161]';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getAvatarColor = (letter) => {
        const colors = {
            'S': 'bg-blue-200',
            'J': 'bg-blue-300',
            'L': 'bg-cyan-200',
            'D': 'bg-gray-300',
            'E': 'bg-pink-200',
        };
        return colors[letter] || 'bg-gray-300';
    };

    const inboxCounts = data?.counts || {};
    const inboxJobs = data?.jobs || {};

    const getJobsForTab = () => {
        if (activeTab === 'All') return Array.isArray(inboxJobs.All) ? inboxJobs.All : [];
        return Array.isArray(inboxJobs[activeTab]) ? inboxJobs[activeTab] : [];
    };

    // Filter Logic
    const filteredJobs = getJobsForTab().filter(job => {
        const searchLower = searchQuery.toLowerCase();
        return (
            String(job.customer_name || '').toLowerCase().includes(searchLower) ||
            String(job.service || '').toLowerCase().includes(searchLower) ||
            String(job.vehicle || '').toLowerCase().includes(searchLower) ||
            String(job.description || '').toLowerCase().includes(searchLower)
        );
    });

    const getTabCount = (tabName) => {
        if (tabName === 'All') return Array.isArray(inboxJobs.All) ? inboxJobs.All.length : 0;
        if (tabName === 'attention') return inboxCounts.attention || 0;
        if (tabName === 'new_leads') return inboxCounts.new_leads || 0;
        if (tabName === 'to_assign') return inboxCounts.to_assign || 0;
        if (tabName === 'follow_up') return inboxCounts.follow_up || 0;
        return 0;
    };

    const tabs = [
        { label: 'Attention', internalName: 'attention' },
        { label: 'New Leads', internalName: 'new_leads' },
        { label: 'To Assign', internalName: 'to_assign' },
        { label: 'Follow Up', internalName: 'follow_up' },
        { label: 'All', internalName: 'All' }
    ];

    const filterTags = [
        { label: 'Attention', count: inboxCounts.attention || 0, color: '#F59E0B', bg: '#FFF3E0' },
        { label: 'New Leads', count: inboxCounts.new_leads || 0, color: '#3B82F6', bg: '#E3F2FD' },
        { label: 'To Assign', count: inboxCounts.to_assign || 0, color: '#6366F1', bg: '#E8EAF6' },
        { label: 'Follow Up', count: inboxCounts.follow_up || 0, color: '#A855F7', bg: '#F3E5F5' }
    ];

    return (
        <div className="flex bg-gray-50 min-h-[calc(100vh-64px)]">
            {!selectedJob && (
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="mx-auto p-3 sm:p-4 md:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-2xl md:text-3xl font-medium text-[#2A2A2A]">Inbox</h1>

                        </div>

                        {isLoading ? (
                            <div className="p-6 md:p-8 text-gray-500">Loading inbox data...</div>
                        ) : null}

                        {isError ? (
                            <div className="p-6 md:p-8 text-red-500">Failed to load inbox data.</div>
                        ) : null}

                        {!isLoading && !isError ? (
                            <>
                                <InboxFilterTags tags={filterTags} />

                                <InboxTabsSearch
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    onTabChange={setActiveTab}
                                    getTabCount={getTabCount}
                                    searchQuery={searchQuery}
                                    onSearchChange={setSearchQuery}
                                />

                                <InboxJobsList
                                    jobs={filteredJobs}
                                    onSelect={setSelectedJob}
                                    getAvatarColor={getAvatarColor}
                                    getStatusStyles={getStatusStyles}
                                />
                            </>
                        ) : null}
                    </div>
                </div>
            )}

            {selectedJob && (
                <JobDetails
                    job={selectedJob}
                    onBack={() => setSelectedJob(null)}
                    onUpdateProgress={updateJobProgress}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default Inbox;
