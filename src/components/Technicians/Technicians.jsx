import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDashboardTechniciansQuery } from "../../Api/dashboardApi";
import TechnicianDetails from "./TechnicianDetails";
import JobDetails from "../Shared/JobDetails";
import TechnicianCard from "./TechnicianCard";
import TechnicianFilters from "./TechnicianFilters";

const Technicians = () => {
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterTab, setFilterTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { data, isLoading, isError } = useDashboardTechniciansQuery();

  const allTechniciansRaw = Array.isArray(data?.all) ? data.all : [];
  const availableTechniciansRaw = Array.isArray(data?.available) ? data.available : [];
  const onJobTechniciansRaw = Array.isArray(data?.on_job) ? data.on_job : [];

  const onJobNames = new Set(
    onJobTechniciansRaw
      .map((tech) => tech?.full_name || tech?.name)
      .filter(Boolean)
  );

  const allTechnicians = allTechniciansRaw.map((tech) => ({
    ...tech,
    status: onJobNames.has(tech?.full_name || tech?.name) ? "on-job" : "available",
  }));

  const availableTechnicians = availableTechniciansRaw.map((tech) => ({
    ...tech,
    status: "available",
  }));

  const onJobTechnicians = onJobTechniciansRaw.map((tech) => ({
    ...tech,
    status: "on-job",
  }));

  const currentTabData =
    filterTab === "available"
      ? availableTechnicians
      : filterTab === "on-job"
      ? onJobTechnicians
      : allTechnicians;

  useEffect(() => {
    if (location.state?.selectedTechnicianName && allTechnicians.length) {
      const foundTech = allTechnicians.find(
        (t) => (t.full_name || t.name) === location.state.selectedTechnicianName
      );
      if (foundTech) {
        setSelectedTechnician(foundTech);
      }
    }
  }, [location.state, allTechnicians]);

  const filteredTechnicians = currentTabData.filter((tech) => {
    const name = (tech.full_name || tech.name || "").toLowerCase();
    const specialties = Array.isArray(tech.specialties)
      ? tech.specialties.join(" ").toLowerCase()
      : String(tech.specialities || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || specialties.includes(search);
  });

  if (selectedJob) {
    return (
      <JobDetails 
        job={selectedJob}
        onBack={() => setSelectedJob(null)}
        onUpdateProgress={() => {}}
        onStatusChange={() => {}}
        onAssignTech={() => {}}
        technicians={allTechnicians}
      />
    );
  }

  if (selectedTechnician) {
    return (
      <TechnicianDetails
        tech={selectedTechnician}
        onBack={() => setSelectedTechnician(null)}
        onSelectJob={setSelectedJob}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto bg-white p-12 text-gray-500">
        Loading technicians...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 overflow-y-auto bg-white p-12 text-red-500">
        Failed to load technicians.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className=" mx-auto p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-medium text-[#2A2A2A] mb-8">
            Technicians
          </h1>
        </div>

        {/* Search and Filters */}
        <TechnicianFilters
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Technicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnicians.map((tech, index) => (
            <TechnicianCard
              key={`${tech.full_name || tech.name || "na"}-${index}`}
              tech={tech}
              onSelect={setSelectedTechnician}
            />
          ))}
        </div>

        {!filteredTechnicians.length ? (
          <div className="mt-8 rounded-2xl border border-[#E7E7E7] p-10 text-center text-gray-400">
            N/A
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Technicians;
