import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onClick, icons }) => {
    const navigate = useNavigate();
    const { ChevronRight, Clock, AlertCircle, Send, Wrench } = icons;
    const status = job.status_badge || job.status || "Unknown";
    const customerName = job.customer_name || job.customer || "N/A";
    const serviceName = job.job_type || job.service || "N/A";
    const assignment = job.technician_name || job.assignment || "Unassigned";
    const hasAttentionFlag = Array.isArray(job.flags)
        ? job.flags.some((flag) => String(flag).toLowerCase().includes("attention"))
        : Boolean(job.attention);



    const statusStyles = {
        "New Lead": { backgroundColor: "#E3F2FD", color: "#1976D2" },
        Active: { backgroundColor: "#E8F5E9", color: "#2E7D32" },
        "Awaiting Confirmation": { backgroundColor: "#FFF8E1", color: "#F9A825" },
        "To Follow Up": { backgroundColor: "#F3E5F5", color: "#7B1FA2" },
        Completed: { backgroundColor: "#E8F5E9", color: "#2E7D32" },
        Unknown: { backgroundColor: "#F3F4F6", color: "#6B7280" },
    };

    const badgeStyle = statusStyles[status] || statusStyles.Unknown;
    const price =
        typeof job.price === "number"
            ? `£${job.price.toFixed(2)}`
            : job.amount || "N/A";
    const date = job.scheduled_date || job.date || "N/A";
    const progressPercentage =
        typeof job.progress_percentage === "number"
            ? job.progress_percentage
            : typeof job.progress === "number"
                ? Math.round((job.progress / 7) * 100)
                : 0;
    const progressDots = Math.max(0, Math.min(7, Math.round(progressPercentage / (100 / 7))));

    return (
        <div
            onClick={() => {
                navigate(`/jobs/${job.id}`);
            }}
            className="bg-white border border-[#E7E7E7] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-200/50 cursor-pointer transition-all duration-300 group relative hover:border-b-[#1A9C9C]"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="w-full">
                    <h3 className="font-semibold text-2xl text-[#2A2A2A] group-hover:text-[#1A9C9C] transition-colors">
                        {customerName}
                    </h3>
                </div>

                <span
                    className="px-5 py-2 text-xs rounded-full whitespace-nowrap"
                    style={badgeStyle}
                >
                    {status}
                </span>
            </div>

            <div className="flex items-center justify-between w-full mb-4">
                <p className="text-[#6B7280] flex items-center gap-2">
                    <Wrench strokeWidth={3.5} className="w-5 h-5 text-gray-300" /> {serviceName}
                </p>
                <div className={`text-xl ${price === "N/A" ? "text-gray-300" : "text-[#2A2A2A]"}`}>
                    {price}
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
                {hasAttentionFlag && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FFF3E0] text-[#E65100] text-xs font-bold rounded-xl border border-orange-100 shadow-sm">
                        <AlertCircle size={14} /> Requires Attention
                    </div>
                )}
                {assignment === "Unassigned" && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#E3F2FD] text-[#1976D2] text-xs font-bold rounded-xl border border-blue-100 shadow-sm">
                        <Send size={14} className="w-3.5 h-3.5" /> To Assign
                    </div>
                )}
                {Array.isArray(job.flags) && job.flags.some((flag) => String(flag).toLowerCase().includes("follow")) ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#F3E5F5] text-[#7B1FA2] text-xs font-bold rounded-xl border border-purple-100 shadow-sm">
                        <Clock size={14} /> To Follow Up
                    </div>
                ) : null}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                    <Clock size={18} className="text-gray-300" /> {date}
                </div>

                <div className="bg-gray-50 rounded-xl flex items-center gap-2 group-hover:bg-[#1A9C9C]/10 transition-colors">
                    <div className="flex gap-1.5">
                        {[...Array(7)].map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2.5 h-2.5 rounded-full ${idx < progressDots ? "bg-[#28A745]" : "bg-[#E7E7E7]"}`}
                            ></div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                        <span
                            className={`text-[13px] font-bold ${assignment === "Unassigned" ? "text-orange-500" : "text-[#454545]"}`}
                        >
                            {assignment}
                        </span>
                    </div>
                    <ChevronRight size={24} className="text-gray-300 group-hover:text-[#1A9C9C] transition-all" />
                </div>
            </div>
        </div>
    );
};

export default JobCard;
