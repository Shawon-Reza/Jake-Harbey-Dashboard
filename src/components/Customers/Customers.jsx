import React, { useState } from 'react';
import {
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Calendar,
    ArrowLeft,
    Briefcase,
    DollarSign,
    Plus,
    ArrowRight,
    MoreVertical,
    Star,
    CheckCircle2
} from 'lucide-react';

export default function Customers() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const customers = [
        {
            id: 1,
            name: 'John Smith',
            since: '2023',
            phone: '07700 900111',
            email: 'john.smith@example.com',
            location: 'M2 2BB',
            jobs: 2,
            totalSpent: '£120.00',
            vehicle: {
                make: 'Ford',
                model: 'Fiesta',
                year: '2018',
                colour: 'Blue',
                fuel: 'Petrol',
                reg: 'AFD1223'
            },
            submissions: [
                {
                    id: 1,
                    service: 'Windshield Replacement',
                    description: 'Large crack across the driver side vision area.',
                    status: 'New Lead',
                    urgency: 'Requires Attention',
                    assign: 'To Assign',
                    date: '10/24/2023',
                    progress: 3
                },
                {
                    id: 2,
                    service: 'Window Tinting',
                    description: 'Front windows tinting.',
                    status: 'Active',
                    date: '10/19/2023',
                    amount: '£120.00',
                    progress: 7
                }
            ]
        },
        {
            id: 2,
            name: 'Emily Davis',
            since: '2023',
            phone: '07700 900222',
            email: 'emily.davis@example.com',
            location: 'M3 3CC',
            jobs: 1,
            totalSpent: '£85.00',
            vehicle: {
                make: 'Toyota',
                model: 'Corolla',
                year: '2020',
                colour: 'Silver',
                fuel: 'Hybrid',
                reg: 'BCD5678'
            },
            submissions: []
        },
        {
            id: 3,
            name: 'Michael Brown',
            since: '2023',
            phone: '07700 900333',
            email: 'michael.b@example.com',
            location: 'SK2 2DD',
            jobs: 1,
            totalSpent: '£95.00',
            vehicle: {
                make: 'BMW',
                model: '3 Series',
                year: '2019',
                colour: 'Black',
                fuel: 'Diesel',
                reg: 'EFG9012'
            },
            submissions: []
        },
        {
            id: 4,
            name: 'Sophie Taylor',
            since: '2022',
            phone: '07700 900444',
            email: 'sophie.t@example.com',
            location: 'WA2 2EE',
            jobs: 3,
            totalSpent: '£250.00',
            vehicle: {
                make: 'Volkswagen',
                model: 'Golf',
                year: '2021',
                colour: 'Red',
                fuel: 'Petrol',
                reg: 'HIJ3456'
            },
            submissions: []
        },
        {
            id: 5,
            name: 'Oliver White',
            since: '2023',
            phone: '07700 900555',
            email: 'oliver.w@example.com',
            location: 'BL2 2FF',
            jobs: 1,
            totalSpent: '£110.00',
            vehicle: {
                make: 'Audi',
                model: 'A4',
                year: '2020',
                colour: 'White',
                fuel: 'Petrol',
                reg: 'KLM7890'
            },
            submissions: []
        },
        {
            id: 6,
            name: 'Chloe Martin',
            since: '2023',
            phone: '07700 900666',
            email: 'chloe.m@example.com',
            location: 'WN2 2GG',
            jobs: 1,
            totalSpent: '£75.00',
            vehicle: {
                make: 'Mercedes',
                model: 'C-Class',
                year: '2022',
                colour: 'Gray',
                fuel: 'Diesel',
                reg: 'NOP1234'
            },
            submissions: []
        },
        {
            id: 7,
            name: 'Daniel Garcia',
            since: '2023',
            phone: '07700 900777',
            email: 'daniel.g@example.com',
            location: 'M5 5HH',
            jobs: 1,
            totalSpent: '£105.00',
            vehicle: {
                make: 'Vauxhall',
                model: 'Astra',
                year: '2019',
                colour: 'Blue',
                fuel: 'Petrol',
                reg: 'QRS5678'
            },
            submissions: []
        },
        {
            id: 8,
            name: 'Lucy Anderson',
            since: '2023',
            phone: '07700 900888',
            email: 'lucy.a@example.com',
            location: 'SK3 3ll',
            jobs: 2,
            totalSpent: '£180.00',
            vehicle: {
                make: 'Nissan',
                model: 'Qashqai',
                year: '2021',
                colour: 'Brown',
                fuel: 'Petrol',
                reg: 'TUV9012'
            },
            submissions: []
        }
    ];

    const getInitial = (name) => name.charAt(0).toUpperCase();
    const getAvatarColor = (index) => {
        const colors = ['bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-orange-200', 'bg-green-200', 'bg-yellow-200', 'bg-indigo-200', 'bg-red-200'];
        return colors[index % colors.length];
    };

    if (selectedCustomer) {
        const customer = customers.find(c => c.id === selectedCustomer);

        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
                <div className=" mx-auto p-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <button
                            onClick={() => setSelectedCustomer(null)}
                            className="flex items-center gap-4 text-[#454545] font-bold group transition-all"
                        >
                            <div className="p-3 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="text-xl">Customer Profile</span>
                        </button>
                        <button className="bg-[#1A9C9C] hover:bg-[#158080] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-teal-50 transition-all flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Add Customer
                        </button>
                    </div>

                    <div className="bg-white rounded-[40px] border border-[#E7E7E7] shadow-sm overflow-hidden mb-10">
                        {/* Profile Header Banner */}
                        <div className="bg-[#004D40] p-12 flex items-center gap-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="relative z-10">
                                <div className={`w-32 h-32 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-4xl font-bold text-[#454545] ${getAvatarColor(customer.id)}`}>
                                    {getInitial(customer.name)}
                                </div>
                            </div>
                            <div className="text-white relative z-10">
                                <h2 className="text-5xl mb-4 tracking-tight">{customer.name}</h2>
                                <p className="text-teal-50/70 font-medium text-lg">Customer since {customer.since}</p>
                            </div>
                        </div>

                        <div className="p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                                {/* Contact Information */}
                                <div>
                                    <h3 className="text-xl font-bold text-[#454545] mb-8">Contact Information</h3>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Name', value: customer.name.toLowerCase() },
                                            { label: 'Number', value: customer.phone },
                                            { label: 'Email', value: customer.email },
                                            { label: 'Location', value: customer.location },
                                        ].map((info) => (
                                            <div key={info.label} className="flex border-b border-[#F5F5F5] pb-4 last:border-0">
                                                <span className="w-28 text-gray-400 font-medium text-lg">{info.label}</span>
                                                <span className="text-[#454545] font-bold text-lg flex-1">: {info.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Vehicle Information */}
                                    <div className="mt-12">
                                        <h3 className="text-xl font-bold text-[#454545] mb-8">Vehicle Found</h3>
                                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                            {[
                                                { label: 'Make', value: customer.vehicle.make },
                                                { label: 'Model', value: customer.vehicle.model },
                                                { label: 'Year', value: customer.vehicle.year },
                                                { label: 'Colour', value: customer.vehicle.colour },
                                                { label: 'Fuel', value: customer.vehicle.fuel },
                                                { label: 'Reg', value: customer.vehicle.reg },
                                            ].map((info) => (
                                                <div key={info.label} className="flex">
                                                    <span className="w-24 text-gray-400 font-medium text-lg">{info.label}</span>
                                                    <span className="text-[#454545] font-bold text-lg flex-1">: {info.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Cards Grid */}
                                <div className="grid grid-cols-2 gap-6 h-fit">
                                    {/* Total Jobs */}
                                    <div className="bg-[#E4F8FB] rounded-[32px] p-8 border border-blue-50 relative group hover:shadow-xl transition-all">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="p-4 bg-white rounded-2xl shadow-sm text-[#1A9C9C]">
                                                <Briefcase size={24} />
                                            </div>
                                            <div className="text-5xl text-[#1A9C9C]">{customer.jobs}</div>
                                        </div>
                                        <div>
                                            <p className="text-[#454545] font-bold text-xl mb-1">2</p>
                                            <p className="text-gray-400 font-bold text-sm uppercase">Total Jobs</p>
                                        </div>
                                    </div>

                                    {/* Total Spent */}
                                    <div className="bg-[#F6FFFA] rounded-[32px] p-8 border border-green-50 relative group hover:shadow-xl transition-all">
                                        <div className="flex items-start justify-between mb-8 text-[#28A745]">
                                            <div className="p-4 bg-white rounded-2xl shadow-sm">
                                                <DollarSign size={24} />
                                            </div>
                                            <div className="text-4xl">{customer.totalSpent}</div>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 font-bold text-sm uppercase">Total Spent</p>
                                        </div>
                                    </div>

                                    {/* Active Jobs */}
                                    <div className="bg-white rounded-[32px] p-8 border border-[#E7E7E7] relative group hover:shadow-xl transition-all">
                                        <div className="flex items-center justify-between mb-8">
                                            <p className="text-gray-400 font-bold text-sm uppercase">Active Jobs</p>
                                            <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
                                                <Briefcase size={24} />
                                            </div>
                                        </div>
                                        <div className="text-5xl text-[#454545]">1</div>
                                    </div>

                                    {/* Completed Jobs */}
                                    <div className="bg-white rounded-[32px] p-8 border border-[#E7E7E7] relative group hover:shadow-xl transition-all">
                                        <div className="flex items-center justify-between mb-8">
                                            <p className="text-gray-400 font-bold text-sm uppercase">Completed Jobs</p>
                                            <div className="p-4 bg-[#F6FFFA] text-[#28A745] rounded-2xl">
                                                <Star size={24} />
                                            </div>
                                        </div>
                                        <div className="text-5xl text-[#454545]">1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submission History */}
                    <div className="bg-white rounded-[40px] border border-[#E7E7E7] shadow-sm overflow-hidden">
                        <div className="p-10 border-b border-[#F5F5F5] flex items-center justify-between bg-[#F9FBFC]/50">
                            <h3 className="text-xl font-bold text-[#454545]">Submission History</h3>
                            <span className="text-gray-400 font-medium text-lg">{customer.submissions.length} total submissions</span>
                        </div>
                        <div className="divide-y divide-[#F5F5F5]">
                            {customer.submissions.map((sub) => (
                                <div key={sub.id} className="p-10 hover:bg-gray-50/50 transition-colors group">
                                    <div className="flex items-start justify-between gap-8">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <h4 className="text-2xl font-bold text-[#2A2A2A]">{sub.service}</h4>
                                                <div className="flex gap-2.5">
                                                    {sub.status && <span className="bg-[#E4F8FB] text-[#1A9C9C] px-5 py-2 rounded-full text-xs font-bold shadow-sm">{sub.status}</span>}
                                                    {sub.urgency && <span className="bg-[#FFF4E5] text-[#F68528] px-5 py-2 rounded-full text-xs font-bold shadow-sm">{sub.urgency}</span>}
                                                    {sub.assign && <span className="bg-[#EEF2FF] text-[#818cf8] px-5 py-2 rounded-full text-xs font-bold shadow-sm flex items-center gap-2"><ArrowRight size={14} /> {sub.assign}</span>}
                                                </div>
                                            </div>
                                            <p className="text-gray-500 font-medium text-lg max-w-2xl mb-6">{sub.description}</p>
                                            <div className="flex items-center gap-6 text-gray-400 font-bold text-sm">
                                                <span className="flex items-center gap-2"><Calendar size={18} /> {sub.date}</span>
                                                {sub.amount && <span className="text-[#454545]">{sub.amount}</span>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-10">
                                            <div className="flex items-center gap-2">
                                                {[...Array(7)].map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx < sub.progress ? 'bg-[#28A745]' : 'bg-[#E7E7E7]'}`}
                                                    />
                                                ))}
                                            </div>
                                            <ChevronRight className="w-8 h-8 text-gray-300 group-hover:translate-x-2 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {customer.submissions.length === 0 && (
                                <div className="p-20 text-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                                        <Briefcase size={40} />
                                    </div>
                                    <p className="text-gray-400 font-bold text-xl">No submission history found for this customer.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-white p-12">
            <div className=" mx-auto">
                <h1 className="text-4xl font-medium text-[#2A2A2A] mb-8">Customers</h1>

                {/* Table Container */}
                <div className="bg-white rounded-[40px] border border-[#E7E7E7] shadow-2xl shadow-gray-200/50 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F9FBFC] border-b border-[#F0F0F0]">
                                <th className="px-10 py-8 text-gray-400 font-bold uppercase tracking-widest">Customer</th>
                                <th className="px-10 py-8 text-gray-400 font-bold uppercase tracking-widest">Contact</th>
                                <th className="px-10 py-8 text-gray-400 font-bold uppercase tracking-widest">Location</th>
                                <th className="px-10 py-8 text-gray-400 font-bold uppercase tracking-widest">History</th>
                                <th className="px-10 py-8 w-20"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0]">
                            {customers.map((customer, index) => (
                                <tr
                                    key={customer.id}
                                    onClick={() => setSelectedCustomer(customer.id)}
                                    className="group cursor-pointer hover:bg-[#E4F8FB]/30 transition-all duration-300"
                                >
                                    <td className="px-10 py-10">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-[#454545] shadow-sm ${getAvatarColor(index)}`}>
                                                {getInitial(customer.name)}
                                            </div>
                                            <div>
                                                <p className="text-2xl text-[#2A2A2A] mb-1 group-hover:text-[#1A9C9C] transition-colors">{customer.name}</p>
                                                <p className="text-gray-400 text-sm tracking-tight">Since {customer.since}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10">
                                        <div className="space-y-3">
                                            <p className="flex items-center gap-3 text-lg text-[#454545]">
                                                <Phone className="w-5 h-5 text-gray-300" /> {customer.phone}
                                            </p>
                                            <p className="flex items-center gap-3 text-base font-medium text-gray-400">
                                                <Mail className="w-5 h-5 text-gray-300" /> {customer.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10">
                                        <p className="flex items-center gap-3 text-lg text-[#454545]">
                                            <MapPin className="w-6 h-6 text-gray-300" /> {customer.location}
                                        </p>
                                    </td>
                                    <td className="px-10 py-10">
                                        <p className="text-xl text-[#2A2A2A]">{customer.jobs} Job{customer.jobs !== 1 ? 's' : ''}</p>
                                    </td>
                                    <td className="px-10 py-10">
                                        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#1A9C9C]/10 transition-colors">
                                            <ChevronRight className="w-8 h-8 text-gray-200 group-hover:text-[#1A9C9C] transition-all" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
