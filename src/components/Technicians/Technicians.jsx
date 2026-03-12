import React, { useState } from 'react';
import {
    ChevronRight,
    Plus,
    Search,
    MapPin,
    Phone,
    Building2,
    Award,
    ArrowLeft,
    Mail,
    Clock,
    CheckCircle2,
    ShieldCheck,
    User,
    Settings,
    MoreVertical,
    Calendar,
    Briefcase
} from 'lucide-react';

const Technicians = () => {
    const [selectedTechnician, setSelectedTechnician] = useState(null);
    const [filterTab, setFilterTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const techniciansData = [
        {
            id: 1,
            name: 'Marcus Johnson',
            license: 'MJ 344',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            activeJobs: 3,
            completedJobs: 2,
            status: 'available',
            specialties: ['Windshield Repair', 'Window Tinting'],
            phone: '4548454545',
            company: 'joinventure ai',
            location: 'Downtown Service',
            licenseNumber: '5774chgc',
            assignedJobs: [
                { id: 1, name: 'John Smith', service: 'Windshield Replacement', progress: 7, status: 'Active', date: '10/24/2023' },
                { id: 2, name: 'Emily Davis', service: 'Chip Repair', progress: 2, status: 'Active', date: '10/23/2023' },
                { id: 3, name: 'John Smith', service: 'Window Tinting', progress: 7, status: 'Active', date: '10/19/2023' }
            ]
        },
        {
            id: 2,
            name: 'Sarah Williams',
            license: 'MA 538',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            activeJobs: 1,
            completedJobs: 5,
            status: 'available',
            specialties: ['Chip Repair', 'Windshield Replacement'],
            phone: '4548454545',
            company: 'joinventure ai',
            location: 'Downtown Service',
            licenseNumber: '5774chgc',
            assignedJobs: [
                { id: 1, name: 'Jane Doe', service: 'Windshield Repair', progress: 4, status: 'Active', date: '10/22/2023' }
            ]
        },
        {
            id: 3,
            name: 'David Chen',
            license: 'DK1 OO',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            activeJobs: 0,
            completedJobs: 8,
            status: 'on-job',
            specialties: ['Window Tinting', 'Detailing'],
            phone: '4548454545',
            company: 'joinventure ai',
            location: 'Downtown Service',
            licenseNumber: '5774chgc',
            assignedJobs: []
        },
        {
            id: 4,
            name: 'Emma Thompson',
            license: 'WA1 OO',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            activeJobs: 2,
            completedJobs: 6,
            status: 'available',
            specialties: ['Windshield Repair', 'Chip Repair'],
            phone: '4548454545',
            company: 'joinventure ai',
            location: 'Downtown Service',
            licenseNumber: '5774chgc',
            assignedJobs: []
        },
        {
            id: 5,
            name: 'James Wilson',
            license: 'BL1 EE',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            activeJobs: 4,
            completedJobs: 10,
            status: 'available',
            specialties: ['Windshield Replacement'],
            phone: '4548454545',
            company: 'joinventure ai',
            location: 'Downtown Service',
            licenseNumber: '5774chgc',
            assignedJobs: []
        },
        {
            id: 6,
            name: 'Lisa Patel',
            license: 'WN1 FF',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            activeJobs: 1,
            completedJobs: 3,
            status: 'available',
            specialties: ['Detailing', 'Window Tinting'],
            phone: '4548454545',
            company: 'joinventure ai',
            location: 'Downtown Service',
            licenseNumber: '5774chgc',
            assignedJobs: []
        }
    ];

    const filteredTechnicians = techniciansData.filter(tech => {
        const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (filterTab === 'all') return matchesSearch;
        if (filterTab === 'available') return tech.status === 'available' && matchesSearch;
        if (filterTab === 'on-job') return tech.status === 'on-job' && matchesSearch;
        return matchesSearch;
    });

    if (selectedTechnician) {
        const tech = selectedTechnician;
        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
                <div className=" mx-auto p-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <button
                            onClick={() => setSelectedTechnician(null)}
                            className="flex items-center gap-4 text-[#454545] group transition-all"
                        >
                            <div className="p-3 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="text-xl">Technician Profile</span>
                        </button>
                       
                    </div>

                    {/* Profile Header Banner */}
                    <div className="bg-[#004D40] rounded-[32px] p-10 mb-10 flex items-center gap-10 shadow-lg shadow-teal-900/10 relative overflow-hidden">
                        {/* Decorative patterns could go here */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                            <div className="relative">
                                <img
                                    src={tech.avatar}
                                    alt={tech.name}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                                />
                                <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#28A745] border-4 border-[#004D40] rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <div className="text-white relative z-10">
                            <h2 className="text-5xl mb-4 tracking-tight">{tech.name}</h2>
                            <span className="inline-flex items-center bg-[#E4F8FB] text-[#28A745] px-6 py-2 rounded-full text-sm shadow-sm">
                                Available
                            </span>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Contact Information */}
                        <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                            <h3 className="text-xl font-bold text-[#454545] mb-8">Contact Information</h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Name', value: tech.name.toLowerCase() },
                                    { label: 'Number', value: tech.phone },
                                    { label: 'Company', value: tech.company },
                                    { label: 'Location', value: tech.location },
                                    { label: 'License', value: tech.licenseNumber },
                                ].map((info) => (
                                    <div key={info.label} className="flex border-b border-[#F5F5F5] pb-4">
                                        <span className="w-28 text-gray-400 font-medium text-lg">{info.label}</span>
                                        <span className="text-[#454545] font-bold text-lg flex-1">: {info.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                            <h3 className="text-xl font-bold text-[#454545] mb-8">Specialties</h3>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-4 mb-4">
                                    {tech.specialties.map((specialty, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-[#E4F8FB] text-[#818cf8] px-6 py-3 rounded-2xl text-sm font-bold shadow-sm border border-[#E7E7E7]"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-4 pt-8 border-t border-[#F5F5F5]">
                                    {tech.specialties.map((specialty, idx) => (
                                        <span
                                            key={`copy-${idx}`}
                                            className="bg-[#E4F8FB] text-[#818cf8] px-6 py-3 rounded-2xl text-sm font-bold shadow-sm border border-[#E7E7E7]"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Performance */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                                <h3 className="text-xl font-bold text-[#454545] mb-8">Performance</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-[#E3F2FD] rounded-[24px] border border-blue-50 text-center">
                                        <div className="flex items-center justify-center gap-3 text-[#1976D2] mb-2 font-bold uppercase tracking-tight text-xs">
                                            <Building2 size={16} /> Active Jobs
                                        </div>
                                        <div className="text-4xl text-[#1976D2]">{tech.activeJobs}</div>
                                    </div>
                                    <div className="p-6 bg-[#E8F5E9] rounded-[24px] border border-green-50 text-center">
                                        <div className="flex items-center justify-center gap-3 text-[#2E7D32] mb-2 font-bold uppercase tracking-tight text-xs">
                                            <CheckCircle2 size={16} /> Completed
                                        </div>
                                        <div className="text-4xl text-[#2E7D32]">{tech.completedJobs}</div>
                                    </div>
                                </div>
                            </div>

                            {/* App Permissions */}
                            <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                                <h3 className="text-xl font-bold text-[#454545] mb-8 flex items-center gap-3">
                                    <ShieldCheck className="w-6 h-6 text-gray-400" /> App Permissions
                                </h3>
                                <div className="flex items-center justify-between p-6 bg-[#F9FBFC] rounded-[24px] border border-[#E7E7E7]">
                                    <span className="font-bold text-[#454545]">View Payout Amount</span>
                                    <div className="w-14 h-8 bg-[#1A9C9C] rounded-full p-1 relative shadow-inner cursor-pointer">
                                        <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Jobs List */}
                    <div className="bg-white rounded-[32px] border border-[#E7E7E7] shadow-sm overflow-hidden mb-10">
                        <div className="p-8 border-b border-[#F5F5F5] bg-[#F9FBFC]/50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-[#454545]">Assigned Jobs ({tech.assignedJobs.length})</h3>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                        <div className="divide-y divide-[#F5F5F5]">
                            {tech.assignedJobs.map((job) => (
                                <div key={job.id} className="p-8 flex items-center gap-8 hover:bg-gray-50/50 transition-colors group">
                                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-[#219ebc] font-bold text-xl shadow-sm">
                                        {job.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-[#2A2A2A] text-lg mb-1">{job.name}</p>
                                        <p className="text-gray-400 font-bold text-sm tracking-tight">{job.service}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {[...Array(7)].map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx < job.progress ? 'bg-[#28A745]' : 'bg-[#E7E7E7]'}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-6 min-w-[200px] justify-end">
                                        <span className="px-5 py-2 bg-[#E8F5E9] text-[#28A745] rounded-full text-[11px] uppercase tracking-wider">
                                            {job.status}
                                        </span>
                                        <div className="flex items-center gap-2 text-gray-400 font-bold text-sm min-w-[120px]">
                                            <Calendar className="w-4 h-4" /> {job.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {tech.assignedJobs.length === 0 && (
                                <div className="p-16 text-center">
                                    <User className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                                    <p className="text-gray-400 font-bold text-lg">No active jobs assigned to this technician.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-white">
            <div className=" mx-auto p-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-medium text-[#2A2A2A] mb-8">Technicians</h1>
                
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="flex-1 relative group">
                        <input
                            type="text"
                            placeholder="Search by name, specialty..."fg
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-1/2 pl-16 pr-8 py-3 bg-[#F9FBFC] border border-[#E7E7E7] rounded-xl text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[#1A9C9C]/5 focus:border-[#1A9C9C]/20 transition-all"
                        />
                    </div>
                    <div className="flex gap-4 p-1.5 bg-[#F9FBFC] rounded-xl border border-[#E7E7E7]">
                        {['All', 'Available', 'On Job'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilterTab(tab.toLowerCase().replace(' ', '-'))}
                                className={`px-6 py-3 rounded-xl text-lg transition-all ${filterTab === tab.toLowerCase().replace(' ', '-')
                                    ? 'bg-[#1A9C9C] text-white shadow-lg shadow-teal-100'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Technicians Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTechnicians.map((tech) => (
                        <div
                            key={tech.id}
                            onClick={() => setSelectedTechnician(tech)}
                            className="bg-white border border-[#E7E7E7] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-200/50 cursor-pointer transition-all duration-300 group relative hover:border-b-[#1A9C9C]"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <img
                                            src={tech.avatar}
                                            alt={tech.name}
                                            className="w-20 h-20 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100"
                                        />
                                        <div className={`absolute bottom-0 right-0 w-5 h-5 border-4 border-white rounded-full ${tech.status === 'available' ? 'bg-[#28A745]' : 'bg-orange-400'}`}></div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl text-[#2A2A2A] mb-1 group-hover:text-[#1A9C9C] transition-colors">{tech.name}</h3>
                                        <p className="text-[#6B7280] text-sm flex items-center gap-2 uppercase">
                                            <MapPin className="w-4 h-4" strokeWidth={3.50} /> {tech.license}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-[#1A9C9C]/10 transition-colors">
                                    <ChevronRight className="w-6 h-6 text-[#6B7280] group-hover:text-[#1A9C9C] transition-all" />
                                </div>
                            </div>

                            <div className="mb-6 p-5 bg-[#F9FAFB] rounded-xl border border-[#F3F4F6] flex items-center justify-between">
                                <div className="flex items-start gap-4 flex-col">
                                    <div className="flex items-center gap-4">
                                        <Briefcase className="w-5 h-5 text-[#1A9C9C]" strokeWidth={3.50} />
                                        <p className="text-3xl text-[#2A2A2A]">{tech.activeJobs}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#6B7280]">Active Jobs</p>
                                    </div>
                                </div>
                           
                            </div>

                            <div>
                                <p className="text-sm text-gray-400 font-semibold mb-4">Specialties</p>
                                <div className="flex flex-wrap gap-2.5">
                                    {tech.specialties.map((specialty, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-[#EFF6FF] text-primary px-4 py-2.5 rounded-xl text-xs font-medium shadow-sm border border-[#DBEAFE]"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Technicians;
