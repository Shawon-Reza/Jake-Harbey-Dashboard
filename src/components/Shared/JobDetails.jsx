import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, CreditCard, PenTool, SendHorizonal } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
    useAddDashboardInboxFlagMutation,
    useDashboardInboxFlagsListQuery,
    useDashboardJobDetailsQuery,
} from '../../Api/dashboardApi';
import { base_URL } from '../../Api/config';
import profile from '../../assets/images/profile.png';
import AssignTechnician from '../Jobs/AssignTechnician';

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

const PROGRESS_STEPS = [
    { id: 1, value: 'price_confirmed', label: 'Price Confirmed' },
    { id: 2, value: 'deposit_paid', label: 'Deposit Paid' },
    { id: 3, value: 'technician_accepted', label: 'Technician Accepted' },
    { id: 4, value: 'technician_declined', label: 'Technician Declined' },
    { id: 5, value: 'datetime_confirmed', label: 'Date & Time Confirmed' },
    { id: 6, value: 'signed_off', label: 'Signed-Off' },
    { id: 7, value: 'balance_paid', label: 'Balance Paid' },
    { id: 8, value: 'completed', label: 'Completed' },
];

const JOB_PROGRESS_LABELS = PROGRESS_STEPS.reduce((accumulator, step) => {
    accumulator[step.value] = step.label;
    return accumulator;
}, {});

const JobDetails = ({ job, onBack, onUpdateProgress, onStatusChange }) => {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const { id } = useParams();
    const jobId = job?.id || id;
    const { data, isLoading, isError } = useDashboardJobDetailsQuery(jobId);
    const { data: flagsList } = useDashboardInboxFlagsListQuery();
    const { mutateAsync: addInboxFlag, isPending: isAddingFlag } = useAddDashboardInboxFlagMutation();
    const navigate = useNavigate();

    const statusOptions = useMemo(() => {
        if (!flagsList || typeof flagsList !== 'object') {
            return [];
        }

        return Object.entries(flagsList).map(([key, label]) => ({ key, label }));
    }, [flagsList]);

    const selectedFlags = Array.isArray(data?.flags) ? data.flags : [];

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
    const currentProgressValue = typeof data.job_progress === 'string' ? data.job_progress : null;
    const currentProgressIndex = PROGRESS_STEPS.findIndex((step) => step.value === currentProgressValue);
    const progress = currentProgressIndex >= 0 ? currentProgressIndex + 1 : 0;
    const progressLabel = currentProgressValue ? JOB_PROGRESS_LABELS[currentProgressValue] || currentProgressValue : 'Unknown';
    const technician = data.technician_info || null;
    const assignedTo = technician?.full_name ? technician.full_name : 'No Technician is assigned to this job.';
    const technicianProfileSrc = toImageSrc(technician?.profile_picture) || profile;

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

    const depositStatus = typeof data.deposit_paid === 'boolean' ? (data.deposit_paid ? 'Paid' : 'Pending') : 'N/A';

    const pricingRows = [
        { label: 'Estimated Cost', value: toCurrency(data.estimated_cost) },
        { label: 'Final Cost', value: toCurrency(data.final_cost) },
        { label: 'Deposit', value: toCurrency(data.deposit), status: depositStatus },
    ];

    const handleAddFlag = async (flag) => {
        if (!jobId) {
            toast.error('Missing job id for this action.');
            return;
        }

        try {
            await addInboxFlag({ jobId, flag });
        } catch (error) {
            const message = error?.response?.data?.message || error?.response?.data?.detail || 'Unable to update the job flag.';
            toast.error(message);
        }
    };

    const flagButtons = [
        { label: 'Mark to Follow Up', value: 'to_follow_up', icon: SendHorizonal },
        { label: 'Flag Attention', value: 'flag_attention', icon: CreditCard },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
            <div className="mx-auto p-10">
                <div className="mb-6 rounded-2xl border border-[#E7E7E7] bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-4">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex items-start gap-4 sm:items-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E7E7E7] bg-white text-gray-600 shadow-sm transition-all hover:shadow-md"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-2xl font-semibold text-[#111827] sm:text-[28px]">Job # {toDisplay(data.id)}</h1>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100"
                                        >
                                            {toDisplay(progressLabel)}
                                            <ChevronDown className={`h-4 w-4 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
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
                                                        className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm font-semibold transition-colors hover:bg-[#F8FAFC] ${selectedFlags.includes(statusOption.key) ? 'bg-[#F0FDF4] text-[#166534]' : 'text-[#4B5563]'
                                                            }`}
                                                    >
                                                        {statusOption.label}
                                                        {selectedFlags.includes(statusOption.key) ? (
                                                            <span className="ml-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#22C55E] text-[11px] text-white">
                                                                ✓
                                                            </span>
                                                        ) : null}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <p className="mt-1 text-sm text-[#6B7280]">
                                    Submitted on <span className="font-medium text-[#4B5563]">{toDisplay(data.scheduled_date_and_time)}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            {flagButtons.map((button) => {
                                const Icon = button.icon;
                                const isSelected = selectedFlags.includes(button.value);

                                return (
                                    <button
                                        key={button.value}
                                        type="button"
                                        disabled={isAddingFlag}
                                        onClick={() => handleAddFlag(button.value)}
                                        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-sm transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                                            isSelected
                                                ? 'border-[#C7F0D4] bg-[#F0FDF4] text-[#166534]'
                                                : 'border-[#D8E0F6] bg-white text-[#344054] hover:border-[#B8C7F5] hover:bg-[#F8FAFF]'
                                        }`}
                                    >
                                        <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${isSelected ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#EEF2FF] text-[#4F46E5]'}`}>
                                            <Icon className="h-3.5 w-3.5" />
                                        </span>
                                        {button.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-[#E7E7E7] bg-white px-4 py-3 shadow-sm">
                            {technician ? (
                                <img
                                    src={technicianProfileSrc}
                                    alt={technician?.full_name || 'Technician'}
                                    className="h-11 w-11 rounded-full border-2 border-[#E7E7E7] object-cover"
                                    onError={(event) => {
                                        event.currentTarget.src = profile;
                                    }}
                                />
                            ) : null}
                            <div className="leading-tight">
                                <div className={technician ? 'text-sm text-[#6B7280]' : 'sr-only'}>Assigned to</div>
                                <div className="max-w-[240px] text-base font-medium text-[#374151]">{assignedTo}</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-[32px] p-10 border border-[#E7E7E7] shadow-sm mb-10 overflow-hidden relative mt-4">
                    <h3 className="text-xl font-bold text-[#454545] mb-12">Job Progress</h3>
                    <div className="relative flex justify-between px-0">
                        <div className="absolute top-[24px] left-6 right-6 h-1 z-0">
                            <div className="absolute inset-0 bg-[#22C55E]/10"></div>
                            <div
                                className={`h-full transition-all duration-500 ${currentProgressValue === 'technician_declined' ? 'bg-red-500' : 'bg-[#22C55E]'}`}
                                style={{ width: progress > 0 ? `${((progress - 1) / (PROGRESS_STEPS.length - 1)) * 100}%` : '0%' }}
                            ></div>
                        </div>
                        {PROGRESS_STEPS.map((step, idx) => {
                            const isCompleted = idx < progress;
                            const isCurrent = step.value === currentProgressValue;
                            const isDeclined = step.value === 'technician_declined' && isCurrent;
                            const nodeClassName = isDeclined
                                ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-100'
                                : isCompleted
                                    ? 'bg-[#22C55E] border-[#22C55E] text-white shadow-lg shadow-green-100'
                                    : 'bg-white border-[#22C55E] text-[#22C55E]';
                            const labelClassName = isDeclined
                                ? 'text-red-500'
                                : isCompleted
                                    ? 'text-[#22C55E]'
                                    : 'text-[#6B7280]';

                            return (
                                <div key={step.value} className="relative z-10 flex flex-col items-center">
                                    <div
                                        onClick={() => onUpdateProgress && onUpdateProgress(step.id)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 text-lg transition-all duration-500 ${onUpdateProgress ? 'cursor-pointer hover:scale-110 active:scale-95' : ''} ${nodeClassName}`}
                                    >
                                        {isCompleted ? <Check size={20} /> : step.id}
                                    </div>
                                    <p className={`mt-4 text-[13px] font-semibold max-w-[100px] text-center leading-tight mb-1 transition-all duration-300 ${labelClassName}`}>
                                        {step.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="xl:grid grid-cols-12 gap-6">
                    <div className="col-span-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <div className="bg-white rounded-2xl p-6 border border-[#E7E7E7] shadow-sm">
                                <h3 className="text-xl text-[#454545] mb-8">Customer & Vehicle Details</h3>
                                <div className="grid grid-cols-1">
                                    {infoRows.map((detail) => (
                                        <div key={detail.label} className="flex pb-4">
                                            <span className="w-28 text-gray-400">{detail.label}</span>
                                            <span className="text-[#454545] flex-1 overflow-hidden">: {toDisplay(detail.value)}</span>
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
                                            <img
                                                key={image.id}
                                                src={toImageSrc(image.image)}
                                                alt="Vehicle"
                                                className="w-full h-32 rounded-xl object-cover border border-[#E7E7E7]"
                                            />
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
                                        ) : (
                                            <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-500">N/A</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div className="text-[#454545]">Total Cost Paid: <span className="font-medium">{toBooleanDisplay(data.total_cost_paid)}</span></div>
                                <div className="text-[#454545]">Balance Paid: <span className="font-medium">{toBooleanDisplay(data.balance_paid)}</span></div>
                                <div className="text-[#454545]">Deposit Paid: <span className="font-medium">{toBooleanDisplay(data.deposit_paid)}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 h-full mt-5 xl:mt-0">
                        <AssignTechnician jobId={jobId} />
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
