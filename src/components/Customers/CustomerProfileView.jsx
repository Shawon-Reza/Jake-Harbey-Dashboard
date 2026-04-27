import {
    ArrowLeft,
    Briefcase,
    Calendar,
    ChevronRight,
    Star,
} from "lucide-react";
import { useState } from "react";
import { getAvatarColor, getInitial } from "./customerUtils";
import { useDashboardCustomerDetailsQuery } from "../../Api/dashboardApi";
import { base_URL } from "../../Api/config";
import profile from "../../assets/images/profile.png";
import { useNavigate, useParams } from "react-router-dom";

const toDisplay = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    return value;
};

const formatDateTime = (value) => {
    if (!value) return "N/A";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "N/A";
    return parsed.toLocaleString();
};

const CustomerProfileView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showAllVehicles, setShowAllVehicles] = useState(false);
    const [showAllSubmissions, setShowAllSubmissions] = useState(false);
    const { data: customer, isLoading, isError } = useDashboardCustomerDetailsQuery(id);

    if (isLoading) {
        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-12 text-gray-500">
                Loading customer details...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-12 text-red-500">
                Failed to load customer details.
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-12 text-gray-400">
                N/A
            </div>
        );
    }

    const infoRows = [
        { label: "Name", value: customer.full_name },
        { label: "Number", value: customer.phone },
        { label: "Email", value: customer.email },
        { label: "Location", value: customer.location },
    ];

    const vehicles = Array.isArray(customer.vehicle_found) ? customer.vehicle_found : [];
    const submissions = Array.isArray(customer.submission_history)
        ? customer.submission_history
        : [];
    const visibleVehicles = showAllVehicles ? vehicles : vehicles.slice(0, 4);
    const visibleSubmissions = showAllSubmissions ? submissions : submissions.slice(0, 4);

    const profileSrc = customer.profile_picture
        ? customer.profile_picture.startsWith("http://") || customer.profile_picture.startsWith("https://")
            ? customer.profile_picture
            : `${base_URL}${customer.profile_picture}`
        : profile;

    return (
        <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
            <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
                <div className="mb-6 flex items-center justify-between sm:mb-10">
                    <button
                        onClick={() => navigate("/customers")}
                        className="flex items-center gap-3 text-[#454545] transition-all group sm:gap-4"
                    >
                        <div className="rounded-2xl border border-[#E7E7E7] bg-white p-2.5 shadow-sm transition-shadow group-hover:shadow-md sm:p-3">
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="text-lg sm:text-xl">Customer Profile</span>
                    </button>
                </div>

                <div className="mb-8 overflow-hidden rounded-xl border border-[#E7E7E7] bg-white shadow-sm sm:mb-10">
                    <div className="relative flex flex-col gap-5 overflow-hidden bg-[#044D5C] px-5 py-6 sm:flex-row sm:items-center sm:gap-10 sm:px-8 sm:py-6 lg:px-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10 h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-gray-100 sm:h-24 sm:w-24">
                            <img
                                src={profileSrc}
                                alt={customer.full_name || "Customer"}
                                className="w-full h-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.src = profile;
                                }}
                            />
                            <div
                                className={`absolute inset-0 w-full h-full rounded-full border-4 border-white hidden items-center justify-center text-4xl text-[#454545] ${getAvatarColor(
                                    Number(customer.id) || 0
                                )}`}
                            >
                                {getInitial(customer.full_name)}
                            </div>
                        </div>
                        <div className="text-white relative z-10">
                            <h2 className="mb-2 text-xl tracking-tight sm:text-2xl">{toDisplay(customer.full_name)}</h2>
                            <p className="text-base text-teal-50/70 sm:text-lg">Customer since {toDisplay(customer.joining_year)}</p>
                        </div>
                    </div>

                    <div className="p-5 sm:p-8 lg:p-12">
                        <div className="mb-10 grid grid-cols-1 gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <h3 className="mb-6 text-lg text-[#454545] sm:mb-8 sm:text-xl">Contact Information</h3>
                                <div>
                                    {infoRows.map((info) => (
                                        <div key={info.label} className="flex flex-col gap-1 border-b border-[#F5F5F5] pb-4 last:border-0 sm:flex-row sm:items-start sm:gap-0">
                                            <span className="w-auto text-sm font-medium text-gray-400 sm:w-28 sm:text-lg">{info.label}</span>
                                            <span className="flex-1 text-sm text-[#454545] sm:text-lg">: {toDisplay(info.value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="group relative rounded-xl border border-blue-50 bg-[#E4F8FB] p-5 transition-all hover:shadow-xl sm:p-6">
                                    <div className="mb-6 flex items-center gap-4 sm:mb-8">
                                        <div className="rounded-2xl shadow-sm text-[#1A9C9C]">
                                            <Briefcase size={22} className="sm:h-6 sm:w-6" />
                                        </div>
                                        <div className="text-2xl text-[#1A9C9C] sm:text-3xl">{toDisplay(customer.total_jobs)}</div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm uppercase">Total Jobs</p>
                                    </div>
                                </div>

                                <div className="group relative rounded-xl border border-green-50 bg-[#F6FFFA] p-5 transition-all hover:shadow-xl sm:p-6">
                                    <div className="mb-6 flex items-start justify-between text-[#28A745] sm:mb-8">
                                        <div className="text-2xl sm:text-3xl">{toDisplay(customer.total_spent)}</div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm uppercase">Total Spent</p>
                                    </div>
                                </div>

                                <div className="group relative rounded-xl border border-[#E7E7E7] bg-white p-5 transition-all hover:shadow-xl sm:p-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="text-gray-400 text-sm uppercase">Active Jobs</p>
                                        <div className="rounded-2xl bg-blue-50 p-3 text-blue-500 sm:p-4">
                                            <Briefcase size={22} className="sm:h-6 sm:w-6" />
                                        </div>
                                    </div>
                                    <div className="text-2xl text-[#454545] sm:text-3xl">{toDisplay(customer.active_jobs)}</div>
                                </div>

                                <div className="group relative rounded-xl border border-[#E7E7E7] bg-white p-5 transition-all hover:shadow-xl sm:p-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="text-gray-400 text-sm uppercase">Completed Jobs</p>
                                        <div className="rounded-2xl bg-[#F6FFFA] p-3 text-[#28A745] sm:p-4">
                                            <Star size={22} className="sm:h-6 sm:w-6" />
                                        </div>
                                    </div>
                                    <div className="text-2xl text-[#454545] sm:text-3xl">{toDisplay(customer.completed_jobs)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 sm:mt-12">
                            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                <h3 className="text-lg text-[#454545] sm:text-xl">Vehicle Found</h3>
                                {vehicles.length > 4 ? (
                                    <button
                                        onClick={() => setShowAllVehicles((prev) => !prev)}
                                        className="w-full rounded-xl border border-[#E7E7E7] bg-white px-4 py-2 text-sm font-semibold text-[#454545] transition-colors hover:bg-gray-50 sm:w-auto"
                                    >
                                        {showAllVehicles ? 'Show Less' : 'View All'}
                                    </button>
                                ) : null}
                            </div>
                            {vehicles.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
                                    {visibleVehicles.map((vehicle, index) => (
                                        <div key={`${vehicle.registration_number || "na"}-${index}`} className="rounded-xl border border-[#F0F0F0] p-4 sm:p-5">
                                            <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-y-2">
                                                <div className="text-sm text-gray-500">Reg</div>
                                                <div className="break-words text-sm text-[#454545]">{toDisplay(vehicle.registration_number)}</div>
                                                <div className="text-sm text-gray-500">Make</div>
                                                <div className="break-words text-sm text-[#454545]">{toDisplay(vehicle.make)}</div>
                                                <div className="text-sm text-gray-500">Model</div>
                                                <div className="break-words text-sm text-[#454545]">{toDisplay(vehicle.model)}</div>
                                                <div className="text-sm text-gray-500">Year</div>
                                                <div className="break-words text-sm text-[#454545]">{toDisplay(vehicle.year)}</div>
                                                <div className="text-sm text-gray-500">Colour</div>
                                                <div className="break-words text-sm text-[#454545]">{toDisplay(vehicle.colour)}</div>
                                                <div className="text-sm text-gray-500">Fuel</div>
                                                <div className="break-words text-sm text-[#454545]">{toDisplay(vehicle.fuel)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-400">N/A</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#E7E7E7] bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-[#F5F5F5] bg-[#F9FAFB] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-6 lg:p-10 lg:py-4">
                        <h3 className="text-lg text-[#454545] sm:text-xl">Submission History</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-[#6B7280] sm:text-base">{submissions.length} total submissions</span>
                            {submissions.length > 4 ? (
                                <button
                                    onClick={() => setShowAllSubmissions((prev) => !prev)}
                                    className="rounded-xl border border-[#E7E7E7] bg-white px-4 py-2 text-sm font-semibold text-[#454545] transition-colors hover:bg-gray-50"
                                >
                                    {showAllSubmissions ? 'Show Less' : 'View All'}
                                </button>
                            ) : null}
                        </div>
                    </div>
                    <div className="divide-y divide-[#F5F5F5]">
                        {visibleSubmissions.map((sub) => (
                            <div key={sub.id} className="group px-4 py-4 transition-colors hover:bg-gray-50/50 sm:px-6 sm:py-5 lg:px-10 lg:py-6">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                                    <div className="flex-1">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                                            <h4 className="text-base font-semibold text-[#2A2A2A] sm:text-lg lg:text-xl">Job #{toDisplay(sub.id)}</h4>
                                            <div className="flex flex-wrap gap-2.5">
                                                {sub.job_progress && (
                                                    <span className="rounded-full bg-[#E4F8FB] px-4 py-2 text-xs shadow-sm sm:px-5">
                                                        {sub.job_progress}
                                                    </span>
                                                )}
                                                {sub.repair_progress && (
                                                    <span className="rounded-full bg-[#FFF4E5] px-4 py-2 text-xs shadow-sm sm:px-5">
                                                        {sub.repair_progress}
                                                    </span>
                                                )}
                                                {Array.isArray(sub.flags)
                                                    ? sub.flags.map((flag) => (
                                                        <span
                                                            key={`${sub.id}-${flag}`}
                                                            className="rounded-full bg-[#EEF2FF] px-4 py-2 text-xs shadow-sm sm:px-5"
                                                        >
                                                            {flag}
                                                        </span>
                                                    ))
                                                    : null}
                                            </div>
                                        </div>
                                        <p className="max-w-2xl py-1 text-sm text-[#4B5563] sm:text-base">
                                            {sub.damage_breakdown && sub.damage_breakdown !== "[]"
                                                ? sub.damage_breakdown
                                                : "N/A"}
                                        </p>
                                        <div className="flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:items-center sm:gap-6">
                                            <span className="flex items-center gap-2">
                                                <Calendar size={16} /> {formatDateTime(sub.scheduled_date_and_time)}
                                            </span>
                                            <span className="text-[#454545]">{toDisplay(sub.location)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end md:gap-10">
                                        <ChevronRight className="h-6 w-6 text-[#9CA3AF] transition-all group-hover:translate-x-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {submissions.length === 0 && (
                            <div className="p-10 text-center sm:p-20">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-200">
                                    <Briefcase size={40} />
                                </div>
                                <p className="text-base text-gray-400 sm:text-xl">No submission history found for this customer.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfileView;
