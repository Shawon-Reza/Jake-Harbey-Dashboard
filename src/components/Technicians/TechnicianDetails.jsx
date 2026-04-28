import { ArrowLeft, Briefcase, Calendar, CheckCircle2, ChevronRight, Shield } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDashboardTechnicianDetailsQuery } from "../../Api/dashboardApi";
import TechnicianDocuments from "./TechnicianDocuments";

const toDisplay = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    return value;
};

const toImageSrc = (value) => {
    if (!value) return "https://ui-avatars.com/api/?name=NA&background=E5E7EB&color=6B7280";
    return value;
};

const TechnicianDetails = ({ tech, onSelectJob }) => {
    const { id: routeId } = useParams();
    const navigate = useNavigate();

    const technicianId = tech?.user_id || tech?.id || routeId;
    const { data, isLoading, isError } = useDashboardTechnicianDetailsQuery(technicianId);
    console.log(data)
    if (!technicianId) {
        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-12 text-gray-400">
                N/A
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-12 text-gray-500">
                Loading technician details...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex-1 overflow-y-auto bg-[#F9FBFC] p-12 text-red-500">
                Failed to load technician details.
            </div>
        );
    }

    const name = data.full_name || "N/A";
    const avatar = toImageSrc(data.profile_picture);
    const status = data.available_status ? "available" : "on-job";
    const specialties = String(data.specialities || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    const documents = Array.isArray(data.documents) ? data.documents : [];
    const assignedJobs = Array.isArray(data.assigned_jobs_list) ? data.assigned_jobs_list : [];

    const infoRows = [
        { label: "Name", value: data.full_name },
        { label: "Number", value: data.phone_number },
        { label: "Company", value: data.company_name },
        { label: "Location", value: data.location },
        { label: "Assigned Jobs", value: data.assigned_jobs_count },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
            <div className="bg-[#F2F2F2] mx-auto p-12">

                <div className="mb-10 flex items-center justify-between">
                    <button onClick={() => {
                        navigate(-1);
                    }} className="group flex items-center gap-4 text-[#454545] transition-all">
                        <div className="rounded-2xl border border-[#E7E7E7] bg-white p-3 shadow-sm transition-shadow group-hover:shadow-md">
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="text-xl font-semibold">Technician Profile</span>
                    </button>
                </div>

                <div className="relative h-40 overflow-hidden rounded-t-xl bg-[#004D40] p-10 shadow-lg shadow-teal-900/10">
                    <div className="absolute -mr-32 -mt-32 right-0 top-0 h-64 w-64 rounded-full bg-teal-800/10 blur-3xl"></div>
                    <div className="relative z-10 flex items-center gap-10">
                        <div className="relative">
                            <img
                                src={avatar}
                                alt={name}
                                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
                                onError={(event) => {
                                    event.currentTarget.src =
                                        "https://ui-avatars.com/api/?name=NA&background=E5E7EB&color=6B7280";
                                }}
                            />
                            <div
                                className={`absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-[#004D40] shadow-sm ${status === "available" ? "bg-[#28A745]" : "bg-orange-400"
                                    }`}
                            ></div>
                        </div>
                        <div className="text-white">
                            <h2 className="mb-3 text-3xl font-medium tracking-tight">{name}</h2>
                            <span className="inline-flex items-center rounded-full bg-[#E5F5ED] px-4 py-1.5 text-xs font-bold text-[#28A745] shadow-sm">
                                {status === "available" ? "Available" : "On Job"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-10 grid grid-cols-1 gap-8 bg-white p-10 lg:grid-cols-3">
                    <div className="col-span-2 grid grid-cols-2 gap-10">
                        <div>
                            <h3 className="mb-8 text-sm font-semibold text-[#6B7280]">Contact Information</h3>
                            <div>
                                {infoRows.map((info) => (
                                    <div key={info.label} className="flex pb-4 text-sm">
                                        <span className="w-28 text-[#6B7280]">{info.label}</span>
                                        <span className="flex-1 text-[#111827]">: {toDisplay(info.value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[32px]">
                            <h3 className="mb-8 text-sm font-semibold text-[#6B7280]">Specialties</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {(specialties.length ? specialties : ["N/A"]).map((specialty, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] px-4 py-3 text-center text-xs font-medium text-[#06788F]"
                                    >
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <TechnicianDocuments contactDocuments={documents} technicianInfoDocuments={[]} technicianId={technicianId} />

                    </div>

                    <div className="space-y-8">
                        <div className="rounded-[32px]">
                            <h3 className="mb-8 text-sm font-semibold text-[#6B7280]">Performance</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-6 text-left">
                                    <div className="mb-4 flex items-center gap-3 text-[#2563EB]">
                                        <Briefcase size={20} className="stroke-[2.5px]" />
                                        <span className="text-3xl font-medium">{toDisplay(data.active_jobs_count)}</span>
                                    </div>
                                    <div className="text-xs text-[#6B7280]">Active Jobs</div>
                                </div>
                                <div className="rounded-2xl border border-[#DCFCE7] bg-[#F0FDF4] p-6 text-left">
                                    <div className="mb-4 flex items-center gap-3 text-[#16A34A]">
                                        <CheckCircle2 size={20} className="stroke-[2.5px]" />
                                        <span className="text-3xl font-medium">{toDisplay(data.completed_jobs_count)}</span>
                                    </div>
                                    <div className="text-xs text-[#6B7280]">Completed</div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-[#E7E7E7] p-6">
                            <h3 className="mb-8 flex items-center gap-3 text-sm font-semibold text-[#6B7280]">
                                <Shield size={20} className="text-[#6B7280]" /> App Permissions
                            </h3>
                            <div className="flex items-center justify-between rounded-2xl border border-[#F3F4F6] bg-[#F9FAFB] p-6">
                                <span className="text-sm text-[#111827]">View Payout Amount</span>
                                <span className="text-base font-semibold text-[#1A9C9C]">{toDisplay(data.view_payout_amount)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-10 rounded-xl border border-[#E7E7E7] bg-[#F9FAFB] p-10 shadow-sm">
                    <h3 className="mb-8 text-xl font-semibold text-[#454545]">
                        Assigned Jobs ( {toDisplay(data.assigned_jobs_count)} )
                    </h3>
                    <div className="space-y-4">
                        {assignedJobs.map((job) => {
                            const mappedJob = {
                                id: job.job_id,
                                customer_name: job.customer_name,
                                status_badge: job.job_progress || job.repair_progress || "Unknown",
                                scheduled_date: job.delivery_date_and_time,
                                location: job.location,
                                price: 0,
                                progress_percentage: 0,
                                technician_name: name,
                                job_type: "N/A",
                                flags: [],
                            };

                            return (
                                <div
                                    key={job.job_id}
                                    onClick={() => {
                                        navigate(`/jobs/${job.job_id}`);
                                    }}
                                    className="group flex cursor-pointer items-center justify-between rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-sm transition-all hover:border-teal-200"
                                >
                                    <div className="flex items-center gap-6">
                                        <img
                                            src={toImageSrc(job.customer_profile_picture)}
                                            alt={job.customer_name || "Customer"}
                                            className="h-12 w-12 rounded-full border border-[#E5E7EB] object-cover"
                                            onError={(event) => {
                                                event.currentTarget.src =
                                                    "https://ui-avatars.com/api/?name=NA&background=E5E7EB&color=6B7280";
                                            }}
                                        />
                                        <div>
                                            <p className="text-lg font-medium text-[#2A2A2A] transition-colors group-hover:text-[#1A9C9C]">
                                                {toDisplay(job.customer_name)}
                                            </p>
                                            <p className="text-xs text-[#6B7280]">{toDisplay(job.damage_breakdown)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <span className="rounded-full bg-[#DCFCE7] px-5 py-1.5 text-xs font-bold text-[#16A34A]">
                                            {toDisplay(job.job_progress || job.repair_progress)}
                                        </span>

                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                                                <Calendar strokeWidth={3.5} className="h-4 w-4" />
                                                <span>{toDisplay(job.delivery_date_and_time)}</span>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-[#9CA3AF] transition-colors group-hover:text-[#1A9C9C]" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {!assignedJobs.length ? (
                            <div className="p-8 text-center text-sm text-[#6B7280]">N/A</div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicianDetails;
