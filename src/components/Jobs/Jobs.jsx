import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  AlertCircle,
  Send,
  Mail,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  Flag,
  Edit3,
  Camera,
  Wrench,
} from "lucide-react";
import JobDetails from "../Shared/JobDetails";

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      customer: "John Smith",
      location: "WA2 2EE",
      service: "Windshield Replacement",
      status: "New Lead",
      statusColor: "#1976D2",
      statusBg: "#E3F2FD",
      amount: "TBD",
      date: "10/24/2023",
      progress: 0,
      attention: true,
      assignment: "To Assign",
      avatar: "J",
    },
    {
      id: 2,
      customer: "Emily Davis",
      location: "M3 3CC",
      service: "Chip Repair",
      status: "Active",
      statusColor: "#2E7D32",
      statusBg: "#E8F5E9",
      amount: "£65.00",
      date: "10/23/2023",
      progress: 2,
      attention: false,
      assignment: "Assigned",
      avatar: "E",
    },
    {
      id: 3,
      customer: "Michael Brown",
      location: "B1 1AA",
      service: "Window Tinting",
      status: "Awaiting Confirmation",
      statusColor: "#F9A825",
      statusBg: "#FFF8E1",
      amount: "£150.00",
      date: "10/22/2023",
      progress: 3,
      attention: true,
      assignment: "To Assign",
      avatar: "M",
    },
    {
      id: 4,
      customer: "Sophie Taylor",
      location: "WA2 2EE",
      service: "Windshield Repair",
      status: "Active",
      statusColor: "#2E7D32",
      statusBg: "#E8F5E9",
      amount: "£85.00",
      date: "10/21/2023",
      progress: 4,
      attention: false,
      assignment: "Assigned",
      avatar: "S",
    },
    {
      id: 5,
      customer: "Oliver White",
      location: "L1 5RR",
      service: "Detailing",
      status: "To Follow Up",
      statusColor: "#7B1FA2",
      statusBg: "#F3E5F5",
      amount: "TBD",
      date: "10/22/2023",
      progress: 0,
      attention: false,
      assignment: "Unassigned",
      avatar: "O",
    },
    {
      id: 6,
      customer: "Daniel Garcia",
      location: "M5 5HH",
      service: "Chip Repair",
      status: "New Lead",
      statusColor: "#1976D2",
      statusBg: "#E3F2FD",
      amount: "£90.00",
      date: "10/24/2023",
      progress: 1,
      attention: false,
      assignment: "To Assign",
      avatar: "D",
    },
    {
      id: 7,
      customer: "John Smith",
      location: "WA2 2EE",
      service: "Window Tinting",
      status: "Completed",
      statusColor: "#2E7D32",
      statusBg: "#E8F5E9",
      amount: "£120.00",
      date: "10/18/2023",
      progress: 7,
      attention: false,
      assignment: "Assigned",
      avatar: "J",
    },
    {
      id: 8,
      customer: "Sophie Taylor",
      location: "WA2 2EE",
      service: "Detailing",
      status: "Active",
      statusColor: "#2E7D32",
      statusBg: "#E8F5E9",
      amount: "£75.00",
      date: "10/22/2023",
      progress: 3,
      attention: true,
      assignment: "Assigned",
      avatar: "S",
    },
  ]);

  const getAvatarColor = (letter) => {
    const colors = {
      S: "bg-pink-100",
      J: "bg-blue-100",
      L: "bg-green-100",
      D: "bg-purple-100",
      E: "bg-yellow-100",
      M: "bg-indigo-100",
      O: "bg-orange-100",
    };
    return colors[letter] || "bg-gray-100";
  };

  const [technicians, setTechnicians] = useState([
    { id: 1, name: "David Chen", dist: "7.9 mi", active: 0, rating: 4.8 },
    { id: 2, name: "Marcus Johnson", dist: "17.1 mi", active: 3, rating: 4.7 },
    { id: 3, name: "Emma Thompson", dist: "17.8 mi", active: 2, rating: 4.6 },
    { id: 4, name: "Lisa Patel", dist: "20.2 mi", active: 1, rating: 4.9 },
  ]);

  const updateJobProgress = (stepId) => {
    if (!selectedJob) return;
    const updatedJobs = jobs.map(job => 
        job.id === selectedJob.id ? { ...job, progress: stepId } : job
    );
    setJobs(updatedJobs);
    setSelectedJob({ ...selectedJob, progress: stepId });
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedJob) return;
    const updatedJobs = jobs.map(job => 
        job.id === selectedJob.id ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
    setSelectedJob({ ...selectedJob, status: newStatus });
  };

  const handleAssignTech = (techName) => {
    if (!selectedJob) return;
    const updatedJobs = jobs.map(job => 
        job.id === selectedJob.id ? { ...job, assignment: techName } : job
    );
    setJobs(updatedJobs);
    setSelectedJob({ ...selectedJob, assignment: techName });

    setTechnicians(prev => prev.map(t => ({
        ...t,
        assigned: t.name === techName
    })));
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowDetailView(true);
  };

  const handleBackClick = () => {
    setShowDetailView(false);
    setSelectedJob(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      "New Lead": "bg-blue-100 text-blue-700",
      Active: "bg-green-100 text-green-700",
      "Awaiting Confirmation": "bg-yellow-100 text-yellow-700",
      "To Follow Up": "bg-purple-100 text-purple-700",
      Completed: "bg-green-100 text-green-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
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

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="mx-auto p-12">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-[#2A2A2A] mb-10">All Jobs</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobClick(job)}
              className="bg-white border border-[#E7E7E7] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-200/50 cursor-pointer transition-all duration-300 group relative hover:border-b-[#1A9C9C]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-full">
                  <h3 className="font-semibold text-2xl text-[#2A2A2A] group-hover:text-[#1A9C9C] transition-colors">
                    {job.customer}
                  </h3>
                </div>

                <span
                  className="px-5 py-2 text-xs rounded-full whitespace-nowrap"
                  style={{
                    backgroundColor: job.statusBg,
                    color: job.statusColor,
                  }}
                >
                  {job.status}
                </span>
              </div>
              <div className="flex items-center justify-between w-full mb-4">
                <p className="text-[#6B7280] flex items-center gap-2">
                  <Wrench strokeWidth={3.50} className="w-5 h-5 text-gray-300" /> {job.service}
                </p>
                <div
                  className={`text-xl ${job.amount === "TBD" ? "text-gray-300" : "text-[#2A2A2A]"}`}
                >
                  {job.amount}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {job.attention && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#FFF3E0] text-[#E65100] text-xs font-bold rounded-xl border border-orange-100 shadow-sm">
                    <AlertCircle size={14} /> Requires Attention
                  </div>
                )}
                {job.assignment === "To Assign" && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#E3F2FD] text-[#1976D2] text-xs font-bold rounded-xl border border-blue-100 shadow-sm">
                    <Send size={14} className="w-3.5 h-3.5" /> To Assign
                  </div>
                )}
                {job.assignment === "To Follow Up" && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#F3E5F5] text-[#7B1FA2] text-xs font-bold rounded-xl border border-purple-100 shadow-sm">
                    <Clock size={14} /> To Follow Up
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                  <Clock size={18} className="text-gray-300" /> {job.date}
                </div>

                <div className="flex items-center justify-between">

                  <div className="bg-gray-50 rounded-xl flex items-center gap-2 group-hover:bg-[#1A9C9C]/10 transition-colors">
                    <div className="flex gap-1.5">
                      {[...Array(7)].map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2.5 h-2.5 rounded-full ${idx < job.progress ? "bg-[#28A745]" : "bg-[#E7E7E7]"}`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 ml-3">

                      <span
                        className={`text-[13px] font-bold ${job.assignment === "Unassigned" ? "text-orange-500" : "text-[#454545]"}`}
                      >
                        {job.assignment}
                      </span>
                    </div>
                    <ChevronRight
                      size={24}
                      className="text-gray-300 group-hover:text-[#1A9C9C] transition-all"
                    />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
