import React, { useState } from 'react';
import { ChevronRight, Plus, Search, MapPin, Phone, Building2, Award } from 'lucide-react';

const Technicians = () => {
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [filterTab, setFilterTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const techniciansData = [
    {
      id: 1,
      name: 'Marcus Johnson',
      license: 'MJ 344',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      activeJobs: 3,
      completedJobs: 2,
      status: 'available',
      specialties: ['Windshield Repair', 'Window Tinting'],
      phone: '4548454545',
      company: 'JoinVenture.io',
      location: 'Downtown Service',
      licenseNumber: '5774chgc',
      assignedJobs: [
        { id: 1, name: 'John Smith', service: 'Windshield Replacement', progress: 7, status: 'Active', date: '10/24/2023' },
        { id: 2, name: 'Emily Davis', service: 'Chip Repair', progress: 2, status: 'Active', date: '10/23/2023' },
        { id: 3, name: 'John Smith', service: 'Window Tinting', progress: 7, status: 'Active', date: '10/18/2023' }
      ]
    },
    {
      id: 2,
      name: 'Sarah Williams',
      license: 'MA 538',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      activeJobs: 1,
      completedJobs: 5,
      status: 'available',
      specialties: ['Chip Repair', 'Windshield Replacement'],
      phone: '4548454545',
      company: 'JoinVenture.io',
      location: 'Downtown Service',
      licenseNumber: '5774chgc',
      assignedJobs: [
        { id: 1, name: 'Jane Doe', service: 'Windshield Repair', progress: 4, status: 'Active', date: '10/22/2023' }
      ]
    },
    {
      id: 3,
      name: 'David Chen',
      license: 'DK1 OO',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      activeJobs: 0,
      completedJobs: 8,
      status: 'on-job',
      specialties: ['Window Tinting', 'Detailing'],
      phone: '4548454545',
      company: 'JoinVenture.io',
      location: 'Downtown Service',
      licenseNumber: '5774chgc',
      assignedJobs: []
    },
    {
      id: 4,
      name: 'Emma Thompson',
      license: 'WA1 OO',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      activeJobs: 2,
      completedJobs: 6,
      status: 'available',
      specialties: ['Windshield Repair', 'Chip Repair'],
      phone: '4548454545',
      company: 'JoinVenture.io',
      location: 'Downtown Service',
      licenseNumber: '5774chgc',
      assignedJobs: []
    },
    {
      id: 5,
      name: 'James Wilson',
      license: 'BL1 EE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      activeJobs: 4,
      completedJobs: 10,
      status: 'available',
      specialties: ['Windshield Replacement'],
      phone: '4548454545',
      company: 'JoinVenture.io',
      location: 'Downtown Service',
      licenseNumber: '5774chgc',
      assignedJobs: []
    },
    {
      id: 6,
      name: 'Lisa Patel',
      license: 'WN1 FF',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      activeJobs: 1,
      completedJobs: 3,
      status: 'available',
      specialties: ['Detailing', 'Window Tinting'],
      phone: '4548454545',
      company: 'JoinVenture.io',
      location: 'Downtown Service',
      licenseNumber: '5774chgc',
      assignedJobs: []
    }
  ];

  const filteredTechnicians = techniciansData.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterTab === 'all') return matchesSearch;
    if (filterTab === 'available') return tech.status === 'available' && matchesSearch;
    if (filterTab === 'on-job') return tech.status === 'on-job' && matchesSearch;
    return matchesSearch;
  });

  if (selectedTechnician) {
    const tech = selectedTechnician;
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <button
          onClick={() => setSelectedTechnician(null)}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Technician Profile</span>
        </button>

        {/* Profile Header */}
        <div className="bg-teal-700 rounded-lg p-8 mb-6 flex items-center gap-6">
          <img
            src={tech.avatar}
            alt={tech.name}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div className="text-white flex-1">
            <h2 className="text-3xl font-bold mb-2">{tech.name}</h2>
            <span className="inline-block bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Available
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm">Name:</span>
                <p className="text-gray-900 font-medium">{tech.name}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Number:</span>
                <p className="text-gray-900 font-medium">{tech.phone}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Company:</span>
                <p className="text-gray-900 font-medium">{tech.company}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Location:</span>
                <p className="text-gray-900 font-medium">{tech.location}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">License:</span>
                <p className="text-gray-900 font-medium">{tech.licenseNumber}</p>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {tech.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t space-y-3">
              {tech.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium w-fit"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="text-3xl font-bold text-blue-600 mb-1">{tech.activeJobs}</div>
                <p className="text-gray-600 text-sm">Active Jobs</p>
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-green-600 mb-1">{tech.completedJobs}</div>
                <p className="text-gray-600 text-sm">Completed</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                App Permissions
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">View Payout Amount</span>
                <div className="w-12 h-6 bg-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Jobs */}
        {tech.assignedJobs.length > 0 && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Jobs ({tech.assignedJobs.length})</h3>
            <div className="space-y-3">
              {tech.assignedJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{job.name}</p>
                    <p className="text-sm text-gray-600">{job.service}</p>
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: 7 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-8 rounded ${idx < job.progress ? 'bg-green-500' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {job.status}
                  </span>
                  <span className="text-gray-500 text-sm">{job.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Technicians</h1>
        <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <Plus className="w-5 h-5" />
          Add Technician
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Available', 'On Job'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab.toLowerCase().replace(' ', '-'))}
              className={`px-4 py-2 rounded-lg font-medium ${
                filterTab === tab.toLowerCase().replace(' ', '-')
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
            className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg cursor-pointer transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={tech.avatar}
                  alt={tech.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tech.license}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span className="font-semibold text-gray-900">{tech.activeJobs}</span>
                <span className="text-sm text-gray-600">Active Jobs</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {tech.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
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
  );
};

export default Technicians;
