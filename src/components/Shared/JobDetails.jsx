import React, { useState } from 'react';
import {
    ArrowLeft,
    ChevronDown,
    Clock,
    Flag,
    Send,
    Mail,
    Check,
    Edit3,
    MapPin,
    Briefcase,
    CheckCircle2,
    MessageSquare,
    Shield,
    PenTool,
    Wrench
} from 'lucide-react';

import car1 from '../../assets/images/car1.png';
import car2 from '../../assets/images/car2.png';
import car3 from '../../assets/images/car3.png';
import car4 from '../../assets/images/car4.png';
import mechanic from '../../assets/images/mechanic.png';

const JobDetails = ({
    job,
    onBack,
    onUpdateProgress,
    onStatusChange,
    onAssignTech,
    technicians = []
}) => {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    if (!job) return null;

    // Normalize data for consistent rendering
    const customerName = job.customerName || job.customer;
    const status = Array.isArray(job.status) ? job.status[0] : job.status;
    const progress = job.progress || 0;

    const getStatusStyles = (status) => {
        switch (status) {
            case 'To Assign': return 'bg-[#E3F2FD] text-[#1976D2]';
            case 'New Lead': return 'bg-[#E8EAF6] text-[#3F51B5]';
            case 'Active': return 'bg-[#E8F5E9] text-[#2E7D32]';
            case 'Requires Attention': return 'bg-[#FFF3E0] text-[#E65100]';
            case 'To Follow Up': return 'bg-[#F3E5F5] text-[#7B1FA2]';
            case 'Awaiting Confirmation': return 'bg-[#FEF3C7] text-[#92400E]';
            case 'Inactive': return 'bg-[#F5F5F5] text-[#616161]';
            case 'Completed': return 'bg-[#E8F5E9] text-[#2E7D32]';
            default: return 'bg-gray-100 text-gray-700';
        }
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

    return (
        <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
            <div className=" mx-auto p-10">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                        <button onClick={onBack} className="p-3 bg-white border border-[#E7E7E7] rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-medium text-[#2A2A2A]">Job # {job.id}</h1>
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                        className={`px-5 py-1.5 rounded-full text-sm flex items-center gap-2 transition-colors ${getStatusStyles(status)}`}
                                    >
                                        {status} <ChevronDown className={`w-4 h-4 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {showStatusDropdown && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-10" 
                                                onClick={() => setShowStatusDropdown(false)}
                                            ></div>
                                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-gray-200 border border-[#F1F5F9] py-2 z-20 animate-in fade-in zoom-in duration-200">
                                                {['New Lead', 'Active', 'Awaiting Confirmation', 'To Follow Up', 'Inactive', 'Completed'].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => {
                                                            onStatusChange(s);
                                                            setShowStatusDropdown(false);
                                                        }}
                                                        className={`w-full text-left px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#F8FAFC] ${status === s ? 'text-blue-600 bg-[#F1F7FE]' : 'text-[#4B5563]'}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-[#6B7280] font-medium">Submitted on {job.date || '10/22/2023'}, 4:00:00 PM</p>
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
                            <span className="text-[#4B5563] text-lg">{job.assignment || 'James Wilson'}</span>
                        </div>
                    </div>
                </div>

                {/* Job Progress Timeline */}
                <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mb-10 overflow-hidden relative">
                    <h3 className="text-xl font-bold text-[#454545] mb-12">Job Progress</h3>
                    <div className="relative flex justify-between px-0">
                        {/* Progress Line Container */}
                        <div className="absolute top-[24px] left-6 right-6 h-1 z-0">
                            <div className="absolute inset-0 bg-[#22C55E]/10"></div>
                            <div 
                                className="h-full bg-[#22C55E] transition-all duration-500" 
                                style={{ width: progress > 0 ? `${((progress - 1) / (PROGRESS_STEPS.length - 1)) * 100}%` : '0%' }}
                            ></div>
                        </div>

                        {PROGRESS_STEPS.map((step, idx) => {
                            const isCompleted = step.id <= progress;
                            
                            return (
                                <div key={idx} className="relative z-10 flex flex-col items-center">
                                    <div 
                                        onClick={() => onUpdateProgress(step.id)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 text-lg transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95 ${isCompleted ? 'bg-[#22C55E] border-[#22C55E] text-white shadow-lg shadow-green-100' : 'bg-white border-[#22C55E] text-[#22C55E]'}`}
                                    >
                                        {isCompleted ? <Check size={20} /> : step.id}
                                    </div>
                                    <div className="mt-4 text-center cursor-pointer" onClick={() => onUpdateProgress(step.id)}>
                                        <p className={`text-[13px] font-semibold max-w-[100px] leading-tight mb-1 transition-all duration-300 ${isCompleted ? 'text-[#22C55E]' : 'text-[#6B7280]'}`}>
                                            {step.label}
                                        </p>
                                        {isCompleted && <p className="text-[10px] text-[#9CA3AF] font-medium">{job.date || '10/22/2023'}</p>}
                                    </div>
                                </div>
                            );
                        })}
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
                                        { label: 'Name', value: customerName },
                                        { label: 'Number', value: '45465454546' },
                                        { label: 'Email', value: job.email || 'customer@example.com', copyable: true },
                                        { label: 'Location', value: job.location || 'Downtown Service' },
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
                                    { label: 'Total Price', val: job.amount === 'TBD' ? '£0.00' : job.amount },
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
                                                    <span className="text-[#6B7280] flex items-center gap-1"><MapPin strokeWidth={4.0} className="w-4 h-4" /> {tech.dist || 'N/A'}</span>
                                                    <span className="text-[#6B7280] flex items-center gap-1"><Briefcase strokeWidth={4.0} className="w-4 h-4" /> {tech.active || 0} active</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => !tech.assigned && onAssignTech(tech.name)}
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

                {/* Customer Sign-Off Section */}
                {progress === 7 && (
                    <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mb-10 overflow-hidden">
                        <div className="flex items-center gap-3 mb-8">
                            <PenTool className="w-6 h-6 text-[#111827]" />
                            <h3 className="text-xl font-bold text-[#111827]">Customer Sign-Off</h3>
                        </div>
                        <div className="relative border-2 border-dashed border-[#E5E7EB] rounded-[32px] h-64 flex items-center justify-center p-8 bg-white transition-all hover:border-[#16A34A]/30">
                            <div className="relative w-full h-full max-w-[400px] flex items-center justify-center">
                                <svg viewBox="0 0 400 200" className="w-full h-full opacity-90" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M50,150 C80,140 120,40 160,80 C200,120 220,130 250,90 C280,50 320,100 350,110" />
                                    <path d="M120,130 C150,120 180,140 210,125" className="opacity-40" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetails;
