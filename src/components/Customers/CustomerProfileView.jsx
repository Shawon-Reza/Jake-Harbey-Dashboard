import {
    ArrowLeft,
    Briefcase,
    Calendar,
    ChevronRight,
    Star,
} from "lucide-react";
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

    const profileSrc = customer.profile_picture
        ? customer.profile_picture.startsWith("http://") || customer.profile_picture.startsWith("https://")
            ? customer.profile_picture
            : `${base_URL}${customer.profile_picture}`
        : profile;

    return (
        <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
            <div className="mx-auto p-12">
                <div className="flex items-center justify-between mb-10">
                    <button
                        onClick={() => navigate("/customers")}
                        className="flex items-center gap-4 text-[#454545] group transition-all"
                    >
                        <div className="p-3 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-xl">Customer Profile</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-[#E7E7E7] shadow-sm overflow-hidden mb-10">
                    <div className="bg-[#044D5C] p-12 py-6 flex items-center gap-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-gray-100">
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
                            <h2 className="text-2xl mb-2 tracking-tight">{toDisplay(customer.full_name)}</h2>
                            <p className="text-teal-50/70 text-lg">Customer since {toDisplay(customer.joining_year)}</p>
                        </div>
                    </div>

                    <div className="p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                            <div>
                                <h3 className="text-xl text-[#454545] mb-8">Contact Information</h3>
                                <div>
                                    {infoRows.map((info) => (
                                        <div key={info.label} className="flex border-b border-[#F5F5F5] pb-4 last:border-0">
                                            <span className="w-28 text-gray-400 font-medium text-lg">{info.label}</span>
                                            <span className="text-[#454545] text-lg flex-1">: {toDisplay(info.value)}</span>
                                        </div>
                                    ))}
                                </div>


                            </div>


                            <div className="grid grid-cols-2 gap-6 h-fit">
                                <div className="bg-[#E4F8FB] rounded-xl p-6 border border-blue-50 relative group hover:shadow-xl transition-all">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="rounded-2xl shadow-sm text-[#1A9C9C]">
                                            <Briefcase size={24} />
                                        </div>
                                        <div className="text-3xl text-[#1A9C9C]">{toDisplay(customer.total_jobs)}</div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm uppercase">Total Jobs</p>
                                    </div>
                                </div>

                                <div className="bg-[#F6FFFA] rounded-xl p-6 border border-green-50 relative group hover:shadow-xl transition-all">
                                    <div className="flex items-start justify-between mb-8 text-[#28A745]">
                                        <div className="text-3xl">{toDisplay(customer.total_spent)}</div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm uppercase">Total Spent</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 border border-[#E7E7E7] relative group hover:shadow-xl transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-gray-400 text-sm uppercase">Active Jobs</p>
                                        <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
                                            <Briefcase size={24} />
                                        </div>
                                    </div>
                                    <div className="text-3xl text-[#454545]">{toDisplay(customer.active_jobs)}</div>
                                </div>

                                <div className="bg-white rounded-xl p-6 border border-[#E7E7E7] relative group hover:shadow-xl transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-gray-400 text-sm uppercase">Completed Jobs</p>
                                        <div className="p-4 bg-[#F6FFFA] text-[#28A745] rounded-2xl">
                                            <Star size={24} />
                                        </div>
                                    </div>
                                    <div className="text-3xl text-[#454545]">{toDisplay(customer.completed_jobs)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 ">
                            <h3 className="text-xl text-[#454545] mb-8">Vehicle Found</h3>
                            {vehicles.length > 0 ? (
                                <div className="space-y-4 grid grid-cols-2 gap-6">
                                    {vehicles.map((vehicle, index) => (
                                        <div key={`${vehicle.registration_number || "na"}-${index}`} className="rounded-xl border border-[#F0F0F0] p-4">
                                            <div className="grid grid-cols-2 gap-y-2">
                                                <div className="text-sm text-gray-500">Reg</div>
                                                <div className="text-sm text-[#454545]">{toDisplay(vehicle.registration_number)}</div>
                                                <div className="text-sm text-gray-500">Make</div>
                                                <div className="text-sm text-[#454545]">{toDisplay(vehicle.make)}</div>
                                                <div className="text-sm text-gray-500">Model</div>
                                                <div className="text-sm text-[#454545]">{toDisplay(vehicle.model)}</div>
                                                <div className="text-sm text-gray-500">Year</div>
                                                <div className="text-sm text-[#454545]">{toDisplay(vehicle.year)}</div>
                                                <div className="text-sm text-gray-500">Colour</div>
                                                <div className="text-sm text-[#454545]">{toDisplay(vehicle.colour)}</div>
                                                <div className="text-sm text-gray-500">Fuel</div>
                                                <div className="text-sm text-[#454545]">{toDisplay(vehicle.fuel)}</div>
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

                <div className="bg-white rounded-xl border border-[#E7E7E7] shadow-sm overflow-hidden">
                    <div className="p-10 py-4 border-b border-[#F5F5F5] flex items-center justify-between bg-[#F9FAFB]">
                        <h3 className="text-xl text-[#454545]">Submission History</h3>
                        <span className="text-[#6B7280]">{submissions.length} total submissions</span>
                    </div>
                    <div className="divide-y divide-[#F5F5F5]">
                        {submissions.map((sub) => (
                            <div key={sub.id} className="p-10 py-6 hover:bg-gray-50/50 transition-colors group">
                                <div className="flex items-start justify-between gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <h4 className="text-xl text-[#2A2A2A]">Job #{toDisplay(sub.id)}</h4>
                                            <div className="flex gap-2.5">
                                                {sub.job_progress && (
                                                    <span className="bg-[#E4F8FB] text-[#1A9C9C] px-5 py-2 rounded-full text-xs shadow-sm">
                                                        {sub.job_progress}
                                                    </span>
                                                )}
                                                {sub.repair_progress && (
                                                    <span className="bg-[#FFF4E5] text-[#F68528] px-5 py-2 rounded-full text-xs shadow-sm">
                                                        {sub.repair_progress}
                                                    </span>
                                                )}
                                                {Array.isArray(sub.flags)
                                                    ? sub.flags.map((flag) => (
                                                        <span
                                                            key={`${sub.id}-${flag}`}
                                                            className="bg-[#EEF2FF] text-[#818cf8] px-5 py-2 rounded-full text-xs shadow-sm"
                                                        >
                                                            {flag}
                                                        </span>
                                                    ))
                                                    : null}
                                            </div>
                                        </div>
                                        <p className="text-[#4B5563] max-w-2xl mb-6">
                                            {sub.damage_breakdown && sub.damage_breakdown !== "[]"
                                                ? sub.damage_breakdown
                                                : "N/A"}
                                        </p>
                                        <div className="flex items-center gap-6 text-gray-400 text-sm">
                                            <span className="flex items-center gap-2">
                                                <Calendar size={18} /> {formatDateTime(sub.scheduled_date_and_time)}
                                            </span>
                                            <span className="text-[#454545]">{toDisplay(sub.location)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <ChevronRight className="w-6 h-6 text-[#9CA3AF] group-hover:translate-x-2 transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {submissions.length === 0 && (
                            <div className="p-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                                    <Briefcase size={40} />
                                </div>
                                <p className="text-gray-400 text-xl">No submission history found for this customer.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfileView;
