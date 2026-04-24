import { useState, useRef } from "react";
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Briefcase,
  Shield,
  Upload,
  Download,
  Eye,
  FileText,
  X,
} from "lucide-react";

const TechnicianDetails = ({ tech, onBack, onSelectJob }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeDocumentTab, setActiveDocumentTab] = useState("Contracts");
  const [viewingDocument, setViewingDocument] = useState(null);
  const fileInputRef = useRef(null);

  if (!tech) return null;

  const name = tech.full_name || tech.name || "N/A";
  const avatar =
    tech.profile_picture ||
    tech.avatar ||
    "https://ui-avatars.com/api/?name=NA&background=E5E7EB&color=6B7280";
  const status = tech.status || "available";
  const specialtiesValue = tech.specialities ?? tech.specialties;
  const specialties = Array.isArray(specialtiesValue)
    ? specialtiesValue
    : String(specialtiesValue || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
  const documents = tech.documents || { Contracts: [], "Technician Info": [] };
  const assignedJobs = Array.isArray(tech.assignedJobs) ? tech.assignedJobs : [];
  const activeJobs = tech.active_jobs ?? tech.activeJobs ?? "N/A";
  const completedJobs = tech.completed_jobs ?? tech.completedJobs ?? "N/A";

  return (
    <div className="flex-1 overflow-y-auto bg-[#F9FBFC]">
      <div className="bg-[#F2F2F2] mx-auto p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-4 text-[#454545] group transition-all"
          >
            <div className="p-3 bg-white border border-[#E7E7E7] rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-xl font-semibold">Technician Profile</span>
          </button>
        </div>

        {/* Profile Header Banner */}
        <div className="bg-[#004D40] rounded-t-xl p-10 flex items-center gap-10 shadow-lg shadow-teal-900/10 relative overflow-hidden h-40">
          {/* Decorative patterns could go here */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex items-center gap-10">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                onError={(event) => {
                  event.currentTarget.src =
                    "https://ui-avatars.com/api/?name=NA&background=E5E7EB&color=6B7280";
                }}
              />
              <div
                className={`absolute bottom-1 right-1 w-6 h-6 border-4 border-[#004D40] rounded-full shadow-sm ${
                  status === "on-job" ? "bg-orange-400" : "bg-[#28A745]"
                }`}
              ></div>
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-medium mb-3 tracking-tight">
                {name}
              </h2>
              <span className="inline-flex items-center bg-[#E5F5ED] text-[#28A745] px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                {status === "on-job" ? "On Job" : "Available"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 bg-white p-10">
          <div className="col-span-2 grid grid-cols-2 gap-10">
            {/* Contact Information */}
            <div className="">
              <h3 className="text-sm font-semibold text-[#6B7280] mb-8">
                Contact Information
              </h3>
              <div className="">
                {[
                  { label: "Name", value: name },
                  { label: "Number", value: tech.phone || "N/A" },
                  { label: "Company", value: tech.company || "N/A" },
                  { label: "Location", value: tech.location || "N/A" },
                  { label: "License", value: tech.licenseNumber || "N/A" },
                ].map((info) => (
                  <div key={info.label} className="flex pb-4 text-sm">
                    <span className="w-20 text-[#6B7280]">{info.label}</span>
                    <span className="text-[#111827] flex-1">
                      : {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div className="rounded-[32px]">
              <h3 className="text-sm font-semibold text-[#6B7280] mb-8">
                Specialties
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {(specialties.length ? specialties : ["N/A"]).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="bg-[#EFF6FF] text-[#06788F] px-4 py-3 rounded-xl text-xs font-medium border border-[#DBEAFE] text-center"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            {/* Documents Section */}
            <div className="bg-white rounded-[24px] p-8 border border-[#F3F4F6] shadow-sm mb-10 col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <FileText className="w-6 h-6 text-[#454545]" />
                <h3 className="text-xl font-bold text-[#2A2A2A]">
                  Documents
                </h3>
              </div>

              <div className="flex gap-10 mb-8 border-b border-[#E5E7EB]">
                {[
                  "Contracts",
                  "Technician Info",
                ].map((tabName, idx) => {
                  const count = documents[tabName] ? documents[tabName].length : 0;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDocumentTab(tabName)}
                      className={`pb-4 px-2 text-sm font-semibold transition-all relative flex items-center gap-3 ${activeDocumentTab === tabName ? "text-[#1A9C9C]" : "text-[#71717A]"}`}
                    >
                      {tabName}
                      <span className="bg-[#F4F4F5] px-2 py-0.5 rounded-full text-xs font-bold text-[#71717A]">
                        {count}
                      </span>
                      {activeDocumentTab === tabName && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A9C9C]"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                {(documents[activeDocumentTab] ? documents[activeDocumentTab] : []).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-white border border-[#E5E7EB] rounded-2xl group transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#6B7280]" />
                      </div>
                      <span className="text-[15px] font-semibold text-[#111827]">
                        {doc.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      {activeDocumentTab === "Contracts" && (
                        <button
                          onClick={() => setIsUploadModalOpen(true)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#1A9C9C] text-[#1A9C9C] rounded-xl text-sm font-semibold hover:bg-teal-50 transition-colors mr-2"
                        >
                          <Upload className="w-4 h-4 text-[#1A9C9C]" /> Upload Document
                        </button>
                      )}
                      <button onClick={() => setViewingDocument(doc)} className="p-2 text-[#9CA3AF] hover:text-[#1A9C9C] transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-[#9CA3AF] hover:text-[#1A9C9C] transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {(!documents[activeDocumentTab] || documents[activeDocumentTab].length === 0) && (
                    <div className="p-8 text-center text-[#6B7280] text-sm">
                        No documents found for this category.
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-8">
            <div className="rounded-[32px]">
              <h3 className="text-sm font-semibold text-[#6B7280] mb-8">
                Performance
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-[#EFF6FF] rounded-2xl border border-[#DBEAFE] text-left">
                  <div className="flex items-center gap-3 text-[#2563EB] mb-4">
                    <Briefcase size={20} className="stroke-[2.5px]" />
                    <span className="text-3xl font-medium">
                      {activeJobs}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7280]">Active Jobs</div>
                </div>
                <div className="p-6 bg-[#F0FDF4] rounded-2xl border border-[#DCFCE7] text-left">
                  <div className="flex items-center gap-3 text-[#16A34A] mb-4">
                    <CheckCircle2 size={20} className="stroke-[2.5px]" />
                    <span className="text-3xl font-medium">
                      {completedJobs}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7280]">Completed</div>
                </div>
              </div>
            </div>

            {/* App Permissions */}
            <div className="rounded-xl border border-[#E7E7E7] p-6">
              <h3 className="text-sm font-semibold text-[#6B7280] mb-8 flex items-center gap-3">
                <Shield size={20} className="text-[#6B7280]" /> App
                Permissions
              </h3>
              <div className="flex items-center justify-between p-6 bg-[#F9FAFB] rounded-2xl border border-[#F3F4F6]">
                <span className="text-sm text-[#111827]">
                  View Payout Amount
                </span>
                <div className="w-12 h-6 bg-[#1A9C9C] rounded-full p-1 relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Jobs List */}
        <div className="bg-[#F9FAFB] rounded-xl p-10 border border-[#E7E7E7] shadow-sm mb-10">
          <h3 className="text-xl font-semibold text-[#454545] mb-8">
            Assigned Jobs ( {assignedJobs.length} )
          </h3>
          <div className="space-y-4">
            {assignedJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm border border-[#F3F4F6] cursor-pointer hover:border-teal-200 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {(job.name || "N").charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[#2A2A2A] text-lg group-hover:text-[#1A9C9C] transition-colors">
                      {job.name}
                    </p>
                    <p className="text-xs text-[#6B7280]">{job.service}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  {/* Progress Dots */}
                  <div className="flex gap-2">
                    {[...Array(7)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full ${idx < job.progress ? "bg-[#22C55E]" : "bg-[#E5E7EB]"}`}
                      ></div>
                    ))}
                  </div>

                  <span className="px-5 py-1.5 bg-[#DCFCE7] text-[#16A34A] rounded-full text-xs font-bold">
                    {job.status}
                  </span>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[#6B7280] text-sm">
                      <Calendar strokeWidth={3.50} className="w-4 h-4" />
                      <span>{job.date}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#1A9C9C] transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsUploadModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-[32px] w-full max-w-[600px] overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-[#F3F4F6]">
              <div className="flex items-center gap-3">
                <Upload className="w-6 h-6 text-[#1A9C9C]" />
                <h3 className="text-xl font-bold text-[#111827]">
                  Upload Document
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setSelectedFile(null);
                }}
                className="p-2 text-[#6B7280] hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
              <div>
                <label className="block text-sm font-semibold text-[#6B7280] mb-3">
                  Document Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Employment Contract"
                  className="w-full px-6 py-4 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6B7280] mb-3">
                  Document Type
                </label>
                <div className="relative">
                  <select className="w-full px-6 py-4 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500/20 transition-all appearance-none cursor-pointer">
                    <option>Contract (PDF)</option>
                    <option>Technician Info (PDF)</option>
                  </select>
                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6B7280] mb-3">
                  File
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#E5E7EB] rounded-[24px] p-12 text-center hover:border-teal-500/30 transition-all cursor-pointer bg-[#F9FBFC] group"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                      <Upload className="w-8 h-8 text-[#6B7280]" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-[#111827]">
                        {selectedFile
                          ? selectedFile.name
                          : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-1 font-bold uppercase tracking-tight">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-[#F3F4F6] flex gap-4">
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setSelectedFile(null);
                }}
                className="flex-1 py-4 px-6 bg-white border border-[#E5E7EB] text-[#111827] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-4 px-6 bg-[#92E8FB] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" /> Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setViewingDocument(null)}
          ></div>
          <div className="relative bg-[#F9FAFB] rounded-[24px] w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl animate-in zoom-in duration-200 flex flex-col border border-gray-100/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-[#F3F4F6] relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50/50 rounded-xl text-teal-700">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827]">
                    {viewingDocument.name}
                  </h3>
                  <p className="text-xs text-[#6B7280] font-medium mt-1">
                    Uploaded on {viewingDocument.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#00D0FF] text-white rounded-xl text-sm font-bold hover:bg-[#00BCE6] transition-all shadow-md shadow-cyan-200/50">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button
                  onClick={() => setViewingDocument(null)}
                  className="p-2 text-[#6B7280] hover:bg-gray-100 rounded-full transition-colors ml-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-10 flex-1 overflow-y-auto">
              <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                {/* Mock PDF Viewer Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center border-b border-[#F3F4F6]">
                  <div className="relative mb-6">
                    <FileText className="w-28 h-28 text-[#E5E7EB]" strokeWidth={1} />
                  </div>
                  <h4 className="text-xl font-bold text-[#111827] mb-4">
                    {viewingDocument.type === 'contract' ? 'Contract' : viewingDocument.type === 'insurance' ? 'Technician Info' : 'ID Document'}
                  </h4>
                  <p className="text-[#6B7280] max-w-md mx-auto text-sm leading-relaxed">
                    This is a secure document viewer. In a production environment,
                    this would display the actual PDF or image file.
                  </p>
                </div>
                
                {/* Document Metadata */}
                <div className="p-10 py-8 max-w-2xl mx-auto w-full">
                  <div className="space-y-3">
                    <div className="flex grid grid-cols-2 items-center text-sm">
                      <span className="font-semibold text-[#6B7280]">Document Type:</span>
                      <span className="text-[#111827] font-bold text-right capitalize">{viewingDocument.type}</span>
                    </div>
                    <div className="flex grid grid-cols-2 items-center text-sm">
                      <span className="font-semibold text-[#6B7280]">Expiry Date:</span>
                      <span className="text-[#111827] font-bold text-right">{viewingDocument.expiry}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianDetails;
