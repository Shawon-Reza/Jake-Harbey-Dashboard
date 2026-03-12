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
    Briefcase
} from 'lucide-react';
import car1 from '../../assets/images/car1.png';
import car2 from '../../assets/images/car2.png';
import car3 from '../../assets/images/car3.png';
import car4 from '../../assets/images/car4.png';
import mechanic from '../../assets/images/mechanic.png';
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

    const handleAssignTech = (techName) => {
        setTechnicians(prev => prev.map(tech => ({
            ...tech,
            assigned: tech.name === techName
        })));
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
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedJob && (
                <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
                    <div className=" mx-auto p-10">
                        {/* Header Section */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-6">
                                <button onClick={() => setSelectedJob(null)} className="p-3 bg-white border border-[#E7E7E7] rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                                </button>
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <h1 className="text-3xl font-medium text-[#2A2A2A]">Job # {selectedJob.id}</h1>
                                        <div className="relative group">
                                            <button className={`px-5 py-1.5 rounded-full text-sm flex items-center gap-2 ${getStatusStyles('Awaiting Confirmation')}`}>
                                                Awaiting Confirmation <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#6B7280]font-medium">Submitted on 10/22/2023, 4:00:00 PM</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-[#E7E7E7] rounded-lg shadow-sm text-sm text-[#454545] hover:shadow-md transition-all">
                                    <Clock className="w-5 h-5" /> Mark to Follow Up
                                </button>
                                <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-[#E7E7E7] rounded-lg shadow-sm text-sm text-[#454545] hover:shadow-md transition-all">
                                    <Flag className="w-5 h-5" /> Flag Attention
                                </button>
                            </div>
                        </div>

                        {/* Sub-Header Actions */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-3 px-8 py-4 bg-[#2563EB]/50 text-white rounded-2xl shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5">
                                    <Send className="w-5 h-5" /> Send to Technician
                                </button>
                                <button className="flex items-center gap-3 px-8 py-4 bg-[#16A34A]/50 text-white rounded-2xl hover:bg-[#1A9C9C]/40 transition-all">
                                    <Mail className="w-5 h-5" /> Send Deposit Request
                                </button>
                            </div>
                            <div className="flex items-center gap-4 px-6 py-3 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm">
                                <img src="https://ui-avatars.com/api/?name=James+Wilson&background=818cf8&color=fff" className="w-10 h-10 rounded-full border-2 border-[#818cf8]" />
                                <div className="flex items-center gap-2">
                                    <span className="text-[#4B5563] text-lg">Assigned to</span>
                                    <span className="text-[#4B5563] text-lg">James Wilson</span>
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
                                <div className="absolute top-[25px] left-0 w-[20%] h-1 bg-[#22C55E] z-0"></div>

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
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-[#D1D5DB] text-lg transition-all ${step.completed ? 'bg-[#22C55E] text-white shadow-lg shadow-green-100' : idx === 2 ? 'bg-white text-[#9CA3AF]' : 'bg-white text-[#9CA3AF]'}`}>
                                            {step.completed ? <Check size={20} /> : step.id}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <p className={`text-[13px] font-semibold max-w-[100px] leading-tight mb-1 ${step.completed ? 'text-[#22C55E]' : idx === 2 ? 'text-[#818cf8]' : 'text-[#6B7280]'}`}>
                                                {step.label}
                                            </p>
                                            {step.date && <p className="text-[10px] text-[#9CA3AF] font-medium">{step.date}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                            {/* Left Column: Customer Details */}
                            <div className="col-span-2 grid grid-cols-1 gap-6">
                                <div className="flex ">
                                    <div className="bg-white rounded-l-2xl p-6 border border-r-0 border-[#E7E7E7] shadow-sm flex-1">
                                        <h3 className="text-xl text-[#454545] mb-8">Customer Details</h3>
                                        <div className="grid grid-cols-1">
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
                                                <div key={detail.label} className="flex pb-4">
                                                    <span className="w-20 text-gray-400">{detail.label}</span>
                                                    <span className="text-[#454545] flex-1">: {detail.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Service Details with Damage Breakdown */}
                                    <div className="bg-white rounded-r-2xl p-6 border border-[#E7E7E7] shadow-sm flex-1">
                                        <h3 className="text-xl text-[#454545] mb-8">Service Details</h3>
                                        <div className="bg-[#92E8FB]/35 rounded-[24px] p-6 mb-8 flex flex-col gap-4">
                                            <div className="flex items-center gap-2">
                                                <img className='w-7' src={mechanic} alt="" />
                                                <h4 className="font-medium text-[#454545] text-lg mb-1">Damage Breakdown</h4>
                                            </div>
                                            <div>
                                                <p className="text-[#454545] text-sm opacity-60 leading-relaxed">
                                                    Passenger Rear Door : Scratches And Scuff Marks Requiring Smoothening And Repainting
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <img src={car1} alt="" />
                                            <img src={car2} alt="" />
                                            <img src={car3} alt="" />
                                            <img src={car4} alt="" />
                                        </div>
                                    </div>
                                </div>
                                {/* Pricing Card */}
                                <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                                    <h3 className="text-xl font-bold text-[#454545] mb-10">Pricing & Payments</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Total Price', val: '£150.00' },
                                            { label: 'Deposit', val: '£50.00', status: 'Pending' },
                                            { label: 'Balance', val: '£100.00', status: 'Pending' }
                                        ].map((p, i) => (
                                            <div key={i} className="p-8 rounded-2xl border border-[#E5E7EB] bg-[#E5E7EB]/40 relative">
                                                <button className="absolute top-6 right-6 p-1 text-[#9CA3AF] hover:text-[#4B5563] transition-colors">
                                                    <Edit3 className="w-5 h-5" />
                                                </button>
                                                <p className="text-[#6B7280] font-medium text-lg mb-6">{p.label}</p>
                                                <p className="text-[40px] font-medium text-[#111827] mb-6">{p.val}</p>
                                                {p.status && (
                                                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#FEF3C7] text-[#D97706]">
                                                        {p.status}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column Content */}
                            <div className="space-y-8">

                                {/* Assign Technician */}
                                <div className="bg-white rounded-[32px] p-6 border border-[#E7E7E7] shadow-sm flex flex-col h-full">
                                    <div className="flex items-center gap-3 pb-4 border-b border-[#E7E7E7]">
                                        <h3 className="text-xl font-semibold text-[#454545]">Assign Technician</h3>
                                    </div>
                                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                        {technicians.map((tech, idx) => (
                                            <div key={idx} className={`p-4 border-b border-[#E7E7E7] flex items-center justify-between transition-shadow group hover:bg-[#E5E7EB]/50 ${tech.assigned ? 'border-[#818cf8]/30' : 'bg-white'}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img src={`https://ui-avatars.com/api/?name=${tech.name}&background=random&color=fff`} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#111827] text-sm mb-2">{tech.name}</p>
                                                        <div className="flex items-center gap-4 text-[11px] font-semibold">
                                                            <span className="text-[#6B7280] flex items-center gap-1"><MapPin strokeWidth={4.0} className="w-4 h-4" /> {tech.dist}</span>
                                                            <span className="text-[#6B7280] flex items-center gap-1"><Briefcase strokeWidth={4.0} className="w-4 h-4" /> {tech.active} active</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => !tech.assigned && handleAssignTech(tech.name)}
                                                    className={`px-6 py-2 rounded-md text-xs transition-all shadow-sm ${tech.assigned ? 'bg-[#DBEAFE] text-[#1D4ED8]' : 'bg-white border border-[#E7E7E7] text-[#454545] hover:border-gray-400'}`}
                                                >
                                                    {tech.assigned ? <span className="flex items-center gap-1.5"><CheckCircle2 size={18} strokeWidth={3.0} className="" /> Assigned</span> : 'Assign'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Internal Notes Section */}
                        <div className="bg-white overflow-hidden mb-10">
                            <div className="py-4 px-8 border rounded-t-2xl border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-[#6B7280]" />
                                    <h3 className="text-sm font-semibold text-[#111827]">Internal Notes</h3>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F1F5F9] rounded-md border border-[#E2E8F0]">
                                    <Shield className="w-3.5 h-3.5 text-[#6B7280]" />
                                    <span className="text-[#6B7280] text-[11px] font-medium">Admin Only</span>
                                </div>
                            </div>
                            <div className="p-8 bg-white border-x border-b border-[#E5E7EB] rounded-b-2xl">
                                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {/* Left Message */}
                                    <div className="flex justify-start">
                                        <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-5 max-w-[40%]">
                                            <div className="flex items-center justify-between gap-8 mb-2">
                                                <p className="font-semibold text-[#3B82F6] text-xs">Admin John</p>
                                                <div className="flex items-center gap-1 text-[#9CA3AF] text-[10px]">
                                                    <Clock className="w-3 h-3" />
                                                    <span>10/23/23, 2:00 PM</span>
                                                </div>
                                            </div>
                                            <p className="text-[#4B5563] text-sm leading-relaxed">
                                                Tech 3 declined, need to reassign.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Message */}
                                    <div className="flex justify-end">
                                        <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-5 max-w-[40%]">
                                            <div className="flex items-center justify-between gap-8 mb-2">
                                                <p className="font-semibold text-[#3B82F6] text-xs">Admin John</p>
                                                <div className="flex items-center gap-1 text-[#9CA3AF] text-[10px]">
                                                    <Clock className="w-3 h-3" />
                                                    <span>10/23/23, 2:00 PM</span>
                                                </div>
                                            </div>
                                            <p className="text-[#4B5563] text-sm leading-relaxed font-normal">
                                                Tech 3 declined, need to reassign.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 border-t border-[#E5E7EB] rounded-b-2xl -mx-8 -mb-8 bg-[#F9FAFB]">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Type an internal note..."
                                            className="w-full px-6 py-4 bg-white border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-[#4B5563]"
                                        />
                                    </div>
                                    <button className="px-5 bg-[#2563EB]/50 hover:bg-[#93C5FD]/80 text-white rounded-xl transition-all flex items-center justify-center group">
                                        <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
