import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Calendar, ArrowUpRight, ArrowDownRight, CloudDownload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();
  const [revenueTarget, setRevenueTarget] = useState(500.0);
  const [showSetTarget, setShowSetTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState('000000');

  // Revenue trend data
  const revenueTrendData = [
    { month: 'Jan', value: 2500, target: 1800 },
    { month: 'Feb', value: 2400, target: 1900 },
    { month: 'Mar', value: 2800, target: 2500 },
    { month: 'Apr', value: 2600, target: 2300 },
    { month: 'May', value: 2600, target: 2300 },
    { month: 'Jun', value: 3200, target: 2600 },
    { month: 'Jul', value: 3100, target: 3000 },
    { month: 'Aug', value: 2700, target: 3300 },
    { month: 'Sep', value: 3400, target: 2800 },
    { month: 'Oct', value: 3600, target: 3500 },
    { month: 'Nov', value: 3500, target: 3400 },
    { month: 'Dec', value: 3800, target: 4100 },
  ];

  const CustomLabel = (props) => {
    const { viewBox } = props;
    return (
      <g>
        <rect
          x={viewBox.x + 10}
          y={viewBox.y - 65}
          width={180}
          height={55}
          rx={12}
          fill="#BCF328"
        />
        <text
          x={viewBox.x + 25}
          y={viewBox.y - 45}
          fill="#888888"
          className="text-sm"
        >
          Average year value
        </text>
        <text
          x={viewBox.x + 25}
          y={viewBox.y - 20}
          fill="#1f2937"
          className="text-lg font-bold"
        >
          £ 339,091,888
        </text>
      </g>
    );
  };

  // Customer trend data
  const customerTrendData = [
    { day: 'Mon', value: 4000 },
    { day: 'Tue', value: 3000 },
    { day: 'Wed', value: 4200 },
    { day: 'Thu', value: 2780 },
    { day: 'Fri', value: 4100 },
    { day: 'Sat', value: 2490 },
    { day: 'Sun', value: 4900 },
  ];

  // Technicians overview data
  const techniciansData = [
    { id: 'ORD001', name: 'Marcus Johnson', jobs: 5 },
    { id: 'ORD002', name: 'Sarah Williams', jobs: 4 },
    { id: 'ORD003', name: 'David Chen', jobs: 2 },
    { id: 'ORD004', name: 'Emma Thompson', jobs: 2 },
    { id: 'ORD005', name: 'James Wilson', jobs: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-medium text-[#2A2A2A] mb-8">Admin Dashboard</h1>

        {/* First Row - Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Monthly Revenue Target */}
          <div className="bg-white col-span-2 rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl text-[#454545]">Monthly Revenue Target</h3>
              <button
                onClick={() => setShowSetTarget(!showSetTarget)}
                className="text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <span className="text-xl">+</span> Set Target
              </button>
            </div>

            <div className="grid grid-cols-2 mb-2">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">In Progress</p>
                <p className="text-3xl text-orange-500">£200</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm font-medium mb-1">Target</p>
                <p className="text-3xl text-green-600">£{revenueTarget}</p>
              </div>
            </div>

            <div className="relative mt-4">
              <div className="w-full bg-black/20 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[#1A9C9C] h-full rounded-full relative"
                  style={{ width: '55%' }}
                >
                </div>
              </div>
              {/* Custom Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-[#D9D9D9] rounded-full border-4 border-white shadow-md cursor-pointer"
                style={{ left: 'calc(55% - 20px)' }}
              ></div>
            </div>

            {/* Set Target Overlay */}
            {showSetTarget && (
              <div className="absolute inset-0 z-20 bg-[#EAFBFF] flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
                <h3 className="text-xl font-bold text-[#1A9C9C] mb-4">Set Monthly Revenue Target</h3>
                <input
                  type="text"
                  value={tempTarget}
                  onChange={(e) => setTempTarget(e.target.value)}
                  className="bg-transparent text-4xl text-center text-gray-300 font-medium outline-none mb-6 w-full placeholder:text-gray-200"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setRevenueTarget(tempTarget);
                    setShowSetTarget(false);
                  }}
                  className="bg-[#1A9C9C] text-white px-10 py-2 rounded-xl text-xl font-medium hover:bg-[#158080] transition-colors shadow-lg shadow-teal-100"
                >
                  save
                </button>
              </div>
            )}
          </div>

          {/* Total Revenue */}
          <div className="bg-[#0D7E8A] rounded-[32px] p-6 flex flex-col justify-between text-white shadow-md relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-lg opacity-90">Total Revenue</h3>
              <ArrowUpRight className="w-6 h-6 opacity-80" />
            </div>
            <div className="flex items-end justify-between gap-2">
              <p className="text-4xl font-medium">£7,100</p>
              <div>
                <span className="text-red-500 text-sm font-semibold flex items-end">
                  <ArrowDownRight className="w-4 h-4" /> 1.5%
                </span>
                <span className="text-white/60 text-xs">From last week</span>
              </div>
            </div>
          </div>

          {/* Total Jobs */}
          <div className="bg-white rounded-[32px] p-6 flex flex-col justify-between border border-[#E7E7E7] shadow-sm relative">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-gray-500 text-lg">Total jobs</h3>
              <ArrowUpRight className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex items-end justify-between gap-2">
              <p className="text-4xl font-medium">14</p>
              <div className="flex flex-col items-end">
                <span className="text-green-600 text-sm font-semibold flex items-center">
                  <ArrowUpRight className="w-4 h-4" /> 10.6%
                </span>
                <span className="text-gray-400 text-xs">From last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Charts and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm relative">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl text-[#454545]">Revenue Trend</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E7E7] rounded-xl shadow-xl shadow-gray-100/50 text-teal-600 text-sm font-medium">
                Calendar <Calendar className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrendData} margin={{ top: 70, right: 30, left: 20, bottom: 0 }}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 16 }}
                    dy={5}
                  />
                  <YAxis hide domain={['dataMin - 500', 'dataMax + 1000']} />
                  <Tooltip content={() => null} />
                  <ReferenceLine
                    x="Aug"
                    stroke="#818cf8"
                    strokeWidth={5}
                    label={<CustomLabel />}
                  />
                  <Line
                    type="natural"
                    dataKey="target"
                    stroke="#1A9C9C"
                    strokeWidth={4}
                    strokeDasharray="8 8"
                    dot={false}
                  />
                  <Line
                    type="natural"
                    dataKey="value"
                    stroke="#F68528"
                    strokeWidth={4}
                    dot={{ r: 3, fill: '#F68528', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 col-span-2 gap-6">
            {/* Active Jobs */}
            <div className="bg-white rounded-[32px] p-6 flex flex-col justify-between border border-[#E7E7E7] shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-gray-500 text-lg">Active jobs</h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-end justify-between gap-2">
                <p className="text-4xl font-medium">100</p>
                <div className="flex flex-col items-end">
                  <span className="text-green-500 text-sm font-semibold flex items-center">
                    <ArrowUpRight className="w-4 h-4" /> 1.5%
                  </span>
                  <span className="text-gray-400 text-xs">From last week</span>
                </div>
              </div>
            </div>

            {/* Attention Required */}
            <div className="bg-white rounded-[32px] p-6 flex flex-col justify-between border border-[#E7E7E7] shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-gray-500 text-lg">Attention Required</h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-end justify-between gap-2">
                <p className="text-4xl font-medium text-[#0D7E8A]">50</p>
                <p className="text-red-500 text-sm font-medium">Need action</p>
              </div>
            </div>

            {/* Total Customer */}
            <div className="bg-white rounded-[32px] p-6 flex flex-col justify-between border border-[#E7E7E7] shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-gray-500 text-lg">Total customer</h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-end justify-between gap-2">
                <p className="text-4xl font-medium">50</p>
                <div className="flex flex-col items-end">
                  <span className="text-green-600 text-sm font-semibold flex items-center">
                    <ArrowUpRight className="w-4 h-4" /> 10.6%
                  </span>
                  <span className="text-gray-400 text-xs">From last week</span>
                </div>
              </div>
            </div>

            {/* Total Technicians */}
            <div className="bg-white rounded-[32px] p-6 flex flex-col justify-between border border-[#E7E7E7] shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-gray-500 text-lg">Total Technicians</h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-end justify-between gap-2">
                <p className="text-4xl font-medium">£7,100</p>
                <div className="flex flex-col items-end">
                  <span className="text-red-500 text-xs font-semibold flex items-center">
                    <ArrowDownRight className="w-4 h-4" /> 1.5%
                  </span>
                  <span className="text-gray-400 text-xs">From last week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row - More Stats and Customer Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Trend */}
          <div className="bg-white rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm relative">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl text-[#454545]">Customer Trend</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E7E7] rounded-xl shadow-xl shadow-gray-100/10 text-[#0D7E8A] text-sm font-medium">
                Calendar <Calendar className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerTrendData} barSize={60} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#454545', fontSize: 16 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="#1A9C9C" radius={[15, 15, 15, 15]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Technicians Overview */}
          <div className="bg-white rounded-[32px] p-8 border border-[#E7E7E7] shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#F5F5F5]">
              <h3 className="text-2xl text-[#F68528]">Technicians overview</h3>
              <div className="flex items-center gap-8">
                <span className="text-gray-500 text-sm mr-10">Assigned jobs</span>
                <button className="text-gray-800 text-sm font-bold flex items-center gap-2">
                  Action
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {techniciansData.map((tech, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <div className="flex flex-col">
                    <span className="text-gray-700 text-lg">{tech.name}</span>
                    <span className="text-gray-400 text-sm">#{tech.id}</span>
                  </div>
                  <div className="flex items-center gap-20">
                    <span className="text-gray-600 text-xl">{tech.jobs}</span>
                    <button 
                      onClick={() => navigate('/technicians', { state: { selectedTechnicianName: tech.name } })}
                      className="bg-[#28A745] hover:bg-green-600 text-white px-8 py-2 rounded-xl text-sm shadow-lg shadow-green-100"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
