import React, { useState } from 'react';
import { ChevronRight, MapPin, Phone, Mail, Calendar } from 'lucide-react';

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: 1,
      name: 'John Smith',
      since: '2023',
      phone: '07700 900111',
      email: 'john.smith@example.com',
      location: 'M2 2BB',
      jobs: 2,
      totalSpent: '£120.00',
      vehicle: {
        make: 'Ford',
        model: 'Fiesta',
        year: '2018',
        colour: 'Blue',
        fuel: 'Petrol',
        reg: 'AFD1223'
      },
      submissions: [
        {
          id: 1,
          service: 'Windshield Replacement',
          description: 'Large crack across the driver side vision area.',
          status: 'New Lead',
          urgency: 'Requires Attention',
          assign: 'To Assign',
          date: '10/24/2023',
          progress: 3
        },
        {
          id: 2,
          service: 'Window Tinting',
          description: 'Front windows tinting.',
          status: 'Active',
          date: '10/19/2023',
          amount: '£120.00',
          progress: 7
        }
      ]
    },
    {
      id: 2,
      name: 'Emily Davis',
      since: '2023',
      phone: '07700 900222',
      email: 'emily.davis@example.com',
      location: 'M3 3CC',
      jobs: 1,
      totalSpent: '£85.00',
      vehicle: {
        make: 'Toyota',
        model: 'Corolla',
        year: '2020',
        colour: 'Silver',
        fuel: 'Hybrid',
        reg: 'BCD5678'
      },
      submissions: []
    },
    {
      id: 3,
      name: 'Michael Brown',
      since: '2023',
      phone: '07700 900333',
      email: 'michael.b@example.com',
      location: 'SK2 2DD',
      jobs: 1,
      totalSpent: '£95.00',
      vehicle: {
        make: 'BMW',
        model: '3 Series',
        year: '2019',
        colour: 'Black',
        fuel: 'Diesel',
        reg: 'EFG9012'
      },
      submissions: []
    },
    {
      id: 4,
      name: 'Sophie Taylor',
      since: '2022',
      phone: '07700 900444',
      email: 'sophie.t@example.com',
      location: 'WA2 2EE',
      jobs: 3,
      totalSpent: '£250.00',
      vehicle: {
        make: 'Volkswagen',
        model: 'Golf',
        year: '2021',
        colour: 'Red',
        fuel: 'Petrol',
        reg: 'HIJ3456'
      },
      submissions: []
    },
    {
      id: 5,
      name: 'Oliver White',
      since: '2023',
      phone: '07700 900555',
      email: 'oliver.w@example.com',
      location: 'BL2 2FF',
      jobs: 1,
      totalSpent: '£110.00',
      vehicle: {
        make: 'Audi',
        model: 'A4',
        year: '2020',
        colour: 'White',
        fuel: 'Petrol',
        reg: 'KLM7890'
      },
      submissions: []
    },
    {
      id: 6,
      name: 'Chloe Martin',
      since: '2023',
      phone: '07700 900666',
      email: 'chloe.m@example.com',
      location: 'WN2 2GG',
      jobs: 1,
      totalSpent: '£75.00',
      vehicle: {
        make: 'Mercedes',
        model: 'C-Class',
        year: '2022',
        colour: 'Gray',
        fuel: 'Diesel',
        reg: 'NOP1234'
      },
      submissions: []
    },
    {
      id: 7,
      name: 'Daniel Garcia',
      since: '2023',
      phone: '07700 900777',
      email: 'daniel.g@example.com',
      location: 'M5 5HH',
      jobs: 1,
      totalSpent: '£105.00',
      vehicle: {
        make: 'Vauxhall',
        model: 'Astra',
        year: '2019',
        colour: 'Blue',
        fuel: 'Petrol',
        reg: 'QRS5678'
      },
      submissions: []
    },
    {
      id: 8,
      name: 'Lucy Anderson',
      since: '2023',
      phone: '07700 900888',
      email: 'lucy.a@example.com',
      location: 'SK3 3ll',
      jobs: 2,
      totalSpent: '£180.00',
      vehicle: {
        make: 'Nissan',
        model: 'Qashqai',
        year: '2021',
        colour: 'Brown',
        fuel: 'Petrol',
        reg: 'TUV9012'
      },
      submissions: []
    }
  ];

  const getInitial = (name) => name.charAt(0).toUpperCase();
  const getAvatarColor = (index) => {
    const colors = ['bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-orange-200', 'bg-green-200', 'bg-yellow-200', 'bg-indigo-200', 'bg-red-200'];
    return colors[index % colors.length];
  };

  if (selectedCustomer) {
    const customer = customers.find(c => c.id === selectedCustomer);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <button
            onClick={() => setSelectedCustomer(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span>Back</span>
          </button>

          <h1 className="text-4xl font-bold mb-6">Customers</h1>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* Profile Header */}
            <div className="bg-teal-700 text-white p-8 flex items-center gap-6">
              <div className={`w-20 h-20 rounded-full ${getAvatarColor(customer.id)} flex items-center justify-center text-2xl font-bold text-gray-700`}>
                {getInitial(customer.name)}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{customer.name}</h2>
                <p className="text-teal-100">Customer since {customer.since}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-8">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="font-medium">{customer.name.toLowerCase()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Number</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium text-sm">{customer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Location</p>
                    <p className="font-medium">{customer.location}</p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Total Jobs</p>
                    <p className="text-2xl font-bold text-blue-600">{customer.jobs}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-green-600">{customer.totalSpent}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Active Jobs</p>
                    <p className="text-2xl font-bold text-blue-600">1</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Completed Jobs</p>
                    <p className="text-2xl font-bold text-green-600">1</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-4">Vehicle Found</h3>
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm">Make</p>
                      <p className="font-medium">{customer.vehicle.make}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Year</p>
                      <p className="font-medium">{customer.vehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Fuel</p>
                      <p className="font-medium">{customer.vehicle.fuel}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm">Model</p>
                      <p className="font-medium">{customer.vehicle.model}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Colour</p>
                      <p className="font-medium">{customer.vehicle.colour}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Reg</p>
                      <p className="font-medium">{customer.vehicle.reg}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission History */}
          {customer.submissions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{customer.submissions.length} total submission{customer.submissions.length !== 1 ? 's' : ''}</h3>
              <div className="space-y-4">
                {customer.submissions.map((submission) => (
                  <div key={submission.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{submission.service}</h4>
                      <span className="text-gray-500 text-sm">{submission.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{submission.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {submission.status && <span className={`px-3 py-1 rounded-full text-sm font-medium ${submission.status === 'New Lead' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{submission.status}</span>}
                      {submission.urgency && <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">{submission.urgency}</span>}
                      {submission.assign && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{submission.assign}</span>}
                      {submission.amount && <span className="text-gray-600 font-medium">{submission.amount}</span>}
                    </div>
                    {submission.progress && (
                      <div className="mt-3 flex gap-1">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-3 rounded-full ${i < submission.progress ? 'bg-green-500' : 'bg-gray-300'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Customers</h1>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">History</th>
                <th className="px-6 py-4 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedCustomer(customer.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${getAvatarColor(index)} flex items-center justify-center font-semibold text-gray-700`}>
                        {getInitial(customer.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">Since {customer.since}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <Phone className="w-4 h-4" /> {customer.phone}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" /> {customer.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="flex items-center gap-2 text-gray-900 font-medium">
                      <MapPin className="w-4 h-4" /> {customer.location}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-gray-900 font-medium">{customer.jobs} Job{customer.jobs !== 1 ? 's' : ''}</p>
                  </td>
                  <td className="px-6 py-4">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
