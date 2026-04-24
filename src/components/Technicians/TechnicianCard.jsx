import { Briefcase, ChevronRight, MapPin } from "lucide-react";

const TechnicianCard = ({ tech, onSelect }) => {
  const name = tech.full_name || tech.name || "N/A";
  const avatar = tech.profile_picture || tech.avatar || "https://ui-avatars.com/api/?name=NA&background=E5E7EB&color=6B7280";
  const location = tech.location || tech.license || "N/A";
  const activeJobs = tech.active_jobs ?? tech.activeJobs ?? "N/A";
  const specialtiesValue = tech.specialities ?? tech.specialties;
  const specialties = Array.isArray(specialtiesValue)
    ? specialtiesValue
    : String(specialtiesValue || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return (
    <div
      onClick={() => onSelect(tech)}
      className="group relative cursor-pointer rounded-2xl border border-[#E7E7E7] bg-white p-6 transition-all duration-300 hover:border-b-[#1A9C9C] hover:shadow-2xl hover:shadow-gray-200/50"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="h-20 w-20 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100"
              onError={(event) => {
                event.currentTarget.src = "https://ui-avatars.com/api/?name=NA&background=E5E7EB&color=6B7280";
              }}
            />
            <div
              className={`absolute bottom-0 right-0 h-5 w-5 rounded-full border-4 border-white ${
                tech.status === "available" ? "bg-[#28A745]" : "bg-orange-400"
              }`}
            ></div>
          </div>
          <div>
            <h3 className="mb-1 text-2xl text-[#2A2A2A] transition-colors group-hover:text-[#1A9C9C]">
              {name}
            </h3>
            <p className="flex items-center gap-2 text-sm uppercase text-[#6B7280]">
              <MapPin className="h-4 w-4" strokeWidth={3.5} />
              {location}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-2 transition-colors group-hover:bg-[#1A9C9C]/10">
          <ChevronRight className="h-6 w-6 text-[#6B7280] transition-all group-hover:text-[#1A9C9C]" />
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-xl border border-[#F3F4F6] bg-[#F9FAFB] p-5">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <Briefcase className="h-5 w-5 text-[#1A9C9C]" strokeWidth={3.5} />
            <p className="text-3xl text-[#2A2A2A]">{activeJobs}</p>
          </div>
          <p className="text-xs text-[#6B7280]">Active Jobs</p>
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold text-gray-400">Specialties</p>
        <div className="flex flex-wrap gap-2.5">
          {(specialties.length ? specialties : ["N/A"]).map((specialty, index) => (
            <span
              key={`${tech.id}-${index}`}
              className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] px-4 py-2.5 text-xs font-medium text-primary shadow-sm"
            >
              {specialty || "N/A"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianCard;
