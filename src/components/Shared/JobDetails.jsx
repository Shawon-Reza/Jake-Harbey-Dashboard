import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Clock, PenTool } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDashboardInboxFlagsListQuery, useDashboardJobDetailsQuery } from '../../Api/dashboardApi';
import { base_URL } from '../../Api/config';
import profile from '../../assets/images/profile.png';

const toDisplay = (value) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    return value;
};

const toCurrency = (value) => {
    if (typeof value !== 'number') return 'N/A';
    return `£${value.toFixed(2)}`;
};

const toBooleanDisplay = (value) => {
    if (typeof value !== 'boolean') return 'N/A';
    return value ? 'Yes' : 'No';
};

const toImageSrc = (value) => {
    if (!value) return null;
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    return `${base_URL}${value}`;
};

const JobDetails = ({ job, onBack, onUpdateProgress, onStatusChange }) => {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const { id } = useParams();
    const jobId = job?.id || id;
    const { data, isLoading, isError } = useDashboardJobDetailsQuery(jobId);
    console.log(data)
    const { data: flagsList } = useDashboardInboxFlagsListQuery();
    const navigate = useNavigate();

    const statusOptions = useMemo(() => {
        if (!flagsList || typeof flagsList !== 'object') {
            return [];
        }

        return Object.entries(flagsList).map(([key, label]) => ({ key, label }));
    }, [flagsList]);

    if (isLoading) {
        return <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-10 text-gray-500">Loading job details...</div>;
    }

    if (isError) {
        return <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-10 text-red-500">Failed to load job details.</div>;
    }

    if (!data) {
        return <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-10 text-gray-400">N/A</div>;
    }

    const owner = data.owner_info || {};
    const vehicle = data.vehicle_info || {};
    const damage = data.damage_info || {};
    const vehicleImages = Array.isArray(vehicle.images) ? vehicle.images : [];
    const status = data.job_progress || job?.status_badge || 'Unknown';
    const progress = typeof job?.progress_percentage === 'number'
        ? Math.max(0, Math.min(7, Math.round(job.progress_percentage / (100 / 7))))
        : 0;
    const assignedTo = toDisplay(job?.technician_name || data.technician_accept_state || 'Unassigned');
    const profileSrc = toImageSrc(owner.profile_picture) || profile;

    const infoRows = [
        { label: 'Name', value: owner.full_name },
        { label: 'Number', value: owner.phone },
        { label: 'Email', value: owner.email },
        { label: 'Location', value: data.location },
        { label: 'Time Left', value: data.time_left },
        { label: 'Make', value: vehicle.make },
        { label: 'Year', value: vehicle.year },
        { label: 'Model', value: vehicle.model },
        { label: 'Colour', value: vehicle.colour },
        { label: 'Fuel', value: vehicle.fuel },
        { label: 'Reg', value: vehicle.registration_number },
    ];

    const depositStatus =
        typeof data.deposit_paid === 'boolean' ? (data.deposit_paid ? 'Paid' : 'Pending') : 'N/A';

    const pricingRows = [
        { label: 'Estimated Cost', value: toCurrency(data.estimated_cost) },
        { label: 'Final Cost', value: toCurrency(data.final_cost) },
        { label: 'Deposit', value: toCurrency(data.deposit), status: depositStatus },
    ];

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
            <div className="mx-auto p-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                        <button onClick={() => {
                            navigate(-1);
                        }} className="p-3 bg-white border border-[#E7E7E7] rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-medium text-[#2A2A2A]">Job # {toDisplay(data.id)}</h1>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                        className="px-5 py-1.5 rounded-full text-sm flex items-center gap-2 transition-colors bg-gray-100 text-gray-700"
                                    >
                                        {toDisplay(status)}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showStatusDropdown ? (
                                        <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-2xl border border-[#F1F5F9] bg-white py-2 shadow-xl shadow-gray-200 sm:w-56">
                                            {statusOptions.map((statusOption) => (
                                                <button
                                                    key={statusOption.key}
                                                    onClick={() => {
                                                        if (onStatusChange) onStatusChange(statusOption.label);
                                                        setShowStatusDropdown(false);
                                                    }}
                                                    className="w-full text-left px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#F8FAFC] text-[#4B5563]"
                                                >
                                                    {statusOption.label}
                                                </button>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <p className="text-sm text-[#6B7280] font-medium">Scheduled on {toDisplay(data.scheduled_date_and_time)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 px-6 py-3 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm">
                        <img
                            src={profileSrc}
                            alt={owner.full_name || 'Owner'}
                            className="w-10 h-10 rounded-full border-2 border-[#E7E7E7] object-cover"
                            onError={(event) => {
                                event.currentTarget.src = profile;
                            }}
                        />
                        <div className="flex items-center gap-2">
                            <span className="text-[#4B5563] text-lg">Assigned to</span>
                            <span className="text-[#4B5563] text-lg">{assignedTo}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mb-10 overflow-hidden relative">
                    <h3 className="text-xl font-bold text-[#454545] mb-12">Job Progress</h3>
                    <div className="relative flex justify-between px-0">
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
                                        onClick={() => onUpdateProgress && onUpdateProgress(step.id)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 text-lg transition-all duration-500 ${onUpdateProgress ? 'cursor-pointer hover:scale-110 active:scale-95' : ''} ${isCompleted ? 'bg-[#22C55E] border-[#22C55E] text-white shadow-lg shadow-green-100' : 'bg-white border-[#22C55E] text-[#22C55E]'}`}
                                    >
                                        {isCompleted ? <Check size={20} /> : step.id}
                                    </div>
                                    <p className={`mt-4 text-[13px] font-semibold max-w-[100px] text-center leading-tight mb-1 transition-all duration-300 ${isCompleted ? 'text-[#22C55E]' : 'text-[#6B7280]'}`}>
                                        {step.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-[#E7E7E7] shadow-sm">
                        <h3 className="text-xl text-[#454545] mb-8">Customer & Vehicle Details</h3>
                        <div className="grid grid-cols-1">
                            {infoRows.map((detail) => (
                                <div key={detail.label} className="flex pb-4">
                                    <span className="w-28 text-gray-400">{detail.label}</span>
                                    <span className="text-[#454545] flex-1">: {toDisplay(detail.value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-[#E7E7E7] shadow-sm">
                        <h3 className="text-xl text-[#454545] mb-8">Damage & Images</h3>
                        <div className="bg-[#92E8FB]/20 rounded-[24px] p-6 mb-8">
                            <h4 className="font-medium text-[#454545] text-lg mb-3">Damaged Areas</h4>
                            <p className="text-[#454545] text-sm opacity-70 leading-relaxed">
                                {Array.isArray(damage.damaged_areas) && damage.damaged_areas.length
                                    ? damage.damaged_areas.join(', ')
                                    : 'N/A'}
                            </p>
                            <h4 className="font-medium text-[#454545] text-lg mt-6 mb-3">Damage Breakdown</h4>
                            <p className="text-[#454545] text-sm opacity-70 leading-relaxed">{toDisplay(damage.damage_breakdown)}</p>
                        </div>
                        {vehicleImages.length ? (
                            <div className="grid grid-cols-2 gap-4">
                                {vehicleImages.map((image) => (
                                    <img key={image.id} src={toImageSrc(image.image)} alt="Vehicle" className="w-full h-32 rounded-xl object-cover border border-[#E7E7E7]" />
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-400">N/A</div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm">
                    <h3 className="text-xl font-bold text-[#454545] mb-10">Pricing & Payments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {pricingRows.map((p, i) => (
                            <div key={i} className="p-8 rounded-2xl border border-[#E5E7EB] bg-[#E5E7EB]/30">
                                <p className="text-[#6B7280] font-medium text-lg mb-6">{p.label}</p>
                                <p className="text-[32px] font-medium text-[#111827] mb-3">{p.value}</p>
                                {p.status !== 'N/A' ? (
                                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${p.status === 'Paid' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                                        {p.status}
                                    </span>
                                ) : <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-500">N/A</span>}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="text-[#454545]">Total Cost Paid: <span className="font-medium">{toBooleanDisplay(data.total_cost_paid)}</span></div>
                        <div className="text-[#454545]">Balance Paid: <span className="font-medium">{toBooleanDisplay(data.balance_paid)}</span></div>
                        <div className="text-[#454545]">Deposit Paid: <span className="font-medium">{toBooleanDisplay(data.deposit_paid)}</span></div>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mt-10 overflow-hidden">
                    <div className="flex items-center gap-3 mb-8">
                        <PenTool className="w-6 h-6 text-[#111827]" />
                        <h3 className="text-xl font-bold text-[#111827]">Customer Sign-Off</h3>
                    </div>
                    {data.customer_signature ? (
                        <img
                            src={toImageSrc(data.customer_signature)}
                            alt="Customer Signature"
                            className="w-full max-w-md h-44 object-contain border border-[#E7E7E7] rounded-2xl"
                        />
                    ) : (
                        <div className="text-gray-400">N/A</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
