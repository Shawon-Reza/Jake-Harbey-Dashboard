import React, { useState, useRef } from 'react';
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
    Briefcase,
    Shield,
    Upload,
    Download,
    Eye,
    FileText,
    X
} from 'lucide-react';

const Technicians = () => {
    const [selectedTechnician, setSelectedTechnician] = useState(null);
    const [filterTab, setFilterTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

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
                    <div className="bg-[#004D40] rounded-[32px] p-10 mb-10 flex items-center gap-10 shadow-lg shadow-teal-900/10 relative overflow-hidden h-40">
                        {/* Decorative patterns could go here */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10 flex items-center gap-10">
                            <div className="relative">
                                <img
                                    src={tech.avatar}
                                    alt={tech.name}
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                                />
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#28A745] border-4 border-[#004D40] rounded-full shadow-sm"></div>
                            </div>
                            <div className="text-white">
                                <h2 className="text-3xl font-medium mb-3 tracking-tight">{tech.name}</h2>
                                <span className="inline-flex items-center bg-[#E5F5ED] text-[#28A745] px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                    Available
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Contact Information */}
                        <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                            <h3 className="text-sm font-semibold text-[#6B7280] mb-8">Contact Information</h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Name', value: tech.name.toLowerCase() },
                                    { label: 'Number', value: tech.phone },
                                    { label: 'Company', value: tech.company },
                                    { label: 'Location', value: tech.location },
                                    { label: 'License', value: tech.licenseNumber },
                                ].map((info) => (
                                    <div key={info.label} className="flex pb-4 text-sm">
                                        <span className="w-20 text-[#6B7280]">{info.label}</span>
                                        <span className="text-[#111827] flex-1">: {info.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                            <h3 className="text-sm font-semibold text-[#6B7280] mb-8">Specialties</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {tech.specialties.map((specialty, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-[#EFF6FF] text-[#2563EB] px-4 py-3 rounded-xl text-xs font-medium shadow-sm border border-[#DBEAFE] text-center"
                                    >
                                        {specialty}
                                    </span>
                                ))}
                                {/* Adding mock specialties to match design image */}
                                <span className="bg-[#EFF6FF] text-[#2563EB] px-4 py-3 rounded-xl text-xs font-medium shadow-sm border border-[#DBEAFE] text-center">Window Tinting</span>
                                <span className="bg-[#EFF6FF] text-[#2563EB] px-4 py-3 rounded-xl text-xs font-medium shadow-sm border border-[#DBEAFE] text-center">Window Tinting</span>
                                <span className="bg-[#EFF6FF] text-[#2563EB] px-4 py-3 rounded-xl text-xs font-medium shadow-sm border border-[#DBEAFE] text-center">Window Tinting</span>
                            </div>
                        </div>

                        {/* Performance */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                                <h3 className="text-sm font-semibold text-[#6B7280] mb-8">Performance</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-[#EFF6FF] rounded-2xl border border-[#DBEAFE] text-left">
                                        <div className="flex items-center gap-3 text-[#2563EB] mb-4">
                                            <Briefcase size={20} className="stroke-[2.5px]" />
                                            <span className="text-3xl font-medium">{tech.activeJobs}</span>
                                        </div>
                                        <div className="text-xs text-[#6B7280]">Active Jobs</div>
                                    </div>
                                    <div className="p-6 bg-[#F0FDF4] rounded-2xl border border-[#DCFCE7] text-left">
                                        <div className="flex items-center gap-3 text-[#16A34A] mb-4">
                                            <CheckCircle2 size={20} className="stroke-[2.5px]" />
                                            <span className="text-3xl font-medium">{tech.completedJobs}</span>
                                        </div>
                                        <div className="text-xs text-[#6B7280]">Completed</div>
                                    </div>
                                </div>
                            </div>

                            {/* App Permissions */}
                            <div className="bg-white rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm">
                                <h3 className="text-sm font-semibold text-[#6B7280] mb-8 flex items-center gap-3">
                                    <Shield size={20} className="text-[#6B7280]" /> App Permissions
                                </h3>
                                <div className="flex items-center justify-between p-6 bg-[#F9FAFB] rounded-2xl border border-[#F3F4F6]">
                                    <span className="text-sm text-[#111827]">View Payout Amount</span>
                                    <div className="w-12 h-6 bg-[#1A9C9C] rounded-full p-1 relative cursor-pointer shadow-inner">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className="bg-[#F9FAFB] rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm mb-10">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-3">
                                <FileText className="w-6 h-6 text-[#111827]" />
                                <h3 className="text-xl font-bold text-[#111827]">Documents</h3>
                            </div>
                            <button 
                                onClick={() => setIsUploadModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-[#1A9C9C] text-[#1A9C9C] rounded-xl text-sm font-semibold hover:bg-teal-50 transition-colors"
                            >
                                <Upload className="w-4 h-4" /> Upload Document
                            </button>
                        </div>

                        <div className="flex gap-10 mb-8 border-b border-[#E5E7EB]">
                            {[
                                { name: 'Contracts', count: 1 },
                                { name: 'Insurance', count: 1 },
                                { name: 'ID Documents', count: 1 }
                            ].map((tab, idx) => (
                                <button
                                    key={idx}
                                    className={`pb-4 px-2 text-sm font-medium transition-all relative ${idx === 0 ? 'text-[#1A9C9C]' : 'text-[#6B7280]'}`}
                                >
                                    {tab.name} <span className="ml-1 text-xs opacity-60 text-[#6B7280]">{tab.count}</span>
                                    {idx === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A9C9C]"></div>}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-5 bg-white border border-[#F3F4F6] rounded-2xl group hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#F9FAFB] rounded-xl">
                                        <FileText className="w-5 h-5 text-[#6B7280]" />
                                    </div>
                                    <span className="text-sm font-medium text-[#111827]">Technician contact information</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="p-2 text-[#6B7280] hover:text-[#1A9C9C] transition-colors">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-[#6B7280] hover:text-[#1A9C9C] transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Jobs List */}
                    <div className="bg-[#F9FAFB] rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mb-10">
                        <h3 className="text-xl font-bold text-[#454545] mb-8">Assigned Jobs ( {tech.assignedJobs.length} )</h3>
                        <div className="space-y-4">
                            {tech.assignedJobs.map((job) => (
                                <div key={job.id} className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm border border-[#F3F4F6]">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                            {job.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#2A2A2A] text-lg">{job.name}</p>
                                            <p className="text-xs text-[#6B7280]">{job.service}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-12">
                                        {/* Progress Dots */}
                                        <div className="flex gap-2">
                                            {[...Array(7)].map((_, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={`w-2.5 h-2.5 rounded-full ${idx < job.progress ? 'bg-[#22C55E]' : 'bg-[#E5E7EB]'}`}
                                                ></div>
                                            ))}
                                        </div>
                                        
                                        <span className="px-5 py-1.5 bg-[#DCFCE7] text-[#16A34A] rounded-full text-xs font-bold">
                                            {job.status}
                                        </span>
                                        
                                        <div className="flex items-center gap-2 text-[#6B7280] text-sm">
                                            <Calendar className="w-4 h-4" />
                                            <span>{job.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upload Document Modal */}
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)}></div>
                        <div className="relative bg-white rounded-[32px] w-full max-w-[600px] overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-8 border-b border-[#F3F4F6]">
                                <div className="flex items-center gap-3">
                                    <Upload className="w-6 h-6 text-[#1A9C9C]" />
                                    <h3 className="text-xl font-bold text-[#111827]">Upload Document</h3>
                                </div>
                                <button onClick={() => {
                                    setIsUploadModalOpen(false);
                                    setSelectedFile(null);
                                }} className="p-2 text-[#6B7280] hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            {/* Modal Body */}
                            <div className="p-8 space-y-8">
                                <div>
                                    <label className="block text-sm font-semibold text-[#6B7280] mb-3">Document Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Employment Contract" 
                                        className="w-full px-6 py-4 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500/20 transition-all"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-[#6B7280] mb-3">Document Type</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full px-6 py-4 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500/20 transition-all appearance-none cursor-pointer"
                                        >
                                            <option>Contract (PDF)</option>
                                            <option>Insurance (PDF)</option>
                                            <option>ID Document (Image)</option>
                                        </select>
                                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-[#6B7280] pointer-events-none" />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-[#6B7280] mb-3">File</label>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                    />
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-[#E5E7EB] rounded-[24px] p-12 text-center hover:border-teal-500/30 transition-all cursor-pointer bg-[#F9FBFC] group"
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                                                <Upload className="w-8 h-8 text-[#6B7280]" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-medium text-[#111827]">
                                                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                                                </p>
                                                <p className="text-xs text-[#6B7280] mt-1 font-bold uppercase tracking-tight">PDF, JPG, PNG up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Modal Footer */}
                            <div className="p-8 border-t border-[#F3F4F6] flex gap-4">
                                <button 
                                    onClick={() => {
                                        setIsUploadModalOpen(false);
                                        setSelectedFile(null);
                                    }}
                                    className="flex-1 py-4 px-6 bg-white border border-[#E5E7EB] text-[#111827] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 py-4 px-6 bg-[#92E8FB] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                    <Upload className="w-4 h-4" /> Upload Document
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
