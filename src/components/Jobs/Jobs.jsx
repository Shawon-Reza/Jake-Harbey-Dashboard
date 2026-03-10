import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    AlertCircle,
    Send,
    Mail,
    CheckCircle2,
    ArrowLeft,
    ChevronDown,
    Flag,
    Edit3,
    Camera
} from 'lucide-react';

export default function Jobs() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showDetailView, setShowDetailView] = useState(false);

    const jobsData = [
        {
            id: 1,
            customer: 'John Smith',
            location: 'WA2 2EE',
            service: 'Windshield Replacement',
            status: 'New Lead',
            statusColor: '#1976D2',
            statusBg: '#E3F2FD',
            amount: 'TBD',
            date: '10/24/2023',
            progress: 0,
            attention: true,
            assignment: 'To Assign',
            avatar: 'J'
        },
        {
            id: 2,
            customer: 'Emily Davis',
            location: 'M3 3CC',
            service: 'Chip Repair',
            status: 'Active',
            statusColor: '#2E7D32',
            statusBg: '#E8F5E9',
            amount: '£65.00',
            date: '10/23/2023',
            progress: 2,
            attention: false,
            assignment: 'Assigned',
            avatar: 'E'
        },
        {
            id: 3,
            customer: 'Michael Brown',
            location: 'B1 1AA',
            service: 'Window Tinting',
            status: 'Awaiting Confirmation',
            statusColor: '#F9A825',
            statusBg: '#FFF8E1',
            amount: '£150.00',
            date: '10/22/2023',
            progress: 3,
            attention: true,
            assignment: 'To Assign',
            avatar: 'M'
        },
        {
            id: 4,
            customer: 'Sophie Taylor',
            location: 'WA2 2EE',
            service: 'Windshield Repair',
            status: 'Active',
            statusColor: '#2E7D32',
            statusBg: '#E8F5E9',
            amount: '£85.00',
            date: '10/21/2023',
            progress: 4,
            attention: false,
            assignment: 'Assigned',
            avatar: 'S'
        },
        {
            id: 5,
            customer: 'Oliver White',
            location: 'L1 5RR',
            service: 'Detailing',
            status: 'To Follow Up',
            statusColor: '#7B1FA2',
            statusBg: '#F3E5F5',
            amount: 'TBD',
            date: '10/22/2023',
            progress: 0,
            attention: false,
            assignment: 'Unassigned',
            avatar: 'O'
        },
        {
            id: 6,
            customer: 'Daniel Garcia',
            location: 'M5 5HH',
            service: 'Chip Repair',
            status: 'New Lead',
            statusColor: '#1976D2',
            statusBg: '#E3F2FD',
            amount: '£90.00',
            date: '10/24/2023',
            progress: 1,
            attention: false,
            assignment: 'To Assign',
            avatar: 'D'
        },
        {
            id: 7,
            customer: 'John Smith',
            location: 'WA2 2EE',
            service: 'Window Tinting',
            status: 'Completed',
            statusColor: '#2E7D32',
            statusBg: '#E8F5E9',
            amount: '£120.00',
            date: '10/18/2023',
            progress: 7,
            attention: false,
            assignment: 'Assigned',
            avatar: 'J'
        },
        {
            id: 8,
            customer: 'Sophie Taylor',
            location: 'WA2 2EE',
            service: 'Detailing',
            status: 'Active',
            statusColor: '#2E7D32',
            statusBg: '#E8F5E9',
            amount: '£75.00',
            date: '10/22/2023',
            progress: 3,
            attention: true,
            assignment: 'Assigned',
            avatar: 'S'
        }
    ];

    const getAvatarColor = (letter) => {
        const colors = {
            'S': 'bg-pink-100',
            'J': 'bg-blue-100',
            'L': 'bg-green-100',
            'D': 'bg-purple-100',
            'E': 'bg-yellow-100',
            'M': 'bg-indigo-100',
            'O': 'bg-orange-100'
        };
        return colors[letter] || 'bg-gray-100';
    };

    const technicians = [
        { id: 1, name: 'David Chan', rating: 4.8, reviews: 12 },
        { id: 2, name: 'Marcus Johnson', rating: 4.9, reviews: 18 },
        { id: 3, name: 'Marcus Johnson', rating: 4.7, reviews: 8 },
        { id: 4, name: 'Emma Thompson', rating: 4.6, reviews: 15 },
        { id: 5, name: 'Lisa Patel', rating: 4.9, reviews: 22 },
        { id: 6, name: 'Marcus Johnson', rating: 4.8, reviews: 11 },
        { id: 7, name: 'Emma Thompson', rating: 4.7, reviews: 9 },
        { id: 8, name: 'Lisa Patel', rating: 4.9, reviews: 14 },
    ];

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setShowDetailView(true);
    };

    const handleBackClick = () => {
        setShowDetailView(false);
        setSelectedJob(null);
    };

    const getStatusColor = (status) => {
        const colors = {
            'New Lead': 'bg-blue-100 text-blue-700',
            'Active': 'bg-green-100 text-green-700',
            'Awaiting Confirmation': 'bg-yellow-100 text-yellow-700',
            'To Follow Up': 'bg-purple-100 text-purple-700',
            'Completed': 'bg-green-100 text-green-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    if (showDetailView && selectedJob) {
        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
                <div className="max-w-[1240px] mx-auto p-10">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                            <button onClick={handleBackClick} className="p-3 bg-white border border-[#E7E7E7] rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <h1 className="text-3xl font-bold text-[#2A2A2A]">Job # {selectedJob.id}</h1>
                                    <div className="relative group">
                                        <button className={`px-5 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 bg-[#FFF8E1] text-[#F9A825]`}>
                                            {selectedJob.status} <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 font-medium">Submitted on 10/22/2023, 4:00:00 PM</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm font-bold text-sm text-[#454545] hover:shadow-md transition-all">
                                <Clock className="w-5 h-5" /> Mark to Follow Up
                            </button>
                            <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm font-bold text-sm text-[#454545] hover:shadow-md transition-all">
                                <Flag className="w-5 h-5" /> Flag Attention
                            </button>
                        </div>
                    </div>

                    {/* Sub-Header Actions */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex gap-4">
                            <button className="flex items-center gap-3 px-8 py-4 bg-[#818cf8] text-white rounded-2xl shadow-lg shadow-indigo-100 font-bold transition-all hover:-translate-y-0.5">
                                <Send className="w-5 h-5" /> Send to Technician
                            </button>
                            <button className="flex items-center gap-3 px-8 py-4 bg-[#1A9C9C]/30 text-[#1A9C9C] border border-[#1A9C9C] rounded-2xl font-bold hover:bg-[#1A9C9C]/40 transition-all">
                                <Mail className="w-5 h-5" /> Send Deposit Request
                            </button>
                        </div>
                        <div className={`flex items-center gap-4 px-6 py-3 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm ${selectedJob.assignment === 'Unassigned' ? 'border-orange-500/30' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-[#818cf8] flex items-center justify-center text-white font-bold shadow-md">
                                {selectedJob.avatar}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`font-bold text-lg ${selectedJob.assignment === 'Unassigned' ? 'text-orange-500' : 'text-[#2A2A2A]'}`}>
                                    {selectedJob.assignment === 'Unassigned' ? 'Unassigned' : `Assigned to ${selectedJob.customer}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Job Progress Timeline */}
                    <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mb-10 overflow-hidden relative">
                        <h3 className="text-xl font-bold text-[#454545] mb-12">Job Progress</h3>
                        <div className="relative flex justify-between">
                            {/* Progress Line Background */}
                            <div className="absolute top-[25px] left-0 w-full h-1 bg-[#F5F5F5] z-0"></div>
                            {/* Active Progress Line */}
                            <div
                                className="absolute top-[25px] left-0 h-1 bg-[#28A745] z-0 transition-all duration-500"
                                style={{ width: `${(Math.min(selectedJob.progress, 6) / 6) * 100}%` }}
                            ></div>

                            {[
                                { label: 'Price Confirmed', date: '10/22/2023' },
                                { label: 'Technician Accepted', date: '10/25/2026' },
                                { label: 'Date & Time Confirmed' },
                                { label: 'Deposit Paid' },
                                { label: 'Signed-Off' },
                                { label: 'Balance Paid' },
                                { label: 'Completed' },
                            ].map((step, idx) => (
                                <div key={idx} className="relative z-10 flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all ${idx < selectedJob.progress ? 'bg-[#28A745] border-white text-white shadow-lg shadow-green-100' : idx === selectedJob.progress ? 'bg-white border-[#E7E7E7] text-[#818cf8]' : 'bg-white border-[#E7E7E7] text-gray-300'}`}>
                                        {idx < selectedJob.progress ? <CheckCircle2 className="w-7 h-7" /> : idx + 1}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <p className={`text-[13px] font-bold max-w-[100px] leading-tight mb-1 ${idx < selectedJob.progress ? 'text-[#28A745]' : idx === selectedJob.progress ? 'text-[#818cf8]' : 'text-gray-400'}`}>
                                            {step.label}
                                        </p>
                                        {step.date && idx < selectedJob.progress && <p className="text-[10px] text-gray-300 font-medium">{step.date}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Left Column: Customer Details */}
                        <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                            <h3 className="text-xl font-bold text-[#454545] mb-8">Customer Details</h3>
                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { label: 'Name', value: selectedJob.customer },
                                    { label: 'Number', value: '45465454546' },
                                    { label: 'Email', value: 'pappyroy6393@gmail.com' },
                                    { label: 'Location', value: 'Downtown Service' },
                                    { label: 'Time', value: '18 hours left' },
                                    { label: 'Make', value: 'Ford' },
                                    { label: 'Year', value: '2018' },
                                    { label: 'Model', value: 'Fiesta' },
                                    { label: 'Colour', value: 'Blue' },
                                ].map((detail) => (
                                    <div key={detail.label} className="flex border-b border-[#F5F5F5] pb-4">
                                        <span className="w-32 text-gray-400 font-medium text-lg">{detail.label}</span>
                                        <span className="text-[#454545] font-bold text-lg flex-1">: {detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Service Details */}
                            <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                                <h3 className="text-xl font-bold text-[#454545] mb-8">Service Details</h3>
                                <div className="bg-[#E4F8FB] rounded-[24px] p-6 mb-8 flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                        <Edit3 className="w-6 h-6 text-[#1A9C9C]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#454545] text-lg mb-1">Damage Breakdown</h4>
                                        <p className="text-[#454545] text-sm opacity-60 leading-relaxed">
                                            Passenger Rear Door : Scratches And Scuff Marks Requiring Smoothening And Repainting
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="relative aspect-square rounded-[20px] overflow-hidden border-2 border-transparent hover:border-[#F68528] cursor-pointer group transition-all">
                                            <img src={`https://via.placeholder.com/200?text=Damage+${i}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Camera className="text-white w-6 h-6" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Assign Technician */}
                            <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm max-h-[600px] flex flex-col">
                                <h3 className="text-xl font-bold text-[#454545] mb-8">Assign Technician</h3>
                                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                    {[
                                        { name: 'David Chen', dist: '7.9 mi', active: 0, rating: 4.8 },
                                        { name: 'Marcus Johnson', dist: '17.1 mi', active: 3, rating: 4.7 },
                                        { name: 'Emma Thompson', dist: '17.8 mi', active: 2, rating: 4.6 },
                                        { name: 'Lisa Patel', dist: '20.2 mi', active: 1, rating: 4.9 },
                                    ].map((tech, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-[#E7E7E7] flex items-center justify-between hover:shadow-md transition-shadow group">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img src={`https://ui-avatars.com/api/?name=${tech.name}&background=random&color=fff`} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#2A2A2A] text-sm mb-0.5">{tech.name}</p>
                                                    <div className="flex items-center gap-4 text-[11px] font-semibold">
                                                        <span className="text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {tech.dist}</span>
                                                        <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {tech.active} active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="px-6 py-2 rounded-xl text-xs font-bold border border-[#E7E7E7] text-[#454545] hover:border-gray-400 transition-all">
                                                Assign
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mb-10">
                        <h3 className="text-xl font-bold text-[#454545] mb-10">Pricing & Payments</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: 'Total Price', val: selectedJob.amount === 'TBD' ? 'NO SET' : selectedJob.amount, status: 'Pending', color: 'bg-[#FFF8E1] text-[#F9A825]' },
                                { label: 'Deposit', val: '£00.00', status: 'Pending', color: 'bg-[#FFF8E1] text-[#F9A825]' },
                                { label: 'Balance', val: '£00.00', status: 'Pending', color: 'bg-gray-100 text-gray-400' }
                            ].map((p, i) => (
                                <div key={i} className="p-8 rounded-[28px] border border-[#F5F5F5] bg-[#F9FBFC] relative group">
                                    <button className="absolute top-6 right-6 p-2 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Edit3 className="w-4 h-4 text-gray-400" />
                                    </button>
                                    <p className="text-gray-400 font-medium text-sm mb-4">{p.label}</p>
                                    <p className="text-4xl font-bold text-[#2A2A2A] mb-4">{p.val}</p>
                                    <span className={`px-4 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${p.color}`}>
                                        {p.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="bg-white rounded-[32px] border border-[#E7E7E7] shadow-sm overflow-hidden mb-10">
                        <div className="p-8 border-b border-[#F5F5F5] flex justify-between items-center bg-[#F9FBFC]/50">
                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-gray-400" />
                                <h3 className="text-xl font-bold text-[#454545]">Internal Notes</h3>
                            </div>
                            <span className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-tighter">
                                <Edit3 className="w-4 h-4" /> Admin Only
                            </span>
                        </div>
                        <div className="p-10">
                            <textarea
                                placeholder="Type an internal note..."
                                className="w-full p-6 bg-[#F9FBFC] border border-[#E7E7E7] rounded-[24px] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7E8A]/20 transition-all font-medium h-32 resize-none"
                            />
                            <div className="flex justify-end mt-4">
                                <button className="bg-[#818cf8] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:-translate-y-0.5 transition-all">
                                    Send Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-white">
            <div className="max-w-[1400px] mx-auto p-12">
                <div className="flex items-center justify-between mb-16">
                    <h1 className="text-6xl font-medium text-[#2A2A2A] tracking-tight">All Jobs</h1>
                    <button className="bg-[#1A9C9C] hover:bg-[#158080] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-teal-50 transition-all">
                        New Job
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {jobsData.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => handleJobClick(job)}
                            className="bg-white border border-[#E7E7E7] rounded-[32px] p-8 hover:shadow-2xl hover:shadow-gray-200/50 cursor-pointer transition-all duration-300 group relative border-b-4 border-b-transparent hover:border-b-[#1A9C9C]"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h3 className="font-bold text-2xl text-[#2A2A2A] mb-3 group-hover:text-[#1A9C9C] transition-colors">{job.customer}</h3>
                                    <p className="text-gray-400 font-bold text-sm flex items-center gap-2">
                                        <Edit3 className="w-4 h-4 text-gray-300" /> {job.service}
                                    </p>
                                </div>
                                <span
                                    className="px-5 py-2 text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm"
                                    style={{ backgroundColor: job.statusBg, color: job.statusColor }}
                                >
                                    {job.status}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {job.attention && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FFF3E0] text-[#E65100] text-[11px] font-bold rounded-xl border border-orange-100 shadow-sm">
                                        <AlertCircle size={14} /> Requires Attention
                                    </div>
                                )}
                                {job.assignment === 'To Assign' && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-[#E3F2FD] text-[#1976D2] text-[11px] font-bold rounded-xl border border-blue-100 shadow-sm">
                                        <Send size={14} className="w-3.5 h-3.5" /> To Assign
                                    </div>
                                )}
                                {job.assignment === 'To Follow Up' && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-[#F3E5F5] text-[#7B1FA2] text-[11px] font-bold rounded-xl border border-purple-100 shadow-sm">
                                        <Clock size={14} /> To Follow Up
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                                    <Clock size={18} className="text-gray-300" /> {job.date}
                                </div>
                                <div className={`text-3xl font-extrabold ${job.amount === 'TBD' ? 'text-gray-300' : 'text-[#2A2A2A]'}`}>
                                    {job.amount}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex gap-1.5">
                                        {[...Array(7)].map((_, idx) => (
                                            <div key={idx} className={`w-2.5 h-2.5 rounded-full ${idx < job.progress ? 'bg-[#28A745]' : 'bg-[#E7E7E7]'}`}></div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-10 h-10 rounded-full ${getAvatarColor(job.avatar)} flex items-center justify-center text-[#454545] font-bold border-2 border-white shadow-sm ring-1 ring-gray-100`}>
                                            {job.avatar}
                                        </div>
                                        <span className={`text-[13px] font-bold ${job.assignment === 'Unassigned' ? 'text-orange-500' : 'text-[#454545]'}`}>
                                            {job.assignment}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-[#1A9C9C]/10 transition-colors">
                                    <ChevronRight size={24} className="text-gray-300 group-hover:text-[#1A9C9C] transition-all" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
