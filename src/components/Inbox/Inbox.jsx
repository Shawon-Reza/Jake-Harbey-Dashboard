import { useState } from 'react';
import {
    Search,
    MapPin,
    ChevronRight,
    ArrowLeft,
    Mail,
    CheckCircle2,
    Edit3,
    Send,
    Clock,
    Flag,
    ChevronDown,
    Wrench,
    Check,
    MessageSquare,
    Shield,
    Briefcase,
    PenTool
} from 'lucide-react';
import JobDetails from '../Shared/JobDetails';

const Inbox = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([
        {
            id: 1,
            customerName: 'Sophie Taylor',
            location: 'WA2 2EE',
            service: 'Chip Repair',
            description: 'Another chip on the other car.',
            status: ['To Assign', 'New Lead'],
            amount: 'TBD',
            date: '10/24/2023',
            avatar: 'S',
            progress: 0,
        },
        {
            id: 2,
            customerName: 'John Smith',
            location: 'M2 2BB',
            service: 'Windshield Replacement',
            description: 'Large crack across the driver side vision area.',
            status: ['New Lead'],
            amount: '£120',
            date: '10/24/2023',
            avatar: 'J',
            progress: 5,
        },
        {
            id: 3,
            customerName: 'Lucy Anderson',
            location: 'SK3 3II',
            service: 'Windshield Replacement',
            description: 'Front windshield cracked.',
            status: ['Active'],
            amount: '£250',
            date: '10/24/2023',
            avatar: 'L',
            progress: 0,
        },
        {
            id: 4,
            customerName: 'Daniel Garcia',
            location: 'M5 5HH',
            service: 'Chip Repair',
            description: 'Two small chips on the front windshield.',
            status: ['To Assign', 'New Lead'],
            amount: '£90',
            date: '10/24/2023',
            avatar: 'D',
            progress: 1,
        },
        {
            id: 5,
            customerName: 'Emily Davis',
            location: 'M3 3CC',
            service: 'Chip Repair',
            description: 'Small stone chip on passenger side.',
            status: ['Active'],
            amount: '£65',
            date: '10/23/2023',
            avatar: 'E',
            progress: 2,
        },
        {
            id: 6,
            customerName: 'Sophie Taylor',
            location: 'WA2 2EE',
            service: 'Detailing',
            description: 'Interior clean.',
            status: ['Requires Attention', 'Active'],
            amount: '£75',
            date: '10/24/2023',
            avatar: 'S',
            progress: 1,
        }
    ]);

    const [technicians, setTechnicians] = useState([
        { name: 'David Chen', dist: '7.9 mi', active: 0, rating: 4.5 },
        { name: 'James Wilson', dist: '14.0 mi', active: 4, rating: 4.8, assigned: true },
        { name: 'Marcus Johnson', dist: '17.1 mi', active: 3, rating: 4.2 },
        { name: 'Emma Thompson', dist: '17.8 mi', active: 2, rating: 4.6 },
        { name: 'Lisa Patel', dist: '20.2 mi', active: 1, rating: 4.7 },
        { name: 'Kevin Durant', dist: '22.5 mi', active: 5, rating: 4.9 },
    ]);

    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleAssignTech = (techName) => {
        setTechnicians(prev => prev.map(tech => ({
            ...tech,
            assigned: tech.name === techName
        })));
    };

    const handleStatusChange = (status) => {
        if (selectedJob) {
            setSelectedJob(prev => ({ ...prev, status: [status] }));
        }
    };

    const updateJobProgress = (newProgress) => {
        if (selectedJob) {
            setSelectedJob(prev => ({ ...prev, progress: newProgress }));
            setJobs(prev => prev.map(job => 
                job.id === selectedJob.id ? { ...job, progress: newProgress } : job
            ));
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

    const PROGRESS_STEPS = [
        { id: 1, label: 'Price Confirmed' },
        { id: 2, label: 'Technician Accepted' },
        { id: 3, label: 'Date & Time Confirmed' },
        { id: 4, label: 'Deposit Paid' },
        { id: 5, label: 'Signed-Off' },
        { id: 6, label: 'Balance Paid' },
        { id: 7, label: 'Completed' },
    ];

    // Filter Logic
    const filteredJobs = jobs.filter(job => {
        // Tab Filtering
        const matchesTab = activeTab === 'All' || job.status.some(s => {
            if (activeTab === 'Attention') return s === 'Requires Attention';
            if (activeTab === 'New Leads') return s === 'New Lead';
            if (activeTab === 'To Assign') return s === 'To Assign';
            if (activeTab === 'Follow Up') return s === 'To Follow Up';
            return false;
        });

        // Search Filtering
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
            job.customerName.toLowerCase().includes(searchLower) ||
            job.service.toLowerCase().includes(searchLower) ||
            job.location.toLowerCase().includes(searchLower) ||
            job.description.toLowerCase().includes(searchLower);

        return matchesTab && matchesSearch;
    });

    // Dynamic Tab Counts
    const getTabCount = (tabName) => {
        if (tabName === 'All') return jobs.length;
        if (tabName === 'Attention') return jobs.filter(j => j.status.includes('Requires Attention')).length;
        if (tabName === 'New Leads') return jobs.filter(j => j.status.includes('New Lead')).length;
        if (tabName === 'To Assign') return jobs.filter(j => j.status.includes('To Assign')).length;
        if (tabName === 'Follow Up') return jobs.filter(j => j.status.includes('To Follow Up')).length;
        return 0;
    };

    const tabs = [
        { label: 'Attention', internalName: 'Attention' },
        { label: 'New Leads', internalName: 'New Leads' },
        { label: 'To Assign', internalName: 'To Assign' },
        { label: 'Follow Up', internalName: 'Follow Up' },
        { label: 'All', internalName: 'All' }
    ];

    return (
        <div className="flex bg-gray-50">
            {!selectedJob && (
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className=" mx-auto p-8">
                        <div className="flex justify-between items-center mb-10">
                            <h1 className="text-3xl font-medium text-[#2A2A2A] mb-8">Inbox</h1>

                        </div>

                        {/* Filter Tags */}
                        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
                            {[
                                { label: 'Attention', count: 3, color: '#F59E0B', bg: '#FFF3E0' },
                                { label: 'New Leads', count: 3, color: '#3B82F6', bg: '#E3F2FD' },
                                { label: 'To Assign', count: 3, color: '#6366F1', bg: '#E8EAF6' },
                                { label: 'Follow Up', count: 1, color: '#A855F7', bg: '#F3E5F5' }
                            ].map((tag) => (
                                <div key={tag.label} className="flex items-center gap-3 px-5 py-2.5 rounded-lg border border-[#E7E7E7] bg-white shadow-sm whitespace-nowrap cursor-pointer hover:border-gray-300">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tag.color }}></div>
                                    <span className="text-[#454545] font-semibold text-sm">{tag.label}</span>
                                    <span className="text-[#2A2A2A] font-bold text-sm ml-1">{tag.count}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tabs and Search */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                            <div className="flex gap-8 border-b border-[#F5F5F5] w-full md:w-auto overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.internalName}
                                        onClick={() => setActiveTab(tab.internalName)}
                                        className={`pb-4 px-1 font-semibold whitespace-nowrap transition-all ${
                                            activeTab === tab.internalName 
                                                ? 'text-[#2563EB] border-b-4 border-[#2563EB]' 
                                                : 'text-[#6B7280] hover:text-[#2563EB]'
                                        }`}
                                    >
                                        {tab.label} <span className="ml-0.5">{getTabCount(tab.internalName)}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-[400px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search name, service, ..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#F9FBFC] border border-[#E7E7E7] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7E8A]/20 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Jobs List */}
                        <div className="space-y-1">
                            {filteredJobs.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No jobs found matching your criteria.
                                </div>
                            ) : (
                                filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    className={`group relative border-y border-transparent border-b-[#F5F5F5] hover:bg-[#F0FAFB] px-4 py-6 transition-all cursor-pointer flex items-center gap-6`}
                                >
                                    <div className="flex items-center gap-6 flex-1 min-w-0">
                                        <div className="flex-shrink-0">
                                            {job.avatar ? (
                                                <div className={`w-12 h-12 rounded-full ${getAvatarColor(job.avatar)} flex items-center justify-center font-semibold text-[#454545] text-lg`}>
                                                    {job.avatar}
                                                </div>
                                            ) : (
                                                <img src={job.image} className="w-12 h-12 rounded-full object-cover" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="font-semibold text-[#2A2A2A] text-lg truncate">{job.customerName}</span>
                                                <div className="flex items-center gap-1.5 text-[#9CA3AF] font-medium text-xs">
                                                    <MapPin size={16} strokeWidth={4.0} /> {job.location}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-[#2A2A2A]font-bold text-sm">
                                                    <Wrench className='text-[#9CA3AF]' size={16} strokeWidth={3.50} /> {job.service}
                                                    <span className="text-gray-400 truncate max-w-[400px]">
                                                        - {job.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="flex gap-2">
                                            {job.status.map(s => (
                                                <span key={s} className={`px-4 py-1.5 rounded-full text-xs font-bold leading-none ${getStatusStyles(s)} flex items-center`}>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="w-[100px]">
                                            <div className="h-1.5 w-full bg-[#E7E7E7] rounded-full mb-1.5 overflow-hidden">
                                                <div
                                                    className="h-full bg-[#22C55E] rounded-full transition-all duration-300"
                                                    style={{ width: `${(job.progress / 7) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-medium text-center">{job.progress}/7</p>
                                        </div>

                                        <div className="w-[80px] text-right">
                                            <p className={`font-semibold text-lg ${job.amount === 'TBD' ? 'text-gray-300' : 'text-[#2A2A2A]'}`}>{job.amount}</p>
                                            <p className="text-[11px] text-[#9CA3AF] font-medium">{job.date}</p>
                                        </div>

                                        <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0D7E8A] transition-colors" />
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            )}

            {selectedJob && (
                <JobDetails 
                    job={selectedJob}
                    onBack={() => setSelectedJob(null)}
                    onUpdateProgress={updateJobProgress}
                    onStatusChange={handleStatusChange}
                    onAssignTech={handleAssignTech}
                    technicians={technicians}
                />
            )}
        </div>
    );
};

export default Inbox;
