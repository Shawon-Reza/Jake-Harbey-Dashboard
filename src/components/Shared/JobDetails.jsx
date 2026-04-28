import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, CreditCard, PenTool, Pencil, SendHorizonal } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
    useAddDashboardInboxFlagMutation,
    useDashboardInboxFlagsListQuery,
    useDashboardJobDetailsQuery,
    useUpdateDashboardInboxDepositPriceMutation,
    useUpdateDashboardInboxTotalPriceMutation,
} from '../../Api/dashboardApi';
import { base_URL } from '../../Api/config';
import profile from '../../assets/images/profile.png';
import AssignTechnician from '../Jobs/AssignTechnician';
import NotesComponentsJobDetails from './NotesComponentsJobDetails';

const toDisplay = (value) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    return value;
};

const toCurrency = (value) => {
    if (typeof value !== 'number') return 'N/A';
    return `£${value.toFixed(2)}`;
};

const toCurrencyInput = (value) => {
    if (value === null || value === undefined) return '';
    return String(value);
};

const parseAmount = (value) => {
    if (value === '' || value === null || value === undefined) return null;

    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
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

const JobDetails = ({ job, onBack, onUpdateProgress, onStatusChange, onPricingSave }) => {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [activePricingField, setActivePricingField] = useState(null);
    const [pricingDraft, setPricingDraft] = useState({
        totalCost: '',
        deposit: '',
    });
    const { id } = useParams();
    const jobId = job?.id || id;
    const { data, isLoading, isError } = useDashboardJobDetailsQuery(jobId);
    const { data: flagsList } = useDashboardInboxFlagsListQuery();
    const { mutateAsync: addInboxFlag, isPending: isAddingFlag } = useAddDashboardInboxFlagMutation();
    const { mutateAsync: updateTotalPrice, isPending: isUpdatingTotalPrice } = useUpdateDashboardInboxTotalPriceMutation();
    const { mutateAsync: updateDepositPrice, isPending: isUpdatingDepositPrice } = useUpdateDashboardInboxDepositPriceMutation();
    const navigate = useNavigate();

    const statusOptions = useMemo(() => {
        if (!flagsList || typeof flagsList !== 'object') {
            return [];
        }

        return Object.entries(flagsList).map(([key, label]) => ({ key, label }));
    }, [flagsList]);

    const selectedFlags = Array.isArray(data?.flags) ? data.flags : [];

    useEffect(() => {
        if (!data) {
            return;
        }

        setPricingDraft({
            totalCost: toCurrencyInput(data.final_cost),
            deposit: toCurrencyInput(data.deposit),
        });
    }, [data?.final_cost, data?.deposit]);

    if (isLoading) {
        return <div className="bg-[#F9FBFC] p-10 text-gray-500">Loading job details...</div>;
    }

    if (isError) {
        return <div className="bg-[#F9FBFC] p-10 text-red-500">Failed to load job details.</div>;
    }

    if (!data) {
        return <div className="bg-[#F9FBFC] p-10 text-gray-400">N/A</div>;
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

    const totalCostValue = parseAmount(pricingDraft.totalCost);
    const depositValue = parseAmount(pricingDraft.deposit);
    const availableValue = totalCostValue !== null && depositValue !== null ? totalCostValue - depositValue : null;

    const handlePricingToggle = async (field) => {
        if (activePricingField === field) {
            const amount = field === 'totalCost' ? totalCostValue : depositValue;

            if (amount === null) {
                toast.error('Please enter a valid amount before saving.');
                return;
            }

            try {
                if (field === 'totalCost') {
                    await updateTotalPrice({ jobId, amount });
                } else {
                    await updateDepositPrice({ jobId, amount });
                }

                if (typeof onPricingSave === 'function') {
                    onPricingSave({
                        field,
                        value: amount,
                        pricing: {
                            totalCost: totalCostValue,
                            deposit: depositValue,
                            available: availableValue,
                        },
                    });
                }

                toast.success(field === 'totalCost' ? 'Total price updated.' : 'Deposit price updated.');
                setActivePricingField(null);
            } catch (error) {
                const message = error?.response?.data?.message || error?.response?.data?.detail || 'Unable to update pricing.';
                toast.error(message,{
                    position: 'top-right',
                });
            }
            return;
        }

        setActivePricingField(field);
    };

    const isSavingPricing = isUpdatingTotalPrice || isUpdatingDepositPrice;

    const renderPricingValue = (field, value) => {
        const isEditing = activePricingField === field;

        return (
            <div className="rounded-[24px] border border-[#E7E7E7] bg-[#F8FAFD] p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-[#6B7280] sm:text-[15px]">{field === 'totalCost' ? 'Total Price' : field === 'deposit' ? 'Deposit' : 'Balance'}</p>
                    {field !== 'available' ? (
                        <button
                            type="button"
                            onClick={() => handlePricingToggle(field)}
                            disabled={isSavingPricing && activePricingField === field}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#9CA3AF] transition hover:bg-white hover:text-[#6B7280] disabled:cursor-not-allowed disabled:opacity-60"
                            aria-label={isEditing ? `Save ${field}` : `Edit ${field}`}
                        >
                            {isEditing ? <Check className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
                        </button>
                    ) : (
                        <div className="h-9 w-9 rounded-full" />
                    )}
                </div>

                {isEditing ? (
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-[#111827] sm:text-[34px]">£</span>
                        <input
                            type="number"
                            step="0.01"
                            value={field === 'totalCost' ? pricingDraft.totalCost : pricingDraft.deposit}
                            onChange={(event) => {
                                const nextValue = event.target.value;
                                setPricingDraft((current) => ({
                                    ...current,
                                    [field]: nextValue,
                                }));
                            }}
                            className="w-full bg-transparent text-2xl font-semibold text-[#111827] outline-none placeholder:text-[#A3AEC2] sm:text-[34px]"
                            placeholder="0.00"
                            autoFocus
                        />
                    </div>
                ) : (
                    <p className="text-2xl font-semibold text-[#111827] sm:text-[34px]">{value}</p>
                )}

                {field === 'available' ? (
                    <span className={`mt-4 inline-flex rounded-lg px-3 py-1.5 text-sm font-medium ${availableValue !== null && availableValue >= 0 ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-gray-100 text-gray-500'}`}>
                        {availableValue === null ? 'N/A' : availableValue >= 0 ? 'Available' : 'Needs review'}
                    </span>
                ) : (
                    <p className="mt-4 text-sm text-[#6B7280]">Click the icon to edit, then click check to confirm.</p>
                )}
            </div>
        );
    };

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
        <div className="bg-[#F9FBFC]">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
                <div className="mb-6 rounded-2xl border border-[#E7E7E7] px-4 py-4 shadow-sm sm:px-5 sm:py-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
                                            Available flags
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
                                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-sm transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${isSelected
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


                    </div>
                    <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:flex xl:flex-row">
                            <button

                                type="button"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#89A8F8] px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#7898F7] hover:shadow-md active:scale-[0.99] xl:w-auto"
                                // disabled={isSavingPricing}
                            >
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white">
                                    <SendHorizonal className="h-3.5 w-3.5" />
                                </span>
                                Send to Technician
                            </button>

                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#76C887] px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#68BC79] hover:shadow-md active:scale-[0.99] xl:w-auto"
                                disabled={isSavingPricing}
                            >
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white">
                                    <CreditCard className="h-3.5 w-3.5" />
                                </span>
                                Send Deposit Request
                            </button>
                        </div>

                        <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm sm:min-w-[280px] xl:max-w-[340px]">
                            <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-4 ring-[#EEF2FF]">
                                    <img
                                        src={technicianProfileSrc}
                                        alt={technician?.full_name || 'Technician'}
                                        className="h-full w-full object-cover"
                                        onError={(event) => {
                                            event.currentTarget.src = profile;
                                        }}
                                    />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm text-[#6B7280]">Assigned to</div>
                                    <div className="truncate text-lg font-medium text-[#374151]">{assignedTo}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-[32px] p-6 border border-[#E7E7E7] shadow-sm mb-10 overflow-hidden relative mt-4 sm:p-8 lg:p-10">
                    <h3 className="text-lg font-bold text-[#454545] mb-8 sm:text-xl sm:mb-12">Job Progress</h3>
                    <div className="relative flex min-w-[720px] justify-between gap-4 px-0 sm:min-w-0 sm:gap-0">
                        <div className="absolute top-[24px] left-6 right-6 z-0 h-1 hidden sm:block">
                            <div className="absolute inset-0 bg-[#22C55E]/10"></div>
                            <div
                                className={`h-full transition-all duration-500 ${currentProgressValue === 'technician_declined' ? 'bg-red-500' : 'bg-[#22C55E]'}`}
                                style={{ width: progress > 0 ? `${((progress - 1) / (PROGRESS_STEPS.length - 1)) * 100}%` : '0%' }}
                            ></div>
                        </div>
                        <div className="flex w-full justify-between gap-4 overflow-x-auto pb-2 sm:overflow-visible sm:pb-0">
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
                                    <div key={step.value} className="relative z-10 flex min-w-[86px] flex-col items-center sm:min-w-0">
                                        <div
                                            onClick={() => onUpdateProgress && onUpdateProgress(step.id)}
                                            className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-base transition-all duration-500 sm:h-12 sm:w-12 sm:text-lg ${onUpdateProgress ? 'cursor-pointer hover:scale-110 active:scale-95' : ''} ${nodeClassName}`}
                                        >
                                            {isCompleted ? <Check size={20} /> : step.id}
                                        </div>
                                        <p className={`mt-4 max-w-[78px] text-center text-[11px] font-semibold leading-tight sm:max-w-[100px] sm:text-[13px] ${labelClassName}`}>
                                            {step.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                    <div className="xl:col-span-8">
                        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2 lg:gap-8 lg:mb-8">
                            <div className="bg-white rounded-2xl p-5 border border-[#E7E7E7] shadow-sm sm:p-6">
                                <h3 className="mb-6 text-lg text-[#454545] sm:mb-8 sm:text-xl">Customer & Vehicle Details</h3>
                                <div className="grid grid-cols-1">
                                    {infoRows.map((detail) => (
                                        <div key={detail.label} className="flex flex-col gap-1  py-3 last:border-b-0 sm:flex-row sm:gap-0 sm:py-4">
                                            <span className="w-full text-sm text-gray-400 sm:w-28">{detail.label}</span>
                                            <span className="flex-1 overflow-hidden text-sm text-[#454545] sm:text-base">{toDisplay(detail.value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-5 border border-[#E7E7E7] shadow-sm sm:p-6">
                                <h3 className="mb-6 text-lg text-[#454545] sm:mb-8 sm:text-xl">Damage & Images</h3>
                                <div className="mb-6 rounded-[24px] bg-[#92E8FB]/20 p-4 sm:mb-8 sm:p-6">
                                    <h4 className="mb-2 text-base font-medium text-[#454545] sm:mb-3 sm:text-lg">Damaged Areas</h4>
                                    <p className="text-[#454545] text-sm opacity-70 leading-relaxed">
                                        {Array.isArray(damage.damaged_areas) && damage.damaged_areas.length
                                            ? damage.damaged_areas.join(', ')
                                            : 'N/A'}
                                    </p>
                                    <h4 className="mt-5 mb-2 text-base font-medium text-[#454545] sm:mt-6 sm:mb-3 sm:text-lg">Damage Breakdown</h4>
                                    <p className="text-[#454545] text-sm opacity-70 leading-relaxed">{toDisplay(damage.damage_breakdown)}</p>
                                </div>
                                {vehicleImages.length ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {vehicleImages.map((image) => (
                                            <img
                                                key={image.id}
                                                src={toImageSrc(image.image)}
                                                alt="Vehicle"
                                                className="h-36 w-full rounded-xl border border-[#E7E7E7] object-cover sm:h-32"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-gray-400">N/A</div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] p-5 border border-[#E7E7E7] shadow-sm sm:p-8 lg:p-10">
                            <h3 className="mb-6 text-lg font-bold text-[#454545] sm:mb-10 sm:text-xl">Pricing & Payments</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                                {renderPricingValue('totalCost', totalCostValue === null ? 'N/A' : toCurrency(totalCostValue))}
                                {renderPricingValue('deposit', depositValue === null ? 'N/A' : toCurrency(depositValue))}
                                {renderPricingValue('available', availableValue === null ? 'N/A' : toCurrency(availableValue))}
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:mt-6 sm:gap-6 md:grid-cols-3">
                                <div className="text-[#454545]">Total Cost Paid: <span className="font-medium">{toBooleanDisplay(data.total_cost_paid)}</span></div>

                                <div className="text-[#454545]">Balance Paid: <span className="font-medium">{toBooleanDisplay(data.balance_paid)}</span></div>

                                <div className="text-[#454545]">Deposit Paid: <span className="font-medium">{toBooleanDisplay(data.deposit_paid)}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-4 xl:mt-0">
                        <AssignTechnician jobId={jobId} />
                    </div>
                </div>

                <div id="notesComponents" className="my-5">
                    <NotesComponentsJobDetails jobId={jobId} />
                </div>

                <div className="overflow-hidden rounded-[32px] border border-[#E7E7E7] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
                    <div className="mb-6 flex items-center gap-3 sm:mb-8">
                        <PenTool className="h-5 w-5 text-[#111827] sm:h-6 sm:w-6" />
                        <h3 className="text-lg font-bold text-[#111827] sm:text-xl">Customer Sign-Off</h3>
                    </div>
                    {data.customer_signature ? (
                        <img
                            src={toImageSrc(data.customer_signature)}
                            alt="Customer Signature"
                            className="h-auto w-full max-w-md rounded-2xl border border-[#E7E7E7] object-contain"
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
