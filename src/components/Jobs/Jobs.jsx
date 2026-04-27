import { useEffect, useState } from "react";
import {
  ChevronRight,
  Clock,
  AlertCircle,
  Send,
  Wrench,
} from "lucide-react";
import { useDashboardJobsQuery } from "../../Api/dashboardApi";
import JobDetails from "../Shared/JobDetails";
import JobCard from "./JobCard";

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const { data, isLoading, isError } = useDashboardJobsQuery();

  useEffect(() => {
    const list = Array.isArray(data)
      ? data
      : data?.results || data?.data || data?.jobs || [];
    setJobs(Array.isArray(list) ? list : []);
  }, [data]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowDetailView(true);
  };

  const updateJobProgress = () => {};
  const handleStatusChange = () => {};
  const handleAssignTech = () => {};




  const handleBackClick = () => {
    setShowDetailView(false);
    setSelectedJob(null);
  };

  if (showDetailView && selectedJob) {
    return (
      <JobDetails
        job={selectedJob}
        onBack={handleBackClick}
        onUpdateProgress={updateJobProgress}
        onStatusChange={handleStatusChange}
        onAssignTech={handleAssignTech}
        technicians={technicians}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto bg-white p-12 text-gray-500">
        Loading jobs...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 overflow-y-auto bg-white p-12 text-red-500">
        Failed to load jobs.
      </div>
    );
  }


  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="mx-auto p-12">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-[#2A2A2A] mb-10">All Jobs</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
          {jobs.map((job, index) => (
            <JobCard
              key={job.id || index}
              job={job}
              onClick={() => handleJobClick(job)}
              icons={{ ChevronRight, Clock, AlertCircle, Send, Wrench }}
            />
          ))}
        </div>

        {!jobs.length ? (
          <div className="mt-8 rounded-2xl border border-[#E7E7E7] p-10 text-center text-gray-400">
            N/A
          </div>
        ) : null}
      </div>
    </div>
  );
}
