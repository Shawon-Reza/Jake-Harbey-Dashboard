import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, CheckCircle2, Briefcase, ChevronRight } from "lucide-react";
import TechnicianDetails from "./TechnicianDetails";
import JobDetails from "../Shared/JobDetails";

const Technicians = () => {
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterTab, setFilterTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedTechnicianName && techniciansData) {
      const foundTech = techniciansData.find(
        (t) => t.name === location.state.selectedTechnicianName
      );
      if (foundTech) {
        setSelectedTechnician(foundTech);
      }
    }
  }, [location.state]);

  const techniciansData = [
    {
      id: 1,
      name: "Marcus Johnson",
      license: "MJ 344",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      activeJobs: 3,
      completedJobs: 2,
      status: "available",
      specialties: ["Windshield Repair", "Window Tinting"],
      phone: "4548454545",
      company: "joinventure ai",
      location: "Downtown Service",
      licenseNumber: "5774chgc",
      assignedJobs: [
        {
          id: 1,
          name: "John Smith",
          service: "Windshield Replacement",
          progress: 7,
          status: "Active",
          date: "10/24/2023",
        },
        {
          id: 2,
          name: "Emily Davis",
          service: "Chip Repair",
          progress: 2,
          status: "Active",
          date: "10/23/2023",
        },
        {
          id: 3,
          name: "John Smith",
          service: "Window Tinting",
          progress: 7,
          status: "Active",
          date: "10/19/2023",
        },
      ],
      documents: {
        "Contracts": [
          { id: 1, name: "Technician contact information", date: "10/24/2023", type: "contract", expiry: "10/24/2025" }
        ],
        "Technician Info": [
          { id: 2, name: "Technician information", date: "5/10/2023", type: "insurance", expiry: "5/10/2024" }
        ]
      }
    },
    {
      id: 2,
      name: "Sarah Williams",
      license: "MA 538",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      activeJobs: 1,
      completedJobs: 5,
      status: "available",
      specialties: ["Chip Repair", "Windshield Replacement"],
      phone: "4548454545",
      company: "joinventure ai",
      location: "Downtown Service",
      licenseNumber: "5774chgc",
      assignedJobs: [
        {
          id: 1,
          name: "Jane Doe",
          service: "Windshield Repair",
          progress: 4,
          status: "Active",
          date: "10/22/2023",
        },
      ],
    },
    {
      id: 3,
      name: "David Chen",
      license: "DK1 OO",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      activeJobs: 0,
      completedJobs: 8,
      status: "on-job",
      specialties: ["Window Tinting", "Detailing"],
      phone: "4548454545",
      company: "joinventure ai",
      location: "Downtown Service",
      licenseNumber: "5774chgc",
      assignedJobs: [],
    },
    {
      id: 4,
      name: "Emma Thompson",
      license: "WA1 OO",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      activeJobs: 2,
      completedJobs: 6,
      status: "available",
      specialties: ["Windshield Repair", "Chip Repair"],
      phone: "4548454545",
      company: "joinventure ai",
      location: "Downtown Service",
      licenseNumber: "5774chgc",
      assignedJobs: [],
    },
    {
      id: 5,
      name: "James Wilson",
      license: "BL1 EE",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      activeJobs: 4,
      completedJobs: 10,
      status: "available",
      specialties: ["Windshield Replacement"],
      phone: "4548454545",
      company: "joinventure ai",
      location: "Downtown Service",
      licenseNumber: "5774chgc",
      assignedJobs: [],
    },
    {
      id: 6,
      name: "Lisa Patel",
      license: "WN1 FF",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      activeJobs: 1,
      completedJobs: 3,
      status: "available",
      specialties: ["Windshield Repair", "Window Tinting"],
      phone: "4548454545",
      company: "joinventure ai",
      location: "Downtown Service",
      licenseNumber: "5774chgc",
      assignedJobs: [],
    },
  ];

  const filteredTechnicians = techniciansData.filter((tech) => {
    const matchesSearch = tech.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (filterTab === "all") return matchesSearch;
    if (filterTab === "available")
      return tech.status === "available" && matchesSearch;
    if (filterTab === "on-job")
      return tech.status === "on-job" && matchesSearch;
    return matchesSearch;
  });

  if (selectedJob) {
    return (
      <JobDetails 
        job={selectedJob}
        onBack={() => setSelectedJob(null)}
        onUpdateProgress={() => {}}
        onStatusChange={() => {}}
        onAssignTech={() => {}}
        technicians={techniciansData}
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
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 relative group">
            <input
              type="text"
              placeholder="Search by name, specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 pl-16 pr-8 py-3 bg-[#F9FBFC] border border-[#E7E7E7] rounded-xl text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[#1A9C9C]/5 focus:border-[#1A9C9C]/20 transition-all"
            />
          </div>
          <div className="flex gap-4 p-1.5 bg-[#F9FBFC] rounded-xl border border-[#E7E7E7]">
            {["All", "Available", "On Job"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setFilterTab(tab.toLowerCase().replace(" ", "-"))
                }
                className={`px-6 py-3 rounded-xl text-lg transition-all ${
                  filterTab === tab.toLowerCase().replace(" ", "-")
                    ? "bg-[#1A9C9C] text-white shadow-lg shadow-teal-100"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Technicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnicians.map((tech) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTechnician(tech)}
              className="bg-white border border-[#E7E7E7] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-200/50 cursor-pointer transition-all duration-300 group relative hover:border-b-[#1A9C9C]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img
                      src={tech.avatar}
                      alt={tech.name}
                      className="w-20 h-20 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100"
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-5 h-5 border-4 border-white rounded-full ${tech.status === "available" ? "bg-[#28A745]" : "bg-orange-400"}`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="text-2xl text-[#2A2A2A] mb-1 group-hover:text-[#1A9C9C] transition-colors">
                      {tech.name}
                    </h3>
                    <p className="text-[#6B7280] text-sm flex items-center gap-2 uppercase">
                      <MapPin className="w-4 h-4" strokeWidth={3.5} />{" "}
                      {tech.license}
                    </p>
                  </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-[#1A9C9C]/10 transition-colors">
                  <ChevronRight className="w-6 h-6 text-[#6B7280] group-hover:text-[#1A9C9C] transition-all" />
                </div>
              </div>

              <div className="mb-6 p-5 bg-[#F9FAFB] rounded-xl border border-[#F3F4F6] flex items-center justify-between">
                <div className="flex items-start gap-4 flex-col">
                  <div className="flex items-center gap-4">
                    <Briefcase
                      className="w-5 h-5 text-[#1A9C9C]"
                      strokeWidth={3.5}
                    />
                    <p className="text-3xl text-[#2A2A2A]">{tech.activeJobs}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280]">Active Jobs</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 font-semibold mb-4">
                  Specialties
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {tech.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="bg-[#EFF6FF] text-primary px-4 py-2.5 rounded-xl text-xs font-medium shadow-sm border border-[#DBEAFE]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technicians;
