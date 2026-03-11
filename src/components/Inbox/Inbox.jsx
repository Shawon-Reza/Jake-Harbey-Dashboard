import { useState } from 'react';
import {
    Search,
    MapPin,
    ChevronRight,
    ArrowLeft,
    Mail,
    CheckCircle2,
    Camera,
    Edit3,
    Send,
    Clock,
    Flag,
    ChevronDown,
    Wrench
} from 'lucide-react';

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

    const getStatusStyles = (status) => {
        switch (status) {
            case 'To Assign': return 'bg-[#E3F2FD] text-[#1976D2]';
            case 'New Lead': return 'bg-[#E8EAF6] text-[#3F51B5]';
            case 'Active': return 'bg-[#E8F5E9] text-[#2E7D32]';
            case 'Requires Attention': return 'bg-[#FFF3E0] text-[#E65100]';
            case 'To Follow Up': return 'bg-[#F3E5F5] text-[#7B1FA2]';
            case 'Awaiting Confirmation': return 'bg-[#FFF8E1] text-[#F9A825]';
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

    return (
        <div className="flex h-screen bg-gray-50">
            {!selectedJob && (
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="max-w-7xl mx-auto p-8">
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
                            <div className="flex gap-8 border-b border-[#F5F5F5] w-full md:w-auto">
                                {['Attention 3', 'New Leads 3', 'To Assign 3', 'Follow Up 1', 'All 12'].map((tab, idx) => (
                                    <button
                                        key={tab}
                                        className={`pb-4 px-1 font-semibold whitespace-nowrap transition-all ${idx === 0 ? 'text-[#2563EB] border-b-4 border-[#2563EB]' : 'text-[#6B7280] hover:text-[#2563EB]'}`}
                                    >
                                        {tab.split(' ')[0]} <span className="ml-0.5">{tab.split(' ')[1]}</span> <span className="ml-0.5">{tab.split(' ')[2]}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-[400px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search name, service, ..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#F9FBFC] border border-[#E7E7E7] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7E8A]/20 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Jobs List */}
                        <div className="space-y-1">
                            {jobs.map((job) => (
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
                                            <div className="flex gap-1 mb-1.5">
                                                {[...Array(7)].map((_, i) => (
                                                    <div key={i} className={`h-1.5 flex-1 rounded-sm ${i < job.progress ? 'bg-[#28A745]' : 'bg-[#E7E7E7]'}`}></div>
                                                ))}
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-medium text-center">{job.progress}/7</p>
                                        </div>

                                        <div className="w-[80px] text-right">
                                            <p className={`font-bold text-lg ${job.amount === 'TBD' ? 'text-gray-300' : 'text-[#2A2A2A]'}`}>{job.amount}</p>
                                            <p className="text-[11px] text-gray-400 font-medium">{job.date}</p>
                                        </div>

                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#0D7E8A] transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedJob && (
                <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
                    <div className="max-w-[1240px] mx-auto p-10">
                        {/* Header Section */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-6">
                                <button onClick={() => setSelectedJob(null)} className="p-3 bg-white border border-[#E7E7E7] rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </button>
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <h1 className="text-3xl font-bold text-[#2A2A2A]">Job # {selectedJob.id}</h1>
                                        <div className="relative group">
                                            <button className={`px-5 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusStyles('Awaiting Confirmation')}`}>
                                                Awaiting Confirmation <ChevronDown className="w-4 h-4" />
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
                            <div className="flex items-center gap-4 px-6 py-3 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm">
                                <img src="https://ui-avatars.com/api/?name=James+Wilson&background=818cf8&color=fff" className="w-10 h-10 rounded-full border-2 border-[#818cf8]" />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 font-medium text-lg">Assigned to</span>
                                    <span className="text-[#2A2A2A] font-bold text-lg">James Wilson</span>
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
                                <div className="absolute top-[25px] left-0 w-[20%] h-1 bg-[#28A745] z-0"></div>

                                {[
                                    { id: 1, label: 'Price Confirmed', completed: true, date: '10/22/2023' },
                                    { id: 2, label: 'Technician Accepted', completed: true, date: '10/25/2026' },
                                    { id: 3, label: 'Date & Time Confirmed', completed: false },
                                    { id: 4, label: 'Deposit Paid', completed: false },
                                    { id: 5, label: 'Signed-Off', completed: false },
                                    { id: 6, label: 'Balance Paid', completed: false },
                                    { id: 7, label: 'Completed', completed: false },
                                ].map((step, idx) => (
                                    <div key={idx} className="relative z-10 flex flex-col items-center flex-1">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all ${step.completed ? 'bg-[#28A745] border-white text-white shadow-lg shadow-green-100' : idx === 2 ? 'bg-white border-[#E7E7E7] text-[#818cf8]' : 'bg-white border-[#E7E7E7] text-gray-300'}`}>
                                            {step.completed ? <CheckCircle2 className="w-7 h-7" /> : step.id}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <p className={`text-[13px] font-bold max-w-[100px] leading-tight mb-1 ${step.completed ? 'text-[#28A745]' : idx === 2 ? 'text-[#818cf8]' : 'text-gray-400'}`}>
                                                {step.label}
                                            </p>
                                            {step.date && <p className="text-[10px] text-gray-300 font-medium">{step.date}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Left Column: Customer Details */}
                            <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                                <h3 className="text-xl font-bold text-[#454545] mb-8">Customer Details</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        { label: 'Name', value: 'pappu' },
                                        { label: 'Number', value: '45465454546' },
                                        { label: 'Email', value: 'pappyroy6393@gmail.com', copyable: true },
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

                            {/* Right Column Content */}
                            <div className="space-y-8">
                                {/* Service Details with Damage Breakdown */}
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
                                                <img src={`https://via.placeholder.com/200?text=Car+Damage+${i}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Camera className="text-white w-6 h-6" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Assign Technician */}
                                <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm max-h-[600px] flex flex-col">
                                    <div className="flex items-center gap-3 mb-8">
                                        <h3 className="text-xl font-bold text-[#454545]">Assign Technician</h3>
                                    </div>
                                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                                        {[
                                            { name: 'David Chen', dist: '7.9 mi', active: 0, rating: 4.5, color: 'bg-green-50' },
                                            { name: 'James Wilson', dist: '14.0 mi', active: 4, rating: 4.8, color: 'bg-[#E3F2FD]', assigned: true },
                                            { name: 'Marcus Johnson', dist: '17.1 mi', active: 3, rating: 4.2, color: 'bg-green-50' },
                                            { name: 'Emma Thompson', dist: '17.8 mi', active: 2, rating: 4.6, color: 'bg-green-50' },
                                            { name: 'Lisa Patel', dist: '20.2 mi', active: 1, rating: 4.7, color: 'bg-green-50' },
                                            { name: 'Marcus Johnson', dist: '17.1 mi', active: 3, rating: 4.2, color: 'bg-green-50' },
                                            { name: 'Emma Thompson', dist: '17.8 mi', active: 2, rating: 4.6, color: 'bg-green-50' },
                                            { name: 'Lisa Patel', dist: '20.2 mi', active: 1, rating: 4.7, color: 'bg-green-50' },
                                        ].map((tech, idx) => (
                                            <div key={idx} className={`p-4 rounded-2xl border border-[#E7E7E7] flex items-center justify-between hover:shadow-md transition-shadow group ${tech.assigned ? 'bg-[#E8F0FE] border-[#818cf8]/30' : 'bg-white'}`}>
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
                                                <button className={`px-6 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${tech.assigned ? 'bg-[#818cf8] text-white' : 'bg-white border border-[#E7E7E7] text-[#454545] hover:border-gray-400'}`}>
                                                    {tech.assigned ? <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Assigned</span> : 'Assign'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mb-10">
                            <h3 className="text-xl font-bold text-[#454545] mb-10">Pricing & Payments</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { label: 'Total Price', val: '£150.00', status: 'Pending', color: 'bg-[#FFF8E1] text-[#F9A825]' },
                                    { label: 'Deposit', val: '£50.00', status: 'Pending', color: 'bg-[#FFF8E1] text-[#F9A825]' },
                                    { label: 'Balance', val: '£100.00', status: 'Pending', color: 'bg-[#FFF8E1] text-[#F9A825]' }
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

                        {/* Internal Notes Section */}
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
                                <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto">
                                    <div className="flex items-start gap-5">
                                        <img src="https://ui-avatars.com/api/?name=Admin+John&background=818cf8&color=fff" className="w-10 h-10 rounded-full shadow-sm" />
                                        <div className="bg-[#EBF1FF] rounded-[24px] rounded-tl-none p-6 flex-1 max-w-[80%] relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="font-bold text-[#0D7E8A] text-sm">Admin John</p>
                                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" /> 10/23/23, 2:08 PM
                                                </span>
                                            </div>
                                            <p className="text-[#454545] text-sm leading-relaxed font-medium">
                                                Tech 3 declined, need to reassign.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <img src="https://ui-avatars.com/api/?name=Admin+John&background=818cf8&color=fff" className="w-10 h-10 rounded-full shadow-sm" />
                                        <div className="bg-[#EBF1FF] rounded-[24px] rounded-tl-none p-6 flex-1 max-w-[80%] relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="font-bold text-[#0D7E8A] text-sm">Admin John</p>
                                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" /> 10/23/23, 2:40 PM
                                                </span>
                                            </div>
                                            <p className="text-[#454545] text-sm leading-relaxed font-medium">
                                                Tech 3 declined, need to reassign.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Type an internal note..."
                                        className="w-full pl-6 pr-20 py-5 bg-[#F9FBFC] border border-[#E7E7E7] rounded-[24px] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7E8A]/20 transition-all font-medium"
                                    />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#818cf8] text-white rounded-xl shadow-lg shadow-indigo-100 hover:scale-110 transition-transform active:scale-95">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inbox;
